import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Quote,
  Star,
  Sparkles,
  CheckCircle2,
  ThumbsUp,
  MessageSquarePlus,
  MapPin,
} from 'lucide-react';
import { REVIEWS, PRODUCTS, ReviewItem } from '../data/catalog';
import { calculateReviewStats } from '../utils/storeLogic';
import { ProductVisual } from '../components/ProductVisual';

export const TestimonialsPage: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('القاهرة');
  const [newProductId, setNewProductId] = useState(PRODUCTS[0].id);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const stats = calculateReviewStats(reviewsList);
  const featuredReviews = reviewsList.filter((r) => r.isFeatured);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAuthor.trim().length < 2 || newComment.trim().length < 5) return;
    const selectedProd =
      PRODUCTS.find((p) => p.id === newProductId) || PRODUCTS[0];

    const created: ReviewItem = {
      id: `rev-custom-${Date.now()}`,
      author: newAuthor.trim(),
      city: newCity,
      rating: newRating,
      date: '٢٠٢٦/١٠/٢٢',
      comment: newComment.trim(),
      productId: selectedProd.id,
      productName: selectedProd.name,
      isFeatured: false,
      verified: true,
    };

    setReviewsList([created, ...reviewsList]);
    setReviewSubmitted(true);
    setNewAuthor('');
    setNewComment('');
    setTimeout(() => {
      setShowAddReview(false);
      setReviewSubmitted(false);
    }, 1500);
  };

  return (
    <div className="pb-16 space-y-14">
      {/* Header Section matching Screenshot 4 */}
      <section className="bg-gradient-to-b from-[#E6F4F1] to-slate-50 pt-12 pb-8 text-center border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#136F63]/15 text-[#136F63] flex items-center justify-center mx-auto">
            <Quote className="w-8 h-8" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            آراء عملائنا
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            اكتشف ما يقوله عملاؤنا عن منتجاتنا وخدماتنا. آراؤكم تهمنا!
          </p>

          {/* Summary Stat Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs sm:text-sm font-bold text-slate-800">
            <span className="inline-flex items-center gap-1.5">
              <MessageSquarePlus className="w-4 h-4 text-[#136F63]" />
              <span className="tabular-nums">{stats.totalCount} تقييم موثق</span>
            </span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="tabular-nums">{stats.averageRating} متوسط التقييم</span>
            </span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="inline-flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-emerald-700" />
              <span className="tabular-nums">{stats.fiveStarCount} تقييم 5 نجوم</span>
            </span>
          </div>
        </div>
      </section>

      {/* Rating Breakdown Box matching Screenshot 4 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs items-center">
          {/* Overall Score Card */}
          <div className="md:col-span-5 text-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="text-5xl font-black text-[#136F63] tabular-nums">
              {stats.averageRating}
            </div>
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <div className="text-xs font-bold text-slate-600 tabular-nums">
              بناءً على {stats.totalCount} تقييم موثق
            </div>
          </div>

          {/* 5-to-1 Star Bars */}
          <div className="md:col-span-7 space-y-2.5">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const count = stats.distribution[star];
              const pct =
                stats.totalCount > 0
                  ? Math.round((count / stats.totalCount) * 100)
                  : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-xs font-bold">
                  <div className="flex items-center gap-1 w-12 shrink-0 text-slate-700 tabular-nums">
                    <span>{star}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-left text-slate-600 tabular-nums">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Reviews Section (آراء مميزة) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 inline-flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#136F63]" />
            <span>آراء مميزة</span>
            <Sparkles className="w-5 h-5 text-[#136F63]" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredReviews.map((rev) => {
            const product =
              PRODUCTS.find((p) => p.id === rev.productId) || PRODUCTS[0];
            return (
              <article
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-5 relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#136F63] flex items-center justify-center">
                      <Quote className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-slate-800 font-medium leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#136F63] font-extrabold text-sm flex items-center justify-center relative shrink-0">
                        {rev.author.charAt(0)}
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 bg-white rounded-full absolute -bottom-0.5 -left-0.5" />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-slate-900">
                          {rev.author}
                        </div>
                        <div className="text-xs text-slate-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{rev.city}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      className="w-12 h-14 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-1 hover:border-[#136F63] transition-colors shrink-0"
                      title={product.name}
                    >
                      <ProductVisual product={product} size="sm" />
                    </Link>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center justify-between">
                    <span>
                      اشترى:{' '}
                      <Link
                        to={`/product/${product.id}`}
                        className="font-bold text-[#136F63] hover:underline"
                      >
                        {rev.productName}
                      </Link>
                    </span>
                    <span className="tabular-nums text-slate-500">{rev.date}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* All Customer Reviews Section (جميع آراء العملاء) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">
            جميع آراء العملاء
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((rev) => {
            const product =
              PRODUCTS.find((p) => p.id === rev.productId) || PRODUCTS[0];
            return (
              <article
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3.5 h-3.5 ${
                            idx < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 tabular-nums">
                      {rev.date}
                    </span>
                  </div>

                  <p className="text-sm text-slate-800 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">
                        {rev.author}
                      </div>
                      <div className="text-[11px] text-slate-600">{rev.city}</div>
                    </div>
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs font-bold text-[#136F63] hover:underline truncate max-w-[150px]"
                  >
                    {rev.productName}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner: جربت منتجاتنا؟ */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[#E6F4F1] border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900">
            جربت منتجاتنا؟
          </h2>
          <p className="text-sm text-slate-700 max-w-md mx-auto">
            شاركنا رأيك! تقييمك يساعدنا على تحسين خدماتنا ويساعد الآخرين في اتخاذ قرارهم الصحي.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/shop"
              className="px-6 py-2.5 rounded-xl bg-[#136F63] hover:bg-[#0F5B51] text-white text-sm font-bold transition-colors"
            >
              تسوق الآن
            </Link>
            <button
              type="button"
              onClick={() => setShowAddReview(!showAddReview)}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-sm font-bold transition-colors cursor-pointer"
            >
              أضف تقييمك الآن
            </button>
          </div>

          {showAddReview && (
            <form
              onSubmit={handleAddReview}
              className="mt-6 bg-white p-6 rounded-2xl border border-slate-200 text-right space-y-4 max-w-lg mx-auto"
            >
              <h3 className="text-base font-extrabold text-slate-900">
                إضافة تقييم جديد
              </h3>
              {reviewSubmitted && (
                <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold">
                  شكراً لك! تم نشر تقييمك بنجاح.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="rev-name" className="block text-xs font-bold text-slate-700 mb-1">
                    الاسم *
                  </label>
                  <input
                    id="rev-name"
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="اكتب اسمك"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label htmlFor="rev-city" className="block text-xs font-bold text-slate-700 mb-1">
                    المحافظة
                  </label>
                  <input
                    id="rev-city"
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="rev-prod" className="block text-xs font-bold text-slate-700 mb-1">
                    المنتج الذي جربته
                  </label>
                  <select
                    id="rev-prod"
                    value={newProductId}
                    onChange={(e) => setNewProductId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="rev-rate" className="block text-xs font-bold text-slate-700 mb-1">
                    التقييم
                  </label>
                  <select
                    id="rev-rate"
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value={5}>5 نجوم - ممتاز</option>
                    <option value={4}>4 نجوم - جيد جداً</option>
                    <option value={3}>3 نجوم - جيد</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="rev-comment" className="block text-xs font-bold text-slate-700 mb-1">
                  رأيك في المنتج *
                </label>
                <textarea
                  id="rev-comment"
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="شارك تجربتك مع المنتج..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#136F63] text-white text-xs font-bold hover:bg-[#0F5B51] cursor-pointer"
              >
                نشر التقييم
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
