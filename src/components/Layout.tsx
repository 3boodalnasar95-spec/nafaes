import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}