import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  FlaskConical,
  Pill,
  Sprout,
  Droplets,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, Product } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';

interface CategoriesPageProps {
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
}) => {
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
    <div className="pb-16 space-y-12">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#136F63] to-[#0B3B35] text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-200 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>5 أقسام رئيسية · 18 منتج طبيعي معتمد</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            فئات منتجات أورجانيكو
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto">
            تصفح أقسامنا المتخصصة من المكملات العشبية، الفيتامينات، البذور العضوية، الزيوت المعصورة على البارد، والعسل الجبلي الخام.
          </p>
        </div>
      </section>

      {/* Category Sections with Product Previews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {CATEGORIES.map((cat) => {
          const catProducts = PRODUCTS.filter((p) => p.category === cat.id).slice(0, 4);
          return (
            <section
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        {cat.name}
                      </h2>
                      <span className="text-xs font-bold text-emerald-800 tabular-nums">
                        · {cat.count} منتجات
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/shop?category=${cat.id}`}
                  className="px-5 py-2.5 rounded-xl bg-[#136F63] hover:bg-[#0F5B51] text-white text-xs sm:text-sm font-bold flex items-center gap-2 self-start sm:self-center whitespace-nowrap shrink-0 transition-colors"
                >
                  <span>تصفح قسم {cat.name}</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {catProducts.map((product) => (
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
          );
        })}
      </div>
    </div>
  );
};
