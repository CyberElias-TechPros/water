export const brand = {
  name: "AQUARIS",
  legal: "Aquaris Water Company Limited",
  tagline: "Pure Refreshment. Every Drop Matters.",
  phone: "+234 801 234 5678",
  phoneHref: "tel:+2348012345678",
  whatsapp: "2348012345678",
  email: "hello@aquaris.ng",
  wholesaleEmail: "wholesale@aquaris.ng",
  address: "14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  plant: "Km 12, Lagos–Ibadan Expressway, Ogun State",
  hours: "Mon – Sat · 8:00am – 6:00pm",
  founded: 2012,
};

export const whatsappLink = (message = "Hello AQUARIS, I'd like to ask about your table water.") =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;

export const stats = [
  { value: 1.4, suffix: "M", label: "Bottles bottled each month", decimals: 1 },
  { value: 18, suffix: "", label: "Cities we deliver to", decimals: 0 },
  { value: 480, suffix: "+", label: "Distribution partners", decimals: 0 },
  { value: 99.6, suffix: "%", label: "On-time delivery rate", decimals: 1 },
];

export const testimonials = [
  {
    quote:
      "We switched our entire hotel to AQUARIS last year. Guests notice the difference, and the delivery team has never once missed our 6am window.",
    name: "Adaeze Nwosu",
    role: "Operations Manager",
    company: "Eko Grand Hotel",
    city: "Victoria Island, Lagos",
    initials: "AN",
    rating: 5,
  },
  {
    quote:
      "Running a 60-person office used to mean someone was always chasing water. Now it arrives every Monday before the team does — sealed, stacked and counted.",
    name: "Tunde Balogun",
    role: "Facilities Lead",
    company: "Meridian Partners",
    city: "Ikoyi, Lagos",
    initials: "TB",
    rating: 5,
  },
  {
    quote:
      "The 50cl Classic is our best seller at the counter. Customers buy one, then come back for a pack. Stock moves fast and the margins are honest.",
    name: "Ifeoma Eze",
    role: "Owner",
    company: "Green Basket Stores",
    city: "Enugu",
    initials: "IE",
    rating: 5,
  },
  {
    quote:
      "We ordered 900 bottles for a wedding with four days' notice. They arrived chilled, labelled and perfectly packed. Not a single dented case.",
    name: "Chinedu & Maya Okonkwo",
    role: "Private customers",
    company: "Wedding, Lekki",
    city: "Lagos",
    initials: "CO",
    rating: 5,
  },
  {
    quote:
      "As a distributor, what I care about is consistency. Same taste, same seal, same invoice format, every single month for three years.",
    name: "Musa Ibrahim",
    role: "Distributor",
    company: "Ibrahim Trading Co.",
    city: "Kano",
    initials: "MI",
    rating: 5,
  },
  {
    quote:
      "Their quality team actually answers questions. They sent us batch test summaries before we signed. That is rare in this market.",
    name: "Dr. Funmi Adeyemi",
    role: "Procurement",
    company: "Civic Health Clinics",
    city: "Abuja",
    initials: "FA",
    rating: 4.5,
  },
];

export const whyUs = [
  {
    title: "Purified in seven stages",
    body: "Sand, carbon, softening, two-stage micron filtration, UV and ozone. Every stage is monitored and logged, every batch is sampled.",
    icon: "filter",
  },
  {
    title: "Sealed at the source",
    body: "Bottling, capping and coding happen inside one clean room, minutes from our borehole. Nothing waits in a truck to be sealed elsewhere.",
    icon: "seal",
  },
  {
    title: "Delivery you can plan around",
    body: "Same-day Lagos delivery, scheduled office refills, and a 2-hour pickup window at the plant. Live updates on every order.",
    icon: "truck",
  },
  {
    title: "Honest, tested quality",
    body: "We publish what we test for. Ask our team for the current batch summary and we will send it the same working day.",
    icon: "shield",
  },
  {
    title: "Better packaging choices",
    body: "100% recyclable PET, reusable 19L bottles, and shrink wrap we are actively replacing with recycled content.",
    icon: "leaf",
  },
  {
    title: "People who answer",
    body: "One WhatsApp number, one phone line, real humans. Average first response time: 6 minutes during business hours.",
    icon: "chat",
  },
];

