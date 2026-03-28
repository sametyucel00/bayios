import React, { useState } from 'react';
import { XCircle, Upload, FileSpreadsheet, CheckCircle, AlertTriangle, Search, Zap, ShieldCheck, Download, Info, Building2, ArrowRight } from 'lucide-react';
import * as XLSX from 'xlsx';
import useStore from '../store/useStore';

const categoryMap = {
    'su': 'Su',
    'su tedariği': 'Su',
    'damacana': 'Su',
    'tüp': 'Tüp',
    'enerji': 'Tüp',
    'lpg': 'Tüp',
    'lojistik': 'Lojistik',
    'nakliye': 'Lojistik',
    'kargo': 'Lojistik',
    'diğer': 'Diğer',
    'genel': 'Diğer'
};

const SupplierExcelImportDrawer = ({ isOpen, onClose, onImport, suppliers }) => {
    const [step, setStep] = useState('upload'); // upload, preview, results
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({ total: 0, duplicates: 0, new: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragover" || e.type === "dragenter") {
            setIsDragging(true);
        } else if (e.type === "dragleave" || e.type === "dragend") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload({ target: { files: e.dataTransfer.files } });
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const rawData = XLSX.utils.sheet_to_json(ws);

                if (rawData.length > 0) {
                    const firstRow = rawData[0];
                    const requiredHeaders = ['Firma', 'Yetkili', 'Numara'];
                    const missing = requiredHeaders.filter(h => !Object.keys(firstRow).some(key => key.trim() === h));

                    if (missing.length > 0) {
                        useStore.getState().addNotification(`Hata: Dosyada şu başlıklar eksik: ${missing.join(', ')}`, "error");
                        setIsLoading(false);
                        return;
                    }
                }

                const processed = rawData.map(row => {
                    const categoryInput = String(row['Kategori'] || '').toLowerCase().trim();
                    const category = categoryMap[categoryInput] || 'Su'; // Default to 'Su' if not matched

                    return {
                        name: row['Firma'] || '',
                        contact: row['Yetkili'] || '',
                        phone: String(row['Numara'] || row['Telefon'] || '').replace(/\D/g, ''),
                        address: row['Adres'] || '',
                        category: category,
                        balance: 0 // Default balance for new suppliers
                    };
                });

                // Deduplicate by Phone or Name
                const duplicates = processed.filter(newItem =>
                    suppliers.some(oldItem =>
                        (oldItem.phone === newItem.phone && newItem.phone !== '') ||
                        ((oldItem.name || '').toLowerCase().trim() === (newItem.name || '').toLowerCase().trim() && newItem.name !== '')
                    )
                );

                setData(processed);
                setStats({
                    total: processed.length,
                    duplicates: duplicates.length,
                    new: processed.length - duplicates.length
                });
                setStep('preview');
            } catch (err) {
                console.error(err);
                useStore.getState().addNotification("Dosya okunamadı!", "error");
            } finally {
                setIsLoading(false);
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleProcessImport = () => {
        const uniqueData = data.filter(newItem =>
            !suppliers.some(oldItem =>
                (oldItem.phone === newItem.phone && newItem.phone !== '') ||
                ((oldItem.name || '').toLowerCase().trim() === (newItem.name || '').toLowerCase().trim() && newItem.name !== '')
            )
        );
        onImport(uniqueData);
        setStep('results');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[160] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>

            <div className="relative w-full max-w-3xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-xl">
                            <FileSpreadsheet size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight font-display uppercase">TEDARİKÇİ AKTARIMI</h3>
                            <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mt-1">SİSTEM ENTEGRASYON PANELİ</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-colors border border-slate-100">
                        <XCircle size={32} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                    {step === 'upload' && (
                        <div className="flex flex-col items-center py-10 space-y-12">
                            <label
                                className="w-full max-w-xl cursor-pointer group"
                                onDragOver={handleDrag}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className={`border-4 border-dashed rounded-[3.5rem] p-16 flex flex-col items-center gap-8 transition-all duration-500 ${isDragging ? 'border-brand-primary bg-brand-primary/10 scale-[1.02]' : 'border-slate-100 bg-slate-50/50 group-hover:border-brand-primary group-hover:bg-brand-primary/5'}`}>
                                    <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:rotate-6 group-hover:text-brand-primary transition-all duration-500">
                                        <Upload size={48} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-slate-900 tracking-tight font-display mb-3 uppercase">DOSYAYI BURAYA BIRAKIN</p>
                                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">veya tıklayarak dizininizden seçin</p>

                                        <div className="mt-8 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Zorunlu Veri Başlıkları</p>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {['Firma', 'Yetkili', 'Numara', 'Adres', 'Kategori'].map(h => (
                                                    <span key={h} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black border border-slate-100">{h}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-xl">
                                <div className="text-center p-6 border-2 border-slate-50 rounded-[2.5rem] bg-white hover:border-brand-primary/20 transition-all group">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-[1.2rem] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Building2 size={24} />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Akıllı Tanıma</p>
                                    <p className="text-xs font-black text-slate-800 mt-2 uppercase tracking-tight">Sektör Analizi</p>
                                </div>
                                <div className="text-center p-6 border-2 border-slate-50 rounded-[2.5rem] bg-white hover:border-brand-primary/20 transition-all group">
                                    <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-[1.2rem] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Search size={24} />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Doğrulama</p>
                                    <p className="text-xs font-black text-slate-800 mt-2 uppercase tracking-tight">Mükerrer Sil</p>
                                </div>
                                <div className="text-center p-6 border-2 border-slate-50 rounded-[2.5rem] bg-white hover:border-brand-primary/20 transition-all group">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-[1.2rem] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Zap size={24} />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performans</p>
                                    <p className="text-xs font-black text-slate-800 mt-2 uppercase tracking-tight">Hızlı Aktarım</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'preview' && (
                        <div className="space-y-10 animate-in slide-in-from-right duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-slate-50 rounded-2xl text-slate-400">
                                            <FileSpreadsheet size={24} />
                                        </div>
                                        <span className="text-[10px] font-black bg-slate-100 px-4 py-2 rounded-xl text-slate-500 uppercase tracking-widest">TOPLAM</span>
                                    </div>
                                    <h4 className="text-4xl font-black text-slate-900 font-display tracking-tight">{stats.total}</h4>
                                    <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">OKUNAN KAYIT</p>
                                </div>

                                <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border-2 border-amber-100/50 shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-amber-100 rounded-2xl text-amber-600">
                                            <AlertTriangle size={24} />
                                        </div>
                                        <span className="text-[10px] font-black bg-amber-100 px-4 py-2 rounded-xl text-amber-600 uppercase tracking-widest">MEVCUT</span>
                                    </div>
                                    <h4 className="text-4xl font-black text-amber-600 font-display tracking-tight">{stats.duplicates}</h4>
                                    <p className="text-[10px] font-black text-amber-500 mt-2 uppercase tracking-widest">ATLANACAKLAR</p>
                                </div>

                                <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border-2 border-emerald-100/50 shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-emerald-100 rounded-2xl text-emerald-600">
                                            <CheckCircle size={24} />
                                        </div>
                                        <span className="text-[10px] font-black bg-emerald-100 px-4 py-2 rounded-xl text-emerald-600 uppercase tracking-widest">TEMİZ</span>
                                    </div>
                                    <h4 className="text-4xl font-black text-emerald-600 font-display tracking-tight">{stats.new}</h4>
                                    <p className="text-[10px] font-black text-emerald-500 mt-2 uppercase tracking-widest">YENİ PARTNER</p>
                                </div>
                            </div>

                            <div className="bg-white border-2 border-slate-50 rounded-[3rem] overflow-hidden shadow-xl">
                                <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                                    <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] px-2 flex items-center gap-3">
                                        <div className="w-2 h-4 bg-brand-primary rounded-full"></div>
                                        VERİ ÖNİZLEME (İLK 10)
                                    </h5>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-brand-primary bg-brand-primary/10 px-4 py-2 rounded-xl uppercase tracking-widest">
                                        <Info size={14} /> ANALİZ TAMAMLANDI
                                    </div>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto overflow-x-auto scrollbar-hide p-4">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50/50 text-[10px] uppercase font-black tracking-widest text-slate-400">
                                            <tr>
                                                <th className="px-6 py-5">FİRMA ÜNVANI</th>
                                                <th className="px-6 py-5">YETKİLİ</th>
                                                <th className="px-6 py-5">İLETİŞİM</th>
                                                <th className="px-6 py-5">KATEGORİ</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50/50">
                                            {data.slice(0, 10).map((row, i) => (
                                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-6 py-5 text-sm font-black text-slate-800">{row.name}</td>
                                                    <td className="px-6 py-5 text-xs font-black text-slate-500 uppercase">{row.contact}</td>
                                                    <td className="px-6 py-5 text-xs font-black text-slate-400">{row.phone}</td>
                                                    <td className="px-6 py-5">
                                                        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-brand-primary group-hover:text-white transition-all">
                                                            {row.category}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'results' && (
                        <div className="flex flex-col items-center py-24 text-center animate-in zoom-in duration-500">
                            <div className="relative">
                                <div className="w-48 h-48 bg-emerald-50 text-emerald-500 rounded-[4rem] flex items-center justify-center mb-12 shadow-2xl">
                                    <CheckCircle size={96} />
                                </div>
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-[1.5rem] border-4 border-emerald-500 flex items-center justify-center text-emerald-500 font-black text-2xl shadow-xl">
                                    ✓
                                </div>
                            </div>
                            <h3 className="text-5xl font-black text-slate-900 tracking-tighter font-display mb-6 lowercase">ENTEGRASYON BAŞARILI</h3>
                            <p className="text-slate-500 font-black text-sm leading-relaxed max-w-md mb-16 uppercase tracking-widest">
                                <span className="text-emerald-600">{stats.new}</span> YENİ TEDARİKÇİ EKOSİSTEME DAHİL EDİLDİ.
                                <br />
                                <span className="text-amber-600">{stats.duplicates}</span> KAYIT MÜKERRER OLDUĞU İÇİN ANALİZ DIŞI BIRAKILDI.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-16 py-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-brand-primary hover:scale-[1.05] transition-all shadow-2xl active:scale-95 flex items-center gap-6"
                            >
                                SİSTEME DÖN <ArrowRight size={24} />
                            </button>
                        </div>
                    )}
                </div>

                {step === 'preview' && (
                    <div className="p-10 border-t border-slate-100 bg-white grid grid-cols-2 gap-6">
                        <button
                            onClick={() => setStep('upload')}
                            className="px-8 py-6 border-2 border-slate-100 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 hover:bg-slate-50 transition-all active:scale-95"
                        >
                            FARKLI DOSYA SEÇ
                        </button>
                        <button
                            onClick={handleProcessImport}
                            className="px-8 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-brand-primary transition-all shadow-2xl shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-4"
                        >
                            <ShieldCheck size={24} />
                            {stats.new} KAYDI ONAYLA
                        </button>
                    </div>
                )}

                {isLoading && (
                    <div className="absolute inset-0 z-[170] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="flex flex-col items-center gap-8">
                            <div className="w-20 h-20 border-[6px] border-white/20 border-t-brand-primary rounded-full animate-spin shadow-2xl" />
                            <div className="text-center">
                                <p className="text-white font-black tracking-[0.4em] uppercase text-sm">VERİ ANALİZİ YAPILIYOR</p>
                                <p className="text-white/40 text-[10px] font-black mt-2 uppercase tracking-widest">LÜTFEN BEKLEYİN...</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupplierExcelImportDrawer;
