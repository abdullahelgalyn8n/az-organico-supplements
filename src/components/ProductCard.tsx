import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Eye, Check } from 'lucide-react';
import { Product } from '../data/catalog';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
  viewMode = 'grid',
}) => {
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  if (viewMode === 'list') {
    return (
      <article className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-600/40 shadow-xs hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-6">
        <Link
          to={`/product/${product.id}`}
          className="relative w-full sm:w-48 h-52 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
        >
          {product.discountPercent ? (
            <span className="absolute top-3 right-3 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-md tabular-nums">
              -{product.discountPercent}%
            </span>
          ) : (
            <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
              مميز
            </span>
          )}
          <div className="transition-transform duration-200 group-hover:-translate-y-1">
            <ProductVisual product={product} size="md" />
          </div>
        </Link>

        <div className="flex-1 flex flex-col justify-between w-full text-right">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-slate-600 mb-1.5">
              <span>{product.categoryLabel} · {product.countText}</span>
              <span className="font-mono text-slate-500 tabular-nums">{product.sku}</span>
            </div>

            <Link
              to={`/product/${product.id}`}
              className="text-lg font-bold text-slate-900 hover:text-emerald-800 transition-colors block mb-1"
            >
              {product.name}
            </Link>
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-500" aria-label={`التقييم ${product.rating} من 5`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${idx < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-700 tabular-nums">
                ({product.rating}) · {product.reviewCount} تقييم
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-emerald-800 tabular-nums">
                {product.price} ج.م
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through tabular-nums">
                  {product.originalPrice} ج.م
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 mr-2 tabular-nums">
                +{product.points} نقطة مكافآت
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onQuickView && (
                <button
                  type="button"
                  onClick={() => onQuickView(product)}
                  className="p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label={`معاينة سريعة لمنتج ${product.name}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleAdd}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold text-white flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                  justAdded
                    ? 'bg-emerald-700'
                    : 'bg-[#136F63] hover:bg-[#0F5B51]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تمت الإضافة</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>أضف للسلة</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-700/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between p-4 relative">
      {/* Top Badge & Wishlist */}
      <div className="flex items-center justify-between mb-2 z-10">
        {product.discountPercent ? (
          <span className="bg-emerald-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-md tabular-nums">
            -{product.discountPercent}%
          </span>
        ) : (
          <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
            مميز
          </span>
        )}

        <div className="flex items-center gap-1">
          {onToggleWishlist && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onToggleWishlist(product.id);
              }}
              aria-label={isWishlisted ? `إزالة ${product.name} من المفضلة` : `إضافة ${product.name} للمفضلة`}
              className={`p-1.5 rounded-full transition-colors ${
                isWishlisted
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-500 hover:text-rose-600 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
            </button>
          )}
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              aria-label={`معاينة سريعة لمنتج ${product.name}`}
              className="p-1.5 rounded-full text-slate-500 hover:text-emerald-800 hover:bg-slate-100 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Bottle Visual Link */}
      <Link
        to={`/product/${product.id}`}
        className="relative bg-slate-50/80 rounded-xl py-4 px-2 flex items-center justify-center mb-3 overflow-hidden"
      >
        <div className="transition-transform duration-200 group-hover:-translate-y-1">
          <ProductVisual product={product} size="md" />
        </div>
      </Link>

      {/* Add to Cart Primary Button */}
      <button
        type="button"
        onClick={handleAdd}
        className={`w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 transition-colors mb-3 whitespace-nowrap shrink-0 cursor-pointer ${
          justAdded
            ? 'bg-emerald-700'
            : 'bg-[#136F63] hover:bg-[#0F5B51]'
        }`}
      >
        {justAdded ? (
          <>
            <Check className="w-4 h-4" />
            <span>تمت الإضافة للسلة</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            <span>أضف للسلة</span>
          </>
        )}
      </button>

      {/* Rating & Title & Pricing */}
      <div className="text-right flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-end gap-1.5 mb-1.5">
            <span className="text-xs font-semibold text-slate-600 tabular-nums">
              ({product.rating})
            </span>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-3.5 h-3.5 ${
                    idx < Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#136F63] transition-colors line-clamp-2 leading-snug mb-1.5 block"
          >
            {product.name}
          </Link>
        </div>

        <div className="pt-2 border-t border-slate-100 mt-1 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-slate-600 tabular-nums">
            +{product.points} نقطة
          </span>

          <div className="flex items-baseline gap-1.5">
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through tabular-nums">
                {product.originalPrice} ج.م
              </span>
            )}
            <span className="text-base font-extrabold text-[#136F63] tabular-nums">
              {product.price} ج.م
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
