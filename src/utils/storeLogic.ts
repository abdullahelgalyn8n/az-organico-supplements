import { Product, CategoryId, ReviewItem } from '../data/catalog';

export interface FilterCriteria {
  searchQuery: string;
  category: CategoryId;
  minPrice: number;
  maxPrice: number;
  onlyDiscounted?: boolean;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-selling';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  discountTotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  qualifiesForFreeShipping: boolean;
  total: number;
  totalItems: number;
  earnedPoints: number;
}

export const FREE_SHIPPING_THRESHOLD = 500;
export const STANDARD_SHIPPING_FEE = 55;

export function filterAndSortProducts(
  products: Product[],
  criteria: FilterCriteria
): Product[] {
  const query = criteria.searchQuery.trim().toLowerCase();

  const filtered = products.filter((item) => {
    if (criteria.category !== 'all' && item.category !== criteria.category) {
      return false;
    }

    if (item.price < criteria.minPrice || item.price > criteria.maxPrice) {
      return false;
    }

    if (criteria.onlyDiscounted && !item.discountPercent) {
      return false;
    }

    if (query.length > 0) {
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesEng = item.englishName.toLowerCase().includes(query);
      const matchesSku = item.sku.toLowerCase().includes(query);
      const matchesSub = item.subtitle.toLowerCase().includes(query);
      const matchesCat = item.categoryLabel.toLowerCase().includes(query);
      if (!matchesName && !matchesEng && !matchesSku && !matchesSub && !matchesCat) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered];
  switch (criteria.sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case 'best-selling':
      sorted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
      break;
    case 'newest':
    default:
      break;
  }

  return sorted;
}

export function calculateCartSummary(
  items: CartItem[],
  couponCode?: string
): CartSummary {
  const subtotal = items.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0
  );

  const totalItems = items.reduce((sum, entry) => sum + entry.quantity, 0);
  const earnedPoints = items.reduce(
    (sum, entry) => sum + entry.product.points * entry.quantity,
    0
  );

  let discountTotal = 0;
  const normalizedCoupon = couponCode?.trim().toUpperCase();
  if (normalizedCoupon === 'ORGANICO10' && subtotal > 0) {
    discountTotal = Math.round(subtotal * 0.1);
  } else if (normalizedCoupon === 'CLEAN50' && subtotal >= 300) {
    discountTotal = 50;
  }

  const afterDiscount = Math.max(0, subtotal - discountTotal);
  const qualifiesForFreeShipping = afterDiscount >= FREE_SHIPPING_THRESHOLD;
  const shippingFee =
    totalItems === 0 ? 0 : qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const remainingForFreeShipping = qualifiesForFreeShipping
    ? 0
    : Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount);

  return {
    subtotal,
    discountTotal,
    shippingFee,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    remainingForFreeShipping,
    qualifiesForFreeShipping,
    total: afterDiscount + shippingFee,
    totalItems,
    earnedPoints,
  };
}

export interface ReviewStats {
  totalCount: number;
  averageRating: number;
  fiveStarCount: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export function calculateReviewStats(reviews: ReviewItem[]): ReviewStats {
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  if (reviews.length === 0) {
    return {
      totalCount: 0,
      averageRating: 0,
      fiveStarCount: 0,
      distribution,
    };
  }

  let sum = 0;
  for (const r of reviews) {
    const clamped = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[clamped] += 1;
    sum += r.rating;
  }

  const averageRating = Number((sum / reviews.length).toFixed(1));
  return {
    totalCount: reviews.length,
    averageRating,
    fiveStarCount: distribution[5],
    distribution,
  };
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'يرجى إدخال الاسم بالكامل (حرفين على الأقل)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'يرجى إدخال بريد إلكتروني صحيح';
  }

  const cleanPhone = input.phone.replace(/\s+/g, '');
  if (!cleanPhone || !/^01[0125]\d{8}$/.test(cleanPhone)) {
    errors.phone = 'يرجى إدخال رقم هاتف مصري صحيح يبدأ بـ 01 ومكون من 11 رقم';
  }

  if (!input.subject || input.subject.trim().length < 3) {
    errors.subject = 'يرجى كتابة موضوع الرسالة';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'يرجى كتابة تفاصيل الرسالة (10 أحرف على الأقل)';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
