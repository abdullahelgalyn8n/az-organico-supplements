import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  Check,
} from 'lucide-react';
import { PRODUCTS, REVIEWS, Product } from '../data/catalog';
import { ProductVisual } from '../components/ProductVisual';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const isWishlisted = wishlistIds.includes(product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);
  const productReviews = REVIEWS.filter((r) => r.productId === product.id);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  return (
    <div className="pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="مسار الصفحة" className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
          <Link to="/" className="hover:text-[#136F63]">الرئيسية</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#136F63]">المتجر</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#136F63]">
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        {/* Main Contiguous Purchase Module */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Product Visual Showcase */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200/80 p-8 flex flex-col items-center justify-center relative">
            {product.discountPercent && (
              <span className="absolute top-4 right-4 bg-emerald-700 text-white text-xs font-extrabold px-3 py-1 rounded-md tabular-nums">
                خصم {product.discountPercent}%
              </span>
            )}
            <ProductVisual product={product} size="lg" />
            <div className="mt-4 text-xs font-semibold text-slate-500 tabular-nums">
              كود المنتج: {product.sku} · {product.countText}
            </div>
          </div>

          {/* Purchase Details */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#136F63]">
                {product.categoryLabel} · متوفر في المخزون
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                {product.subtitle}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800 tabular-nums">
                {product.rating} من 5 ({product.reviewCount} تقييم موثق)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-4 border-y border-slate-200">
              <span className="text-3xl font-extrabold text-[#136F63] tabular-nums">
                {product.price} ج.م
              </span>
              {product.originalPrice && (
                <span className="text-lg text-slate-400 line-through tabular-nums">
                  {product.originalPrice} ج.م
                </span>
              )}
              <span className="text-xs font-bold text-emerald-800 mr-auto tabular-nums">
                اكسب +{product.points * quantity} نقطة مكافآت عند الشراء
              </span>
            </div>

            {/* Description & Benefits */}
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {product.description}
              </p>
              <ul className="space-y-2 pt-2">
                {product.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dosage & Usage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <strong className="text-slate-900 block mb-1">المكونات الفعالة:</strong>
                <span className="text-slate-700">{product.ingredients.join(' + ')}</span>
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">طريقة الاستخدام المقترحة:</strong>
                <span className="text-slate-700">{product.usage}</span>
              </div>
            </div>

            {/* Quantity Stepper + Add to Cart CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center bg-slate-100 border border-slate-300 rounded-xl px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="تقليل الكمية"
                  className="p-2 text-slate-700 hover:text-slate-900"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-base font-extrabold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="زيادة الكمية"
                  className="p-2 text-slate-700 hover:text-slate-900"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#136F63] hover:bg-[#0F5B51] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>تمت الإضافة للسلة بنجاح</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>أضف للسلة ({product.price * quantity} ج.م)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label="إضافة للمفضلة"
                className={`p-3.5 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Trust Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#136F63] shrink-0" />
                <span>معتمد ISO & GMP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#136F63] shrink-0" />
                <span>توصيل سريع لباب المنزل</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-[#136F63] shrink-0" />
                <span>استرجاع خلال 14 يوم</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews for this Product */}
        {productReviews.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900">
              تقييمات العملاء لهذا المنتج
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{rev.author} ({rev.city})</span>
                    <span className="text-xs text-slate-500 tabular-nums">{rev.date}</span>
                  </div>
                  <p className="text-sm text-slate-700">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                منتجات مشابهة قد تعجبك
              </h2>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="text-xs sm:text-sm font-bold text-[#136F63] flex items-center gap-1"
              >
                <span>العودة للمتجر</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onAddToCart={(p) => onAddToCart(p, 1)}
                  onQuickView={onQuickView}
                  isWishlisted={wishlistIds.includes(rel.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
