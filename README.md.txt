# Veri Bilimi Maaşlarının Gizli Matematiği

## Proje Özeti
Bu proje, "Data Science Salaries 2024" veri setini kullanarak veri bilimi ekosistemindeki maaş trendlerini interaktif bir veri hikayesi (data storytelling) formatında sunmayı amaçlamaktadır. Analiz sonucunda maaşları belirleyen en güçlü faktörlerin kıdem ve coğrafi konum olduğu; çalışma şeklinin (uzaktan/ofis) belirgin bir farklılık yaratmadığı tespit edilmiştir.

**Canlı Site:** [Yayına alınca eklenecek]

## Veri Kaynağı
- **Kaynak:** [Kaggle - Data Science Salaries 2023 EDA & Prediction](https://www.kaggle.com/code/lusfernandotorres/data-science-salaries-2023-eda-prediction/input) (ai-jobs.net verisi)
- **Erişim Tarihi:** 12 Ekim 2026
- **Lisans:** CC0: Public Domain

## Kullanılan Teknolojiler
- **Veri Analizi:** Python, Pandas, Jupyter Notebook
- **Ön Yüz Geliştirme:** Next.js, React, Tailwind CSS
- **Veri Görselleştirme:** Recharts
- **Yayınlama:** Vercel

## Yerelde Çalıştırma Adımları
1. Bu depoyu klonlayın: `git clone https://github.com/hsnckrdg-ai/veri-hikayesi.git`
2. `site` klasörüne girin: `cd site`
3. Bağımlılıkları yükleyin: `npm install`
4. Geliştirici sunucusunu başlatın: `npm run dev`
5. Tarayıcıda `http://localhost:3000` adresine gidin.

## Yapay Zekâ Kullanım Beyanı
Geliştirme sürecinde yapay zeka modelinden (Claude/Gemini) Next.js ile kod yazımı, arayüz (UI) tasarımı için Tailwind düzenlemeleri ve metin taslağı oluşturma konularında destek alınmıştır. Veri temizleme adımları, veri setinden hangi bulguların çıkarılacağına dair analiz kararları ve hikaye metninin nedensellik barındırmayan son hali tamamen tarafımca hazırlanmıştır.