export const purificationSteps = [
  {
    step: "01",
    title: "Aquifer extraction",
    body: "Water is drawn from a 148-metre deep-bore aquifer in Ogun State, protected by a sealed wellhead and tested at extraction.",
    metric: "148m deep source",
  },
  {
    step: "02",
    title: "Sand filtration",
    body: "Multi-media sand beds trap suspended particles and sediment, bringing raw turbidity down before finer treatment begins.",
    metric: "Turbidity < 0.3 NTU",
  },
  {
    step: "03",
    title: "Carbon polishing",
    body: "Activated carbon adsorbs odour, colour and any residual organics, leaving the water neutral and clean-tasting.",
    metric: "Odour & colour removed",
  },
  {
    step: "04",
    title: "Softening & mineral balance",
    body: "A controlled mineral step brings calcium and magnesium into a balanced, pleasant range instead of stripping the water bare.",
    metric: "TDS 45 – 90 mg/L",
  },
  {
    step: "05",
    title: "Two-stage micron filtration",
    body: "Five-micron then one-micron cartridge filters catch anything left behind — down to a fraction of the width of a hair.",
    metric: "1µm final pass",
  },
  {
    step: "06",
    title: "UV sterilisation",
    body: "Water passes through enclosed ultraviolet chambers before bottling. No chemicals, no residue, no waiting time.",
    metric: "254nm UV",
  },
  {
    step: "07",
    title: "Ozone finish & sealing",
    body: "A final ozone dose protects the water in the bottle, then caps are applied and coded inside a filtered clean room.",
    metric: "Filled & sealed same shift",
  },
];

export const values = [
  {
    title: "Clarity",
    body: "Clear water, clear pricing, clear answers. If something is not right with an order, we say so and fix it.",
  },
  {
    title: "Consistency",
    body: "A bottle in December should taste exactly like a bottle in June. That is a discipline, not a marketing line.",
  },
  {
    title: "Care",
    body: "For the people who drink it, the drivers who move it and the communities where we draw it.",
  },
];

export const timeline = [
  { year: "2012", title: "One borehole, one truck", body: "AQUARIS begins in Ogun State with a single purification line and 40 cases delivered a week." },
  { year: "2015", title: "Lagos distribution opens", body: "Our first Lekki depot opens, bringing same-day delivery to the island." },
  { year: "2018", title: "Home & office refills", body: "The returnable 19L bottle launches with weekly office routes across Lagos." },
  { year: "2021", title: "Second purification line", body: "Capacity triples, and an in-house laboratory joins the plant floor." },
  { year: "2023", title: "18 cities", body: "Distribution partners extend our reach to Abuja, Port Harcourt, Enugu, Kano and beyond." },
  { year: "2026", title: "Rethinking packaging", body: "Recycled-content shrink wrap and a lighter bottle enter trial across our on-the-go range." },
];

export type Distributor = {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  type: "Flagship" | "Distributor" | "Retail partner";
  hours: string;
  coverage: string;
  lat: number;
  lng: number;
};

