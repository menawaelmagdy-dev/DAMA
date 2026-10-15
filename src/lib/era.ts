/**
 * ERA Residence — asset manifest + inventory.
 *
 * Assets are served from ERA's own Webflow CDN (the sandbox this project was
 * built in cannot download them). Run `npm run assets:fetch` on a machine with
 * normal internet access to mirror everything into /public and serve it locally.
 */

import localAssets from "./assets.local.json";

/**
 * If `npm run assets:fetch` has been run, every remote URL is rewritten to the
 * mirrored copy in /public/era — so the clone can be served fully self-hosted.
 */
const localMap = localAssets as Record<string, string>;
export const resolveAsset = (url: string) => localMap[url] ?? url;

const CDN = "https://cdn.prod.website-files.com";
const M = `${CDN}/6a068da7ad91b057365bf967`; // layout / hero / media
const S = `${CDN}/6a0853d5dab31b18f0677081`; // sections, amenities, apartments

export const asset = {
  /* chrome */
  landscape: resolveAsset(`${M}/6a068da7ad91b057365bf974_landscape.svg`),
  preloaderBg: resolveAsset(`${M}/6a2311bd477167bbc41c9c03_e22485744735d6f17214f25b6157e9b5_preloader_bg.svg`),
  mapSalesOffice: resolveAsset(`${M}/6a258c1f74c3435f82f4f129_map_sales-office.svg`),
  unrealLogo: resolveAsset(`${S}/6a1577b00ac578734e61941e_Unreal%20logo.svg`),
  privacyPdf: resolveAsset(`${S}/6a1576532e78ed7645599d9b_politica_privacidad_era_residence.pdf`),
  termsPdf: resolveAsset(`${S}/6a1576732e78ed764559c153_terms_of_use_era_residence%20(1).pdf`),

  /* hero */
  heroDay: resolveAsset(`${M}/6a25da81dce540a251389928_era-residence_gated-community_day.webp`),
  heroNight: resolveAsset(`${M}/6a25da802c253b9e5e3d44f5_era-residence_gated-community_night.webp`),

  /* three reasons */
  reasonLocation: resolveAsset(`${S}/6a150affaf1d8cc969d57dd0_img_cam_02.webp`),
  reasonBuilt: resolveAsset(`${S}/6a150bbc2a39862be04f2cd5_era-residence-terrace.webp`),
  reasonBoutique: resolveAsset(`${S}/6a150cc2f810e37eec2ea963_era-residence-garden.webp`),

  /* concept */
  conceptAlpha: resolveAsset(`${M}/6a0f8c07861fe831459ff0d9_img_cam_05_alpha.webp`),
  conceptTerrace: resolveAsset(`${M}/6a15723f346e4b3a6c0af26a_era-residence-terrace.webp`),

  /* map + masterplan */
  locPath: resolveAsset(`${M}/6a51975c584436cfdd9e2406_loc_path.svg`),
  locLabels: resolveAsset(`${M}/6a51975cc959ee1e44045b0e_loc_path_labels.svg`),
  cloud33: resolveAsset(`${M}/6a0fa3c60405a99c8530535e_img_clouds_33.avif`),
  cloud47: resolveAsset(`${M}/6a0fa3c6685d7bb04792137a_img_clouds_47.avif`),
  cloud02: resolveAsset(`${M}/6a0fa3c6c9c3c584d9d78d85_img_clouds_02.avif`),
  masterPlan: resolveAsset(`${M}/6a15185e6803ae588479d12b_era-residence-master-plan.webp`),

  /* typologies */
  typGroundBasement: resolveAsset(`${S}/6a1514d7c27920c70252da1f_era-residence-ground-floor-basement.webp`),
  typGround: resolveAsset(`${S}/6a1575f46655e8c4e795ec64_era-residence-landscaping.webp`),
  typPenthouse: resolveAsset(`${S}/6a15153b797c328a9f2f5964_era-residence-terrace.webp`),

  /* amenities */
  amGated: resolveAsset(`${S}/6a1512e5b24991c76981118b_era-residence-gated-community.webp`),
  amPool: resolveAsset(`${S}/6a151264dc1dcca76fda17d9_era-residence-pool.webp`),
  amParking: resolveAsset(`${S}/6a1573fc640c344ee0705819_era-residence-parking.webp`),
  amSpa: resolveAsset(`${S}/6a15132fe66907986a254201_era-residence-spa-%26-gym.webp`),
  amLandscape: resolveAsset(`${S}/6a151382fb101ce2ca9db288_era-residence-landscaping.webp`),

  /* the space to live in */
  spaceGarden: resolveAsset(`${M}/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2.webp`),
  cam03: resolveAsset(`${M}/6a1507fddb26e71ff717c30c_img_cam_03.webp`),
  cam07: resolveAsset(`${M}/6a15080748155bc8e151f5ff_img_cam_07.webp`),
  cam09: resolveAsset(`${M}/6a150812aefa2e544369d4a6_img_cam_09.webp`),
  kitchen: resolveAsset(`${M}/6a1575180f248400b7124a46_era-residence-kitchen.webp`),
  cam09Footer: resolveAsset(`${M}/6a1507d9c527d247564a1cd7_img_cam_09.webp`),

  /* architecture */
  cam02: resolveAsset(`${M}/6a0f8994091fd12c24e79c8a_img_cam_02.webp`),

  /* closing cta */
  cta1920: resolveAsset(`${M}/6a0f88f3b81e88aabf6874e7_img_cta_1920.webp`),

  /* apartments page — bottom reasons + unit page footer */
  exterior1: resolveAsset(`${S}/6a54e888e523b4fb585095c4_exterior%201.jpg`),
  terraceView2: resolveAsset(`${S}/6a54e86a8a1cf6dc64ae6420_terrace%20view%202.jpg`),
  groundFloor2: resolveAsset(`${S}/6a38473e1051ca440012729b_era-residence-ground-floor-2.webp`),
  unitFooterImage: resolveAsset(`${M}/6a24918d32632ad41e5ee7c8_era-residence-ground-floor-2.webp`),

  /* unit page diagrams + shared gallery */
  diagramBlock: resolveAsset(`${M}/6a249dc092c518a59f92b1f1_diagram_block-1.svg`),
  blockDiagram: resolveAsset(`${M}/6a249dc054dbb1a98ab052ea_blocks-diagram.svg`),
  galBathroom: resolveAsset(`${S}/6a1e3e018e13335cdfe5bffc_era-residence-bathroom.webp`),
  galGroundFloor: resolveAsset(`${S}/6a1e3e0735b657ba4b1313cc_era-residence-ground-floor.webp`),
  galKitchen: resolveAsset(`${S}/6a1e3e0cf0513cfd006653b6_era-residence-kitchen.webp`),
  plan011Pdf: resolveAsset(`${S}/6a3526a9f0bb965967883ea1_011apt_compressed.pdf`),
} as const;

