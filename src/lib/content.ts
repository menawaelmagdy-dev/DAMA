/**
 * ERA Residence — all site copy, transcribed from era-residence.com.
 */

import { asset } from "./era";

export const site = {
  url: "https://www.era-residence.com",
  name: "Era Residence",
  city: "Estepona",
  phone: "+34 (655) 408-648",
  phoneHref: "tel:+34655408648",
  whatsapp: "https://wa.me/34655408648",
  email: "info@era-residence.com",
  mapOffice: "https://maps.app.goo.gl/EzyfT2M6vR5aBdMu9",
  mapLocation: "https://maps.app.goo.gl/5FY2BUESnAmcybFe8",
  linkedin: "https://www.linkedin.com/company/eraresidenceestepona/?viewAsMember=true",
  facebook: "https://www.facebook.com/era.residence.estepona",
  instagram: "https://www.instagram.com/era.residence.estepona",
  maker: "The First The Last",
  makerUrl:
    "https://thefirstthelast.agency/?utm_source=era-residence&utm_medium=article&utm_campaign=promo",
} as const;

export const copy = {
  meta: {
    title: "ERA Residence — Contemporary Mediterranean Residences in Estepona",
    description:
      "Era Residence — a boutique gated community of only 25 residences on the New Golden Mile, Estepona. Two, three and four bedroom apartments, duplexes and penthouses on the Costa del Sol.",
  },

  preloader: {
    words: ["Costa", "Era", "Residence", "Estepona"],
    delSol: "del Sol",
    line: "Era Residence — a place to return to.",
  },

  nav: {
    home: "Home",
    menu: "Menu",
    close: "Close",
    backToTop: "Back to top",
    apartments: "Select an Apartment",
    bookCall: "Book a call",
    contact: "Contact",
  },

  cookies: {
    title: "Cookies",
    body: "This website uses cookies to ensure you get the best experience on website.",
    accept: "Accept",
    decline: "Decline",
  },

  hero: {
    scroll: "Scroll",
    title: "Era Residence",
    titleLines: ["Era", "Residence"],
    city: "Estepona",
    line: "A place",
    toggleDay: "by day",
    toggleNight: "by night",
    lineEnd: "to return to",
    cta: "View available apartments",
    imageDay: "Era Residence gated community by day",
    imageNight: "Era Residence gated community by night",
  },

  intro: {
    region: "Costa del Sol",
    line: "A place to live — to return year after year",
  },

  reasons: {
    eyebrow: "Three reasons to choose Era",
    items: [
      {
        title: "Real-Life Location",
        image: asset.reasonLocation,
        body: "Nestled between pristine beaches, world-class golf courses and exclusive wellness clubs, Era Residence offers a rare balance of seclusion and seamless access to the finest Mediterranean lifestyle.",
        foot: "Designed as a community, not a complex",
      },
      {
        title: "Built to stay",
        image: asset.reasonBuilt,
        body: "Drawing on the spirit of Marbella's golden age, the design blends modern architecture with natural materials, lush landscaping and thoughtfully crafted spaces.",
        foot: "Designed as a community, not a complex",
      },
      {
        title: "Boutique concept",
        image: asset.reasonBoutique,
        body: "A boutique gated community of 25 residences on Costa del Sol, designed around privacy, wellbeing and timeless Mediterranean living.",
        foot: "Designed as a community, not a complex",
      },
    ],
    quote:
      "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard apartment building.",
    quoteBy: "Architecture Team",
    quoteBy2: "Era Residence",
  },

  concept: {
    eyebrow: "The concept",
    title: "The concept",
    lead: "ERA Residences is a boutique gated community of only 25 residences, designed around privacy, wellbeing and timeless Mediterranean living",
    body:
      "Inspired by the atmosphere of Marbella's golden era, the project combines contemporary architecture with warm materials, natural landscaping and carefully curated spaces.",
    image: asset.conceptAlpha,
    placeEyebrow: "Spain",
    placeTitle: "New Golden Mile",
    placeImage: asset.conceptTerrace,
    between: "Between Marbella and Estepona",
    betweenBody:
      "Surrounded by beaches, golf courses, wellness clubs and established lifestyle destinations, the project combines privacy with effortless connectivity to everything essential for Mediterranean living. A location designed not around movement — but around returning.",
    cta: "View available apartments",
  },

  map: {
    eyebrow: "The coast you wanted yours this year",
    labels: ["New Golden Mile, Estepona", "Costa del Sol", "Spain"],
    drag: "Drag to see more",
    masterPlanAlt: "Era Residence master plan",
  },

  typologies: {
    cta: "Explore",
    cards: [
      {
        slug: "ground-floor-basement",
        key: "ground-basement",
        title: "Ground floor + basement",
        beds: "3",
        area: "178 — 202 m²",
        body: "Private basement, direct outdoor access and a dedicated lower level.",
        image: asset.typGroundBasement,
        cta: "Explore Ground + basement",
      },
      {
        slug: "ground-floor",
        key: "ground",
        title: "Ground Floor",
        beds: "2",
        area: "97 — 104 m²",
        body: "Step directly onto your terrace and into the communal gardens, blending indoor comfort with outdoor living.",
        image: asset.typGround,
        cta: "Explore Ground floor",
      },
      {
        slug: "penthouse-duplex",
        key: "penthouse",
        title: "Penthouse duplex",
        beds: "2-3",
        area: "124 — 243 m²",
        body: "Two floors crowned with panoramic views and a private rooftop solarium — the ultimate expression of luxury living.",
        image: asset.typPenthouse,
        cta: "Explore Penthouses",
      },
    ],
  },

  range: {
    line: "A place to live — to return year after year",
    body:
      "Residences range from 104 to 244 sq.m., offering spacious single level and duplex layouts with generous terraces and rooftop solariums.",
  },

  amenities: {
    cta: "Book a call now",
    items: [
      {
        title: "Gated community",
        body: "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard apartment building.",
        image: asset.amGated,
      },
      {
        title: "Swimming Pool",
        body: "Saltwater swimming pool, Children's pool, Sauna, jacuzzi and wellness shower",
        image: asset.amPool,
      },
      {
        title: "Parking area",
        body: "Each parking space includes pre-installation for optional EV charging.",
        image: asset.amParking,
      },
      {
        title: "Spa & gym",
        body: "Designed exclusively for residents and their guests, the amenities at ERA encourage a slower and more balanced Mediterranean lifestyle",
        image: asset.amSpa,
      },
      {
        title: "Landscaping",
        body: "The landscaping concept was designed to soften the architecture and strengthen the connection between the residences and the Mediterranean environment.",
        image: asset.amLandscape,
      },
    ],
  },

  space: {
    eyebrow: "The space to Live in",
    title: "Live in",
    upgrades: "Optional upgrades are available:",
    upgradeList: ["Private jacuzzi", "EV charging point installation", "Photovoltaic panels"],
    body: "Every detail was selected to create homes that feel elegant, intuitive and effortless to live in",
    features: [
      "Underfloor heating throughout the property.",
      "Climate automation systems.",
      "Smart lock access systems.",
      "Electrically adjustable aluminium shutters.",
      "Schneider Electric DLIFE switches and mechanisms.",
    ],
    gallery: [asset.cam03, asset.cam07, asset.cam09, asset.kitchen],
    cta: "View available apartments",
  },

  architecture: {
    eyebrow: "Architecture",
    title:
      "The architecture of ERA Residences balances clean contemporary lines with Mediterranean warmth and texture",
    byPre: "By",
    byName: "Schiemann Weyers",
    bySecond: "Architects OCWA Architects",
    image: asset.cam02,
    facts: [
      { label: "Developer", value: "Swiss Technology S.L." },
      { label: "Sales & Marketing", value: "Unreal Estate Group", logo: asset.unrealLogo },
      {
        label: "License obtained",
        value:
          "The project holds all required permits and an active construction license. All documentation is publicly available. Construction is already underway — visit the site in person or follow progress via our live online stream.",
      },
      {
        label: "2026",
        value:
          "Currently under construction. The first phase of construction is underway, with ongoing development of the apartments and communal areas. Potential buyers can anticipate a modern living space upon completion of the build.",
      },
    ],
    closing:
      "A short conversation is enough to understand which apartment fits your use case — whether it is a family second home, a longer stay, or a place to return to year after year.",
    cta: "Book a call now",
  },

  closing: {
    title: "Perfect sea views",
    subtitle: "From rooftop terraces",
    image: asset.cta1920,
    cta: "View available apartments",
  },

  pillars: [
    {
      title: "Crafted to Endure",
      body: "Natural stone façades were selected for their timeless appearance, durability and ease of maintenance, allowing the architecture to age beautifully over time.",
    },
    {
      title: "Light & Flow",
      body: "Terraces, rooftop solariums and expansive openings maximize natural light while creating a seamless indoor outdoor lifestyle.",
    },
    {
      title: "Your Private Sanctuary",
      body: "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard apartment building.",
    },
  ],

  footer: {
    toTop: "To top",
    officeTitle: "Sales Office",
    officeAddress: "Avenida Litoral, 29680 Estepona, Málaga, Spain",
    rights: "©2026 All rights reserved",
    privacy: "Privacy policy",
    terms: "Terms of Use",
    madeBy: "Made by",
    wordmark: "Era Residence.",
    image: asset.cam09Footer,
  },

  apartments: {
    breadcrumb: "Select an Apartment",
    title: "Apartments",
    results: "apartments",
    filters: {
      typology: "Typology",
      bedrooms: "Bedrooms",
      sortBy: "Sort by",
      all: "All",
      reset: "Reset",
      sort: { relevant: "Relevant", asc: "Smallest area", desc: "Largest area" },
      typologyOptions: [
        { slug: "ground-floor-basement", label: "Ground floor + basement" },
        { slug: "ground-floor", label: "Ground Floor" },
        { slug: "penthouse-duplex", label: "Penthouse duplex" },
      ],
    },
    card: {
      completion: "Completion",
      bed: "bed",
      terracePrefix: "+ ",
      terraceSuffix: "M² Terrace",
    },
    empty: {
      title: "nothing found",
      body: "We didn't find anything for your request. Please, try changing your search settings",
    },
    bottomReasons: [
      {
        title: "Boutique concept",
        body: "A boutique gated community of 25 residences on Costa del Sol, designed around privacy, wellbeing and timeless Mediterranean living.",
        image: asset.exterior1,
      },
      {
        title: "Built to stay",
        body: "Drawing on the spirit of Marbella's golden age, the design blends modern architecture with natural materials, lush landscaping and thoughtfully crafted spaces.",
        image: asset.terraceView2,
      },
      {
        title: "Industrial finishing",
        body: "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard apartment building.",
        image: asset.groundFloor2,
      },
    ],
  },

  unit: {
    titlePrefix: "No.",
    bedrooms: "Bedrooms",
    interior: "Interior area",
    terrace: "Terrace",
    garden: "Garden",
    tabs: { info: "Info", benefits: "Benefits" },
    submit: "Submit a request",
    pdf: "pdf",
    similar: "similar options",
    similarLead: "Other apartments that might suit your needs",
    viewAll: "View all",
    galleryAlt: "Era Residence interior",
    footerImage: asset.unitFooterImage,
    notFound: {
      title: "Apartment not found",
      body: "This apartment is no longer listed. Browse everything that is currently available.",
      cta: "View all apartments",
    },
  },

  request: {
    title: "Submit a request",
    lead: "Leave your details and our sales team will send you the full brochure, floor plans and availability for this apartment.",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    message: "Message",
    apartment: "Apartment",
    consent: "I agree to be contacted about Era Residence.",
    submit: "Submit a request",
    sending: "Sending…",
    successTitle: "Thank you",
    successBody: "Your request has been received — our team will come back to you shortly.",
    again: "Send another request",
    close: "Close",
    errors: {
      name: "Please enter your name.",
      phone: "Please enter a valid phone number.",
      email: "Please enter a valid email address.",
      consent: "Please accept to be contacted.",
    },
  },

  contact: {
    breadcrumb: "Contact",
    title: "Contact us",
    subtitle: "Write us",
    salesOffice: "Sales Office",
    location: "Location",
    locationValue: "New Golden Mile, Estepona Costa del Sol, Spain",
    talkToUs: "Talk to us",
    whatsapp: "Whatsapp",
    social: { linkedin: "Linkedin", facebook: "Facebook", instagram: "Instagram" },
    mapAlt: "Era Residence sales office location",
    mapLabel: "sales office",
    hours: "Daily 09:00 – 21:00",
    cta: "Book a call now",
  },

  notFound: {
    title: "Page not found",
    body: "The page you are looking for has moved or no longer exists.",
    cta: "Back to home",
  },
} as const;

export type Copy = typeof copy;
