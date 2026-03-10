# CSS Kararları

## 1. Breakpoint Seçimi

- 640px ve 1024px breakpointlerini kullandım çünkü içerik bu genişliklerde yapısal olarak değişiyor: mobilde tek kolon, tablette “Hakkımda” bölümü yatay düzene geçiyor, masaüstünde ise proje kartları en az 3 sütun olarak gösteriliyor.
- Breakpointleri cihaz modeline göre değil, düzenin bozulmaya başladığı noktalara göre seçtim; böylece farklı cihazlarda da tutarlı bir deneyim korunuyor.

## 2. Layout Tercihleri

- Header ve navigasyon için Flexbox kullandım; çünkü tek eksende (logo solda, linkler sağda) hizalama ve mobilde dikey yığına geçiş Flexbox ile çok basit çözülebiliyor.
- Proje kartları için Grid kullandım; kart sayısı değişse bile `repeat(auto-fit, minmax(280px, 1fr))` ile satır/sütun yapısını grid daha iyi yönetiyor.
- Grid’de `auto-fit` tercih ettim; böylece boş sütun bırakmak yerine mevcut kartlar genişleyerek alanı dolduruyor.

## 3. Design Tokens

- Renk paletinde mavi tonlarını (primary/secondary) ve nötr gri tonlarını (metin ve border için) seçtim; bu, hem erişilebilir kontrastı koruyor hem de sade bir portföy tasarımı sunuyor.
- Spacing skalasını 4px tabanlı (0.25rem adımlı) belirledim; bileşenler arası boşlukları bu sabit ölçekten seçerek tasarımın tutarlı görünmesini sağladım.
- Fluid typography için `clamp()` değerlerini, minimumda okunabilirlik (en az 1rem civarı), ortada vw katkısı ve üst sınırda masaüstü için konforlu boyutlar sağlayacak şekilde ayarladım.

## 4. Responsive Stratejiler

- Mobile-first yaklaşımı uyguladım: önce mobil varsayılan stilleri yazıp daha büyük ekranlar için yalnızca `@media (min-width: 640px)` ve `@media (min-width: 1024px)` ile ek kurallar tanımladım.
- Breakpointlerde en çok `section` padding, `about-content` düzeni, proje kartı kolon sayısı ve form butonunun genişliği değişiyor; içerik aynı kalırken yerleşim uyum sağlıyor.
- Görseller için `max-width: 100%`, profil görseli için ayrıca `aspect-ratio: 1` ve `object-fit: cover` kullandım; böylece her ekranda taşmadan, orantılı şekilde görünüyorlar.

