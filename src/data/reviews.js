// Dummy review pool for the Product Details page.
// Replace `getReviewsForProduct` with a real call later, e.g.:
//   const res = await fetch(`/api/products/${productId}/reviews`);
// as long as it still returns an array shaped like the objects below, no
// component changes are needed.

const reviewPool = [
  {
    author: "Amara K.",
    rating: 5,
    date: "2026-07-18",
    title: "Exactly what I hoped for",
    comment:
      "Battery easily lasts a full day of heavy use and the camera handles low light far better than my old phone.",
  },
  {
    author: "Daniel R.",
    rating: 4,
    date: "2026-07-02",
    title: "Great phone, minor gripes",
    comment:
      "Performance is snappy and the screen looks fantastic. Only wish the charger was included in the box.",
  },
  {
    author: "Priya S.",
    rating: 5,
    date: "2026-06-21",
    title: "Worth the upgrade",
    comment: "Switched from a three-year-old phone and the difference in speed and camera quality is huge.",
  },
  {
    author: "Marcus T.",
    rating: 3,
    date: "2026-06-09",
    title: "Solid but not perfect",
    comment: "Good value for the price. Gets a little warm during long gaming sessions but otherwise reliable.",
  },
  {
    author: "Lena W.",
    rating: 5,
    date: "2026-05-27",
    title: "Fast delivery, great phone",
    comment: "Arrived two days early and well packaged. The display is noticeably brighter than I expected.",
  },
  {
    author: "Oscar N.",
    rating: 4,
    date: "2026-05-14",
    title: "Happy with the purchase",
    comment: "Does everything I need — calls, photos, browsing — without any lag. Would buy again.",
  },
];

export function getReviewsForProduct(productId, count = 3) {
  // Rotates through the shared pool using the product id as a seed, so
  // different products show a different-looking (but stable) review set.
  const seed = String(productId)
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const rotated = [...reviewPool.slice(seed % reviewPool.length), ...reviewPool.slice(0, seed % reviewPool.length)];

  return rotated.slice(0, count);
}
