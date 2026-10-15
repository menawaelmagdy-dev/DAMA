/**
 * Image manifest — every asset is generated for this project and served locally
 * from /public/images (no third-party CDN dependency).
 */

export const img = {
  heroDay: "/images/community-day.jpg",
  heroNight: "/images/community-night.jpg",
  location: "/images/aerial.jpg",
  walkway: "/images/walkway.jpg",
  garden: "/images/garden.jpg",
  terrace: "/images/terrace.jpg",
  pool: "/images/pool.jpg",
  rooftop: "/images/rooftop.jpg",
  spa: "/images/spa.jpg",
  living: "/images/living-room.jpg",
  kitchen: "/images/kitchen.jpg",
  cta: "/images/cta.jpg",
  parking: "/images/parking.jpg",
} as const;

export type ImgKey = keyof typeof img;

/** Amenity list → image mapping (order matches content.amenities.items) */
export const amenityImages: ImgKey[] = ["garden", "pool", "parking", "spa", "walkway", "terrace"];

export const galleryImages: ImgKey[] = ["living", "kitchen", "terrace", "rooftop"];

export const reasonsImages: Record<string, ImgKey> = {
  location: "location",
  walkway: "walkway",
  garden: "garden",
};
