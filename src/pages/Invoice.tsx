import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateInvoiceNumber } from "@/utils/invoiceUtils";
import { generatePdf } from "@/utils/generatePdf";
import { sampleInvoiceData } from "@/data/sampleInvoice";

export default function Invoice() {
  const [invoiceNumber] = useState(generateInvoiceNumber());

  const handleDownloadPdf = async () => {
    const element = document.getElementById("invoice-content");
    if (element) {
      await generatePdf(element, invoiceNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 sm:p-8">
          <div id="invoice-content" className="space-y-6">
            {/* Header with Company Logo */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ش</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">شركة الفاتورة</h1>
              </div>
              <div className="text-left">
                <Label htmlFor="invoice-number" className="text-sm font-medium text-gray-600 mb-1 block">
                  رقم الفاتورة
                </Label>
                <Input
                  id="invoice-number"
                  value={invoiceNumber}
                  disabled
                  className="w-40 text-center bg-gray-100"
                />
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">بيانات العميل</h2>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">الاسم:</span> {sampleInvoiceData.customer.name}</p>
                  <p><span className="font-medium">البريد الإلكتروني:</span> {sampleInvoiceData.customer.email}</p>
                  <p><span className="font-medium">العنوان:</span> {sampleInvoiceData.customer.address}</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">تفاصيل الفاتورة</h2>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">التاريخ:</span> {sampleInvoiceData.date}</p>
                  <p><span className="font-medium">طريقة الدفع:</span> {sampleInvoiceData.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">تفاصيل الطلب</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-right py-2 px-4 font-medium text-gray-600">الوصف</th>
                      <th className="text-center py-2 px-4 font-medium text-gray-600">الكمية</th>
                      <th className="text-center py-2 px-4 font-medium text-gray-600">السعر</th>
                      <th className="text-left py-2 px-4 font-medium text-gray-600">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleInvoiceData.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">{item.description}</td>
                        <td className="text-center py-3 px-4">{item.quantity}</td>
                        <td className="text-center py-3 px-4">{item.price} ر.س</td>
                        <td className="text-left py-3 px-4">{item.total} ر.س</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Amount */}
            <div className="flex justify-end">
              <div className="w-full sm:w-1/2">
                <div className="flex justify-between items-center py-3 border-t-2">
                  <span className="text-lg font-bold">الإجمالي:</span>
                  <span className="text-2xl font-bold text-blue-600">{sampleInvoiceData.total} ر.س</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-8 flex justify-center">
            <Button onClick={handleDownloadPdf} className="flex items-center gap-2">
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
    </div>
  );
}