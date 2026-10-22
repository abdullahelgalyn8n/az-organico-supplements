import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ShieldCheck,
  Truck,
  RotateCcw,
  Leaf,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { CartItem, calculateCartSummary } from '../utils/storeLogic';

interface LayoutProps {
  children: React.ReactNode;
  cart: CartItem[];
  wishlistIds: string[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  globalSearch: string;
  onGlobalSearchChange: (q: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  cart,
  wishlistIds,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  globalSearch,
  onGlobalSearchChange,
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('القاهرة');
  const [customerAddress, setCustomerAddress] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const summary = calculateCartSummary(cart, couponCode);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/shop${globalSearch.trim() ? `?q=${encodeURIComponent(globalSearch.trim())}` : ''}`);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim().length < 2) {
      setCheckoutError('يرجى إدخال الاسم بالكامل');
      return;
    }
    if (!/^01[0125]\d{8}$/.test(customerPhone.replace(/\s+/g, ''))) {
      setCheckoutError('يرجى إدخال رقم موبايل مصري صحيح مكون من 11 رقم');
      return;
    }
    if (customerAddress.trim().length < 5) {
      setCheckoutError('يرجى كتابة العنوان بالتفصيل');
      return;
    }
    setCheckoutError('');
    const orderNum = `ORG-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrderId(orderNum);
    setCheckoutStep('success');
    onClearCart();
  };

  const navItems = [
    { to: '/', label: 'الرئيسية', end: true },
    { to: '/shop', label: 'المتجر' },
    { to: '/categories', label: 'الفئات' },
    { to: '/testimonials', label: 'آراء العملاء' },
    { to: '/certifications', label: 'الشهادات المعتمدة' },
    { to: '/contact', label: 'تواصل معنا' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#136F63] whitespace-nowrap shrink-0"
          >
            <span>Organico</span>
            <span className="text-slate-800 text-lg font-bold hidden sm:inline">أورجانيكو</span>
          </Link>

          {/* Zone 2: Primary Navigation Links + Quick Search */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-700"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#136F63] text-[#136F63]'
                      : 'border-transparent text-slate-700 hover:text-[#136F63]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Search Input & Cart Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-56 xl:w-64">
              <input
                type="search"
                value={globalSearch}
                onChange={(e) => onGlobalSearchChange(e.target.value)}
                placeholder="ابحث عن منتجات..."
                aria-label="ابحث عن منتجات"
                className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-500 text-xs sm:text-sm rounded-full py-2 pr-4 pl-9 border border-slate-300 focus:border-[#136F63] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                aria-label="بحث"
                className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#136F63] text-white flex items-center justify-center hover:bg-[#0F5B51] transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <Link
              to="/shop?wishlist=1"
              aria-label={`المفضلة (${wishlistIds.length})`}
              className="relative p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => {
                setCheckoutStep('cart');
                setCartDrawerOpen(true);
              }}
              aria-label={`سلة التسوق (${summary.totalItems} منتجات)`}
              className="px-3.5 py-2 rounded-lg bg-[#136F63] hover:bg-[#0F5B51] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>السلة</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs tabular-nums">
                {summary.totalItems}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-5 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                value={globalSearch}
                onChange={(e) => onGlobalSearchChange(e.target.value)}
                placeholder="ابحث عن مكملات، فيتامينات، زيوت..."
                className="w-full bg-slate-100 text-slate-900 placeholder:text-slate-500 text-sm rounded-xl py-2.5 pr-4 pl-10 border border-slate-300"
              />
              <button
                type="submit"
                aria-label="بحث"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#136F63] text-white flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
            <nav className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-[#136F63]'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Trust Strip (High Contrast Emerald Bar matching Organico screenshot) */}
      <div className="bg-[#0F5B51] text-white text-xs border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-around gap-4">
          <div className="flex items-center gap-1.5 font-semibold">
            <Leaf className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>منتجات طبيعية 100%</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>معتمدون من ISO 22000 & GMP</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 font-semibold">
            <Truck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>شحن مجاني للطلبات فوق 500 جنيه</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 font-semibold">
            <RotateCcw className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>ضمان استرداد الأموال خلال 14 يوم</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Dark Forest Green Footer matching reference */}
      <footer className="bg-[#0B3B35] text-slate-100 pt-14 pb-8 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-emerald-800/60">
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <Link to="/" className="inline-block text-2xl font-extrabold text-emerald-400">
                Organico | أورجانيكو
              </Link>
              <p className="text-sm text-slate-200 leading-relaxed">
                عيش حياة نظيفة - متخصصون في تصنيع المنتجات الطبيعية والمكملات الغذائية بأعلى معايير الجودة والسلامة المعتمدة دولياً منذ 2019.
              </p>
              <div className="text-xs text-emerald-300 font-semibold">
                مسجل ومعتمد بشهادات ISO 22000:2018 و ISO 9001:2015 و GMP
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 pr-3 border-r-2 border-emerald-400">
                روابط سريعة
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <Link to="/shop" className="hover:text-emerald-300 transition-colors">
                    المتجر الكامل
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-emerald-300 transition-colors">
                    تصفح الفئات
                  </Link>
                </li>
                <li>
                  <Link to="/certifications" className="hover:text-emerald-300 transition-colors">
                    الشهادات المعتمدة
                  </Link>
                </li>
                <li>
                  <Link to="/testimonials" className="hover:text-emerald-300 transition-colors">
                    آراء وتجارب العملاء
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-emerald-300 transition-colors">
                    تواصل معنا
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Policies */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 pr-3 border-r-2 border-emerald-400">
                السياسات والضمان
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <Link to="/certifications" className="hover:text-emerald-300 transition-colors">
                    معايير الجودة والسلامة
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-emerald-300 transition-colors">
                    سياسة الشحن والتوصيل (مجاني فوق 500 ج.م)
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-emerald-300 transition-colors">
                    سياسة الاسترجاع خلال 14 يوماً
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-emerald-300 transition-colors">
                    الأسئلة الشائعة وطرق الدفع
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h3 className="text-base font-bold text-white mb-4 pr-3 border-r-2 border-emerald-400">
                تواصل معنا
              </h3>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-emerald-300 shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="tabular-nums font-semibold" dir="ltr">01015399167</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-emerald-300 shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span>info@organico.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center text-emerald-300 shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span>يومياً من 10 صباحاً - 10 مساءً</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <p>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</p>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-emerald-900/70 text-emerald-200 font-semibold">
                الدفع عند الاستلام (COD)
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-900/70 text-emerald-200 font-semibold">
                Visa / MasterCard
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart & Checkout Slide-over Drawer */}
      {cartDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="سلة التسوق"
        >
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Drawer Header */}
            <div className="px-6 py-4 bg-[#0B3B35] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-5 h-5 text-emerald-300" />
                <h2 className="text-lg font-bold">
                  {checkoutStep === 'cart' && `سلة التسوق (${summary.totalItems})`}
                  {checkoutStep === 'form' && 'إتمام الطلب - الدفع عند الاستلام'}
                  {checkoutStep === 'success' && 'تم تأكيد طلبك بنجاح'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartDrawerOpen(false)}
                aria-label="إغلاق السلة"
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            {checkoutStep !== 'success' && (
              <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-200">
                {summary.qualifiesForFreeShipping ? (
                  <p className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>مبروك! طلبك مؤهل للشحن المجاني السريع لجميع المحافظات.</span>
                  </p>
                ) : (
                  <div>
                    <p className="text-xs font-bold text-slate-800 mb-1.5">
                      أضف بـ <span className="text-emerald-800 tabular-nums">{summary.remainingForFreeShipping} ج.م</span> للحصول على <span className="text-emerald-800">شحن مجاني!</span>
                    </p>
                    <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#136F63] transition-all duration-300"
                        style={{
                          width: `${Math.min(100, Math.round((summary.subtotal / summary.freeShippingThreshold) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 'success' ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    شكراً لثقتك في أورجانيكو!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    تم تسجيل طلبك رقم <span className="font-mono font-bold text-slate-900">{confirmedOrderId}</span> بنجاح. سيتواصل معك مندوب الشحن خلال 24 ساعة لتأكيد موعد التسليم.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-right text-xs space-y-1.5 text-slate-700">
                    <div><strong>العميل:</strong> {customerName}</div>
                    <div><strong>الهاتف:</strong> {customerPhone}</div>
                    <div><strong>العنوان:</strong> {customerCity} - {customerAddress}</div>
                    <div><strong>طريقة الدفع:</strong> الدفع عند الاستلام (COD)</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutStep('cart');
                      setCartDrawerOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-[#136F63] text-white font-bold text-sm hover:bg-[#0F5B51]"
                  >
                    العودة للتسوق
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-14 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">سلة التسوق فارغة حالياً</h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    استكشف مجموعتنا من المكملات العشبية والفيتامينات والزيوت العضوية المعتمدة.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCartDrawerOpen(false);
                      navigate('/shop');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#136F63] text-white text-sm font-bold hover:bg-[#0F5B51]"
                  >
                    تصفح المتجر
                  </button>
                </div>
              ) : checkoutStep === 'cart' ? (
                <div className="space-y-4">
                  {cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div className="flex-1 text-right">
                        <Link
                          to={`/product/${product.id}`}
                          onClick={() => setCartDrawerOpen(false)}
                          className="text-sm font-bold text-slate-900 hover:text-[#136F63] line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <div className="text-xs text-slate-600 mt-0.5 tabular-nums">
                          {product.price} ج.م × {quantity} ={' '}
                          <span className="font-bold text-emerald-800">
                            {product.price * quantity} ج.م
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-1.5 py-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          aria-label={`تقليل كمية ${product.name}`}
                          className="p-1 text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold px-1.5 tabular-nums">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          aria-label={`زيادة كمية ${product.name}`}
                          className="p-1 text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(product.id)}
                        aria-label={`حذف ${product.name} من السلة`}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Coupon Box */}
                  <div className="pt-3 border-t border-slate-200">
                    <label htmlFor="coupon-input" className="block text-xs font-bold text-slate-700 mb-1.5">
                      كود الخصم (جرب ORGANICO10 لخصم 10%)
                    </label>
                    <input
                      id="coupon-input"
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="أدخل كود الكوبون..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-[#136F63] focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <form id="checkout-cod-form" onSubmit={handleConfirmOrder} className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs font-bold text-[#136F63] flex items-center gap-1 hover:underline mb-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                    <span>العودة لمراجعة السلة</span>
                  </button>

                  {checkoutError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                      {checkoutError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="cod-name" className="block text-xs font-bold text-slate-800 mb-1">
                      الاسم بالكامل *
                    </label>
                    <input
                      id="cod-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: محمد إبراهيم"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="cod-phone" className="block text-xs font-bold text-slate-800 mb-1">
                      رقم الموبايل (واتساب / اتصال) *
                    </label>
                    <input
                      id="cod-phone"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="010xxxxxxxx"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 tabular-nums"
                    />
                  </div>

                  <div>
                    <label htmlFor="cod-city" className="block text-xs font-bold text-slate-800 mb-1">
                      المحافظة *
                    </label>
                    <select
                      id="cod-city"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900"
                    >
                      <option value="القاهرة">القاهرة</option>
                      <option value="الجيزة">الجيزة</option>
                      <option value="الإسكندرية">الإسكندرية</option>
                      <option value="المنوفية">المنوفية</option>
                      <option value="الدقهلية">الدقهلية</option>
                      <option value="الغربية">الغربية</option>
                      <option value="الشرقية">الشرقية</option>
                      <option value="أسيوط">أسيوط</option>
                      <option value="أسوان">أسوان</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cod-address" className="block text-xs font-bold text-slate-800 mb-1">
                      العنوان بالتفصيل *
                    </label>
                    <textarea
                      id="cod-address"
                      rows={3}
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="اسم الشارع، رقم العقار، الدور، علامة مميزة..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Drawer Footer Totals */}
            {cart.length > 0 && checkoutStep !== 'success' && (
              <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span className="font-bold tabular-nums">{summary.subtotal} ج.م</span>
                  </div>
                  {summary.discountTotal > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>الخصم الترويجي:</span>
                      <span className="tabular-nums">-{summary.discountTotal} ج.م</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>مصاريف الشحن:</span>
                    <span className="font-bold tabular-nums">
                      {summary.shippingFee === 0 ? 'مجاني' : `${summary.shippingFee} ج.م`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                    <span>الإجمالي النهائي:</span>
                    <span className="text-[#136F63] tabular-nums">{summary.total} ج.م</span>
                  </div>
                </div>

                {checkoutStep === 'cart' ? (
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('form')}
                    className="w-full py-3 rounded-xl bg-[#136F63] hover:bg-[#0F5B51] text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    المتابعة لإتمام الطلب ({summary.total} ج.م)
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-cod-form"
                    className="w-full py-3 rounded-xl bg-[#136F63] hover:bg-[#0F5B51] text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    تأكيد الطلب والدفع عند الاستلام
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating WhatsApp Direct Support Button */}
      <a
        href="https://wa.me/201015399167"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="fixed bottom-5 left-5 z-30 w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};