export type AssetKey = keyof typeof asset;

/* ------------------------------------------------------------------ */
/*  Apartments                                                         */
/* ------------------------------------------------------------------ */

export type Typology = "ground-basement" | "ground" | "penthouse";

export const typologyKeys: Typology[] = ["ground-basement", "ground", "penthouse"];

export type Apartment = {
  no: string; // "011"
  slug: string; // "011"
  typology: Typology;
  block: string; // "B1"
  floor: string; // "0 floor"
  beds: number;
  interior: number; // m²
  terrace: number; // m²
  garden?: number; // m²
  image: string;
  completion: string;
  /** 011 only has a plan PDF on the live site; others inherit the same behaviour */
  pdf?: string;
  info: string;
  benefits: string[];
  gallery: string[];
};

const U = (file: string) => resolveAsset(`${S}/${file}`);

const BENEFITS_BASE = [
  "Pool & gym",
  "Storage",
  "Energy B",
  "Parking",
  "Aerothermal",
  "Stone floors",
  "Villeroy & Boch",
  "Underfloor heating",
];

const GALLERY = [asset.galBathroom, asset.galGroundFloor, asset.galKitchen];

export const apartments: Apartment[] = [
  {
    no: "011", slug: "011", typology: "ground-basement", block: "B1", floor: "0 floor",
    beds: 3, interior: 132, terrace: 29, garden: 46,
    image: U("6a345dcc4aeb3252978ee66c_6a345c764aeb3252978e8751_11.webp"),
    completion: "4Q 2026",
    info: "Three bedrooms, open-plan living, and a large terrace that connects directly to the communal garden and pool area.",
    benefits: BENEFITS_BASE, gallery: GALLERY, pdf: asset.plan011Pdf,
  },
  {
    no: "012", slug: "012", typology: "ground-basement", block: "B1", floor: "0 floor",
    beds: 3, interior: 132, terrace: 29,
    image: U("6a345dd6f7eed0819955b9b1_6a345c762f8a29dd9c9b38d7_12.webp"),
    completion: "4Q 2026",
    info: "A mirror of №011, with the same open-plan layout and direct garden access from the main terrace.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "031", slug: "031", typology: "ground-basement", block: "B3", floor: "0 floor",
    beds: 3, interior: 134, terrace: 44,
    image: U("6a345de013d19bbf6d51e69a_6a345c7619f7f97bbc89d475_31.webp"),
    completion: "4Q 2026",
    info: "Three bedrooms with an extra-wide terrace on the south-east corner of the community.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "032", slug: "032", typology: "ground-basement", block: "B3", floor: "0 floor",
    beds: 3, interior: 134, terrace: 44,
    image: U("6a345dedc369de219bae7b17_6a345c76c1fcff139914bf10_32.webp"),
    completion: "4Q 2026",
    info: "Generous terrace, garden outlook, and a private basement level for storage and parking.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "033", slug: "033", typology: "ground-basement", block: "B3", floor: "0 floor",
    beds: 3, interior: 134, terrace: 44,
    image: U("6a345df71705fd78aaaff79b_6a345c7622a1a12b6817e697_33.webp"),
    completion: "4Q 2026",
    info: "Same footprint as its neighbours, with the living space opening onto the walking paths.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "034", slug: "034", typology: "ground-basement", block: "B3", floor: "0 floor",
    beds: 3, interior: 134, terrace: 45,
    image: U("6a345e0044b8416906f493e0_6a345c761bb0eb457f544c19_34.webp"),
    completion: "4Q 2026",
    info: "The largest terrace in Block B3, facing the landscaped gardens and pool.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "111", slug: "111", typology: "ground", block: "B1", floor: "1 floor",
    beds: 2, interior: 75, terrace: 29,
    image: U("6a345e0a1c8514388518ec54_6a345c7661bb6f90181aecf7_111.webp"),
    completion: "4Q 2026",
    info: "Single-level living with a broad terrace that catches the afternoon sun and sea breeze.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "112", slug: "112", typology: "ground", block: "B1", floor: "1 floor",
    beds: 2, interior: 75, terrace: 29,
    image: U("6a345e117400e78c68c15016_6a345c76e6cffe217741c680_112.webp"),
    completion: "4Q 2026",
    info: "Two bedrooms, a generous living room and a terrace overlooking the gardens.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "113", slug: "113", typology: "ground", block: "B1", floor: "1 floor",
    beds: 2, interior: 75, terrace: 29,
    image: U("6a345e196bdcca24333bf197_6a345c76afaf96dac2a461df_113.webp"),
    completion: "4Q 2026",
    info: "An efficient single-level layout with two bathrooms and direct lift access.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "114", slug: "114", typology: "penthouse", block: "B1", floor: "1 floor",
    beds: 3, interior: 89, terrace: 151,
    image: U("6a345e25b4cc4746b16f1222_6a345c7619f7f97bbc89d472_114_1.webp"),
    completion: "4Q 2026",
    info: "A duplex crowned by a 151 m² roof terrace with panoramic views towards the Mediterranean.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "121", slug: "121", typology: "ground", block: "B2", floor: "0 floor",
    beds: 2, interior: 75, terrace: 29,
    image: U("6a345e3022a1a12b68187810_6a345c75afaf96dac2a4619d_121.webp"),
    completion: "4Q 2026",
    info: "Ground-level living with a private terrace that steps out towards the communal gardens.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "122", slug: "122", typology: "ground", block: "B2", floor: "0 floor",
    beds: 2, interior: 75, terrace: 29,
    image: U("6a345e3932d3f4f169cf01e7_6a345c762f8a29dd9c9b38ab_122.webp"),
    completion: "4Q 2026",
    info: "Two bedrooms with garden views from the living area and the main terrace.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "123", slug: "123", typology: "ground", block: "B2", floor: "0 floor",
    beds: 2, interior: 75, terrace: 29,
    image: U("6a345e4a1a02c0931ef15e54_6a345c76bd54890c94c2d280_123.webp"),
    completion: "4Q 2026",
    info: "Quiet positioning within the community, moments from the pool and wellness areas.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "124", slug: "124", typology: "ground", block: "B2", floor: "0 floor",
    beds: 2, interior: 75, terrace: 29,
    image: U("6a345e5b8b0ac7820f95f6ff_6a345c7668c723c7c1bc2fcd_124.webp"),
    completion: "4Q 2026",
    info: "The last of the Block B2 ground-floor homes, with a sunny south-facing terrace.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "131", slug: "131", typology: "penthouse", block: "B3", floor: "1 floor",
    beds: 2, interior: 60, terrace: 64,
    image: U("6a345e62bd54890c94c3ad95_6a345c76f340b7301bf20530_131.webp"),
    completion: "4Q 2026",
    info: "A duplex penthouse with a private roof terrace matching the interior footprint.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "132", slug: "132", typology: "penthouse", block: "B3", floor: "1 floor",
    beds: 2, interior: 60, terrace: 64,
    image: U("6a345e731c85143885191213_6a345c78b4cc4746b16e875d_132.webp"),
    completion: "4Q 2026",
    info: "Two levels, two bathrooms and a roof terrace set up for outdoor dining.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "133", slug: "133", typology: "penthouse", block: "B3", floor: "1 floor",
    beds: 2, interior: 60, terrace: 64,
    image: U("6a345e7d1c85143885191444_6a345c786da993be14f64ed5_133.webp"),
    completion: "4Q 2026",
    info: "Panoramic views from the upper level, with the living space opening to a wide balcony.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "134", slug: "134", typology: "penthouse", block: "B3", floor: "1 floor",
    beds: 2, interior: 67, terrace: 71,
    image: U("6a345e8777dddf106288b222_6a345c7844b8416906f3ffd8_134.webp"),
    completion: "4Q 2026",
    info: "The largest Block B3 penthouse — 67 m² inside and 71 m² of private roof terrace.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "211", slug: "211", typology: "penthouse", block: "B1", floor: "2 floor",
    beds: 2, interior: 60, terrace: 61,
    image: U("6a345e91f6eb25dc22b1f05a_6a345c7827147ebfc4bc0f4b_211.webp"),
    completion: "4Q 2026",
    info: "Top-floor duplex with expansive sea and garden views from both levels.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "212", slug: "212", typology: "penthouse", block: "B1", floor: "2 floor",
    beds: 2, interior: 60, terrace: 61,
    image: U("6a345e98d4cbbca7e411b626_6a345c78b492933cc245ff76_212.webp"),
    completion: "4Q 2026",
    info: "Light-filled duplex with a roof solarium designed for long Mediterranean evenings.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "213", slug: "213", typology: "penthouse", block: "B1", floor: "2 floor",
    beds: 2, interior: 60, terrace: 62,
    image: U("6a345ea9e8b7f65792d46d07_6a345c78ac4c78a4157613a6_213.webp"),
    completion: "4Q 2026",
    info: "The final Block B1 penthouse, with the widest rooftop aspect in the building.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "221", slug: "221", typology: "penthouse", block: "B2", floor: "1 floor",
    beds: 2, interior: 60, terrace: 61,
    image: U("6a345eb1bcec9ace0219ebbb_6a345c78ac4c78a4157613a3_221.webp"),
    completion: "4Q 2026",
    info: "Duplex living with a north-facing roof terrace and views across the community.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "222", slug: "222", typology: "penthouse", block: "B2", floor: "1 floor",
    beds: 2, interior: 60, terrace: 61,
    image: U("6a345ebd8f01ce67d4e9dd40_6a345c789c5162a25ad50df3_222.webp"),
    completion: "4Q 2026",
    info: "Two bedrooms on the lower level and a private roof terrace above.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "223", slug: "223", typology: "penthouse", block: "B2", floor: "1 floor",
    beds: 2, interior: 60, terrace: 61,
    image: U("6a345ec5f7eed0819956088f_6a345c788f01ce67d4e9365b_223.webp"),
    completion: "4Q 2026",
    info: "Set back from the walking paths, with a calm aspect over the landscaped gardens.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
  {
    no: "224", slug: "224", typology: "penthouse", block: "B2", floor: "1 floor",
    beds: 2, interior: 60, terrace: 62,
    image: U("6a345ecdac4c78a41576f45f_6a345c78a24587924e09d9dc_224.webp"),
    completion: "4Q 2026",
    info: "The last available penthouse duplex at Era Residence.",
    benefits: BENEFITS_BASE, gallery: GALLERY,
  },
];

export const getApartment = (slug: string) => apartments.find((a) => a.slug === slug);

export const similarApartments = (current: Apartment, count = 6) => {
  const sameType = apartments.filter((a) => a.slug !== current.slug && a.typology === current.typology);
  const rest = apartments.filter((a) => a.slug !== current.slug && a.typology !== current.typology);
  return [...sameType, ...rest].slice(0, count);
};

export const buildingBlocks = ["B1", "B2", "B3"] as const;
