import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, User, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    { icon: MapPin, title: 'العنوان', value: 'الرياض، حي العليا، المملكة العربية السعودية' },
    { icon: Phone, title: 'الهاتف', value: '+966 50 123 4567' },
    { icon: Mail, title: 'البريد الإلكتروني', value: 'info@techstore.com' },
    { icon: Clock, title: 'ساعات العمل', value: 'السبت - الخميس: 9 صباحاً - 10 مساءً' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">تواصل معنا</h1>
          <p className="text-slate-400">نحن هنا لمساعدتك - تواصل معنا في أي وقت</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                      <p className="text-slate-400 text-sm">{info.value}</p>
                    </div>
                  </div>
                );
              })}

              {/* Social */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">تواصل معنا عبر</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-slate-700/50 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-700/50 hover:bg-green-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-700/50 hover:bg-red-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">تم إرسال رسالتك!</h3>
                    <p className="text-slate-400">سنتواصل معك في أقرب وقت ممكن</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-6">أرسل لنا رسالة</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white font-medium mb-2 block">الاسم الكامل</label>
                          <div className="relative">
                            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full pr-12 pl-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                              placeholder="أدخل اسمك"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-white font-medium mb-2 block">البريد الإلكتروني</label>
                          <div className="relative">
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pr-12 pl-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                              placeholder="example@email.com"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">رقم الهاتف</label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pr-12 pl-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="+966 5X XXX XXXX"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">الموضوع</label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder=" موضوع رسالتك"
                        />
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">الرسالة</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                          placeholder="اكتب رسالتك هنا..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        <Send className="w-5 h-5" />
                        إرسال الرسالة
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596552044!2d46.6843642!3d24.7116988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489dee%3A0xf79638fbc3a0e7b0!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}