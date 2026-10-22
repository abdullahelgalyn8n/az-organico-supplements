import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  LayoutGrid,
  List,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product, CategoryId } from '../data/catalog';
import { filterAndSortProducts, FilterCriteria } from '../utils/storeLogic';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = (searchParams.get('category') as CategoryId) || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialSort =
    (searchParams.get('sort') as FilterCriteria['sortBy']) || 'newest';
  const initialDiscounted = searchParams.get('discounted') === '1';
  const onlyWishlist = searchParams.get('wishlist') === '1';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryId>(initialCat);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [onlyDiscounted, setOnlyDiscounted] = useState(initialDiscounted);
  const [sortBy, setSortBy] = useState<FilterCriteria['sortBy']>(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const paramCat = (searchParams.get('category') as CategoryId) || 'all';
    const paramQ = searchParams.get('q') || '';
    const paramDiscount = searchParams.get('discounted') === '1';
    setCategory(paramCat);
    setSearchQuery(paramQ);
    setOnlyDiscounted(paramDiscount);
  }, [searchParams]);

  const baseProducts = onlyWishlist
    ? PRODUCTS.filter((p) => wishlistIds.includes(p.id))
    : PRODUCTS;

  const filteredProducts = filterAndSortProducts(baseProducts, {
    searchQuery,
    category,
    minPrice: 0,
    maxPrice,
    onlyDiscounted,
    sortBy,
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setMaxPrice(1000);
    setOnlyDiscounted(false);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="pb-16">
      {/* Green Header Banner matching Screenshot 3 */}
      <section className="bg-gradient-to-r from-[#2E9E49] to-[#1E7E38] text-white py-12 text-center shadow-xs">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {onlyWishlist ? 'المنتجات المفضلة' : 'المتجر'}
          </h1>
          <p className="text-sm sm:text-base text-emerald-50 font-medium">
            {onlyWishlist
              ? 'قائمة منتجاتك المفضلة المحفوظة للطلب السريع'
              : 'اكتشف مجموعتنا الواسعة من المكملات العشبية والفيتامينات والمنتجات العضوية'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Toolbar (Count + Sort + Grid/List Toggle) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <span className="tabular-nums text-[#136F63] font-extrabold">
              {filteredProducts.length}
            </span>
            <span>منتج متوفر</span>
            {category !== 'all' && (
              <span className="text-xs text-slate-500 font-normal">
                · الفئة: {CATEGORIES.find((c) => c.id === category)?.name}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Grid / List View Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="عرض شبكي"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#136F63] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="عرض قائمة"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#136F63] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <label htmlFor="shop-sort" className="text-xs font-bold text-slate-600 hidden sm:inline">
                الترتيب:
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as FilterCriteria['sortBy'])}
                className="bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl px-3.5 py-2 focus:border-[#136F63] focus:outline-none"
              >
                <option value="newest">الأحدث</option>
                <option value="best-selling">الأكثر مبيعاً</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main 2-Column Layout: Right Filter Sidebar (RTL first column) + Left Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Filter Sidebar (3 columns on desktop) */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
                <SlidersHorizontal className="w-4 h-4 text-[#136F63]" />
                <h2>الفلاتر</h2>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-slate-600 hover:text-[#136F63] flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط</span>
              </button>
            </div>

            {/* Search by Name or SKU */}
            <div>
              <label
                htmlFor="sidebar-search"
                className="block text-xs font-bold text-slate-800 mb-2"
              >
                البحث
              </label>
              <div className="relative">
                <input
                  id="sidebar-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالاسم، SKU..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pr-3.5 pl-9 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-[#136F63] focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Category Select & Quick Buttons */}
            <div>
              <label
                htmlFor="sidebar-category"
                className="block text-xs font-bold text-slate-800 mb-2"
              >
                الفئات
              </label>
              <select
                id="sidebar-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:border-[#136F63] focus:outline-none mb-3"
              >
                <option value="all">كل الفئات ({PRODUCTS.length})</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.count})
                  </option>
                ))}
              </select>

              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setCategory('all')}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-colors ${
                    category === 'all'
                      ? 'bg-emerald-50 text-[#136F63]'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>جميع المنتجات</span>
                  <span className="tabular-nums">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`w-full text-right px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-colors ${
                      category === cat.id
                        ? 'bg-emerald-50 text-[#136F63]'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="tabular-nums">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                <label htmlFor="price-range">نطاق السعر</label>
                <span className="text-[#136F63] tabular-nums">حتى {maxPrice} ج.م</span>
              </div>
              <input
                id="price-range"
                type="range"
                min={100}
                max={1000}
                step={25}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#136F63] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mt-1 tabular-nums">
                <span>0 ج.م</span>
                <span>1000 ج.م</span>
              </div>
            </div>

            {/* Discount Filter Checkbox */}
            <div className="pt-3 border-t border-slate-200">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={onlyDiscounted}
                  onChange={(e) => setOnlyDiscounted(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#136F63]"
                />
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>المنتجات المخفضة والعروض فقط</span>
              </label>
            </div>
          </aside>

          {/* Left Product Grid (9 columns on desktop) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <p className="text-lg font-extrabold text-slate-800">
                  لا توجد منتجات مطابقة لخيارات البحث الحالية
                </p>
                <p className="text-sm text-slate-600">
                  جرب تغيير كلمات البحث أو توسيع نطاق السعر لعرض المزيد من المنتجات.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#136F63] text-white text-sm font-bold hover:bg-[#0F5B51]"
                >
                  عرض جميع المنتجات
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onQuickView={onQuickView}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={onToggleWishlist}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                <div className="text-center mt-10 text-xs font-bold text-slate-500">
                  عرض {filteredProducts.length} من إجمالي {PRODUCTS.length} منتج معتمد
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
