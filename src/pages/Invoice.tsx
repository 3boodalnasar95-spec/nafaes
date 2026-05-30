import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateInvoiceNumber } from "@/utils/invoiceUtils";
import { generatePdf } from "@/utils/generatePdf";
import { sampleInvoiceData } from "@/data/sampleInvoice";
import Layout from "../components/Layout";

export default function Invoice() {
  const { id } = useParams<{ id: string }>();
  const [invoiceNumber] = useState(generateInvoiceNumber());

  const handleDownloadPdf = async () => {
    const element = document.getElementById("invoice-content");
    if (element) {
      await generatePdf(element, invoiceNumber);
    }
  };

  return (
    <Layout>
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">عرض الفاتورة</h1>
          <p className="text-[#6B6B6B]">نموذج فاتورة للعرض</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-6 sm:p-8 bg-white border border-[#E8E0D5] rounded-2xl">
            <div id="invoice-content" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E8E0D5] pb-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#D4AF37] flex items-center justify-center">
                    <span className="text-white font-bold text-xl">ن</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">NAFAES</h1>
                    <span className="text-xs text-[#6B6B6B] tracking-widest">ESSENCE OF ELEGANCE</span>
                  </div>
                </div>
                <div className="text-left">
                  <Label htmlFor="invoice-number" className="text-sm font-medium text-[#6B6B6B] mb-1 block">
                    رقم الفاتورة
                  </Label>
                  <Input
                    id="invoice-number"
                    value={invoiceNumber}
                    disabled
                    className="w-40 text-center bg-[#F5F0E8] border border-[#E8E0D5] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">بيانات العميل</h2>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-[#1A1A1A]">الاسم:</span> <span className="text-[#6B6B6B]">{sampleInvoiceData.customer.name}</span></p>
                    <p><span className="font-medium text-[#1A1A1A]">البريد الإلكتروني:</span> <span className="text-[#6B6B6B]">{sampleInvoiceData.customer.email}</span></p>
                    <p><span className="font-medium text-[#1A1A1A]">العنوان:</span> <span className="text-[#6B6B6B]">{sampleInvoiceData.customer.address}</span></p>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">تفاصيل الفاتورة</h2>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-[#1A1A1A]">التاريخ:</span> <span className="text-[#6B6B6B]">{sampleInvoiceData.date}</span></p>
                    <p><span className="font-medium text-[#1A1A1A]">طريقة الدفع:</span> <span className="text-[#6B6B6B]">{sampleInvoiceData.paymentMethod}</span></p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">تفاصيل الطلب</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-[#C9A96E]">
                        <th className="text-right py-2 px-4 font-medium text-[#1A1A1A]">الوصف</th>
                        <th className="text-center py-2 px-4 font-medium text-[#1A1A1A]">الكمية</th>
                        <th className="text-center py-2 px-4 font-medium text-[#1A1A1A]">السعر</th>
                        <th className="text-left py-2 px-4 font-medium text-[#1A1A1A]">الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleInvoiceData.items.map((item, index) => (
                        <tr key={index} className="border-b border-[#E8E0D5]">
                          <td className="py-3 px-4 text-[#1A1A1A]">{item.description}</td>
                          <td className="text-center py-3 px-4 text-[#6B6B6B]">{item.quantity}</td>
                          <td className="text-center py-3 px-4 text-[#6B6B6B]">{item.price} ر.س</td>
                          <td className="text-left py-3 px-4 text-[#C9A96E] font-medium">{item.total} ر.س</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="w-full sm:w-1/2">
                  <div className="flex justify-between items-center py-3 border-t-2 border-[#C9A96E]">
                    <span className="text-lg font-bold text-[#1A1A1A]">الإجمالي:</span>
                    <span className="text-2xl font-bold text-[#C9A96E]">{sampleInvoiceData.total} ر.س</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                onClick={handleDownloadPdf} 
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                تحميل PDF
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}