import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Leaf,
  Truck,
  Clock,
  Heart,
  Award,
  TrendingUp,
  Star,
  Quote,
  Sparkles,
  Send,
  CheckCircle2,
  FlaskConical,
  Pill,
  Droplets,
  Sprout,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, REVIEWS, Product } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { ProductVisual } from '../components/ProductVisual';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
}) => {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
  const recommendedProducts = PRODUCTS.filter((p) => p.isRecommended).slice(0, 8);
  const specialOffers = PRODUCTS.filter((p) => p.isSpecialOffer || p.discountPercent).slice(0, 6);
  const featuredReviews = REVIEWS.filter((r) => r.isFeatured).slice(0, 3);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim().includes('@')) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    }
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'supplements':
        return <FlaskConical className="w-8 h-8 text-[#136F63]" />;
      case 'vitamins':
        return <Pill className="w-8 h-8 text-blue-700" />;
      case 'seeds':
        return <Sprout className="w-8 h-8 text-amber-700" />;
      case 'oils':
        return <Droplets className="w-8 h-8 text-emerald-700" />;
      case 'honey':
      default:
        return <Sparkles className="w-8 h-8 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with High-Contrast Light Mode Typography (Fixing original washed-out screenshot issue) */}
      <section className="relative bg-gradient-to-bl from-[#ECFDF5] via-[#F8FAFC] to-[#E6F4F1] border-b border-emerald-900/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Right Column (RTL): Clear High-Contrast Content */}
            <div className="lg:col-span-7 text-right space-y-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F5B51]">
                <ShieldCheck className="w-4 h-4 text-[#136F63] shrink-0" />
                <span>مختبرة معملياً</span>
                <span aria-hidden="true">·</span>
                <span>معتمدة بشهادات ISO 22000 & GMP</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-slate-900 leading-[1.2] tracking-tight">
                مكملات عشبية طبيعية لحياة صحية أنقى
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl">
                مكملات عشبية مستخلصة من أجود الأعشاب الطبيعية، مُصنعة بأحدث التقنيات الدوائية وخاضعة لأعلى معايير الجودة والرقابة المعملية لضمان سلامتك وصحة عائلتك.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="px-7 py-3.5 rounded-xl bg-[#136F63] hover:bg-[#0F5B51] text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <span>تسوق الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>

                <Link
                  to="/certifications"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0"
                >
                  تعرف على شهاداتنا
                </Link>
              </div>

              {/* Quantitative Proof Strip */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#136F63] tabular-nums">20+</div>
                  <div className="text-xs font-semibold text-slate-600">منتج طبيعي معتمد</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#136F63] tabular-nums">4.8/5</div>
                  <div className="text-xs font-semibold text-slate-600">متوسط تقييم العملاء</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#136F63] tabular-nums">100%</div>
                  <div className="text-xs font-semibold text-slate-600">نقاء بدون كيماويات</div>
                </div>
              </div>
            </div>

            {/* Left Column (RTL): Hero Product Showcase Trio */}
            <div className="lg:col-span-5">
              <div className="bg-white/90 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-800">
                    الأكثر طلباً هذا الشهر
                  </span>
                  <span className="text-xs font-bold text-slate-600 tabular-nums">
                    تركيز 100% قياسي
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 items-end justify-items-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div
                    onClick={() => navigate('/product/d3-k2-10000')}
                    className="cursor-pointer transition-transform hover:-translate-y-1.5"
                  >
                    <ProductVisual product={PRODUCTS[2]} size="md" />
                  </div>
                  <div
                    onClick={() => navigate('/product/ashwagandha-600')}
                    className="cursor-pointer transition-transform hover:-translate-y-1.5 scale-105 z-10"
                  >
                    <ProductVisual product={PRODUCTS[0]} size="md" />
                  </div>
                  <div
                    onClick={() => navigate('/product/curcumin-1500')}
                    className="cursor-pointer transition-transform hover:-translate-y-1.5"
                  >
                    <ProductVisual product={PRODUCTS[1]} size="md" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-700 font-semibold">
                  <span>اشواجندا · فيتامين د3+ك2 · كركمين</span>
                  <Link to="/shop" className="text-[#136F63] font-bold hover:underline">
                    عرض المجموعة ←
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Circular Category Icons Strip matching Screenshot 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              تصفح حسب الفئة
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              اختر القسم المناسب لاحتياجاتك الصحية اليومية
            </p>
          </div>
          <Link
            to="/categories"
            className="text-xs sm:text-sm font-bold text-[#136F63] hover:text-[#0F5B51] flex items-center gap-1"
          >
            <span>عرض كل الفئات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-[#136F63] p-6 text-center transition-all hover:shadow-md flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-50/80 border-2 border-emerald-600/20 group-hover:border-[#136F63] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                {getCategoryIcon(cat.id)}
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#136F63] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                {cat.subtitle}
              </p>
              <span className="mt-2 text-xs font-bold text-emerald-800 tabular-nums">
                {cat.count} منتجات
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Grid (الأكثر مبيعاً) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-[#136F63]" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              الأكثر مبيعاً
            </h2>
          </div>
          <Link
            to="/shop?sort=best-selling"
            className="text-xs sm:text-sm font-bold text-[#136F63] hover:text-[#0F5B51] flex items-center gap-1"
          >
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Organico (لماذا تختار أورجانيكو؟ - 6 Cards with Sharp Contrast) */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#136F63]">
              اكتشف الفرق
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              لماذا تختار أورجانيكو؟
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              نحرص على تقديم أفضل المكملات الغذائية والمنتجات الطبيعية لصحتك وصحة عائلتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#136F63] flex items-center justify-center mx-auto">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                مكونات طبيعية 100%
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                جميع منتجاتنا مصنوعة من مكونات طبيعية نقية ومستدامة بدون إضافات كيميائية ضارة.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#136F63] flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                آمنة لجميع الأعمار
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                منتجاتنا مختبرة معملياً وآمنة للاستخدام لجميع أفراد العائلة بتركيزات دقيقة وموزونة.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#136F63] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                جودة معتمدة دولياً
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                حاصلون على شهادات GMP و ISO 22000 و ISO 9001 لضمان أعلى معايير الجودة والسلامة.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#136F63] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                ضمان الرضا التام
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                نضمن لك الرضا التام عن منتجاتنا مع إمكانية الاسترجاع السهل خلال 14 يوماً.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#136F63] flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                شحن سريع لجميع المحافظات
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                توصيل سريع ومبرد لجميع المحافظات مع شحن مجاني للطلبات فوق 500 جنيه.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#136F63] flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                دعم طبي على مدار الساعة
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                فريق خدمة العملاء والصيادلة متاح دائماً للإجابة على استفساراتكم ومساعدتكم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say (ماذا يقول عملاؤنا) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="w-11 h-11 rounded-full bg-emerald-100 text-[#136F63] flex items-center justify-center mx-auto">
            <Quote className="w-5 h-5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-sm text-slate-600">
            آراء حقيقية من عملاء حقيقيين جربوا منتجاتنا في مختلف محافظات مصر
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map((rev) => {
            const linkedProduct = PRODUCTS.find((p) => p.id === rev.productId) || PRODUCTS[0];
            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 tabular-nums">{rev.date}</span>
                  </div>

                  <p className="text-sm text-slate-800 font-medium leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#136F63] font-extrabold text-sm flex items-center justify-center shrink-0">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        <span>{rev.author}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="text-xs text-slate-600">{rev.city}</div>
                    </div>
                  </div>

                  <Link
                    to={`/product/${linkedProduct.id}`}
                    className="flex items-center gap-1.5 bg-slate-50 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#136F63] transition-colors"
                  >
                    <span>{rev.productName}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm font-bold text-slate-800 transition-colors"
          >
            <span>عرض جميع الآراء (12 تقييم)</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Recommended For You (مقترح لك) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              مقترح لك
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              تركيبات متكاملة مختارة لدعم نشاطك اليومي
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-[#136F63] hover:text-[#0F5B51] flex items-center gap-1"
          >
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedProducts.slice(4, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Special Offers (أفضل العروض) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-emerald-900 text-white px-6 py-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-300" />
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold">
                أفضل العروض والخصومات الحصرية
              </h2>
              <p className="text-xs text-emerald-200">
                وفر حتى 20% على باقات المكملات الغذائية المختارة
              </p>
            </div>
          </div>

          <Link
            to="/shop?discounted=1"
            className="px-4 py-2 rounded-lg bg-white text-emerald-950 text-xs sm:text-sm font-extrabold hover:bg-emerald-50 transition-colors"
          >
            تسوق كل العروض
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialOffers.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Join Organico Family Banner (انضم لعائلة أورجانيكو) */}
      <section className="bg-gradient-to-r from-[#136F63] to-[#0B3B35] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            انضم لعائلة أورجانيكو
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
            اشترك في نشرتنا البريدية واحصل على كود خصم 10% فوري على طلبك الأول بالإضافة إلى أحدث النصائح الصحية والعروض الحصرية.
          </p>

          {newsletterSubmitted ? (
            <div className="inline-flex items-center gap-2 bg-emerald-800/90 border border-emerald-400 px-6 py-3 rounded-xl text-sm font-bold text-white">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>تم اشتراكك بنجاح! استخدم الكود ORGANICO10 عند الدفع.</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني..."
                aria-label="أدخل بريدك الإلكتروني"
                className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white placeholder:text-emerald-100 text-sm focus:bg-white/20 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-[#0B3B35] font-extrabold text-sm hover:bg-emerald-50 flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>اشترك الآن</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
