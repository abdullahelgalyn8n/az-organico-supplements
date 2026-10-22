import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  X,
  ZoomIn,
} from 'lucide-react';
import { CERTIFICATIONS, CertificationItem } from '../data/catalog';
import { CertificateDocument } from '../components/CertificateDocument';

export const CertificationsPage: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(
    null
  );

  return (
    <div className="pb-16 space-y-14">
      {/* Hero Banner matching Screenshot 2 */}
      <section className="bg-gradient-to-b from-[#E6F4F1] to-slate-50 pt-12 pb-10 text-center border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#136F63] text-white flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            الشهادات المعتمدة
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
            نحن فخورون بحصولنا على أعلى معايير الجودة والاعتمادات الدولية في تصنيع وتداول المكملات الغذائية
          </p>
        </div>
      </section>

      {/* 3 Top Summary Cards (أيزو 22000 | أيزو 9001 | GMP) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-2xs space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#136F63] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-[#136F63]">أيزو 22000</h2>
            <p className="text-xs font-bold text-slate-600">سلامة الغذاء (ISO 22000:2018)</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-2xs space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#136F63] flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-[#136F63]">أيزو 9001</h2>
            <p className="text-xs font-bold text-slate-600">إدارة الجودة (ISO 9001:2015)</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-2xs space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#136F63] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-[#136F63]">GMP</h2>
            <p className="text-xs font-bold text-slate-600">ممارسات التصنيع الجيد</p>
          </div>
        </div>
      </section>

      {/* Main 3 Detailed Certificate Cards matching Screenshot 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">
            شهاداتنا المعتمدة
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            اضغط على أي شهادة لعرضها بحجم أكبر والاطلاع على تفاصيل الاعتماد
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert) => (
            <article
              key={cert.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Clickable Certificate Visual */}
              <button
                type="button"
                onClick={() => setSelectedCert(cert)}
                aria-label={`تكبير شهادة ${cert.title}`}
                className="p-4 bg-slate-50 border-b border-slate-200 relative group cursor-pointer text-left w-full"
              >
                <CertificateDocument certificate={cert} />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                    <ZoomIn className="w-4 h-4 text-[#136F63]" />
                    <span>تكبير الشهادة</span>
                  </span>
                </div>
              </button>

              {/* Arabic Certificate Metadata Footer */}
              <div className="p-5 text-right space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {cert.title}
                    </h3>
                    <Award className="w-5 h-5 text-[#136F63] shrink-0" />
                  </div>
                  <p className="text-xs font-bold text-[#136F63]">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {cert.scope}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span className="text-emerald-800">شهادة رسمية موثقة</span>
                  <span className="flex items-center gap-1 tabular-nums text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{cert.arabicDateBadge}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Trust CTA */}
      <section className="bg-[#E6F4F1] border-y border-emerald-200 py-14 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900">
            جودة موثوقة ومعتمدة
          </h2>
          <p className="text-sm text-slate-700">
            نحن نلتزم بأعلى معايير الجودة العالمية لضمان حصولك على أفضل المكملات والمنتجات الطبيعية الآمنة
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-block px-8 py-3 rounded-xl bg-[#136F63] hover:bg-[#0F5B51] text-white font-bold text-sm transition-colors"
            >
              تسوق الآن
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Certificate Inspection */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {selectedCert.title}
                </h3>
                <p className="text-xs font-bold text-[#136F63]">
                  {selectedCert.issuer}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="إغلاق نافذة الشهادة"
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-w-md mx-auto">
              <CertificateDocument certificate={selectedCert} />
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-right">
              <div className="text-xs font-extrabold text-slate-900">
                معايير التدقيق والاعتماد المشمولة في الشهادة:
              </div>
              <ul className="space-y-1.5">
                {selectedCert.standards.map((std, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
