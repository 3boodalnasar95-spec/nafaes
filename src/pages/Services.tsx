import { Link } from 'react-router-dom';
import { Settings, Wrench, Truck, Shield, Headphones, Package, RefreshCw, Download, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

export default function Services() {
  const services = [
    {
      icon: Truck,
      title: 'توصيل سريع',
      description: 'نوصل طلبك خلال 24-48 ساعة في جميع أنحاء المملكة مع إمكانية التتبع المباشر.',
      features: ['توصيل مجاني للطلبات فوق 500 ريال', 'تتبع الشحنة لحظياً', 'توصيل بنفس اليوم في الرياض'],
    },
    {
      icon: Shield,
      title: 'ضمان الجودة',
      description: 'ضمان سنة كاملة على جميع المنتجات مع إمكانية الاستبدال أو الاسترجاع.',
      features: ['ضمان سنة على جميع المنتجات', 'استبدال مجاني خلال 14 يوم', 'فحص المنتج عند الاستلام'],
    },
    {
      icon: Wrench,
      title: 'دعم فني',
      description: 'فريق دعم فني متخصص متاح على مدار الساعة لمساعدتك في أي مشكلة.',
      features: ['دعم على مدار الساعة', 'فريق متخصص', 'مساعدة في الإعداد والتشغيل'],
    },
    {
      icon: Settings,
      title: 'صيانة وإصلاح',
      description: 'نقدم خدمات الصيانة والإصلاح لجميع الأجهزة الإلكترونية بأسعار منافسة.',
      features: ['صيانة الهواتف والأجهزة', 'تغيير الشاشة والبطارية', 'فحص شامل مجاني'],
    },
    {
      icon: RefreshCw,
      title: 'استرجاع مجاني',
      description: 'إذا لم تكن راضياً عن المنتج، يمكنك إرجاعه واسترداد كامل المبلغ.',
      features: ['استرجاع خلال 14 يوم', 'استرداد كامل المبلغ', 'إرجاع مجاني'],
    },
    {
      icon: Download,
      title: 'تحديثات برمجية',
      description: 'نساعدك في تحديث برامج أجهزتك للحصول على أحدث الميزات.',
      features: ['تحديث أنظمة التشغيل', 'تثبيت البرامج', 'نسخ احتياطي للبيانات'],
    },
  ];

  const process = [
    { step: 1, title: 'اختر منتجك', description: 'تصفح منتجاتنا واختر ما يناسبك' },
    { step: 2, title: 'أضف للسلة', description: 'أضف المنتجات للسلة وتوجه للدفع' },
    { step: 3, title: 'اختر طريقة الدفع', description: 'ادفع بالطريقة التي تناسبك' },
    { step: 4, title: 'استلم طلبك', description: 'نوصل طلبك لباب بيتك' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">خدماتنا</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات لضمان أفضل تجربة تسوق ممكنة
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-400 text-sm">
                        <Package className="w-4 h-4 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">كيف نعمل؟</h2>
            <p className="text-slate-400">4 خطوات بسيطة تفصلك عن طلبك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {p.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm">{p.description}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -left-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">هل تحتاج مساعدة؟</h2>
            <p className="text-white/80 mb-8">فريق خدمة العملاء لدينا جاهز لمساعدتك</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors"
              >
                تواصل معنا
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+966501234567"
                className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors"
              >
                اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}