export const distributors: Distributor[] = [
  {
    id: "d1",
    name: "AQUARIS Lekki Flagship",
    city: "Lekki",
    state: "Lagos",
    address: "14 Admiralty Way, Lekki Phase 1",
    phone: "+234 801 234 5678",
    type: "Flagship",
    hours: "Mon–Sat, 8am–6pm",
    coverage: "Lekki, Ikoyi, Victoria Island, Ajah",
    lat: 6.4415,
    lng: 3.4718,
  },
  {
    id: "d2",
    name: "Ikeja Trade Depot",
    city: "Ikeja",
    state: "Lagos",
    address: "27 Allen Avenue, Ikeja",
    phone: "+234 802 345 6789",
    type: "Distributor",
    hours: "Mon–Sat, 7am–7pm",
    coverage: "Ikeja, Oshodi, Agege, Alimosho",
    lat: 6.6018,
    lng: 3.3515,
  },
  {
    id: "d3",
    name: "Surulere Retail Hub",
    city: "Surulere",
    state: "Lagos",
    address: "8 Bode Thomas Road, Surulere",
    phone: "+234 803 456 7890",
    type: "Retail partner",
    hours: "Mon–Sun, 8am–8pm",
    coverage: "Surulere, Yaba, Ebute Metta",
    lat: 6.5004,
    lng: 3.3506,
  },
  {
    id: "d4",
    name: "Wuse Distribution Centre",
    city: "Wuse",
    state: "Abuja FCT",
    address: "Plot 112, Aminu Kano Crescent, Wuse 2",
    phone: "+234 805 567 8901",
    type: "Distributor",
    hours: "Mon–Sat, 8am–6pm",
    coverage: "Wuse, Maitama, Garki, Gwarinpa",
    lat: 9.0765,
    lng: 7.4719,
  },
  {
    id: "d5",
    name: "Port Harcourt Depot",
    city: "Port Harcourt",
    state: "Rivers",
    address: "4 Olu Obasanjo Road, Rumuola",
    phone: "+234 806 678 9012",
    type: "Distributor",
    hours: "Mon–Sat, 8am–6pm",
    coverage: "Port Harcourt, Eleme, Trans-Amadi",
    lat: 4.8156,
    lng: 7.0498,
  },
  {
    id: "d6",
    name: "Ibadan Wholesale Point",
    city: "Ibadan",
    state: "Oyo",
    address: "22 Ring Road, Ibadan",
    phone: "+234 807 789 0123",
    type: "Distributor",
    hours: "Mon–Sat, 7am–7pm",
    coverage: "Ibadan, Oyo town, Moniya",
    lat: 7.3775,
    lng: 3.947,
  },
  {
    id: "d7",
    name: "Kano Trade Partner",
    city: "Kano",
    state: "Kano",
    address: "18 Murtala Muhammed Way, Fagge",
    phone: "+234 808 890 1234",
    type: "Distributor",
    hours: "Mon–Sat, 8am–6pm",
    coverage: "Kano metro, Sabon Gari, Nassarawa",
    lat: 12.0022,
    lng: 8.5919,
  },
  {
    id: "d8",
    name: "Enugu Retail Partner",
    city: "Enugu",
    state: "Enugu",
    address: "6 Ogui Road, Independence Layout",
    phone: "+234 809 901 2345",
    type: "Retail partner",
    hours: "Mon–Sun, 8am–8pm",
    coverage: "Enugu, Nike, GRA",
    lat: 6.4402,
    lng: 7.4943,
  },
  {
    id: "d9",
    name: "Asaba Distribution Point",
    city: "Asaba",
    state: "Delta",
    address: "11 Okpanam Road, Asaba",
    phone: "+234 810 012 3456",
    type: "Distributor",
    hours: "Mon–Sat, 8am–6pm",
    coverage: "Asaba, Ibusa, Onitsha bridge",
    lat: 6.198,
    lng: 6.7296,
  },
  {
    id: "d10",
    name: "Benin City Hub",
    city: "Benin City",
    state: "Edo",
    address: "Ring Road, Benin City",
    phone: "+234 811 123 4567",
    type: "Retail partner",
    hours: "Mon–Sat, 8am–7pm",
    coverage: "Benin, Sapele Road, Ugbowo",
    lat: 6.335,
    lng: 5.6037,
  },
  {
    id: "d11",
    name: "Onitsha Wholesale Centre",
    city: "Onitsha",
    state: "Anambra",
    address: "Main Market Road, Onitsha",
    phone: "+234 812 234 5678",
    type: "Distributor",
    hours: "Mon–Sat, 6am–7pm",
    coverage: "Onitsha, Nnewi, Awka",
    lat: 6.1414,
    lng: 6.802,
  },
  {
    id: "d12",
    name: "Uyo Retail Partner",
    city: "Uyo",
    state: "Akwa Ibom",
    address: "45 Oron Road, Uyo",
    phone: "+234 813 345 6789",
    type: "Retail partner",
    hours: "Mon–Sat, 8am–7pm",
    coverage: "Uyo, Itu, Ikot Ekpene",
    lat: 5.0377,
    lng: 7.9128,
  },
];

