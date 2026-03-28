import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, Printer } from 'lucide-react';
import useStore from '../store/useStore';

const DailyClosingForm = ({ user }) => {
    const { orders, expenses } = useStore();
    const reportRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };

    const [isGenerating, setIsGenerating] = React.useState(false);

    const handleDownloadPDF = async () => {
        if (!reportRef.current || isGenerating) return;

        setIsGenerating(true);
        try {
            // Give a small delay to ensure DOM is ready and any animations settled
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: true,
                allowTaint: true,
                imageTimeout: 15000,
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate dimensions to fit on one page
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            let finalWidth = pdfWidth;
            let finalHeight = (canvasHeight * pdfWidth) / canvasWidth;

            // If height exceeds page (with a 10mm margin for safety), scale down
            const maxHeight = pdfHeight - 10; // 10mm margin at bottom
            if (finalHeight > maxHeight) {
                finalHeight = maxHeight;
                finalWidth = (canvasWidth * finalHeight) / canvasHeight;
            }

            // Center horizontally
            const xOffset = (pdfWidth - finalWidth) / 2;

            pdf.addImage(imgData, 'PNG', xOffset, 0, finalWidth, finalHeight, undefined, 'FAST');
            pdf.save(`Gun_Sonu_Raporu_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert(`PDF oluşturulurken bir hata oluştu: ${error.message || 'Bilinmeyen hata'}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const today = new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const todayStr = new Date().toDateString();

    // Calculations for the report
    const todaysOrders = orders.filter(o => new Date(o.timestamp || o.date).toDateString() === todayStr);
    const completedOrders = todaysOrders.filter(o => o.status === 'Tamamlandı');

    const totalOrderCount = todaysOrders.length;
    let nakitTotal = 0;
    let posTotal = 0;
    let havaleTotal = 0;
    let veresiyeTotal = 0;

    let soldProducts = {};

    completedOrders.forEach(o => {
        const amt = Number(o.amount) || 0;
        if (o.paymentMethod === 'Nakit') nakitTotal += amt;
        else if (o.paymentMethod === 'Kredi Kartı' || o.paymentMethod === 'POS') posTotal += amt;
        else if (o.paymentMethod === 'EFT / Havale') havaleTotal += amt;
        else if (o.paymentMethod === 'Veresiye' || o.paymentMethod === 'Açık Hesap') veresiyeTotal += amt;

        if (o.items && Array.isArray(o.items)) {
            o.items.forEach(item => {
                const name = item.name || 'İsimsiz Ürün';
                const qty = item.quantity || 1;
                if (!soldProducts[name]) {
                    soldProducts[name] = 0;
                }
                soldProducts[name] += qty;
            });
        }
    });

    const todaysExpenses = expenses.filter(e => new Date(e.timestamp || e.date).toDateString() === todayStr);
    const totalExpenseAmount = todaysExpenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const dailyTotalRevenue = nakitTotal + posTotal + havaleTotal;

    const reportNo = `#${new Date().toISOString().split('T')[0].replace(/-/g, '')}-01`;

    return (
        <div className="p-0 sm:p-4 md:p-8 bg-slate-50 min-h-screen">
            <div className="w-full sm:max-w-[210mm] mx-auto">
                {/* Action Header - Hidden when printing */}
                <div className="flex justify-between items-center p-4 sm:p-0 mb-8 print:hidden">
                    <div className="min-w-0">
                        <h1 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight truncate">Z RAPORU</h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Muhasebe ve Arşiv Dökümü</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGenerating}
                            className={`bg-white border-2 border-slate-100 text-slate-600 p-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 shadow-sm transition-all active:scale-95 ${isGenerating ? 'opacity-50' : ''}`}
                        >
                            {isGenerating ? <RefreshCw size={18} className="animate-spin" /> : <Download size={18} />}
                            <span className="hidden sm:inline font-black text-[10px] uppercase tracking-widest">{isGenerating ? 'HAZIRLANIYOR...' : 'PDF İNDİR'}</span>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="bg-slate-900 text-white p-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:bg-black shadow-lg shadow-slate-900/10 active:scale-95 transition-all"
                        >
                            <Printer size={18} />
                            <span className="hidden sm:inline font-black text-[10px] uppercase tracking-widest">YAZDIR</span>
                        </button>
                    </div>
                </div>

                {/* A4 Paper Layout */}
                <div ref={reportRef} className="bg-white shadow-xl sm:rounded-[2.5rem] print:shadow-none p-6 sm:p-[10mm] min-h-[100vh] sm:min-h-[297mm] text-slate-800 flex flex-col">
                    {/* Header */}
                    <div className="border-b-2 border-slate-800 pb-6 mb-8 flex justify-between items-start shrink-0">
                        <div>
                            <h1 className="text-3xl font-bold uppercase tracking-tight">Günlük Kasa Raporu</h1>
                            <p className="text-slate-500 mt-1">{today}</p>
                        </div>
                        <div className="text-right">
                            <h2 className="font-bold text-lg">{user?.name || 'BayiOS Demo İşletmesi'}</h2>
                            <p className="text-sm text-slate-500">Şube: Merkez</p>
                            <p className="text-sm text-slate-500">Rapor No: {reportNo}</p>
                        </div>
                    </div>

                    <div className="flex-grow">
                        {/* Sales Summary */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold uppercase bg-slate-100 p-2 mb-4 border-l-4 border-slate-800">1. Satış Özeti</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <table className="w-full text-sm">
                                        <tbody>
                                            <tr className="border-b border-slate-100">
                                                <td className="py-2 text-slate-500">Alınan Sipariş</td>
                                                <td className="py-2 text-right font-bold">{totalOrderCount} Adet</td>
                                            </tr>
                                            <tr className="border-b border-slate-100">
                                                <td className="py-2 text-slate-500">Tamamlanan</td>
                                                <td className="py-2 text-right font-bold">{completedOrders.length} Adet</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 text-slate-500">İptal/Bekleyen</td>
                                                <td className="py-2 text-right font-bold">{totalOrderCount - completedOrders.length} Adet</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <table className="w-full text-sm">
                                        <tbody>
                                            {Object.entries(soldProducts).length > 0 ? (
                                                Object.entries(soldProducts).map(([productName, quantity], index) => (
                                                    <tr key={index} className="border-b border-slate-100 last:border-0">
                                                        <td className="py-2 text-slate-500 capitalize">{productName}</td>
                                                        <td className="py-2 text-right font-bold">{quantity} Adet</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="py-2 text-center text-slate-500 text-xs font-medium">Satılan ürün kaydı yok</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Cash Reconciliation */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold uppercase bg-slate-100 p-2 mb-4 border-l-4 border-slate-800">2. Kasa ve Tahsilat</h3>
                            <div className="border border-slate-200 rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="py-3 px-4 text-left font-bold">Tahsilat Tipi</th>
                                            <th className="py-3 px-4 text-right font-bold">Tutar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr>
                                            <td className="py-3 px-4">Nakit Tahsilat</td>
                                            <td className="py-3 px-4 text-right font-mono">₺{nakitTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Kredi Kartı / POS</td>
                                            <td className="py-3 px-4 text-right font-mono">₺{posTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Banka Havalesi / EFT</td>
                                            <td className="py-3 px-4 text-right font-mono">₺{havaleTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                        <tr className="bg-red-50 text-red-700">
                                            <td className="py-3 px-4 font-medium">Veresiye Yazılan</td>
                                            <td className="py-3 px-4 text-right font-mono font-bold">₺{veresiyeTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                        <tr className="bg-slate-900 text-white">
                                            <td className="py-3 px-4 font-bold">GÜNLÜK TOPLAM CİRO</td>
                                            <td className="py-3 px-4 text-right font-mono font-bold">₺{dailyTotalRevenue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Expenses */}
                        <div className="mb-12">
                            <h3 className="text-sm font-bold uppercase bg-slate-100 p-2 mb-4 border-l-4 border-slate-800">3. Giderler ve Ödemeler</h3>
                            <table className="w-full text-sm mb-4">
                                <thead>
                                    <tr className="border-b-2 border-slate-200 text-slate-500">
                                        <th className="text-left py-2">Açıklama / Makbuz No</th>
                                        <th className="text-left py-2">Kategori</th>
                                        <th className="text-right py-2">Tutar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {todaysExpenses.length > 0 ? todaysExpenses.map(expense => (
                                        <tr key={expense.id}>
                                            <td className="py-2">{expense.description || expense.title || 'Gider'}</td>
                                            <td className="py-2">{expense.category || 'Belirtilmemiş'}</td>
                                            <td className="py-2 text-right">₺{Number(expense.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="py-4 text-center text-slate-500 font-medium">Bugün kaydedilmiş bir gider hareketi bulunmuyor.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex justify-end">
                                <div className="text-right">
                                    <span className="text-slate-500 mr-4">Bugünkü Toplam Gider:</span>
                                    <span className="font-bold text-lg">₺{totalExpenseAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            {/* Signatures */}
                            <div className="grid grid-cols-2 gap-16 pt-8 mt-8 border-t border-slate-300">
                                <div className="text-center">
                                    <p className="font-bold text-sm mb-1">Teslim Eden</p>
                                    <p className="text-xs text-slate-500">Kasa Sorumlusu / Kurye</p>
                                    <div className="h-16 mt-4"></div>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-sm mb-1">Teslim Alan / Onaylayan</p>
                                    <p className="text-xs text-slate-500">İşletme Sahibi / Muhasebe</p>
                                    <div className="h-16 mt-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Pushed to bottom */}
                    <div className="shrink-0 mt-auto pt-8">
                        <div className="text-center border-t border-slate-200 pt-4">
                            <p className="text-[10px] text-slate-400">Bu rapor BayiOS sistemi tarafından {new Date().toLocaleString()} tarihinde otomatik oluşturulmuştur.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyClosingForm;
