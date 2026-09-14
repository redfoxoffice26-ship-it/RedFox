import { Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'rf-velocity-x1',
    name: 'RED FOX Velocity X-1',
    tagline: 'Hyper-responsive marathon & tempo road racer',
    category: 'Sports',
    gender: 'Unisex',
    price: 185,
    originalPrice: 220,
    isSale: true,
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 142,
    description: 'The flagship runner engineered for unmatched energy return. Built with our proprietary FoxNitro™ foam and a featherlight carbon-composite shank, the Velocity X-1 propels every stride forward with explosive propulsion and relentless grip.',
    details: [
      'FoxNitro™ dual-density supercritical nitrogen-infused midsole',
      'Full-length carbon composite torsion plate for snappy toe-off',
      'Ultra-breathable AeroWeave engineered jacquard upper',
      'FoxGrip™ segmented rubber pods for confident wet and dry traction',
      'Padded heel counter with Achilles tendon relief groove'
    ],
    specs: {
      weight: '215g (Men US 9)',
      drop: '8mm (36mm heel / 28mm forefoot)',
      cushioning: 'Responsive',
      surface: 'Road, Track, Pavement',
      upper: 'Engineered AeroWeave Matrix',
      outsole: 'FoxGrip™ High-Abrasion Blown Rubber'
    },
    colors: [
      { name: 'Crimson Red / Obsidian', hex: '#C8102E' },
      { name: 'Stealth Black / Crimson', hex: '#171717' },
      { name: 'Pure White / Wolf Gray', hex: '#FFFFFF' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 48,
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        rating: 5,
        date: '2 days ago',
        title: 'Shaved 4 minutes off my half-marathon PB!',
        comment: 'The energy return on the Velocity X-1 is phenomenal. The crimson red colorway turns heads at every race start line. Fits true to size with exceptional lockdown.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '1 week ago',
        title: 'Lightest shoe I have ever trained in',
        comment: 'Breathability is unmatched during humid summer training blocks. The heel cup stays anchored without causing any blistering.',
        verified: true
      },
      {
        id: 'rev-3',
        author: 'David K.',
        rating: 4,
        date: '2 weeks ago',
        title: 'Great speed shoe, firm ride',
        comment: 'Not an ultra-cushioned recovery cruiser, but for intervals and tempo miles, it gives you that aggressive forward roll.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-apex-strider-men',
    name: 'RED FOX Apex Strider Pro',
    tagline: 'High-mileage daily trainer with adaptive shock absorption',
    category: 'Men',
    gender: 'Men',
    price: 160,
    originalPrice: 160,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 98,
    description: 'Designed to soak up heavy weekly mileage without losing responsiveness. The Apex Strider combines plush CloudFoam™ underfoot with an anatomical heel cradle for zero-distraction endurance running.',
    details: [
      'CloudFoam™ Max midsole compound with 28% softer landing zones',
      'Seamless BioKnit upper woven from 65% recycled ocean yarns',
      'Anatomical midfoot wrap delivers glove-like stability',
      'Reflective 3M heel accents for dusk and early dawn safety',
      'Ortholite® Hybrid ergonomic footbed'
    ],
    specs: {
      weight: '265g (Men US 9)',
      drop: '10mm',
      cushioning: 'Max',
      surface: 'Road, Treadmill, Light Gravel',
      upper: 'BioKnit Seamless Poly-Yarn',
      outsole: 'FoxGrip™ Full Ground Contact'
    },
    colors: [
      { name: 'Obsidian Black / Solar Red', hex: '#111827' },
      { name: 'Crimson Red / Carbon', hex: '#C8102E' },
      { name: 'Charcoal / Platinum', hex: '#374151' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 62,
    reviews: [
      {
        id: 'rev-4',
        author: 'Liam Ross',
        rating: 5,
        date: '3 weeks ago',
        title: 'Daily workhorse perfection',
        comment: 'Logged 200 miles so far and the foam feels just as bouncy as day one. Outstanding durability on asphalt.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-pulse-glide-women',
    name: 'RED FOX Pulse Glide W',
    tagline: 'Ultralight women’s athletic runner tailored to female ergonomics',
    category: 'Women',
    gender: 'Women',
    price: 155,
    originalPrice: 175,
    isSale: true,
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 114,
    description: 'Precision-tailored with a narrower heel cup, sculpted instep, and calibrated rebound firmness for female runners. Glide through workouts with effortless forward momentum and elegant athletic styling.',
    details: [
      'Ergonomically contoured footbed designed specifically for women',
      'Dual-layer AirFlow mesh prevents hotspots on long runs',
      'Reinforced TPU eyelets for dynamic adaptive lacing',
      'Beveled heel crash pad smooths out heel strike transitions',
      'Machine-washable moisture-wicking sockliner'
    ],
    specs: {
      weight: '198g (Women US 7.5)',
      drop: '9mm',
      cushioning: 'Balanced',
      surface: 'Road, Track, Fitness Studio',
      upper: 'AirFlow 3D Micro-Knit',
      outsole: 'FoxGrip™ Flex-Groove Compound'
    },
    colors: [
      { name: 'Crimson Red / Frost Rose', hex: '#C8102E' },
      { name: 'Chalk White / Charcoal', hex: '#F9FAFB' },
      { name: 'Jet Black / Crimson', hex: '#18181B' }
    ],
    sizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 54,
    reviews: [
      {
        id: 'rev-5',
        author: 'Chloe Simmons',
        rating: 5,
        date: '5 days ago',
        title: 'Fits my feet like a glove',
        comment: 'Finally a performance shoe that locks down my narrow heel without suffocating the forefoot. Plus the design looks gorgeous with athleisure.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-phantom-court',
    name: 'RED FOX Phantom Court',
    tagline: 'Agile lateral stability sneaker for indoor courts & turf',
    category: 'Sports',
    gender: 'Men',
    price: 140,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 76,
    description: 'When sudden cuts and explosive pivots dictate the game, the Phantom Court stands resilient. Reinforced lateral TPU outriggers and non-marking FoxClaw rubber keep you anchored on tennis courts, pickleball turf, and gym floors.',
    details: [
      'Reinforced medial drag shield resists wear during court slides',
      'Non-marking gum/rubber hybrid multi-directional herringbone pattern',
      'Side-wall wrap locks the foot over the footbed during hard deceleration',
      'Anti-microbial treated interior lining'
    ],
    specs: {
      weight: '310g (Men US 9)',
      drop: '6mm',
      cushioning: 'Balanced',
      surface: 'Hard Court, Gym Turf, Indoor',
      upper: 'Reinforced Synthetic Leather & Ripstop',
      outsole: 'FoxClaw™ Non-Marking Gum Rubber'
    },
    colors: [
      { name: 'Crisp White / Crimson', hex: '#FFFFFF' },
      { name: 'Midnight Charcoal / Red', hex: '#262626' },
      { name: 'Red Fox Crimson', hex: '#C8102E' }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 39,
    reviews: [
      {
        id: 'rev-6',
        author: 'Andre Moreau',
        rating: 5,
        date: '1 month ago',
        title: 'Zero ankle rolling on the pickleball court',
        comment: 'Lateral rigidity is stellar. Clean white and red look that gets tons of compliments.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-metro-craft-leather',
    name: 'RED FOX Metro Craft',
    tagline: 'Minimalist full-grain premium leather everyday sneaker',
    category: 'Casual',
    gender: 'Unisex',
    price: 170,
    originalPrice: 195,
    isSale: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 88,
    description: 'Where athletic comfort meets sartorial elegance. Hand-finished Italian full-grain leather uppers rested on our ultra-cushioned FoxLite EVA cupsole. Versatile enough for smart casual boardroom meetings and weekend city explorations.',
    details: [
      'Supple certified full-grain bovine leather with subtle burnished edges',
      'Waxed organic cotton laces with engraved brass aglets',
      'FoxLite hidden drop-in memory foam insole',
      'Serrated rubber perimeter foxing for lasting abrasion resistance',
      'Signature embossed RED FOX crest on tongue and heel tab'
    ],
    specs: {
      weight: '340g (US 9)',
      drop: '4mm',
      cushioning: 'Balanced',
      surface: 'City Streets, Office, Casual Wear',
      upper: 'Full-Grain Tuscan Leather',
      outsole: 'FoxLite Siped Rubber Cupsole'
    },
    colors: [
      { name: 'Triple White / Crimson Accent', hex: '#FFFFFF' },
      { name: 'Onyx Black / Gum Sole', hex: '#111827' },
      { name: 'Smoked Charcoal Suede', hex: '#4B5563' }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 45,
    reviews: [
      {
        id: 'rev-7',
        author: 'Julian Thorne',
        rating: 5,
        date: '2 weeks ago',
        title: 'The ultimate smart-casual sneaker',
        comment: 'Wore these on a 3-day European walking trip right out of the box with zero break-in pain. Leather is butter soft.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-wild-trail-gtx',
    name: 'RED FOX Wild Trail Terra',
    tagline: 'All-terrain armored trail beast with deep lug traction',
    category: 'Sports',
    gender: 'Men',
    price: 190,
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 65,
    description: 'Engineered for rocky scrambles, muddy forest ascents, and steep singletracks. Deep 5.5mm multi-directional lugs bite into soft terrain while the rock shield plate guards your arches against jagged roots and sharp boulders.',
    details: [
      '5.5mm chevron lug pattern oriented for braking and uphill drive',
      'Forefoot rock-protection ballistic ESS plate',
      'DWR water-shedding ripstop nylon upper with rubberized mudguard',
      'Lace garage on tongue keeps laces clean and snag-free',
      'Gaiter attachment points built-in'
    ],
    specs: {
      weight: '295g (Men US 9)',
      drop: '6mm (30mm heel / 24mm forefoot)',
      cushioning: 'Balanced',
      surface: 'Technical Trails, Mud, Loose Scree',
      upper: 'Ballistic Ripstop with TPU overlays',
      outsole: 'FoxGrip™ Arctic/Mud Sticky Rubber'
    },
    colors: [
      { name: 'Red Fox Crimson / Iron Gray', hex: '#C8102E' },
      { name: 'Forest Moss / Carbon', hex: '#374151' },
      { name: 'Stealth Black', hex: '#000000' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    images: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 31,
    reviews: [
      {
        id: 'rev-8',
        author: 'Elena Rostova',
        rating: 5,
        date: '4 days ago',
        title: 'Conquered wet rocky trails with zero slips',
        comment: 'The grip on wet granite is unbelievable. Kept my feet dry and blister-free on a 25km mountain loop.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-junior-speed-cub',
    name: 'RED FOX Speed Cub Junior',
    tagline: 'Flexible, high-durability kids runner for non-stop play',
    category: 'Kids',
    gender: 'Kids',
    price: 68,
    originalPrice: 85,
    isSale: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 52,
    description: 'Built tough for playground sprints, school sports, and active youngsters. Features an elastic bungee lacing system with quick-fasten hook-and-loop strap, reinforced scuff-proof toe caps, and featherweight shock-absorbing soles.',
    details: [
      'Easy-on bungee laces with secure top hook-and-loop strap',
      'Reinforced ArmorToe cap prevents scuffing and toe wear',
      'Non-marking flexible sole grooves encourage natural foot development',
      'Breathable athletic mesh keeps active feet cool and odor-resistant'
    ],
    specs: {
      weight: '145g (Kids US 1)',
      drop: '4mm',
      cushioning: 'Balanced',
      surface: 'Playground, School Gym, Sidewalks',
      upper: 'Abrasion-Resistant Engineered Mesh',
      outsole: 'FoxPlay™ Flexible Non-Marking Rubber'
    },
    colors: [
      { name: 'Red Fox Racing Red / White', hex: '#C8102E' },
      { name: 'Cobalt Blue / Crimson', hex: '#1E3A8A' },
      { name: 'Jet Black / Neon Orange', hex: '#18181B' }
    ],
    sizes: [1, 2, 3, 4, 5, 6],
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 58,
    reviews: [
      {
        id: 'rev-9',
        author: 'Rebecca Miller',
        rating: 5,
        date: '1 week ago',
        title: 'Only shoe my 8-year-old hasn’t destroyed!',
        comment: 'Usually shoes last him 2 months before the toe blows out. The toe bumper on these is bulletproof, and he loves putting them on by himself.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-aero-knit-flux',
    name: 'RED FOX AeroKnit Flux',
    tagline: 'Featherlight sock-fit daily slip-on with dynamic rebound',
    category: 'Casual',
    gender: 'Women',
    price: 130,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 84,
    description: 'Step into seamless simplicity. The AeroKnit Flux contours to your foot like a second skin with an elasticated ribbed collar and plush dual-density EVA bed for cloud-like comfort from sunrise coffee to evening strolls.',
    details: [
      'One-piece circular knit upper adapts to foot swelling throughout the day',
      'Slip-on sock silhouette with rear woven pull-tab',
      'Removable contoured memory foam insole',
      'Segmented outsole flexes naturally with every step'
    ],
    specs: {
      weight: '180g (Women US 8)',
      drop: '6mm',
      cushioning: 'Max',
      surface: 'Casual, Travel, Walking',
      upper: 'Elasticized 3D Circular Knit',
      outsole: 'FoxLite Cloud Midsole/Outsole'
    },
    colors: [
      { name: 'Crimson Ember', hex: '#C8102E' },
      { name: 'Heather Gray / White', hex: '#9CA3AF' },
      { name: 'Midnight Charcoal', hex: '#1F2937' }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 40,
    reviews: [
      {
        id: 'rev-10',
        author: 'Danielle Brooks',
        rating: 5,
        date: '3 weeks ago',
        title: 'Perfect for long travel days',
        comment: 'Slipped through airport security in seconds and walked 15,000 steps without tired feet.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-ignite-track-spike',
    name: 'RED FOX Ignite Track Pro',
    tagline: 'Competition-grade sprint & mid-distance track spike',
    category: 'Sports',
    gender: 'Men',
    price: 165,
    rating: 4.8,
    reviewCount: 39,
    description: 'Engineered strictly for podium finishes. Featuring a rigid 6-pin Pebax® spike plate that locks into tartan tracks with zero energy dissipation, paired with a monofilament mesh skin that virtually vanishes on the foot.',
    details: [
      'Aggressive full-length 6-pin spike plate with pyramid pins included',
      'Ultrathin translucent monofilament upper shedding every superfluous gram',
      'Internal arch lockdown harness connected to lacing system',
      'Streamlined aerodynamic heel wedge'
    ],
    specs: {
      weight: '142g (Men US 9)',
      drop: '0mm (Flat Track)',
      cushioning: 'Minimal',
      surface: 'Outdoor & Indoor Tartan Track',
      upper: 'Monofilament Nano-Mesh',
      outsole: 'Rigid Pebax® 6-Pin Spike Plate'
    },
    colors: [
      { name: 'Fox Racing Crimson / Gold', hex: '#C8102E' },
      { name: 'Strobe White / Black', hex: '#FFFFFF' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 22,
    reviews: [
      {
        id: 'rev-11',
        author: 'Tyrone Washington',
        rating: 5,
        date: '2 weeks ago',
        title: 'Explosive start from the blocks',
        comment: 'The plate stiffness gives you incredible leverage in the 200m and 400m.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-zenith-lifestyle-low',
    name: 'RED FOX Zenith Street Low',
    tagline: 'Retro skate-inspired low top sneaker in premium suede',
    category: 'Casual',
    gender: 'Unisex',
    price: 110,
    originalPrice: 135,
    isSale: true,
    rating: 4.6,
    reviewCount: 72,
    description: 'Heritage street aesthetics infused with modern athletic cushioning. Rich brushed suede panels, padded ankle collars, and a vulcanized rubber outsole make the Zenith an everyday classic.',
    details: [
      'Heavyweight 1.8mm brushed suede and organic cotton canvas upper',
      'Vulcanized waffle outsole construction with foxing tape reinforcement',
      'Molded polyurethane impact insole protects heels on pavement',
      'Padded collar and tongue for all-day comfort'
    ],
    specs: {
      weight: '360g (US 9)',
      drop: '2mm',
      cushioning: 'Balanced',
      surface: 'Casual, Skate, Concrete',
      upper: 'Premium Brushed Suede & Heavy Canvas',
      outsole: 'Vulcanized High-Grip Waffle Rubber'
    },
    colors: [
      { name: 'Charcoal Black / Crimson Fox', hex: '#1F2937' },
      { name: 'Ruby Crimson / White', hex: '#C8102E' },
      { name: 'Raw Natural Canvas', hex: '#E5E7EB' }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 50,
    reviews: [
      {
        id: 'rev-12',
        author: 'Samira Patel',
        rating: 5,
        date: '1 month ago',
        title: 'Super stylish and surprisingly comfortable',
        comment: 'Most skate-style sneakers have zero support, but the drop-in insole in the Zenith is actually cushy.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-vanguard-leather-oxford',
    name: 'RED FOX Vanguard Hybrid Derby',
    tagline: 'Formal tailored leather shoe with high-rebound athletic sole',
    category: 'Men',
    gender: 'Men',
    price: 195,
    rating: 4.8,
    reviewCount: 46,
    description: 'Command the boardroom and the commute in complete comfort. A sleek blucher derby silhouette hand-burnished in premium calfskin leather, seamlessly fused to our proprietary FoxFlex lightweight running sole.',
    details: [
      'Full-grain calfskin leather hand-burnished for rich depth of tone',
      'Discreet athletic midsole concealed in a classic welt profile',
      'Moisture-wicking calf leather interior lining',
      'Rubber traction pods on toe and heel for all-weather grip'
    ],
    specs: {
      weight: '330g (Men US 9)',
      drop: '8mm',
      cushioning: 'Responsive',
      surface: 'Office, Formal, City Pavement',
      upper: 'Hand-Burnished Calfskin Leather',
      outsole: 'FoxFlex Hybrid Dress Sole'
    },
    colors: [
      { name: 'Polished Black / Crimson Stitch', hex: '#111827' },
      { name: 'Rich Mahogany / Black', hex: '#4A1D1D' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 28,
    reviews: [
      {
        id: 'rev-13',
        author: 'Robert Sterling',
        rating: 5,
        date: '2 weeks ago',
        title: 'Commuting in formal shoes is no longer painful',
        comment: 'No more switching shoes on the train. Looks sharp with my suit, but feels like a plush running sneaker.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-aurora-tempo-women',
    name: 'RED FOX Aurora Tempo',
    tagline: 'High-energy interval and gym training shoe for women',
    category: 'Women',
    gender: 'Women',
    price: 145,
    originalPrice: 165,
    isSale: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 91,
    description: 'Engineered for explosive HIIT sessions, treadmill intervals, and cross-training circuits. Wide forefoot foundation gives you maximum balance during squats and lunges, while responsive nitrogen foam powers quick sprints.',
    details: [
      'Broad base forefoot with dual-direction flex channels for stability',
      'High-tensile TPU lacing wings provide lockdown during lateral hops',
      'Sweat-repelling micro-perforated collar keeps ankles dry',
      'FoxGrip™ multi-surface indoor-outdoor compound'
    ],
    specs: {
      weight: '210g (Women US 7.5)',
      drop: '7mm',
      cushioning: 'Responsive',
      surface: 'Gym, HIIT, Studio, Road',
      upper: 'Dynamic Engineered Spacer Mesh',
      outsole: 'FoxGrip™ Multi-Directional Pods'
    },
    colors: [
      { name: 'Crimson Red / Metallic Silver', hex: '#C8102E' },
      { name: 'Onyx Black / Orchid', hex: '#18181B' },
      { name: 'Pure White / Wolf Gray', hex: '#FFFFFF' }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 37,
    reviews: [
      {
        id: 'rev-14',
        author: 'Jessica Chen',
        rating: 5,
        date: '1 week ago',
        title: 'Best gym shoes I have ever owned',
        comment: 'Great lateral stability for box jumps and burpees. Never slips on sweaty gym rubber.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-cub-blaster-kids',
    name: 'RED FOX Cub Blaster Light',
    tagline: 'Lightweight, easy-on athletic sneaker for active kids',
    category: 'Kids',
    gender: 'Kids',
    price: 55,
    rating: 4.7,
    reviewCount: 41,
    description: 'Designed for high-speed park adventures and all-day comfort. Features a super lightweight EVA foam midsole, dual pull tabs for self-dressing, and reinforced heel cups to support growing arches.',
    details: [
      'Ultra-soft cushioned footbed absorbs impact from playground jumps',
      'Wide toe box provides natural room for growing toes',
      'Dual color-matched pull loops for effortless slip-on action',
      'Durable scuff-resistant toe cap'
    ],
    specs: {
      weight: '120g (Kids US 12)',
      drop: '3mm',
      cushioning: 'Max',
      surface: 'Playground, Indoor Gym, Sidewalk',
      upper: 'Ventilated Honeycomb Mesh',
      outsole: 'Ultra-Light EVA Foam with Rubber Pods'
    },
    colors: [
      { name: 'Red Fox Crimson / Black', hex: '#C8102E' },
      { name: 'Cool Gray / Electric Red', hex: '#4B5563' },
      { name: 'Royal Blue / Solar White', hex: '#2563EB' }
    ],
    sizes: [10, 11, 12, 13, 1, 2, 3],
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 44,
    reviews: [
      {
        id: 'rev-15',
        author: 'Brian Walsh',
        rating: 5,
        date: '3 weeks ago',
        title: 'Super light and durable',
        comment: 'My daughter loves running races in these. She can put them on and take them off completely by herself.',
        verified: true
      }
    ]
  },
  {
    id: 'rf-stealth-trainer-men',
    name: 'RED FOX Stealth Cross-Trainer',
    tagline: 'Heavy duty all-black training shoe with carbon heel clip',
    category: 'Men',
    gender: 'Men',
    price: 150,
    rating: 4.8,
    reviewCount: 82,
    description: 'Engineered for power lifters, cross-trainers, and athletic conditioning. A flat zero-drop heel with an external carbon clip keeps you planted during heavy barbell lifts, with flexible forefoot siping for explosive agility sprints.',
    details: [
      'Zero-drop stable lifting platform with reinforced heel cup',
      'Kevlar-infused sidewall panels protect against rope climb friction',
      'High-density FoxCore midsole maintains structure under 400+ lbs loads',
      'Perforated leather tongue with lace-tuck pocket'
    ],
    specs: {
      weight: '320g (Men US 9)',
      drop: '4mm',
      cushioning: 'Responsive',
      surface: 'Gym, Turf, Lifting Platform, Asphalt',
      upper: 'High-Abrasion Ballistic Mesh & Kevlar Overlay',
      outsole: 'FoxGrip™ Flat High-Density Rubber'
    },
    colors: [
      { name: 'Stealth Matte Black / Crimson Fox', hex: '#111827' },
      { name: 'Gunmetal Gray / Crimson', hex: '#374151' }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 52,
    reviews: [
      {
        id: 'rev-16',
        author: 'Tom Kowalski',
        rating: 5,
        date: '5 days ago',
        title: 'Rock solid base for deadlifts & squats',
        comment: 'Provides the stability of a dedicated weightlifting shoe without sacrificing the flexibility needed for box jumps and sprints.',
        verified: true
      }
    ]
  }
];
