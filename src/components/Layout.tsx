import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { isSupabaseConfigured } from '@/lib/supabase';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col">
      <Header />
      <main className="pt-16 md:pt-20 flex-1">{children}</main>
      <Footer localMode={!isSupabaseConfigured} />
      <WhatsAppButton />
    </div>
  );
}