export const news = [
  {
    id: "cold-chain-lekki",
    date: "2026-10-28",
    category: "Operations",
    title: "A colder route: our new Lekki chill vans",
    excerpt:
      "Six new refrigerated vans now keep on-the-go bottles between 8°C and 12°C from plant to doorstep — a first for our Lagos routes.",
    read: "3 min read",
    body: [
      "Anyone who has opened a warm bottle on a hot Lagos afternoon knows the difference a few degrees make. This month we took delivery of six refrigerated vans dedicated to our island and Lekki routes.",
      "Bottles are loaded straight from our chilled staging area and held between 8°C and 12°C for the entire journey. Drivers can monitor temperature from the cab, and every route log is reviewed the following morning.",
      "The trial covers Lekki, Victoria Island, Ikoyi and Ajah first. If the data holds through December, the same setup will roll out to our Ikeja and Abuja depots in the first quarter.",
    ],
  },
  {
    id: "recycled-wrap",
    date: "2026-09-16",
    category: "Sustainability",
    title: "Trialling 30% recycled shrink wrap",
    excerpt:
      "Our packaging team has begun a six-month trial replacing virgin shrink film with a recycled-content blend across the 75cl range.",
    read: "4 min read",
    body: [
      "Shrink wrap is the least glamorous part of bottled water and one of the hardest to change. This quarter we began a controlled trial using a film with 30% post-industrial recycled content.",
      "Early results are encouraging: seal strength is within 2% of our current film and pack integrity has held through 400 simulated transit cycles.",
      "We will publish the full trial summary when it closes in March — including what worked, what did not, and what it costs.",
    ],
  },
  {
    id: "abuja-second-line",
    date: "2026-08-04",
    category: "Growth",
    title: "Abuja depot doubles its capacity",
    excerpt:
      "Demand from offices in the FCT pushed our Wuse distribution centre to expand storage and add a second daily dispatch window.",
    read: "2 min read",
    body: [
      "When we opened the Wuse centre in 2023, it was sized for 60 deliveries a week. Today it runs more than 240.",
      "The expanded facility adds 400 square metres of racked storage and a second dispatch window at 1pm, which should bring average FCT delivery times down to under five hours.",
      "The team is also now stocking the full 19L range, so Abuja offices can move to scheduled refills without a Lagos transfer.",
    ],
  },
  {
    id: "batch-report-q3",
    date: "2026-07-22",
    category: "Quality",
    title: "Q3 batch testing summary, published",
    excerpt:
      "Every batch we filled this quarter was sampled and tested. Here is what the laboratory looked at, in plain language.",
    read: "5 min read",
    body: [
      "Between July and September we filled 214 production batches. Each one was sampled at three points: after UV treatment, at the filler head, and from finished stock.",
      "Testing covered microbiological indicators, turbidity, pH, conductivity and total dissolved solids. All 642 samples fell within our internal specification.",
      "If you are a wholesale or corporate customer and would like the detailed summary for your own records, email quality@aquaris.ng and we will send it the same working day.",
    ],
  },
  {
    id: "events-season",
    date: "2026-06-11",
    category: "Service",
    title: "Planning an event? Here is how bulk orders work",
    excerpt:
      "From 200 bottles for a launch to 2,000 for a wedding, our events desk can hold a date, chill the stock and deliver on the morning.",
    read: "3 min read",
    body: [
      "Event orders have one thing in common: a fixed deadline. Our events desk works backwards from your delivery window rather than forwards from the order date.",
      "Tell us the date, the venue, the bottle size and whether you want them chilled. We confirm availability, send a proforma invoice, and block production capacity for your batch.",
      "Orders above 500 bottles qualify for event pricing, and reusable branded coolers are available on request at no extra cost for Lagos venues.",
    ],
  },
  {
    id: "driver-training",
    date: "2026-05-19",
    category: "People",
    title: "Forty drivers, one customer service standard",
    excerpt:
      "Every AQUARIS driver now completes a two-day programme on handling, hygiene and how to speak to a customer at the door.",
    read: "2 min read",
    body: [
      "A delivery is often the only part of our business a customer sees in person. That is why every driver joins a two-day programme before their first route.",
      "The training covers load handling, bottle hygiene, paperwork accuracy and — the part drivers ask for most — what to do when something goes wrong at the door.",
      "We also added a simple customer feedback line on every invoice, so route managers hear directly about the experience.",
    ],
  },
];

export const faqs = [
  {
    q: "Where does AQUARIS water come from?",
    a: "Our water is drawn from a 148-metre deep-bore aquifer in Ogun State, Nigeria. The wellhead is sealed and protected, and water is tested at extraction before any treatment begins.",
  },
  {
    q: "Is delivery really same-day in Lagos?",
    a: "For orders placed before 1pm, yes — across the island, Lekki, Ikeja and the mainland. Orders placed later are delivered the next morning. Pickup at the plant is ready within two hours.",
  },
  {
    q: "How is the water purified?",
    a: "Seven stages: sand filtration, activated carbon, softening and mineral balance, 5-micron filtration, 1-micron filtration, UV sterilisation and an ozone finish before capping and sealing.",
  },
  {
    q: "Do you supply offices, hotels and events?",
    a: "We do. Scheduled office refills, hotel housekeeping routes, event bulk orders and corporate pantry supply all run through our business desk. Use the wholesale form or WhatsApp us for pricing.",
  },
  {
    q: "What is the minimum wholesale order?",
    a: "Wholesale pricing starts at 40 packs per drop within Lagos and 100 packs for other states. Distributor pricing is available from one full pallet.",
  },
  {
    q: "How should I store my bottles?",
    a: "Keep bottles sealed, upright and away from direct sunlight and heat. Once opened, refrigerate and finish within a few days. Our 19L bottles are returned and sanitised between refills.",
  },
];

export const wholesaleTiers = [
  {
    name: "Pantry",
    target: "Offices & clinics",
    minimum: "10 – 39 packs",
    discount: "Up to 8% off",
    perks: ["Scheduled weekly or fortnightly delivery", "Free 19L dispenser loan", "Single monthly invoice", "Dedicated WhatsApp line"],
  },
  {
    name: "Trade",
    target: "Stores, hotels & events",
    minimum: "40 – 199 packs",
    discount: "Up to 15% off",
    perks: ["Next-day delivery in Lagos", "Event-date stock blocking", "Branded coolers on request", "Quarterly batch summaries"],
    featured: true,
  },
  {
    name: "Distributor",
    target: "Regional partners",
    minimum: "One full pallet+",
    discount: "Best pricing",
    perks: ["Protected territory options", "Pallet pricing & credit terms", "Marketing and POS support", "Dedicated account manager"],
  },
];
