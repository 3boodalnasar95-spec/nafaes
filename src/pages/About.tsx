import { Link } from 'react-router-dom';
import { Users, Target, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

export default function About() {
  const stats = [
    { value: '50,000+', label: 'عميل', icon: Users },
    { value: '10,000+', label: 'منتج', icon: Award },
    { value: '10+', label: 'سنوات خبرة', icon: Clock },
    { value: '99%', label: 'رضا العملاء', icon: Target },
  ];

  const team = [
    { name: 'أحمد محمد', role: 'المدير التنفيذي', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
    { name: 'سارة أحمد', role: 'مديرة التسويق', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { name: 'خالد العلي', role: 'مدير التقنية', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { name: 'نورة سعد', role: 'مديرة خدمة العملاء', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
  ];

  const values = [
    { title: 'الجودة', description: 'نقدم فقط أفضل المنتجات من العلامات التجارية الموثوقة' },
    { title: 'الشفافية', description: 'أسعار واضحة بدون رسوم خفية أو مفاجآت' },
    { title: 'الالتزام', description: 'نلتزم بمواعيد التسليم وخدمة ما بعد البيع' },
    { title: 'الابتكار', description: 'نسعى دائماً لطرح أحدث التقنيات والمنتجات' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">من نحن</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            TechStore - وجهتك الأولى للتقنيات والأجهزة الإلكترونية في المملكة العربية السعودية
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">قصتنا</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                بدأت رحلتنا في عام 2014 برؤية واضحة: أن نجعل التقنية الحديثة في متناول الجميع. بدأنا كمتجر صغير في الرياض، واليوم نفتخر بخدمة أكثر من 50,000 عميل سعيد عبر المملكة.
              </p>
              <p className="text-slate-400 mb-4 leading-relaxed">
                نؤمن بأن التقنية يجب أن تكون أداة تمكين، ولهذا نحرص على تقديم أفضل المنتجات بأسعار تنافسية، مع ضمان جودة لا يقبل المنافسة وخدمة عملاء استثنائية.
              </p>
              <p className="text-slate-400 leading-relaxed">
                فريقنا مكون من خبراء في التقنية يعملون على انتقاء أفضل المنتجات وضمان رضا عملائنا عن كل عملية شراء.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800"
                alt="فريق العمل"
                className="rounded-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl">
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="text-sm">سنوات خبرة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center">
                  <Icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">قيمنا</h2>
            <p className="text-slate-400">ما يدفعنا لتقديم الأفضل</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">فريقنا</h2>
            <p className="text-slate-400">نخبة من الخبراء في خدمتكم</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                  <p className="text-slate-400 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">هل لديك استفسار؟</h2>
            <p className="text-white/80 mb-8">فريقنا جاهز لمساعدتك في أي وقت</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              تواصل معنا
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}