import React from 'react';
import { CertificationItem } from '../data/catalog';
import { Award, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

interface CertificateDocumentProps {
  certificate: CertificationItem;
  interactive?: boolean;
}

export const CertificateDocument: React.FC<CertificateDocumentProps> = ({
  certificate,
}) => {
  const isUkStyle = certificate.id === 'iso-22000';

  if (isUkStyle) {
    return (
      <div className="bg-white border-2 border-slate-300 rounded-xl p-5 shadow-xs relative overflow-hidden text-left" dir="ltr">
        {/* Decorative Left Side Strip matching Zeppy UK Certificate */}
        <div className="absolute top-0 bottom-0 left-0 w-9 bg-slate-100 border-r border-slate-300 flex flex-col items-center justify-between py-4 select-none">
          <div className="w-6 h-6 rounded-full bg-sky-700 text-white font-extrabold text-[10px] flex items-center justify-center">
            ZC
          </div>
          <span className="text-[9px] font-bold tracking-widest text-slate-400 [writing-mode:vertical-rl] rotate-180">
            CERTIFICATE · CERTIFICADO · ZERTIFIKAT
          </span>
          <ShieldCheck className="w-4 h-4 text-sky-700" />
        </div>

        <div className="pl-9 pr-1 space-y-2.5">
          <div className="border-b border-slate-200 pb-2">
            <div className="text-base font-extrabold tracking-tight text-slate-900 leading-tight">
              CERTIFICATE
            </div>
            <div className="text-xs font-bold text-slate-700">
              OF REGISTRATION
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-extrabold text-slate-900 leading-snug">
              {certificate.companyName}
            </div>
            <div className="text-[8.5px] font-semibold text-slate-600">
              {certificate.companyLocation}
            </div>
          </div>

          <p className="text-[8.5px] text-slate-600 leading-relaxed">
            has been assessed and Certified by Zeppy Certification Limited to the requirements of:
          </p>

          <div className="py-2 px-3 bg-sky-50/80 border border-sky-200 rounded-lg">
            <div className="text-sm font-black text-slate-900">
              {certificate.code}
            </div>
            <div className="text-[10px] font-bold text-sky-900">
              Food Safety Management System
            </div>
          </div>

          <div className="space-y-1 text-[8.5px] text-slate-700">
            <div className="font-bold text-slate-900">For following scope of activities:</div>
            <div className="font-semibold text-slate-800">
              TRADING, EXPORT & DISTRIBUTION OF FOOD PRODUCTS SUPPLEMENTS
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[8px] text-slate-700 tabular-nums">
            <div>
              <span className="text-slate-500 block">Certificate No:</span>
              <strong className="text-slate-900">{certificate.certificateNo}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Date of Issue:</span>
              <strong className="text-slate-900">{certificate.issueDate}</strong>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-sky-800 text-white text-[8px] font-bold">
                IAF
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-white text-[8px] font-bold">
                UK CERT
              </span>
            </div>
            <QrCode className="w-6 h-6 text-slate-700" />
          </div>
        </div>
      </div>
    );
  }

  // OSS Middle East Certificate Style (Wood/Gold Frame matching screenshot 2)
  return (
    <div className="bg-[#4A3222] p-2.5 rounded-xl shadow-xs" dir="ltr">
      <div className="bg-[#FAF6F0] border-2 border-[#C89D54] rounded-lg p-4 text-center space-y-2.5 relative">
        {/* OSS Logo Header */}
        <div className="inline-flex flex-col items-center bg-[#5A2D28] text-white px-3 py-1 rounded">
          <span className="text-xs font-black tracking-wider">OSS</span>
          <span className="text-[7px] uppercase tracking-widest text-amber-200">
            Middle East Certification
          </span>
        </div>

        <div className="text-base font-black tracking-wide text-slate-900">
          CERTIFICATE
        </div>

        <div className="text-[9px] font-extrabold text-[#5A2D28] uppercase">
          {certificate.id === 'gmp-cert'
            ? 'GOOD MANUFACTURING PRACTICE (GMP)'
            : 'QUALITY MANAGEMENT SYSTEM'}
        </div>

        <div className="space-y-0.5">
          <div className="text-[9px] font-black text-slate-900">
            {certificate.companyName}
          </div>
          <div className="text-[7.5px] font-semibold text-slate-600">
            {certificate.companyLocation}
          </div>
        </div>

        <div className="py-1.5 px-2 bg-white border border-amber-300/80 rounded">
          <div className="text-[8px] font-bold text-slate-600">SCOPE</div>
          <div className="text-[8px] font-extrabold text-slate-800 leading-tight">
            MANUFACTURING, TRADING, AND DISTRIBUTION OF FOOD PRODUCTS AND SUPPLEMENTS, AND EXPORTING THEM
          </div>
        </div>

        <div className="text-xs font-black text-[#136F63]">
          {certificate.code}
        </div>

        <div className="grid grid-cols-2 gap-2 text-[8px] text-slate-700 border-t border-b border-amber-200 py-1.5 tabular-nums">
          <div>
            <span className="text-slate-500 block">Certificate No:</span>
            <strong className="text-slate-900">{certificate.certificateNo}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Valid Until:</span>
            <strong className="text-slate-900">{certificate.expiryDate}</strong>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <Award className="w-5 h-5 text-amber-600" />
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-[7.5px] font-bold text-slate-700">
            Authorized By OSS Middle East
          </div>
          <QrCode className="w-6 h-6 text-slate-800" />
        </div>
      </div>
    </div>
  );
};
