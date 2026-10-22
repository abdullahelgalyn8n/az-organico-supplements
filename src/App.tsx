/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { X, ShoppingCart, Star, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, Product } from './data/catalog';
import { CartItem } from './utils/storeLogic';
import { Layout } from './components/Layout';
import { ProductVisual } from './components/ProductVisual';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ContactPage } from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => [
    { product: PRODUCTS[0], quantity: 1 },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout
        cart={cart}
        wishlistIds={wishlistIds}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
      >
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={setQuickViewProduct}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <ShopPage
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={setQuickViewProduct}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <CategoriesPage
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={setQuickViewProduct}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={setQuickViewProduct}
              />
            }
          />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        {/* Quick View Product Modal */}
        {quickViewProduct && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={quickViewProduct.name}
          >
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                aria-label="إغلاق المعاينة"
                className="absolute top-4 left-4 p-2 rounded-full text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="sm:col-span-5 bg-slate-50 rounded-2xl p-6 flex items-center justify-center">
                <ProductVisual product={quickViewProduct} size="md" />
              </div>

              <div className="sm:col-span-7 text-right space-y-3">
                <span className="text-xs font-bold text-[#136F63]">
                  {quickViewProduct.categoryLabel} · {quickViewProduct.countText}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {quickViewProduct.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-700 tabular-nums">
                    {quickViewProduct.rating} ({quickViewProduct.reviewCount} تقييم)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>
                <ul className="space-y-1">
                  {quickViewProduct.benefits.slice(0, 2).map((b, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#136F63] tabular-nums">
                    {quickViewProduct.price} ج.م
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {quickViewProduct.originalPrice} ج.م
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#136F63] hover:bg-[#0F5B51] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>أضف للسلة</span>
                  </button>
                  <Link
                    to={`/product/${quickViewProduct.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 text-xs sm:text-sm font-bold"
                  >
                    التفاصيل الكاملة
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </BrowserRouter>
  );
}
