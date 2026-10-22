import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { validateContactForm, ContactFormInput } from '../utils/storeLogic';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(form);
    if (!result.valid) {
      setErrors(result.errors);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="pb-16">
      {/* Green Header Banner matching Screenshot 5 */}
      <section className="bg-gradient-to-r from-[#2E9E49] to-[#1E7E38] text-white py-12 text-center shadow-xs">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold">تواصل معنا</h1>
          <p className="text-sm sm:text-base text-emerald-50 font-medium">
            نحن هنا لمساعدتك! تواصل معنا في أي وقت للاستفسارات الطبية أو متابعة الطلبات
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Column in RTL (4 cols): Contact Info + Follow Us + WhatsApp CTA */}
          <div className="lg:col-span-4 space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <h2 className="text-lg font-extrabold text-slate-900">
                معلومات التواصل
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#136F63] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">الهاتف</div>
                    <a
                      href="tel:01015399167"
                      className="text-sm font-semibold text-slate-600 hover:text-[#136F63] tabular-nums"
                      dir="ltr"
                    >
                      01015399167
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#136F63] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      البريد الإلكتروني
                    </div>
                    <a
                      href="mailto:info@organico.com"
                      className="text-sm font-semibold text-slate-600 hover:text-[#136F63]"
                    >
                      info@organico.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#136F63] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      ساعات العمل
                    </div>
                    <div className="text-sm font-semibold text-slate-600">
                      10 ص - 10 م يومياً
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#136F63] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      المقر والمصنع المعتمد
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      مركز قويسنا، المنوفية، مصر
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900">تابعنا</h2>
              <div className="flex items-center gap-3">
                {['Facebook', 'Instagram', 'TikTok', 'Snapchat'].map((net) => (
                  <a
                    key={net}
                    href={`https://${net.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-[#136F63] text-xs font-bold transition-colors"
                  >
                    {net}
                  </a>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Green Card matching Screenshot 5 */}
            <a
              href="https://wa.me/201015399167"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-2xl p-5 shadow-sm flex items-center justify-between transition-colors"
            >
              <div className="text-right">
                <div className="text-base font-extrabold">تواصل عبر واتساب</div>
                <div className="text-xs text-emerald-50 font-semibold">
                  رد سريع ومباشر من فريق خدمة العملاء
                </div>
              </div>
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
            </a>
          </div>

          {/* Left Column in RTL (8 cols): Send Message Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">
              أرسل رسالة
            </h2>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  تم إرسال رسالتك بنجاح! سيتواصل معك فريق خدمة عملاء أورجانيكو في أقرب وقت.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold text-slate-800 mb-1.5"
                  >
                    الاسم
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="اكتب اسمك"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#136F63] focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-xs font-bold text-rose-600 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-slate-800 mb-1.5"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@email.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#136F63] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-xs font-bold text-rose-600 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-bold text-slate-800 mb-1.5"
                >
                  رقم الهاتف
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="01xxxxxxxxx"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#136F63] focus:outline-none tabular-nums"
                />
                {errors.phone && (
                  <p className="text-xs font-bold text-rose-600 mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-bold text-slate-800 mb-1.5"
                >
                  الموضوع
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="موضوع الرسالة"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#136F63] focus:outline-none"
                />
                {errors.subject && (
                  <p className="text-xs font-bold text-rose-600 mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-slate-800 mb-1.5"
                >
                  الرسالة
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#136F63] focus:outline-none"
                />
                {errors.message && (
                  <p className="text-xs font-bold text-rose-600 mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-[#136F63] hover:bg-[#0F5B51] text-white font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
