import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/96566377312"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      style={{ animationDuration: '3s' }}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline">واتساب الطلبات</span>
    </a>
  );
}