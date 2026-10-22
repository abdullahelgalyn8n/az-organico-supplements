import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, REVIEWS } from '../data/catalog';
import {
  filterAndSortProducts,
  calculateCartSummary,
  calculateReviewStats,
  validateContactForm,
} from './storeLogic';

test('filterAndSortProducts filters by category and price range accurately', () => {
  const supplements = filterAndSortProducts(PRODUCTS, {
    searchQuery: '',
    category: 'supplements',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'newest',
  });
  assert.ok(supplements.length >= 6);
  assert.ok(supplements.every((p) => p.category === 'supplements'));

  const under260 = filterAndSortProducts(PRODUCTS, {
    searchQuery: '',
    category: 'all',
    minPrice: 0,
    maxPrice: 260,
    sortBy: 'price-asc',
  });
  assert.ok(under260.length >= 4);
  assert.ok(under260.every((p) => p.price <= 260));
  for (let i = 1; i < under260.length; i++) {
    assert.ok(under260[i].price >= under260[i - 1].price);
  }
});

test('filterAndSortProducts matches Arabic name, English name, or SKU', () => {
  const byArabic = filterAndSortProducts(PRODUCTS, {
    searchQuery: 'اشواجندا',
    category: 'all',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'newest',
  });
  assert.equal(byArabic.length, 1);
  assert.equal(byArabic[0].id, 'ashwagandha-600');

  const bySku = filterAndSortProducts(PRODUCTS, {
    searchQuery: 'ORG-VIT-003',
    category: 'all',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'newest',
  });
  assert.equal(bySku.length, 1);
  assert.equal(bySku[0].id, 'd3-k2-10000');
});

test('calculateCartSummary computes free shipping threshold and coupon discounts', () => {
  const singleItem = [{ product: PRODUCTS[0], quantity: 1 }]; // 300 EGP
  const summary1 = calculateCartSummary(singleItem);
  assert.equal(summary1.subtotal, 300);
  assert.equal(summary1.qualifiesForFreeShipping, false);
  assert.equal(summary1.remainingForFreeShipping, 200);
  assert.equal(summary1.shippingFee, 55);
  assert.equal(summary1.total, 355);

  const twoItems = [{ product: PRODUCTS[0], quantity: 2 }]; // 600 EGP
  const summary2 = calculateCartSummary(twoItems, 'ORGANICO10');
  assert.equal(summary2.subtotal, 600);
  assert.equal(summary2.discountTotal, 60);
  assert.equal(summary2.qualifiesForFreeShipping, true);
  assert.equal(summary2.shippingFee, 0);
  assert.equal(summary2.total, 540);
});

test('calculateReviewStats computes accurate 4.8 average rating for default 12 reviews', () => {
  const stats = calculateReviewStats(REVIEWS);
  assert.equal(stats.totalCount, 12);
  assert.equal(stats.fiveStarCount, 9);
  assert.equal(stats.distribution[4], 3);
  assert.equal(stats.averageRating, 4.8);
});

test('validateContactForm enforces Egyptian phone and required fields', () => {
  const invalid = validateContactForm({
    name: 'أ',
    email: 'invalid-email',
    phone: '12345',
    subject: '',
    message: 'قصير',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);

  const valid = validateContactForm({
    name: 'محمد أحمد',
    email: 'mohamed@example.com',
    phone: '01015399167',
    subject: 'استفسار عن شحن طلب',
    message: 'أرغب في معرفة موعد وصول طلبي رقم 1045 إلى محافظة الجيزة.',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
