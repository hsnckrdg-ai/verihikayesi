// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, ReferenceDot, ReferenceArea, ZAxis, Cell
} from "recharts";

import maasVerisi from "./maas_verisi.json";

// WCAG AA Kontrastlı Sabit Renk Paleti (Okabe-Ito / ColorBrewer Uyumlu)
const FOCUS_COLOR = "#0072B2"; // Odak/Vurgu (Mavi)
const BASE_COLOR = "#6B7280";  // Nötr/Diğer (Koyu Gri)
const ANNOT_COLOR = "#991B1B"; // Uyarı/Not (Koyu Kırmızı)

const formatTR = (value: number) => value.toLocaleString('tr-TR');

// Unvanları eksenlere sığdırmak için kısaltma fonksiyonu
const formatKisaUnvan = (val: string) => {
  if (val === "Machine Learning Engineer") return "ML Eng.";
  if (val === "Data Scientist") return "Data Sci.";
  if (val === "Data Engineer") return "Data Eng.";
  return val;
};

export default function VeriHikayesi() {
  const [aktifGrafik, setAktifGrafik] = useState(0);

  const [kesifYil, setKesifYil] = useState("2024");
  const [kesifSeviye, setKesifSeviye] = useState("Senior");

  // Mobilde tetiklenmenin (scroll algılamanın) daha kolay olması için threshold %40'ta
  const { ref: ref0, inView: inView0 } = useInView({ threshold: 0.4 });
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.4 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.4 });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.4 });
  const { ref: ref4, inView: inView4 } = useInView({ threshold: 0.4 });
  const { ref: ref5, inView: inView5 } = useInView({ threshold: 0.4 });
  const { ref: ref6, inView: inView6 } = useInView({ threshold: 0.4 });
  const { ref: ref7, inView: inView7 } = useInView({ threshold: 0.4 });
  const { ref: ref8, inView: inView8 } = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (inView0) setAktifGrafik(0);
    if (inView1) setAktifGrafik(1);
    if (inView2) setAktifGrafik(2);
    if (inView3) setAktifGrafik(3);
    if (inView4) setAktifGrafik(4);
    if (inView5) setAktifGrafik(5);
    if (inView6) setAktifGrafik(6);
    if (inView7) setAktifGrafik(7);
    if (inView8) setAktifGrafik(8);
  }, [inView0, inView1, inView2, inView3, inView4, inView5, inView6, inView7, inView8]);

  const kesifSerisi = maasVerisi.bulgu1_makas
    .filter((d: any) => d.experience_level === kesifSeviye)
    .sort((a: any, b: any) => Number(a.work_year) - Number(b.work_year));

  const kesifSonucu = kesifSerisi.find((d: any) => d.work_year.toString() === kesifYil)?.salary_in_usd;

  const renderGrafik = () => {
    if (aktifGrafik === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 md:p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm mx-2 md:mx-10 my-4 md:my-10">
          <div className="text-5xl md:text-7xl mb-4 md:mb-6 opacity-90 text-indigo-200 animate-bounce">📊</div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">Veri Hikayesi Hazır</h2>
          <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-10 max-w-sm leading-relaxed hidden md:block">
            Veri bilimi maaşlarını belirleyen faktörleri adım adım incelemek için okumaya başlayın.
          </p>
          <div className="flex flex-col items-center justify-center text-indigo-600">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Metinleri Kaydırın</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      );
    } 
    
    // BULGU 1
    if (aktifGrafik === 1 || aktifGrafik === 2) {
      const islenmisMakasVerisi = maasVerisi.bulgu1_makas.reduce((acc: any[], curr: any) => {
        if (curr.experience_level !== "Senior" && curr.experience_level !== "Junior") return acc;
        let yilObjesi = acc.find((item: any) => item.work_year === curr.work_year);
        if (!yilObjesi) {
          yilObjesi = { work_year: curr.work_year };
          acc.push(yilObjesi);
        }
        yilObjesi[curr.experience_level] = curr.salary_in_usd;
        return acc;
      }, []).sort((a: any, b: any) => a.work_year - b.work_year);

      return (
        <div className="w-full h-full flex flex-col relative min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={islenmisMakasVerisi} margin={{ top: 20, right: 40, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* Padding ile son noktanın kesilmesi önlendi */}
              <XAxis dataKey="work_year" padding={{ left: 10, right: 10 }} label={{ value: "Yıl", position: "insideBottom", offset: -10 }} tick={{fontSize: 12}} />
              <YAxis tickFormatter={formatTR} domain={[0, 200000]} width={65} tick={{fontSize: 12}} />
              <Tooltip formatter={(value: number) => [formatTR(value), "Maaş (USD)"]} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontWeight: 'bold', fontSize: '12px' }}/>
              <Line type="linear" dataKey="Senior" stroke={FOCUS_COLOR} strokeWidth={3} dot={{ strokeWidth: 2 }} isAnimationActive={false} />
              <Line type="linear" dataKey="Junior" stroke={BASE_COLOR} strokeWidth={3} dot={{ strokeWidth: 2 }} isAnimationActive={false} />
              
              {aktifGrafik === 2 && (
                <ReferenceArea x1={2022} x2={2024} fill="#FCA5A5" fillOpacity={0.3} />
              )}
              {aktifGrafik === 2 && (
                <ReferenceLine x={2024} stroke={ANNOT_COLOR} strokeDasharray="3 3" label={{ position: 'top', value: 'Makas Daralıyor', fill: ANNOT_COLOR, fontSize: 12, dy: -10, fontWeight: 'bold' }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    } 
    
    // BULGU 2
    if (aktifGrafik === 3 || aktifGrafik === 4) {
      const islenmisCografyaVerisi = maasVerisi.bulgu2_cografya.reduce((acc: any[], curr: any) => {
        let yilObjesi = acc.find((item: any) => item.work_year === curr.work_year);
        if (!yilObjesi) {
          yilObjesi = { work_year: curr.work_year };
          acc.push(yilObjesi);
        }
        yilObjesi[curr.is_us] = curr.salary_in_usd;
        return acc;
      }, []).sort((a: any, b: any) => a.work_year - b.work_year);

      return (
        <div className="w-full h-full flex flex-col min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={islenmisCografyaVerisi} margin={{ top: 30, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="work_year" label={{ value: "Yıl", position: "insideBottom", offset: -10 }} tick={{fontSize: 12}} />
              <YAxis tickFormatter={formatTR} domain={[0, 200000]} width={65} tick={{fontSize: 12}} />
              <Tooltip formatter={(value: number) => [formatTR(value), "Maaş (USD)"]} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }}/>
              <Bar dataKey="ABD" fill={aktifGrafik === 4 ? FOCUS_COLOR : BASE_COLOR} name="ABD" />
              <Bar dataKey="Diğer Ülkeler" fill={BASE_COLOR} fillOpacity={0.5} name="Diğer Ülkeler" />
              
              {aktifGrafik === 4 && (
                 <ReferenceLine y={160000} stroke={FOCUS_COLOR} strokeDasharray="3 3" label={{ position: 'top', value: '~160.000$', fill: FOCUS_COLOR, dy: -10, fontSize: 12, fontWeight: 'bold' }} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // BULGU 3
    if (aktifGrafik === 5 || aktifGrafik === 6) {
      return (
        <div className="w-full h-full flex flex-col min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 30, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* tickFormatter ile uzun metinler kısaltıldı, X ekseni padding eklendi */}
              <XAxis type="category" dataKey="job_title" name="Unvan" tickFormatter={formatKisaUnvan} padding={{ left: 20, right: 20 }} label={{ value: "Roller", position: "insideBottom", offset: -15 }} tick={{fontSize: 11}} />
              <YAxis type="number" dataKey="salary_in_usd" name="Maaş" tickFormatter={formatTR} domain={[80000, 200000]} width={65} tick={{fontSize: 12}} />
              <ZAxis range={[100, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: number) => formatTR(value)} />
              
              <Scatter name="Maaşlar" data={maasVerisi.bulgu3_unvan}>
                {maasVerisi.bulgu3_unvan.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={aktifGrafik === 6 && entry.job_title === "Machine Learning Engineer" ? FOCUS_COLOR : BASE_COLOR} />
                ))}
              </Scatter>
              
              {aktifGrafik === 6 && (
                <ReferenceLine x="Machine Learning Engineer" stroke={FOCUS_COLOR} strokeDasharray="3 3" label={{ position: 'top', value: 'Zirve', fill: FOCUS_COLOR, dy: -10, fontSize: 12, fontWeight: 'bold' }} />
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // BULGU 4
    if (aktifGrafik === 7 || aktifGrafik === 8) {
      return (
        <div className="w-full h-full flex flex-col min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={maasVerisi.bulgu4_calisma_sekli} margin={{ top: 30, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="calisma_sekli" label={{ value: "Model", position: "insideBottom", offset: -10 }} tick={{fontSize: 12}} />
              <YAxis tickFormatter={formatTR} domain={[0, 200000]} width={65} tick={{fontSize: 12}} />
              <Tooltip formatter={(value: number) => [formatTR(value), "Maaş (USD)"]} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }}/>
              <Bar dataKey="salary_in_usd" name="Medyan Maaş (USD)">
                {
                  maasVerisi.bulgu4_calisma_sekli.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={aktifGrafik === 8 && entry.calisma_sekli === 'Ofis' ? FOCUS_COLOR : BASE_COLOR} />
                  ))
                }
              </Bar>
              
              {aktifGrafik === 8 && (
                 <ReferenceLine y={159000} stroke={FOCUS_COLOR} strokeDasharray="3 3" label={{ position: 'top', value: 'Eşit (~159k$)', fill: FOCUS_COLOR, dy: -10, fontSize: 12, fontWeight: 'bold' }} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
  };

  const gosterDipnot = aktifGrafik === 1 || aktifGrafik === 2 || aktifGrafik === 3 || aktifGrafik === 4;

  return (
    <div className="flex flex-col w-full bg-slate-50 text-slate-900 font-sans">
      
      <div className="flex flex-col-reverse md:flex-row w-full relative">
        
        {/* SOL SÜTUN: METİNLER (Mobilde aşağıda akar, MD'de solda) */}
        <div className="w-full md:w-1/2 p-6 md:p-20 z-10">
          
          <section ref={ref0} className="min-h-[70vh] md:min-h-screen flex flex-col justify-center py-10 md:py-0">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Veri biliminde maaşı kıdem ve şirketin yeri ayırıyor, çalışma şekli ayırmıyor
            </h1>
            <div className="text-base md:text-lg font-medium text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1">
              <p className="font-semibold text-slate-800">Yazar: Hasan Can Karadağ</p>
              <p className="text-xs md:text-sm text-slate-500">Büyük Veri Analistliği | Ekim 2026</p>
            </div>
          </section>

          <section ref={ref1} className="min-h-[60vh] md:min-h-screen flex flex-col justify-center max-w-xl py-10 md:py-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">Bulgu 1: Başlangıç ile Kıdemli arasındaki maaş farkı 2022'deki zirveden sonra daralıyor</h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              2022'de Kıdemli çalışanların medyan maaşı Başlangıç seviyesindekilerin yaklaşık 2,4 katıydı; bu zirveden sonra 2024'te oran yaklaşık 1,8 kata indi. 
              <br/><br/>
              <span className="text-sm italic text-slate-500">(Medyan: Maaşlar küçükten büyüğe sıralandığında tam ortada kalan değerdir).</span>
            </p>
          </section>

          <section ref={ref2} className="min-h-[60vh] md:min-h-screen flex flex-col justify-center max-w-xl py-10 md:py-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700 leading-snug">Dolar farkı 85 binden 66 bine indi</h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              Kıdemli ve Başlangıç seviyeleri arasındaki net maaş farkı, oransal daralmaya paralel olarak miktar bazında da düşüş gösterdi.
            </p>
          </section>

          <section ref={ref3} className="min-h-[60vh] md:min-h-screen flex flex-col justify-center max-w-xl py-10 md:py-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">Bulgu 2: Aynı kıdemde ABD merkezli şirketler daha yüksek medyan maaş ödüyor</h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              Senior seviyede ABD merkezli şirketlerin medyan maaşı her yıl diğer ülkelerdeki şirketlerin üzerinde. 2024'te yaklaşık 160.000 dolara karşı yaklaşık 105.000 dolar.
            </p>
          </section>

          <section ref={ref4} className="min-h-[60vh] md:min-h-screen flex flex-col justify-center max-w-xl py-10 md:py-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700 leading-snug">Karşılaştırma satın alma gücüne (PPP) göre düzeltilmemiştir</h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              Bu farklar brüt dolar değerleridir. Yaşam maliyetleri hesaba katıldığında reel alım gücü farkı grafikte görünenden daha az olabilir.
            </p>
          </section>

          <section ref={ref5} className="min-h-[60vh] md:min-h-screen flex flex-col justify-center max-w-xl py-10 md:py-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">Bulgu 3: Orta seviyede en yüksek medyan maaş Machine Learning Engineer'larda</h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              Aynı deneyim seviyesinde (Mid-level) Machine Learning Engineer'ların medyan maaşı yaklaşık 140.000 dolar. Data Scientist'lerde yaklaşık 115.000, Data Engineer'larda yaklaşık 110.000 dolar.
            </p>
          </section>

          <section ref={ref6} className="min-h-[60vh] md:min-h-screen flex flex-col justify-center max-w-xl py-10 md:py-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700 leading-snug">Bu bir ilişkidir; unvanın maaşı belirlediği anlamına gelmez</h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              Unvanlar arasındaki fark, görev tanımı, şirket ve sektör gibi bu veride bulunmayan etkenlerden de kaynaklanıyor olabilir.
            </p>
          </section>

          <section ref={ref7} className="min-h-[60vh] md:min-h-screen flex flex-col justify-center max-w-xl py-10 md:py-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">Bulgu 4: ABD'de Senior çalışanlarda uzaktan ve ofiste maaşlar neredeyse aynı</h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              ABD'deki Senior çalışanlarda uzaktan ve ofiste çalışanların medyan maaşları birbirine çok yakın: yaklaşık 157.000 ve 159.000 dolar.
            </p>
          </section>

          <section ref={ref8} className="min-h-[60vh] md:min-h-screen flex flex-col justify-center max-w-xl py-10 md:py-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700 leading-snug">Çalışma şekli ile maaş arasında güçlü bir bağlantı görünmüyor</h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              Ofiste ve uzaktan çalışanların medyan maaşları arasında belirgin bir fark görünmüyor. <br/><br/>
              <span className="text-sm italic text-slate-500">*Dipnot: Hibrit çalışanlar kayıt sayısı az olduğu için analize dahil edilmemiştir.</span>
            </p>
          </section>

          <div className="h-20 md:h-64"></div>

        </div>

        {/* SAĞ SÜTUN: SABİT GRAFİK (Mobilde yüksekliği 40vh'ye çekildi) */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-screen sticky top-0 flex flex-col items-center justify-center bg-white border-b md:border-b-0 md:border-l border-slate-200 shadow-xl z-20">
          <div className="w-full h-full p-2 md:p-8 flex flex-col justify-center">
            {renderGrafik()}
            {/* Dipnot mobilde flex-col (alt alta), masaüstünde flex-row (yan yana) ve font 11px yapıldı */}
            <div className="w-full pr-2 md:pr-4 flex flex-col md:flex-row justify-end md:justify-between items-end md:items-center text-[11px] md:text-xs text-slate-400 mt-2 md:mt-4 gap-1 md:gap-0">
              {gosterDipnot ? (
                <span className="italic text-right md:text-left">* 2020-2021 için kayıt sayısı düşük olduğundan güvenilirlik sınırlıdır.</span>
              ) : (
                <span className="hidden md:inline"></span>
              )}
              <span className="font-semibold min-w-max">Kaynak: Kaggle 2024</span>
            </div>
          </div>
        </div>
        
      </div>

      {/* OKUYUCU KEŞFİ */}
      <div className="w-full bg-slate-900 text-slate-100 py-16 md:py-20 px-6 md:px-8 flex flex-col items-center border-t-4 border-indigo-500">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Kendi Keşfinizi Yapın</h2>
        <p className="text-slate-400 mb-8 md:mb-10 text-center max-w-2xl text-base md:text-lg leading-relaxed">
          Deneyim Makası verilerinden yola çıkarak kendi senaryonuzu test edin. Seçtiğiniz seviyenin yıllara göre medyan maaş trendini grafikte görebilirsiniz.
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 md:mb-12 w-full max-w-md md:max-w-none">
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-xs md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Deneyim Seviyesi</label>
            <select 
              value={kesifSeviye} 
              onChange={(e) => setKesifSeviye(e.target.value)}
              className="bg-slate-800 text-white border border-slate-600 rounded-lg p-3 outline-none focus:border-indigo-400 text-sm md:text-base w-full"
            >
              <option value="Junior">Junior (Başlangıç)</option>
              <option value="Senior">Senior (Kıdemli)</option>
            </select>
          </div>
          
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-xs md:text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Yıl Seçin</label>
            <select 
              value={kesifYil} 
              onChange={(e) => setKesifYil(e.target.value)}
              className="bg-slate-800 text-white border border-slate-600 rounded-lg p-3 outline-none focus:border-indigo-400 text-sm md:text-base w-full"
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        <div className="w-full max-w-3xl h-56 md:h-64 bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-700 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={kesifSerisi} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="work_year" stroke="#94a3b8" tick={{fontSize: 12}} />
              <YAxis tickFormatter={formatTR} stroke="#94a3b8" width={60} tick={{fontSize: 12}} />
              <Tooltip 
                formatter={(value: number) => [formatTR(value), "Maaş (USD)"]} 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
              />
              <Line type="linear" dataKey="salary_in_usd" stroke={FOCUS_COLOR} strokeWidth={3} dot={false} />
              <ReferenceDot x={Number(kesifYil)} y={kesifSonucu} r={6} fill={ANNOT_COLOR} stroke="white" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center bg-slate-800 px-6 py-4 rounded-xl border border-slate-700 max-w-2xl w-full">
          <span className="text-base md:text-xl text-slate-300 leading-relaxed">
            <strong className="text-white">{kesifYil}</strong> yılında <strong className="text-white">{kesifSeviye}</strong> çalışanın medyan maaşı <strong className="text-indigo-400">${kesifSonucu ? formatTR(kesifSonucu) : "Veri Yok"}</strong>.
          </span>
        </div>
      </div>

      {/* SONUÇ, YÖNTEM VE YAZAR BÖLÜMÜ */}
      <div className="w-full bg-white text-slate-800 py-12 md:py-16 px-6 md:px-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          <section>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 border-b-2 border-indigo-500 inline-block pb-1">Sonuç</h3>
            <p className="text-base md:text-lg leading-relaxed text-slate-800 mb-4 md:mb-6">
              Bu veri setinde Kıdemli çalışanların medyan maaşı Başlangıç seviyesindekilerin belirgin biçimde üzerinde ve aradaki fark oran olarak daralıyor. Aynı kıdemde ABD merkezli şirketlerin medyan maaşı diğer ülkelerin üzerinde. ABD'deki Senior çalışanlarda uzaktan ve ofiste çalışanların maaşları neredeyse aynı. Orta seviyede Machine Learning Engineer'ların medyanı en yüksek, ancak bu veri bunun nedenini göstermiyor.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-slate-800 mb-4 md:mb-6">
              <strong className="text-slate-900">Sınırlılıklar:</strong> Veri gönüllü bildirimlere dayanıyor, örneklem rastgele değil. Maaşlar brüt ve satın alma gücüne göre düzeltilmemiş. Kayıtların çoğu ABD merkezli şirketlerden geliyor, 2020-2021 yıllarında ise kayıt çok az.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-slate-800 font-semibold italic">
              Açık soru: Beceri, şirket büyüklüğü ve sektör bu farklarda ne kadar rol oynuyor?
            </p>
          </section>

          <section>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 border-b-2 border-indigo-500 inline-block pb-1">Yöntem</h3>
            <p className="text-base md:text-lg leading-relaxed text-slate-800 mb-4 md:mb-6">
              <strong className="text-slate-900">Veri:</strong> Kaggle, "Data Science Salaries 2024" (<a href="https://www.kaggle.com/code/lusfernandotorres/data-science-salaries-2023-eda-prediction/input" target="_blank" className="text-indigo-600 hover:text-indigo-800 underline">Kaggle Bağlantısı</a>). Erişim tarihi: 12 Ekim 2026. Lisans: CC0: Public Domain. Orijinal veri kaynağı: ai-jobs.net.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-slate-800 mb-4 md:mb-6">
              <strong className="text-slate-900">Temizleme:</strong> Ham veride 14.838 satır vardı. Tamamen tekrar eden 5.748 satır silindi (9.090 satır kaldı). Maaşta IQR yöntemiyle belirlenen 166 aşırı uç değer çıkarıldı; analizde 8.924 satır kullanıldı. Maaşlar sağa çarpık olduğu için ortalama yerine medyan kullanıldı. Hibrit çalışanlar kayıt sayısı az olduğu için Bulgu 4'e dahil edilmedi. 2020 (n = 72) ve 2021 (n = 213) yıllarındaki sonuçlar sınırlı güvenilirliktedir.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-slate-800 mb-4 md:mb-6">
              <strong className="text-slate-900">Araçlar:</strong> Python (pandas, Jupyter) ile analiz; Next.js, React ve Recharts ile site. Notebook ve kod: <a href="https://github.com/hsnckrdg-ai/verihikayesi" target="_blank" className="text-indigo-600 hover:text-indigo-800 underline">GitHub Bağlantısı</a>.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-slate-800">
              <strong className="text-slate-900">Yapay Zekâ Beyanı:</strong> Geliştirme sürecinde yapay zeka modelinden (Claude/Gemini) kod yazımı, hata ayıklama ve metin taslağı oluşturma desteği aldım. Veri temizleme adımları, analiz kararları ve hikaye metninin son hali tamamen tarafımca hazırlanmıştır.
            </p>
          </section>

          <section className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">Yazar</h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-lg md:text-xl text-slate-900 font-semibold">Hasan Can Karadağ</p>
                <p className="text-sm md:text-base text-slate-700 mt-1">Büyük Veri Analistliği Öğrencisi | Veri Bilimi & Front-End Meraklısı</p>
                <p className="text-sm md:text-base text-slate-600 mt-3 max-w-xl leading-relaxed">
                  Verileri temizlemeyi, analiz etmeyi ve React/Next.js araçlarıyla hikayeleştirip görselleştirmeyi seviyorum. Hem teknik altyapı hem de etkileşimli kullanıcı deneyimi (UI/UX) üzerine odaklanıyorum.
                </p>
              </div>
              <div className="flex flex-col space-y-3 min-w-[160px]">
                <a href="https://hsnckrdg.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center text-sm md:text-base">
                  <span className="mr-2">🔗</span> Portfolyo
                </a>
                <a href="https://www.linkedin.com/in/hasancankaradag" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center text-sm md:text-base">
                  <span className="mr-2">💼</span> LinkedIn
                </a>
                <a href="https://github.com/hsnckrdg-ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center text-sm md:text-base">
                  <span className="mr-2">💻</span> GitHub
                </a>
                <a href="mailto:hsnckrdg@gmail.com" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center text-sm md:text-base">
                  <span className="mr-2">📧</span> E-posta
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}