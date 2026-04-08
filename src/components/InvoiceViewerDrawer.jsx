import React, { useRef } from 'react';
import { XCircle, Printer, CheckCircle2 } from 'lucide-react';

const formatMoney = (value) => `₺${Number(value || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const getOrderItems = (order) => {
    if (Array.isArray(order?.items) && order.items.length > 0) {
        return order.items.map((item) => {
            const quantity = Number(item?.quantity || 1);
            const price = Number(item?.price || 0);
            const depositFee = Boolean(item?.includeDeposit) ? Number(item?.depositFee || 0) : 0;

            return {
                name: item?.name || item?.productName || order?.product || '-',
                quantity,
                unitPrice: price + depositFee,
                lineTotal: (price + depositFee) * quantity,
            };
        });
    }

    const quantity = Number(order?.quantity || 1);
    const unitPrice = quantity > 0 ? Number(order?.amount || 0) / quantity : Number(order?.amount || 0);

    return [
        {
            name: order?.product || '-',
            quantity,
            unitPrice,
            lineTotal: Number(order?.amount || 0),
        },
    ];
};

const InvoiceViewerDrawer = ({ isOpen, onClose, order }) => {
    const printRef = useRef(null);

    if (!isOpen || !order) return null;

    const invoiceNo = `INV-2026-${String(order.id).slice(-6).toUpperCase()}`;
    const invoiceDate = new Date(order.timestamp || order.date || Date.now()).toLocaleDateString('tr-TR');
    const kdvRate = 0.2;
    const totalAmount = Number(order.amount || 0);
    const subTotal = totalAmount / (1 + kdvRate);
    const taxAmount = totalAmount - subTotal;
    const invoiceItems = getOrderItems(order);

    const handlePrint = () => {
        const printContent = printRef.current;
        const printWindow = window.open('', '', 'width=900,height=800');
        if (!printWindow || !printContent) return;

        printWindow.document.write(`
            <html>
                <head>
                    <title>Fatura - ${invoiceNo}</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                        @media print {
                            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body class="p-8 font-sans">
                    ${printContent.innerHTML}
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-[200] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

            <div className="relative bg-white w-full max-w-3xl h-full shadow-2xl overflow-hidden animate-in slide-in-from-right duration-500 flex flex-col">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 print:hidden shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                            <FileIcon />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight font-display uppercase">FATURA GÖRÜNTÜLEYİCİ</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{invoiceNo}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handlePrint} className="p-2 bg-white rounded-xl text-slate-600 hover:text-indigo-600 shadow-sm transition-colors border border-slate-100 flex items-center gap-2 px-4 font-black text-[10px] tracking-widest uppercase">
                            <Printer size={16} /> YAZDIR
                        </button>
                        <button onClick={onClose} className="p-2 bg-white rounded-xl text-slate-400 hover:text-rose-500 shadow-sm transition-colors border border-slate-100">
                            <XCircle size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-10 overflow-y-auto bg-slate-100/30 flex-1 scrollbar-hide">
                    <div
                        ref={printRef}
                        className="bg-white p-6 sm:p-12 rounded-3xl shadow-sm border border-slate-200 mx-auto max-w-2xl relative"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
                            <CheckCircle2 size={400} />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12 border-b border-slate-100 pb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">E-ARŞİV FATURA</h1>
                                <p className="text-slate-500 text-sm font-medium">Aslı Gibidir</p>
                            </div>
                            <div className="sm:text-right">
                                <div className="text-2xl font-black text-brand-primary tracking-tighter">BAYIOS INC.</div>
                                <p className="text-slate-400 text-xs">İkitelli OSB, Başakşehir, İstanbul</p>
                                <p className="text-slate-400 text-xs mt-1">VD: Marmara Kurumlar - 1234567890</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-12">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">SAYIN</p>
                                <h3 className="text-lg font-black text-slate-800 uppercase leading-none mb-2">{order.customer}</h3>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                    {order.paymentMethod === 'Veresiye' ? 'Açık Hesap Müşterisi' : 'Nihai Tüketici'}
                                </p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center">
                                <div className="grid grid-cols-2 gap-y-3">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">FATURA NO</p>
                                        <p className="text-sm font-bold text-slate-800">{invoiceNo}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">DÜZENLEME TARİHİ</p>
                                        <p className="text-sm font-bold text-slate-800">{invoiceDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ÖDEME KANALI</p>
                                        <p className="text-sm font-bold text-slate-800">{order.paymentMethod || 'Nakit'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SİPARİŞ NO</p>
                                        <p className="text-sm font-bold text-slate-800">{String(order.id).slice(-6).toUpperCase()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12 overflow-x-auto">
                            <table className="w-full text-left min-w-[500px]">
                                <thead className="border-b-2 border-slate-800">
                                    <tr>
                                        <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Açıklama</th>
                                        <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Miktar</th>
                                        <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Birim Fiyat</th>
                                        <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Toplam</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {invoiceItems.map((item, idx) => (
                                        <tr key={`${item.name}-${idx}`}>
                                            <td className="py-4 text-sm font-bold text-slate-800">{item.name}</td>
                                            <td className="py-4 text-sm font-bold text-slate-600 text-center">{item.quantity}</td>
                                            <td className="py-4 text-sm font-bold text-slate-600 text-right">{formatMoney(item.unitPrice)}</td>
                                            <td className="py-4 text-sm font-black text-slate-900 text-right">{formatMoney(item.lineTotal)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end border-t border-slate-100 pt-8">
                            <div className="w-full sm:w-64 space-y-3">
                                <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                                    <span>Ara Toplam</span>
                                    <span>{formatMoney(subTotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                                    <span>KDV (%20)</span>
                                    <span>{formatMoney(taxAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t-2 border-slate-800">
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">GENEL TOPLAM</span>
                                    <span className="text-xl font-black text-slate-900 font-display">{formatMoney(totalAmount)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                            <p className="text-[10px] font-bold text-slate-400">Bu belge 509 Sıra No.lu VUK Genel Tebliği uyarınca e-Arşiv Fatura olarak düzenlenmiştir.</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">İmza ve kaşe gerektirmez, elektronik ortamda ibrazı geçerlidir.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function FileIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    );
}

export default InvoiceViewerDrawer;
