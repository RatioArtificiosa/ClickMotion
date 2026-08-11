export type Stockist = { name: string; address: string };

export type CityColumn = {
  city: string;
  locations: Stockist[];
};

export const STOCKIST_CITIES: CityColumn[] = [
  {
    city: "Wellington",
    locations: [
      { name: "Moore Wilson's Fresh", address: "93 Tory Street" },
      { name: "Commonsense Organics", address: "260 Wakefield Street" },
      { name: "Customs by Coffee Supreme", address: "39 Ghuznee Street" },
      { name: "Mecca Cuba", address: "71 Cuba Street" },
      { name: "Goodness Gracious", address: "122 Aro Street" },
    ],
  },
  {
    city: "Auckland",
    locations: [
      { name: "Farro Fresh Grey Lynn", address: "422 Great North Road" },
      { name: "Daily Bread Britomart", address: "11 Britomart Place" },
      { name: "Allpress Espresso Ponsonby", address: "12 Drake Street" },
      { name: "Cazador", address: "854 Dominion Road" },
      { name: "Eighthirty Newmarket", address: "53 Davis Crescent" },
    ],
  },
  {
    city: "Christchurch",
    locations: [
      { name: "Vic's Cafe", address: "132 Victoria Street" },
      { name: "C1 Espresso", address: "185 High Street" },
      { name: "Caffeine Laboratory", address: "1 New Regent Street" },
      { name: "Hummingbird Coffee", address: "269 Tuam Street" },
      { name: "Black Betty", address: "165 Madras Street" },
    ],
  },
];

export const COMING_SOON = [
  "Melbourne",
  "Sydney",
  "London",
  "New York",
  "Tokyo",
] as const;

export type ShopProduct = {
  sku: string;
  number: string;
  name: string;
  flavor: string;
  blurb: string;
  fourPack: number;
  twelvePack: number;
  accent: string;
  image: string;
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    sku: "01",
    number: "ACTUALLY.01",
    name: "Clear",
    flavor: "Cucumber & Yuzu",
    blurb: "For when you need to think clearly, all day.",
    fourPack: 24,
    twelvePack: 64,
    accent: "#bcd3d8",
    image: "/images/cans/Actually-01.png",
  },
  {
    sku: "02",
    number: "ACTUALLY.02",
    name: "Dawn",
    flavor: "Ginger & Bergamot",
    blurb: "For mornings that need momentum without the spike.",
    fourPack: 24,
    twelvePack: 64,
    accent: "#e8c9a0",
    image: "/images/cans/Actually-02.png",
  },
  {
    sku: "03",
    number: "ACTUALLY.03",
    name: "Dusk",
    flavor: "Blackcurrant & Manuka",
    blurb: "For late focus that won't follow you to bed.",
    fourPack: 24,
    twelvePack: 64,
    accent: "#c9b5c8",
    image: "/images/cans/Actually-03.png",
  },
];
