import React, { useState, useEffect, useMemo, useCallback } from 'react';

// =============================================
// MEDELLÍN CONCIERGE - Conversion Optimized v2
// High-impact improvements + Quick wins
// =============================================

// Your Info (EDIT THIS)
const HOST_INFO = {
  name: 'Carlos',
  photo: 'https://i.ibb.co/8gTcfDLy/carlos.jpg', // Your photo
  whatsapp: '+573001234567',
  responseTime: '< 2 hours',
  bio: "Born and raised in Medellín. I've been helping visitors experience the real city for 5 years — not the tourist version, the actual places where my friends and I spend our weekends.",
  stats: {
    guests: '2,400+',
    rating: '4.9',
    reviews: '847',
    years: '5',
  }
};

// Testimonials (EDIT THESE - Add real ones)
const testimonials = [
  {
    name: 'Sarah & Mike',
    location: 'Austin, TX',
    text: "Carlos planned our entire week and it was PERFECT. The coffee farm tour was a highlight of our whole South America trip. Skip the apps, just message this guy.",
    rating: 5,
    trip: 'Coffee Farm + Guatapé',
  },
  {
    name: 'James',
    location: 'London, UK', 
    text: "The night out he planned was incredible. We never would have found that speakeasy on our own. Felt like we had a local friend showing us around.",
    rating: 5,
    trip: 'Night Out Package',
  },
  {
    name: 'Ana & Friends',
    location: 'Miami, FL',
    text: "Group of 6 girls, we were nervous about safety. Carlos had everything handled — reliable drivers, reservations, even a backup plan when one place was too crowded. 10/10.",
    rating: 5,
    trip: 'Bachelorette Weekend',
  },
];

// FAQ Data
const faqs = [
  {
    q: "How does booking work?",
    a: "Pick what you want → Add to cart → Checkout. I'll WhatsApp you within 2 hours to confirm everything and answer any questions. Payment is secure through Stripe."
  },
  {
    q: "What if I need to cancel?",
    a: "Free cancellation up to 24 hours before for most experiences. Airport transfers can be cancelled anytime. I get it — plans change."
  },
  {
    q: "Is this safe?",
    a: "I only work with drivers and guides I personally know and trust. I've used every service myself. Your safety isn't something I take chances with."
  },
  {
    q: "What if my flight is delayed?",
    a: "For airport pickups, I track your flight. If it's delayed, your driver adjusts automatically. No extra charge, no stress."
  },
  {
    q: "Can you plan something custom?",
    a: "Absolutely. Use the concierge section or just WhatsApp me directly. Bachelor parties, proposals, specific requests — I've done it all."
  },
  {
    q: "Why book with you vs Airbnb Experiences?",
    a: "Personal service. I'm not a platform — I'm one person who actually lives here. You text me directly, I handle everything, and I'm accountable if anything goes wrong."
  },
];

// Night Builder Options
const nightVibes = [
  { id: 'chill', name: 'Chill Vibes', emoji: '🌅', desc: 'Rooftops, good drinks, easy conversation', color: '#4ECDC4' },
  { id: 'party', name: 'Full Send', emoji: '🔥', desc: 'Clubs, dancing until sunrise', color: '#FF6B6B' },
  { id: 'date', name: 'Date Night', emoji: '💕', desc: 'Romantic, intimate, impressive', color: '#C44569' },
  { id: 'local', name: 'Local Experience', emoji: '🇨🇴', desc: 'Where paisas actually go', color: '#F8B500' },
];

const nightAreas = [
  { id: 'provenza', name: 'Provenza', desc: 'Trendy restaurants, upscale bars, beautiful people', emoji: '✨' },
  { id: 'poblado', name: 'Parque Lleras', desc: 'Classic nightlife hub, more tourists, high energy', emoji: '🎉' },
  { id: 'laureles', name: 'Laureles', desc: 'Local neighborhood, less English, authentic vibe', emoji: '🏘️' },
  { id: 'centro', name: 'Centro', desc: 'Raw, gritty, real — not for everyone', emoji: '🎭' },
];

const nightActivities = [
  { 
    id: 'dinner', 
    name: 'Dinner', 
    price: 50, 
    emoji: '🍽️', 
    time: '7-9pm', 
    desc: 'Reserved table at a great restaurant',
    hasOptions: true,
    subOptions: [
      { id: 'd1', name: 'Carmen', vibe: 'Michelin-recommended. French-Colombian fusion. Dress nice.', price: 85, emoji: '🏆', popular: true },
      { id: 'd2', name: 'Alambique', vibe: 'Best steak in the city. Great wine list. Special occasion vibes.', price: 70, emoji: '🥩' },
      { id: 'd3', name: 'OCI.Mde', vibe: 'Nikkei (Japanese-Peruvian). Trendy crowd. Instagram-worthy.', price: 60, emoji: '🍱' },
      { id: 'd4', name: 'El Cielo', vibe: 'Tasting menu experience. 2 Michelin stars. Once-in-a-lifetime.', price: 150, emoji: '⭐', premium: true },
      { id: 'd5', name: 'Hacienda', vibe: 'Traditional paisa food. Where I take my family. Huge portions.', price: 35, emoji: '🥘' },
      { id: 'd-surprise', name: "You pick for me", vibe: "Tell me your budget and dietary needs, I'll handle the rest.", price: 50, emoji: '🎁' },
    ]
  },
  { 
    id: 'rooftop', 
    name: 'Rooftop Drinks', 
    price: 30, 
    emoji: '🌃', 
    time: '9-11pm', 
    desc: 'Best views in the city + welcome drink',
    hasOptions: true,
    subOptions: [
      { id: 'r1', name: 'Enso Rooftop', vibe: '360° city views. Chill house music. Best at sunset but great anytime.', price: 35, emoji: '🏙️', popular: true },
      { id: 'r2', name: 'The Charlee Rooftop', vibe: 'Hotel pool vibes. See-and-be-seen crowd. Bottle service available.', price: 40, emoji: '🏊' },
      { id: 'r3', name: 'Selina Rooftop', vibe: 'Backpacker-meets-boutique. Social, easy to meet people.', price: 25, emoji: '🎒' },
      { id: 'r4', name: 'Cielo (Sky Bar)', vibe: 'Quieter, more intimate. Good for conversation.', price: 25, emoji: '🌙' },
      { id: 'r-surprise', name: "You pick for me", vibe: "I'll match the vibe to your group.", price: 30, emoji: '🎁' },
    ]
  },
  { 
    id: 'speakeasy', 
    name: 'Hidden Speakeasy', 
    price: 35, 
    emoji: '🥃', 
    time: '9-11pm', 
    desc: 'Secret entrance, craft cocktails, very cool',
    hasOptions: true,
    subOptions: [
      { id: 's1', name: 'La Octava', vibe: 'Behind a bookshelf in a "law office". Jazz, dim lights, incredible cocktails.', price: 40, emoji: '📚', popular: true },
      { id: 's2', name: 'El Apartamento', vibe: 'Ring the doorbell of an unmarked door. Intimate, max 20 people inside.', price: 35, emoji: '🚪' },
      { id: 's3', name: 'Clandestino', vibe: 'Underground literally. Edgier crowd, great whiskey selection.', price: 35, emoji: '🕶️' },
      { id: 's-surprise', name: "You pick for me", vibe: "I'll send you the address and instructions.", price: 35, emoji: '🎁' },
    ]
  },
  { 
    id: 'salsa', 
    name: 'Salsa Lesson', 
    price: 40, 
    emoji: '💃', 
    time: '8-9pm', 
    desc: 'Learn the basics before hitting the clubs',
    hasOptions: true,
    subOptions: [
      { id: 'sa1', name: 'Private Lesson', vibe: '1-on-1 at your place or a studio. Go at your own pace, no embarrassment.', price: 60, emoji: '🎯' },
      { id: 'sa2', name: 'Small Group', vibe: '4-8 people. More fun, social, includes a drink.', price: 40, emoji: '👯', popular: true },
      { id: 'sa3', name: 'Lesson + Club Combo', vibe: 'Learn for an hour, then practice at Son Havana with live band.', price: 55, emoji: '🎺' },
      { id: 'sa-surprise', name: "You pick for me", vibe: "Based on your dance experience (or lack of it).", price: 40, emoji: '🎁' },
    ]
  },
  { 
    id: 'pregame', 
    name: 'Pre-Game Setup', 
    price: 50, 
    emoji: '🍾', 
    time: '9-10pm', 
    desc: 'Bottles & mixers delivered to your place',
    hasOptions: true,
    subOptions: [
      { id: 'p1', name: 'Starter Pack', vibe: 'Aguardiente, rum, Coca-Cola, limes, ice. The Colombian essentials.', price: 40, emoji: '🧊' },
      { id: 'p2', name: 'Premium Pack', vibe: 'Grey Goose or Buchanan\'s, premium mixers, garnishes.', price: 80, emoji: '✨', popular: true },
      { id: 'p3', name: 'Champagne Setup', vibe: '2 bottles of Moët, strawberries, proper glasses. Celebration mode.', price: 160, emoji: '🍾', premium: true },
      { id: 'p4', name: 'Bartender Experience', vibe: 'Actual bartender comes to you for 2 hours. Cocktails made to order.', price: 150, emoji: '🍹' },
      { id: 'p-surprise', name: "You pick for me", vibe: "Tell me how many people and your budget.", price: 50, emoji: '🎁' },
    ]
  },
  { 
    id: 'club', 
    name: 'Club + Table', 
    price: 100, 
    emoji: '🎵', 
    time: '11pm-late', 
    desc: 'Skip the line, reserved table, bottle included',
    hasOptions: true,
    subOptions: [
      { id: 'c1', name: 'Dulce', vibe: 'Electronic/house. International DJs. Young, fashionable crowd.', price: 120, emoji: '🎧', popular: true },
      { id: 'c2', name: 'Vintrash', vibe: 'Reggaeton & Latin hits. High energy. Everyone\'s dancing.', price: 100, emoji: '🔥' },
      { id: 'c3', name: 'La Whiskería', vibe: 'Hip hop & R&B. More intimate. Good if you want to actually talk too.', price: 80, emoji: '🎤' },
      { id: 'c4', name: 'Son Havana', vibe: 'Live salsa band. Mostly locals. You WILL dance.', price: 60, emoji: '🎺' },
      { id: 'c5', name: 'Kukaramakara', vibe: 'Huge venue. Crossover music. Big groups welcome.', price: 150, emoji: '👑', premium: true },
      { id: 'c-surprise', name: "You pick for me", vibe: "Based on your music taste and group size.", price: 100, emoji: '🎁' },
    ]
  },
  { 
    id: 'latenight', 
    name: 'Late Night Food', 
    price: 15, 
    emoji: '🌮', 
    time: '2-4am', 
    desc: 'Where to eat when everything else is closed',
    hasOptions: true,
    subOptions: [
      { id: 'l1', name: 'Famous Empanada Corner', vibe: 'THE spot. Everyone ends up here. Cash only, worth it.', price: 10, emoji: '🥟', popular: true },
      { id: 'l2', name: 'Perros Locos', vibe: 'Colombian hot dogs loaded with EVERYTHING. Trust me.', price: 12, emoji: '🌭' },
      { id: 'l3', name: 'Arepas 24hr', vibe: 'Stuffed arepas. Get the one with cheese and chicharrón.', price: 12, emoji: '🫓' },
      { id: 'l4', name: '24hr Diner Sit-down', vibe: 'If you need to sit, coffee, and a full meal at 3am.', price: 25, emoji: '☕' },
      { id: 'l-surprise', name: "You pick for me", vibe: "I'll text you the exact address when you're ready.", price: 15, emoji: '🎁' },
    ]
  },
  { 
    id: 'saferide', 
    name: 'Safe Ride Home', 
    price: 25, 
    emoji: '🚗', 
    time: 'End of night', 
    desc: 'Trusted driver takes everyone home safe',
    hasOptions: true,
    subOptions: [
      { id: 'sr1', name: 'Single Drop-off', vibe: 'One location, up to 4 people. Driver I personally know.', price: 25, emoji: '📍', popular: true },
      { id: 'sr2', name: 'Multiple Stops', vibe: 'Up to 3 different locations. Nobody left behind.', price: 40, emoji: '📍📍' },
      { id: 'sr3', name: 'SUV (6 people)', vibe: 'Bigger group, one destination.', price: 35, emoji: '🚙' },
      { id: 'sr4', name: 'On-Call Driver', vibe: 'Driver waits for you. Leave whenever you want.', price: 60, emoji: '⏰', premium: true },
      { id: 'sr-surprise', name: "You pick for me", vibe: "Just tell me where everyone is staying.", price: 25, emoji: '🎁' },
    ]
  },
];

// Services Data with FULL descriptions
const services = {
  tours: [
    { 
      id: 't1', 
      name: 'Comuna 13 Street Art Tour', 
      price: 45, 
      time: '3 hours', 
      emoji: '🎨', 
      color: '#FF6B6B', 
      tag: 'MOST POPULAR',
      tagColor: '#FF6B6B',
      rating: 4.9, 
      reviews: 847,
      spotsLeft: 4,
      shortDesc: 'The transformation story of Medellín, told by someone who lived it.',
      fullDesc: "This isn't a walking tour — it's a story. Your guide grew up in Comuna 13 during the worst years and watched it transform into what it is today. You'll ride the famous outdoor escalators, see world-class street art, and hear stories you won't find in any guidebook. This is why people come to Medellín.",
      includes: [
        'Local guide FROM Comuna 13 (not just about it)',
        'Outdoor escalator ride',
        'Street art walking tour',
        'Traditional snacks & fresh juice',
        'Small group (max 10 people)',
        'Photos at the best spots',
      ],
      whatToExpect: "We meet at San Javier metro station at 9am. From there, it's about 3 hours of walking (with breaks). Moderate fitness required — there are stairs but we take it easy. We finish around noon.",
      whatToBring: [
        'Comfortable walking shoes',
        'Sunscreen & water',
        'Cash for souvenirs (optional)',
        'Camera',
      ],
      notIncluded: ['Transport to/from meeting point', 'Lunch'],
      meetingPoint: 'San Javier Metro Station (Exit 1)',
      cancellation: 'Free cancellation up to 24 hours before',
    },
    { 
      id: 't2', 
      name: 'Private Coffee Farm Experience', 
      price: 89, 
      time: '6 hours', 
      emoji: '☕', 
      color: '#06D6A0', 
      tag: 'TOP RATED',
      tagColor: '#06D6A0',
      rating: 4.95, 
      reviews: 423,
      spotsLeft: 2,
      shortDesc: 'Bean-to-cup journey at a family finca in the mountains.',
      fullDesc: "Escape the city for a day. We drive 90 minutes into the mountains to a third-generation coffee farm. You'll pick your own beans, learn the entire process, roast coffee yourself, and sit down for a traditional campo lunch. You leave with 500g of fresh coffee and a completely different understanding of your morning cup.",
      includes: [
        'Private transport from your accommodation',
        'English-speaking farm guide',
        'Coffee picking & processing experience',
        'Roasting demonstration',
        'Farm lunch (vegetarian option available)',
        '500g fresh roasted coffee to take home',
        'All entrance fees',
      ],
      whatToExpect: "Pickup at 8am from your place. 90 min scenic drive. 3-4 hours at the farm with lunch. Back in Medellín by 3pm. It's a full morning but worth every minute.",
      whatToBring: [
        'Layers (mountains are cooler)',
        'Closed-toe shoes',
        'Camera',
        'Cash for tips (optional)',
      ],
      notIncluded: ['Alcoholic beverages', 'Additional souvenirs'],
      meetingPoint: 'Hotel pickup included',
      cancellation: 'Free cancellation up to 48 hours before',
    },
    { 
      id: 't3', 
      name: 'Guatapé & El Peñol Full Day', 
      price: 95, 
      time: '10 hours', 
      emoji: '🪨', 
      color: '#4CC9F0', 
      tag: 'BUCKET LIST',
      tagColor: '#4CC9F0',
      rating: 4.9, 
      reviews: 1205,
      spotsLeft: 6,
      shortDesc: '740 steps to the top of the rock + colorful town + boat ride.',
      fullDesc: "If you only do ONE day trip from Medellín, this is it. We start early to beat the crowds at El Peñol — that famous rock with 740 steps to the top. The view is insane. Then we explore Guatapé's colorful streets, have lunch, and take a boat ride on the reservoir. Long day, but you'll remember it forever.",
      includes: [
        'Comfortable transport with AC',
        'Breakfast (coffee & snacks for the drive)',
        'El Peñol entrance fee',
        'Boat ride on the reservoir',
        'Lunch in Guatapé',
        'English-speaking guide',
        'Free time to explore',
      ],
      whatToExpect: "Early pickup (7am) to beat crowds. 2-hour drive. Climb the rock, spend time in town, boat ride after lunch. Back around 5-6pm. It's a long day but paced well.",
      whatToBring: [
        'Comfortable shoes for climbing',
        'Sunscreen & hat',
        'Swimsuit (some boats allow swimming)',
        'Camera',
        'Cash for souvenirs',
      ],
      notIncluded: ['Alcoholic beverages', 'Personal purchases'],
      meetingPoint: 'Hotel pickup at 7:00 AM',
      cancellation: 'Free cancellation up to 24 hours before',
    },
    { 
      id: 't4', 
      name: 'Hidden Food Markets Tour', 
      price: 55, 
      time: '4 hours', 
      emoji: '🥘', 
      color: '#FFD93D', 
      tag: null,
      rating: 4.85, 
      reviews: 312,
      shortDesc: 'Skip the tourist spots. Eat where locals actually eat.',
      fullDesc: "This tour is for people who actually love food, not just Instagram. We hit the markets that guidebooks don't mention, try fruits you've never seen, and eat at hole-in-the-wall spots where you'd never walk in alone. By the end, you'll know what to order and where to go for the rest of your trip.",
      includes: [
        '10+ food tastings',
        'Local market visits (2 markets)',
        'Exotic fruit sampling',
        'Empanada making demonstration',
        'Local foodie guide',
        'All food included',
      ],
      whatToExpect: "We meet downtown and eat our way through the city. Pace yourself — there's a LOT of food. We finish around lunchtime and you won't need dinner.",
      whatToBring: [
        'Empty stomach (seriously)',
        'Comfortable shoes',
        'Adventurous attitude',
        'Cash for extra purchases',
      ],
      notIncluded: ['Transport to meeting point', 'Alcoholic beverages'],
      meetingPoint: 'Parque Berrío Metro Station',
      cancellation: 'Free cancellation up to 24 hours before',
    },
    { 
      id: 't5', 
      name: 'Paragliding Tandem Flight', 
      price: 75, 
      time: '2-3 hours', 
      emoji: '🪂', 
      color: '#7209B7', 
      tag: 'ADVENTURE',
      tagColor: '#7209B7',
      rating: 4.9, 
      reviews: 567,
      shortDesc: 'Fly over the city with an experienced pilot.',
      fullDesc: "No experience needed — you fly tandem with a certified pilot who has 10+ years of experience. Launch from the hills above the city, soar for 15-25 minutes (weather dependent), and get photos/videos of the whole thing. It's the most memorable way to see Medellín.",
      includes: [
        'Transport to launch site',
        'All safety equipment',
        'Certified tandem pilot',
        '15-25 minute flight',
        'Photos & video of your flight',
        'Return transport',
      ],
      whatToExpect: "Pickup, 30 min drive to launch site, safety briefing, flight, landing in a field below. Total time including transport is 2-3 hours. Flight itself is 15-25 min.",
      whatToBring: [
        'Closed-toe shoes (required)',
        'Long pants recommended',
        'Light jacket',
        'Sense of adventure',
      ],
      notIncluded: ['Food', 'Tips'],
      meetingPoint: 'Hotel pickup included',
      cancellation: 'Free cancellation up to 24 hours before (weather dependent)',
    },
  ],
  transport: [
    { 
      id: 'tr1', 
      name: 'Airport Pickup', 
      price: 35, 
      time: 'Any time', 
      emoji: '✈️', 
      color: '#00B4D8', 
      tag: 'ESSENTIAL',
      tagColor: '#00B4D8',
      rating: 4.95, 
      reviews: 2341,
      shortDesc: 'Skip the taxi line. Driver waiting with your name.',
      fullDesc: "After a long flight, the last thing you want is to negotiate with taxi drivers. Your driver will be waiting in arrivals with your name, help with bags, and get you to your accommodation in a clean, air-conditioned car. I track your flight so if you're delayed, they wait.",
      includes: [
        'Meet & greet in arrivals',
        'Flight tracking',
        'Luggage assistance',
        'AC vehicle',
        'Cold water bottles',
        'Up to 4 passengers',
      ],
      whatToExpect: "Exit customs, look for your name. Driver helps with bags, walk to car (2 min), 45-60 min drive to Poblado/Laureles depending on traffic.",
      notIncluded: ['More than 4 passengers (upgrade to SUV)'],
      cancellation: 'Free cancellation up to 12 hours before',
    },
    { 
      id: 'tr2', 
      name: 'Airport Drop-off', 
      price: 30, 
      time: 'Any time', 
      emoji: '🛫', 
      color: '#0077B6', 
      tag: null,
      rating: 4.95, 
      reviews: 1654,
      shortDesc: 'On-time guarantee. Never miss a flight.',
      fullDesc: "We pick you up with plenty of buffer time. Driver knows exactly how long it takes and monitors traffic. You're not stressing about Uber surge pricing at 5am or finding your way to the airport. Just pack, get in, and arrive relaxed.",
      includes: [
        'Pickup from your door',
        'Flight monitoring',
        'Luggage assistance',
        'Cold water bottles',
        'On-time guarantee',
        'Up to 4 passengers',
      ],
      whatToExpect: "Driver arrives 10 min before scheduled time. Helps with bags. Gets you there 2+ hours before domestic, 3+ hours before international.",
      notIncluded: ['More than 4 passengers (upgrade to SUV)'],
      cancellation: 'Free cancellation up to 12 hours before',
    },
    { 
      id: 'tr3', 
      name: 'Private Driver Full Day', 
      price: 140, 
      time: '8 hours', 
      emoji: '🚗', 
      color: '#023E8A', 
      tag: 'BEST VALUE',
      tagColor: '#F8B500',
      rating: 4.9, 
      reviews: 567,
      shortDesc: 'Your own driver for the day. Go wherever you want.',
      fullDesc: "This is the best way to see Medellín if you have limited time or don't want to deal with logistics. Driver picks you up, you tell them where to go (or ask for recommendations), and they handle everything. Shopping, neighborhoods, restaurants — no waiting for Ubers, no navigation, no parking.",
      includes: [
        '8 hours of drive time',
        'AC vehicle (sedan or SUV)',
        'English-speaking driver',
        'Local recommendations',
        'Flexible itinerary',
        'Unlimited stops within city',
      ],
      whatToExpect: "Tell me what you want to do and I'll suggest an efficient route. Or just wing it — driver goes wherever you point.",
      notIncluded: ['Fuel for trips outside Medellín area', 'Entrance fees to attractions', 'Food'],
      cancellation: 'Free cancellation up to 24 hours before',
    },
    { 
      id: 'tr4', 
      name: 'Private Driver Half Day', 
      price: 80, 
      time: '4 hours', 
      emoji: '🚙', 
      color: '#0096C7', 
      tag: null,
      rating: 4.85, 
      reviews: 423,
      shortDesc: 'Perfect for errands or exploring one area of the city.',
      fullDesc: "4 hours is enough to hit a few neighborhoods, do some shopping, or run errands without the hassle of multiple Ubers. Great for your first day to get oriented or your last day before airport.",
      includes: [
        '4 hours of drive time',
        'AC vehicle',
        'Local recommendations',
        'Multiple stops within city',
      ],
      whatToExpect: "Let me know what you want to accomplish and I'll make sure 4 hours is enough. If you need more, upgrade to full day.",
      notIncluded: ['Fuel for trips outside city', 'Entrance fees', 'Food'],
      cancellation: 'Free cancellation up to 24 hours before',
    },
  ],
  food: [
    { 
      id: 'm1', 
      name: 'Luxury Welcome Package', 
      price: 65, 
      time: 'Pre-arrival delivery', 
      emoji: '🧺', 
      color: '#E63946', 
      tag: 'GUEST FAVORITE',
      tagColor: '#E63946',
      rating: 4.95, 
      reviews: 234,
      shortDesc: 'Arrive to a stocked apartment. The little things matter.',
      fullDesc: "You land tired, you get to your place, and everything is waiting: fresh tropical fruits (mango, passion fruit, guava), premium Colombian coffee, a nice bottle of wine, artisan chocolates, and a guide I wrote with my actual recommendations for your neighborhood. Start your trip right.",
      includes: [
        'Fresh tropical fruit basket',
        'Premium Colombian coffee (whole bean or ground)',
        'Bottle of wine (red or white, specify preference)',
        'Artisan chocolate selection',
        'Personalized neighborhood guide',
        'Delivered before your arrival',
      ],
      whatToExpect: "Give me your check-in time and address. Package will be inside your accommodation waiting for you.",
      notIncluded: ['Accommodation access (you need to arrange with your host)'],
      cancellation: 'Free cancellation up to 48 hours before',
    },
    { 
      id: 'm2', 
      name: 'Private Chef Experience', 
      price: 120, 
      time: '3-4 hours', 
      emoji: '👨‍🍳', 
      color: '#F4A261', 
      tag: 'PREMIUM',
      tagColor: '#F4A261',
      rating: 5.0, 
      reviews: 156,
      shortDesc: 'A real chef comes to your place. 4 courses. Everything handled.',
      fullDesc: "This isn't meal delivery — a professional chef comes to YOUR kitchen and cooks a 4-course Colombian tasting menu while you watch (or don't). Wine pairing included. They bring everything, cook everything, and clean everything. You just show up hungry.",
      includes: [
        '4-course tasting menu',
        'Wine pairing (2 bottles)',
        'All ingredients & equipment',
        'Full kitchen cleanup',
        'Menu customization',
        'Dietary accommodations',
        'Serves 2-6 guests',
      ],
      whatToExpect: "Chef arrives 1 hour before dinner time to set up. Dinner takes about 2 hours at your pace. Cleanup takes 30-45 min. You do nothing.",
      notIncluded: ['Additional wine beyond pairing', 'Guests beyond 6 (ask for pricing)'],
      cancellation: 'Free cancellation up to 48 hours before',
    },
    { 
      id: 'm3', 
      name: 'Daily Breakfast Delivery', 
      price: 22, 
      time: 'Every morning', 
      emoji: '🥐', 
      color: '#E9C46A', 
      tag: null,
      rating: 4.8, 
      reviews: 387,
      shortDesc: 'Wake up to a real Colombian breakfast at your door.',
      fullDesc: "Not hotel breakfast. Real food: fresh arepas (corn cakes), farm eggs cooked your way, tropical fruit, fresh-squeezed juice, and proper Colombian coffee. Delivered hot to your door each morning. Pick your delivery time and it'll be there.",
      includes: [
        'Fresh arepas',
        'Farm eggs (your style)',
        'Tropical fruit plate',
        'Fresh juice',
        'Colombian coffee',
        'Delivered to your door',
      ],
      whatToExpect: "Tell me what time you want it and any dietary restrictions. It shows up hot.",
      notIncluded: ['Specific dietary substitutions may cost extra'],
      cancellation: 'Cancel individual days anytime before 8pm the night before',
      priceNote: 'Per person, per day. Discounts for 3+ days.',
    },
    { 
      id: 'm4', 
      name: 'Healthy Meal Prep (5 meals)', 
      price: 95, 
      time: 'One-time delivery', 
      emoji: '🍱', 
      color: '#2A9D8F', 
      tag: 'NEW',
      tagColor: '#2A9D8F',
      rating: 4.85, 
      reviews: 98,
      shortDesc: 'Chef-prepared Colombian meals. Reheat in 5 minutes.',
      fullDesc: "For people who want to eat well but don't have time. 5 complete meals, chef-prepared, macro-balanced, ready to heat in 5 minutes. Way better than delivery apps, healthier than restaurants every night. Great for digital nomads or longer stays.",
      includes: [
        '5 complete meals',
        'Chef-prepared fresh',
        'Eco-friendly packaging',
        'Reheating instructions',
        'Balanced macros',
        'Rotates weekly (no repeats)',
      ],
      whatToExpect: "Meals delivered in a cooler bag. Keep in fridge up to 5 days. Microwave or stovetop to reheat.",
      notIncluded: ['Delivery outside Poblado/Laureles (ask for availability)'],
      cancellation: 'Free cancellation up to 48 hours before delivery',
      dietary: 'Keto, vegan, gluten-free options available',
    },
  ],
};

// =============================================
// VALIDATION HELPERS
// =============================================
const validateEmail = (email) => {
  if (!email) return true; // Email is optional
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateWhatsApp = (phone) => {
  if (!phone) return false;
  // Remove all non-numeric characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  // Should have at least 10 digits
  return cleaned.length >= 10;
};

const formatWhatsApp = (phone) => {
  // Auto-format as user types
  const cleaned = phone.replace(/[^\d+]/g, '');
  return cleaned;
};

// =============================================
// TOAST NOTIFICATION COMPONENT
// =============================================
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'rgba(78,205,196,0.95)' : 
                  type === 'error' ? 'rgba(255,107,107,0.95)' : 
                  'rgba(248,181,0,0.95)';
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        background: bgColor,
        color: type === 'warning' ? '#0D0D0D' : '#fff',
        padding: '14px 20px',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        zIndex: 1000,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        animation: 'toastSlideIn 0.3s ease',
        maxWidth: 'calc(100vw - 40px)',
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 700 }}>{icon}</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{message}</span>
    </div>
  );
};

// =============================================
// LOADING SPINNER COMPONENT
// =============================================
const LoadingSpinner = ({ size = 20, color = '#fff' }) => (
  <div
    role="status"
    aria-label="Loading"
    style={{
      width: size,
      height: size,
      border: `2px solid ${color}33`,
      borderTop: `2px solid ${color}`,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }}
  />
);

// =============================================
// SKELETON LOADER COMPONENT
// =============================================
const SkeletonCard = () => (
  <div
    aria-hidden="true"
    style={{
      background: '#161625',
      borderRadius: 20,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
  >
    <div style={{
      height: 120,
      background: 'linear-gradient(90deg, #1a1a2e 0%, #252540 50%, #1a1a2e 100%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
    }} />
    <div style={{ padding: 16 }}>
      <div style={{
        height: 20,
        width: '70%',
        background: 'linear-gradient(90deg, #1a1a2e 0%, #252540 50%, #1a1a2e 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: 4,
        marginBottom: 12,
      }} />
      <div style={{
        height: 14,
        width: '100%',
        background: 'linear-gradient(90deg, #1a1a2e 0%, #252540 50%, #1a1a2e 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: 4,
        marginBottom: 8,
      }} />
      <div style={{
        height: 14,
        width: '60%',
        background: 'linear-gradient(90deg, #1a1a2e 0%, #252540 50%, #1a1a2e 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: 4,
      }} />
    </div>
  </div>
);

// Main App Component
export default function MedellinApp() {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('tours');
  const [selectedService, setSelectedService] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [booking, setBooking] = useState({ date: '', time: '09:00', guests: 2, name: '', whatsapp: '', email: '', notes: '' });
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  
  // Night Builder State
  const [nightStep, setNightStep] = useState(0);
  const [nightPlan, setNightPlan] = useState({ vibe: null, area: null, activities: [] });
  const [optionsSheet, setOptionsSheet] = useState({ open: false, activity: null });
  
  // Concierge State
  const [conciergeMsg, setConciergeMsg] = useState('');

  // Recent bookings notification (social proof) - QUICK WIN: Changed to 60s
  const [recentBooking, setRecentBooking] = useState(null);
  const recentBookings = [
    { name: 'Maria', location: 'NYC', item: 'Comuna 13 Tour', time: '12 min ago' },
    { name: 'Tom & Lisa', location: 'London', item: 'Night Out Package', time: '34 min ago' },
    { name: 'David', location: 'Toronto', item: 'Airport Pickup', time: '1 hour ago' },
  ];

  // QUICK WIN: Persist cart to localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('medellin-cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.warn('Could not load cart from storage');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('medellin-cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to storage');
    }
  }, [cart]);

  // QUICK WIN: Adjusted social proof timing to 60s (was 30s)
  useEffect(() => {
    const showNotification = () => {
      const randomBooking = recentBookings[Math.floor(Math.random() * recentBookings.length)];
      setRecentBooking(randomBooking);
      setTimeout(() => setRecentBooking(null), 4000);
    };
    
    const interval = setInterval(showNotification, 60000); // Changed from 30000 to 60000
    setTimeout(showNotification, 8000); // First one after 8s (was 5s)
    
    return () => clearInterval(interval);
  }, []);

  // Show toast helper
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Handle tab change with loading state
  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) return;
    setIsTabLoading(true);
    setActiveTab(tabId);
    // Simulate brief loading for smooth transition
    setTimeout(() => setIsTabLoading(false), 300);
  }, [activeTab]);

  // IMPROVED: Better date formatting with day names
  const dates = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      return {
        date: d,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        isWeekend: d.getDay() === 0 || d.getDay() === 6,
        isTomorrow: i === 0,
      };
    });
  }, []);

  // Validate booking form
  const validateBookingForm = useCallback(() => {
    const newErrors = {};
    
    if (!booking.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    
    if (!validateWhatsApp(booking.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid WhatsApp number (10+ digits)';
    }
    
    if (booking.email && !validateEmail(booking.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [booking]);

  const addToCart = useCallback((item, details = booking) => {
    const cartItem = {
      ...item,
      ...details,
      cartId: Date.now(),
      total: item.price * (details.guests || 1)
    };
    setCart(prev => [...prev, cartItem]);
    setSelectedService(null);
    setView('home');
    setCartOpen(true);
    setBooking({ date: '', time: '09:00', guests: 2, name: '', whatsapp: '', email: '', notes: '' });
    showToast(`${item.name} added to cart!`);
  }, [booking, showToast]);

  const removeFromCart = useCallback((cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    showToast('Item removed from cart', 'warning');
  }, [showToast]);

  const handleActivityClick = (activity) => {
    if (activity.hasOptions) {
      setOptionsSheet({ open: true, activity });
    } else {
      toggleActivity(activity);
    }
  };

  const toggleActivity = (activity, selectedOption = null) => {
    const existing = nightPlan.activities.find(a => a.id === activity.id);
    
    if (existing && !selectedOption) {
      setNightPlan({ 
        ...nightPlan, 
        activities: nightPlan.activities.filter(a => a.id !== activity.id) 
      });
    } else {
      const filtered = nightPlan.activities.filter(a => a.id !== activity.id);
      const activityToAdd = {
        ...activity,
        selectedOption,
        price: selectedOption ? selectedOption.price : activity.price,
        displayName: selectedOption ? `${activity.name}: ${selectedOption.name}` : activity.name
      };
      setNightPlan({ 
        ...nightPlan, 
        activities: [...filtered, activityToAdd] 
      });
    }
    setOptionsSheet({ open: false, activity: null });
  };

  const addNightToCart = () => {
    const nightTotal = nightPlan.activities.reduce((sum, a) => sum + a.price, 0) * booking.guests;
    const cartItem = {
      id: 'night-' + Date.now(),
      name: `${nightPlan.vibe.name} in ${nightPlan.area.name}`,
      emoji: '🌙',
      color: nightPlan.vibe.color,
      activities: nightPlan.activities,
      ...booking,
      cartId: Date.now(),
      total: nightTotal,
      isNight: true
    };
    setCart(prev => [...prev, cartItem]);
    setNightStep(0);
    setNightPlan({ vibe: null, area: null, activities: [] });
    setView('home');
    setCartOpen(true);
    showToast('Night plan added to cart!');
  };

  // IMPROVED: Memoized cart total
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  }, [cart]);

  const styles = {
    container: {
      maxWidth: 1200,
      margin: '0 auto',
      minHeight: '100vh',
      background: '#0D0D0D',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
    },
  };

  // =============================================
  // COMPONENTS
  // =============================================

  // Recent Booking Notification
  const RecentBookingNotification = () => {
    if (!recentBooking) return null;
    return (
      <div 
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: cart.length > 0 ? 90 : 24,
          left: 16,
          right: 16,
          maxWidth: 400,
          margin: '0 auto',
          background: '#1a1a2e',
          border: '1px solid rgba(78,205,196,0.3)',
          borderRadius: 12,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 40,
          animation: 'slideUp 0.3s ease',
        }}
      >
        <div style={{ fontSize: 20 }} aria-hidden="true">✅</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: '#fff' }}>
            <strong>{recentBooking.name}</strong> from {recentBooking.location}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            booked {recentBooking.item} · {recentBooking.time}
          </div>
        </div>
      </div>
    );
  };

  // IMPROVED: Form Input with validation
  const FormInput = ({ 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    error, 
    required,
    ariaLabel,
    ...props 
  }) => (
    <div style={{ position: 'relative' }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel || placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${placeholder}-error` : undefined}
        required={required}
        style={{
          width: '100%',
          padding: 14,
          borderRadius: 12,
          border: error ? '2px solid #FF6B6B' : '1px solid rgba(255,255,255,0.15)',
          background: error ? 'rgba(255,107,107,0.1)' : 'rgba(255,255,255,0.05)',
          color: '#fff',
          fontSize: 15,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = error ? '#FF6B6B' : '#4ECDC4';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#FF6B6B' : 'rgba(255,255,255,0.15)';
        }}
        {...props}
      />
      {error && (
        <div 
          id={`${placeholder}-error`}
          role="alert"
          style={{ 
            color: '#FF6B6B', 
            fontSize: 12, 
            marginTop: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span aria-hidden="true">⚠</span> {error}
        </div>
      )}
    </div>
  );

  // Sub Options Sheet
  const SubOptionsSheet = () => {
    if (!optionsSheet.open || !optionsSheet.activity) return null;
    const activity = optionsSheet.activity;

    return (
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="options-sheet-title"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'flex-end',
        }} 
        onClick={() => setOptionsSheet({ open: false, activity: null })}
      >
        <div 
          style={{
            background: '#161625',
            width: '100%',
            maxHeight: '80vh',
            borderRadius: '24px 24px 0 0',
            overflow: 'hidden',
          }} 
          onClick={e => e.stopPropagation()}
        >
          <div style={{ 
            padding: '20px 20px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32 }} aria-hidden="true">{activity.emoji}</span>
              <div>
                <h3 
                  id="options-sheet-title"
                  style={{ margin: 0, color: '#fff', fontSize: 20, fontWeight: 700 }}
                >
                  Pick Your {activity.name}
                </h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                  {activity.time}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setOptionsSheet({ open: false, activity: null })}
              aria-label="Close options"
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >✕</button>
          </div>

          <div style={{ padding: 16, maxHeight: '60vh', overflowY: 'auto' }}>
            {activity.subOptions.map(option => (
              <button
                key={option.id}
                onClick={() => toggleActivity(activity, option)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: '#1a1a2e',
                  border: '2px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onFocus={(e) => e.target.style.borderColor = '#4ECDC4'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                {option.popular && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#4ECDC4',
                    color: '#0D0D0D',
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '0 0 0 8px',
                  }}>POPULAR</div>
                )}
                {option.premium && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#F8B500',
                    color: '#0D0D0D',
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '0 0 0 8px',
                  }}>PREMIUM</div>
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }} aria-hidden="true">{option.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                      {option.name}
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                      {option.vibe}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: 18, 
                    fontWeight: 700, 
                    color: '#4ECDC4',
                    flexShrink: 0,
                  }}>
                    ${option.price}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ 
            padding: '12px 16px 24px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            <button
              onClick={() => setOptionsSheet({ open: false, activity: null })}
              style={{
                width: '100%',
                padding: 14,
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              Skip {activity.name}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =============================================
  // HOME VIEW
  // =============================================
  const HomeView = () => (
    <div style={styles.container}>
      
      {/* Hero Section */}
      <header style={{
        position: 'relative',
        padding: '50px 24px 40px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderBottom: '4px solid #FF6B6B',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(78,205,196,0.2)',
            border: '1px solid rgba(78,205,196,0.4)',
            borderRadius: 30,
            padding: '8px 16px',
            marginBottom: 20,
          }}>
            <span style={{ width: 8, height: 8, background: '#4ECDC4', borderRadius: '50%' }} aria-hidden="true" />
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{HOST_INFO.stats.guests} guests served</span>
          </div>
          
          {/* Main headline */}
          <h1 style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: 16,
          }}>
            Your Medellín trip,<br />
            <span style={{ color: '#4ECDC4' }}>actually sorted.</span>
          </h1>
          
          {/* Value prop */}
          <p style={{
            margin: 0,
            fontSize: 16,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.5,
            maxWidth: 320,
          }}>
            Skip the research. I live here — I'll plan your tours, arrange your transport, and set up your nights out.
          </p>

          {/* Quick stats */}
          <div style={{
            display: 'flex',
            gap: 24,
            marginTop: 24,
          }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>
                <span aria-hidden="true">⭐</span> {HOST_INFO.stats.rating}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{HOST_INFO.stats.reviews} reviews</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} aria-hidden="true" />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{HOST_INFO.stats.years} years</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>in Medellín</div>
            </div>
          </div>
        </div>
      </header>

      {/* Meet Your Host */}
      <section aria-labelledby="host-section" className="host-section" style={{ padding: 16 }}>
        <div style={{
          background: '#161625',
          borderRadius: 20,
          padding: 20,
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {(HOST_INFO.photo.startsWith('http') || HOST_INFO.photo.startsWith('data:')) ? (
            <img 
              src={HOST_INFO.photo}
              alt={`${HOST_INFO.name}'s profile photo`}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          ) : (
            <div style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              flexShrink: 0,
            }} aria-hidden="true">{HOST_INFO.photo}</div>
          )}
          <div>
            <h2 id="host-section" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4, marginTop: 0 }}>
              Meet {HOST_INFO.name}
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
              {HOST_INFO.bio}
            </p>
            <button
              onClick={() => window.open(`https://wa.me/${HOST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hey! I have a question about booking...`, '_blank')}
              aria-label={`Message ${HOST_INFO.name} on WhatsApp`}
              style={{
                marginTop: 12,
                padding: '8px 16px',
                borderRadius: 20,
                border: '1px solid #4ECDC4',
                background: 'transparent',
                color: '#4ECDC4',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span aria-hidden="true">💬</span> Message me
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section aria-label="Quick actions" className="quick-actions" style={{ padding: '8px 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Build Your Night */}
        <button
          onClick={() => setView('night-builder')}
          aria-label="Plan your perfect night out"
          style={{
            gridColumn: 'span 2',
            background: 'linear-gradient(135deg, #C44569 0%, #FF6B6B 50%, #F8B500 100%)',
            borderRadius: 20,
            padding: 24,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            border: 'none',
            textAlign: 'left',
          }}
        >
          <div style={{ position: 'absolute', right: -20, bottom: -20, fontSize: 100, opacity: 0.3 }} aria-hidden="true">🌙</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>PLAN YOUR PERFECT</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Night Out</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Dinner → Drinks → Dancing. I'll handle everything.</div>
          </div>
        </button>

        {/* Concierge */}
        <button
          onClick={() => setView('concierge')}
          aria-label="Request custom concierge service"
          style={{
            gridColumn: 'span 2',
            background: '#161625',
            border: '2px solid #4ECDC4',
            borderRadius: 20,
            padding: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: 40 }} aria-hidden="true">💬</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Need something specific?</div>
            <div style={{ fontSize: 14, color: '#4ECDC4' }}>Tell me what you need. I'll make it happen.</div>
          </div>
        </button>
      </section>

      {/* Category Tabs */}
      <nav 
        aria-label="Service categories"
        className="category-tabs"
        style={{ 
          padding: '8px 16px', 
          display: 'flex', 
          gap: 8, 
          position: 'sticky', 
          top: 0, 
          background: '#0D0D0D', 
          zIndex: 20, 
          paddingTop: 16, 
          paddingBottom: 16 
        }}
      >
        {[
          { id: 'tours', label: 'Tours', emoji: '🎯' },
          { id: 'transport', label: 'Transport', emoji: '🚗' },
          { id: 'food', label: 'Food', emoji: '🍽️' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            aria-pressed={activeTab === tab.id}
            aria-label={`${tab.label} services`}
            style={{
              flex: 1,
              padding: '14px 12px',
              borderRadius: 14,
              border: activeTab === tab.id ? '2px solid #FF6B6B' : '2px solid transparent',
              background: activeTab === tab.id ? 'rgba(255,107,107,0.15)' : 'rgba(255,255,255,0.05)',
              color: activeTab === tab.id ? '#FF6B6B' : 'rgba(255,255,255,0.6)',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.2s ease',
            }}
          >
            <span aria-hidden="true">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Services Grid - with loading state */}
      <section aria-label="Available services" className="services-grid" style={{ padding: 16, display: 'grid', gap: 16 }}>
        {isTabLoading ? (
          // Skeleton loaders while loading
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          services[activeTab].map(service => (
            <article
              key={service.id}
              onClick={() => { setSelectedService(service); setView('detail'); }}
              role="button"
              tabIndex={0}
              aria-label={`${service.name}, $${service.price} per person, ${service.rating} stars`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedService(service);
                  setView('detail');
                }
              }}
              style={{
                background: '#161625',
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                height: 120,
                background: `linear-gradient(135deg, ${service.color}dd, ${service.color}66)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{ fontSize: 56 }} aria-hidden="true">{service.emoji}</span>
                {service.tag && (
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: service.tagColor || 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '5px 10px',
                    borderRadius: 20,
                  }}>
                    {service.tag}
                  </div>
                )}
                {service.spotsLeft && service.spotsLeft <= 5 && (
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    background: 'rgba(255,107,107,0.9)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 20,
                  }}>
                    <span aria-hidden="true">🔥</span> Only {service.spotsLeft} spots left
                  </div>
                )}
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: 20,
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  <span style={{ color: '#FFB800', fontSize: 12 }} aria-hidden="true">★</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{service.rating}</span>
                </div>
              </div>
              
              <div style={{ padding: 16 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{service.name}</h3>
                <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 12, lineHeight: 1.4 }}>{service.shortDesc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>${service.price}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginLeft: 4 }}>/ person</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    <span aria-hidden="true">🕐</span> {service.time}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Testimonials Section */}
      <section aria-labelledby="testimonials-heading" className="testimonials-section" style={{ padding: '32px 16px 16px' }}>
        <h2 id="testimonials-heading" style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>What guests say</h2>
        <div 
          className="testimonials-grid"
          style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}
          role="list"
          aria-label="Guest testimonials"
        >
          {testimonials.map((t, i) => (
            <article 
              key={`testimonial-${i}`} 
              role="listitem"
              style={{
                minWidth: 280,
                background: '#161625',
                borderRadius: 16,
                padding: 20,
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ display: 'flex', gap: 4, marginBottom: 12 }} aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(t.rating)].map((_, j) => (
                  <span key={`star-${i}-${j}`} style={{ color: '#FFB800' }} aria-hidden="true">★</span>
                ))}
              </div>
              <blockquote style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 16 }}>
                "{t.text}"
              </blockquote>
              <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{t.location}</div>
                </div>
                <div style={{ fontSize: 11, color: '#4ECDC4', background: 'rgba(78,205,196,0.15)', padding: '4px 8px', borderRadius: 8 }}>
                  {t.trip}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section - IMPROVED: Added keyboard navigation */}
      <section aria-labelledby="faq-heading" className="faq-section" style={{ padding: '16px 16px 32px' }}>
        <h2 id="faq-heading" style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>Common questions</h2>
        <div className="faq-grid" style={{ display: 'grid', gap: 8 }} role="list">
          {faqs.map((faq, i) => (
            <div 
              key={`faq-${i}`} 
              role="listitem"
              style={{
                background: '#161625',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                aria-expanded={expandedFaq === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                style={{
                  width: '100%',
                  padding: 16,
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.q}
                <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }} aria-hidden="true">
                  {expandedFaq === i ? '−' : '+'}
                </span>
              </button>
              <div 
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                hidden={expandedFaq !== i}
                style={{ 
                  padding: expandedFaq === i ? '0 16px 16px' : '0 16px',
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: 14, 
                  lineHeight: 1.5,
                  maxHeight: expandedFaq === i ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease, padding 0.3s ease',
                }}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Footer */}
      <footer style={{ padding: '24px 16px 120px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { icon: '✅', title: 'Instant Confirmation', desc: 'Know immediately' },
            { icon: '💬', title: 'WhatsApp Support', desc: `Response ${HOST_INFO.responseTime}` },
            { icon: '🔒', title: 'Secure Payment', desc: 'Stripe protected' },
            { icon: '↩️', title: 'Free Cancellation', desc: 'On most bookings' },
          ].map((item, i) => (
            <div key={`trust-${i}`} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }} aria-hidden="true">{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </footer>

      {/* Floating Cart */}
      {cart.length > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          aria-label={`View cart with ${cart.length} items, total $${cartTotal}`}
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #FF6B6B, #C44569)',
            color: '#fff',
            border: 'none',
            borderRadius: 30,
            padding: '16px 28px',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(255,107,107,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 50,
          }}
        >
          <span style={{
            background: '#fff',
            color: '#FF6B6B',
            width: 26,
            height: 26,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
          }} aria-hidden="true">{cart.length}</span>
          View Cart · ${cartTotal}
        </button>
      )}

      <RecentBookingNotification />
    </div>
  );

  // =============================================
  // DETAIL VIEW - Enhanced
  // =============================================
  const DetailView = () => {
    if (!selectedService) {
      // QUICK WIN: Fallback UI for missing service
      return (
        <div style={{
          ...styles.container,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 24,
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🤔</div>
          <h2 style={{ color: '#fff', marginBottom: 8 }}>Service not found</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>This service may have been removed or is temporarily unavailable.</p>
          <button
            onClick={() => setView('home')}
            style={{
              padding: '14px 28px',
              borderRadius: 12,
              border: 'none',
              background: '#4ECDC4',
              color: '#0D0D0D',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Back to Home
          </button>
        </div>
      );
    }
    
    const s = selectedService;

    return (
      <div style={styles.container}>
        {/* Hero */}
        <header style={{
          height: 200,
          background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <span style={{ fontSize: 80 }} aria-hidden="true">{s.emoji}</span>
          <button
            onClick={() => { setSelectedService(null); setView('home'); }}
            aria-label="Go back to services"
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              width: 44,
              height: 44,
              borderRadius: 22,
              background: 'rgba(0,0,0,0.3)',
              border: 'none',
              color: '#fff',
              fontSize: 20,
              cursor: 'pointer',
            }}
          >←</button>
          {s.spotsLeft && s.spotsLeft <= 5 && (
            <div style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              background: 'rgba(255,107,107,0.9)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: 20,
            }}>
              <span aria-hidden="true">🔥</span> Only {s.spotsLeft} spots left this week
            </div>
          )}
        </header>

        <main style={{ padding: 20 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ color: '#FFB800', fontSize: 16 }} aria-hidden="true">★</span>
            <span style={{ fontWeight: 600, color: '#fff' }}>{s.rating}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>({s.reviews} reviews)</span>
          </div>

          <h1 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 800, color: '#fff' }}>{s.name}</h1>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            <span><span aria-hidden="true">🕐</span> {s.time}</span>
            {s.cancellation && <span><span aria-hidden="true">✅</span> Free cancellation</span>}
          </div>

          {/* Full Description */}
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>
            {s.fullDesc}
          </p>

          {/* Includes */}
          {s.includes && (
            <section aria-labelledby="includes-heading" style={{ marginBottom: 24 }}>
              <h2 id="includes-heading" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>What's included</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                {s.includes.map((item, i) => (
                  <li key={`include-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: '#4ECDC4', fontSize: 16 }} aria-hidden="true">✓</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.4 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* What to Expect */}
          {s.whatToExpect && (
            <section aria-labelledby="expect-heading" style={{
              background: '#161625',
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <h2 id="expect-heading" style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8, marginTop: 0 }}>
                <span aria-hidden="true">📍</span> What to expect
              </h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.5 }}>
                {s.whatToExpect}
              </p>
            </section>
          )}

          {/* What to Bring */}
          {s.whatToBring && (
            <section aria-labelledby="bring-heading" style={{ marginBottom: 24 }}>
              <h2 id="bring-heading" style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 12 }}>What to bring</h2>
              <ul style={{ 
                listStyle: 'none',
                padding: 0, 
                margin: 0,
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 8 
              }}>
                {s.whatToBring.map((item, i) => (
                  <li key={`bring-${i}`} style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '6px 12px',
                    borderRadius: 20,
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: 13,
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Booking Section */}
          <section aria-labelledby="booking-heading" style={{
            background: '#161625',
            borderRadius: 20,
            padding: 20,
            marginBottom: 24,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h2 id="booking-heading" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16, marginTop: 0 }}>Select your date</h2>
            
            {/* IMPROVED: Date picker with day names */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 16 }}>
              {dates.map((d, i) => (
                <button
                  key={`date-${i}`}
                  onClick={() => setBooking({ ...booking, date: d.date.toISOString().split('T')[0] })}
                  aria-label={`${d.dayName}, ${d.month} ${d.dayNum}${d.isTomorrow ? ' (Tomorrow)' : ''}`}
                  aria-pressed={booking.date === d.date.toISOString().split('T')[0]}
                  style={{
                    minWidth: 70,
                    padding: '12px 8px',
                    borderRadius: 14,
                    border: booking.date === d.date.toISOString().split('T')[0] 
                      ? '2px solid #FF6B6B' 
                      : '2px solid rgba(255,255,255,0.1)',
                    background: booking.date === d.date.toISOString().split('T')[0] 
                      ? 'rgba(255,107,107,0.2)' 
                      : 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ 
                    fontSize: 11, 
                    color: d.isWeekend ? '#F8B500' : 'rgba(255,255,255,0.5)', 
                    marginBottom: 4,
                    fontWeight: 500,
                  }}>
                    {d.isTomorrow ? 'TOM' : d.dayName.toUpperCase()}
                  </div>
                  <div style={{ 
                    fontSize: 20, 
                    fontWeight: 700, 
                    color: booking.date === d.date.toISOString().split('T')[0] ? '#FF6B6B' : '#fff' 
                  }}>
                    {d.dayNum}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                    {d.month}
                  </div>
                </button>
              ))}
            </div>

            {/* Guests & Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label 
                  htmlFor="guests-select"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}
                >
                  Guests
                </label>
                <select
                  id="guests-select"
                  value={booking.guests}
                  onChange={(e) => setBooking({ ...booking, guests: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: 14,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: '#0D0D0D',
                    color: '#fff',
                    fontSize: 15,
                  }}
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={`guest-${n}`} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label 
                  htmlFor="time-select"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}
                >
                  Preferred time
                </label>
                <select
                  id="time-select"
                  value={booking.time}
                  onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                  style={{
                    width: '100%',
                    padding: 14,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: '#0D0D0D',
                    color: '#fff',
                    fontSize: 15,
                  }}
                >
                  {['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(t => (
                    <option key={`time-${t}`} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live price calculation */}
            <div style={{
              marginTop: 16,
              padding: 12,
              background: 'rgba(78,205,196,0.1)',
              borderRadius: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                ${s.price} × {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
              </span>
              <span style={{ color: '#4ECDC4', fontSize: 18, fontWeight: 700 }}>
                ${s.price * booking.guests}
              </span>
            </div>
          </section>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(s, booking)}
            disabled={!booking.date}
            aria-disabled={!booking.date}
            style={{
              width: '100%',
              padding: 18,
              borderRadius: 14,
              border: 'none',
              background: booking.date ? 'linear-gradient(135deg, #FF6B6B, #C44569)' : 'rgba(255,255,255,0.1)',
              color: booking.date ? '#fff' : 'rgba(255,255,255,0.4)',
              fontSize: 18,
              fontWeight: 700,
              cursor: booking.date ? 'pointer' : 'not-allowed',
              marginBottom: 100,
            }}
          >
            {booking.date ? `Add to Cart · $${s.price * booking.guests}` : 'Select a date to continue'}
          </button>
        </main>
      </div>
    );
  };

  // =============================================
  // NIGHT BUILDER VIEW
  // =============================================
  const NightBuilderView = () => {
    const nightTotal = useMemo(() => {
      return nightPlan.activities.reduce((sum, a) => sum + a.price, 0);
    }, [nightPlan.activities]);

    return (
      <div style={styles.container}>
        {/* Header */}
        <header style={{
          padding: '20px 16px',
          background: 'linear-gradient(135deg, #C44569, #FF6B6B)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <button
            onClick={() => { setView('home'); setNightStep(0); setNightPlan({ vibe: null, area: null, activities: [] }); }}
            aria-label="Cancel and go back"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              background: 'rgba(0,0,0,0.2)',
              border: 'none',
              color: '#fff',
              fontSize: 18,
              cursor: 'pointer',
            }}
          >←</button>
          <div>
            <h1 style={{ margin: 0, color: '#fff', fontSize: 20, fontWeight: 700 }}>Build Your Night</h1>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Step {nightStep + 1} of 4</p>
          </div>
        </header>

        {/* Progress Bar */}
        <div 
          role="progressbar" 
          aria-valuenow={nightStep + 1} 
          aria-valuemin={1} 
          aria-valuemax={4}
          aria-label={`Step ${nightStep + 1} of 4`}
          style={{ height: 4, background: 'rgba(255,255,255,0.1)' }}
        >
          <div style={{
            height: '100%',
            width: `${((nightStep + 1) / 4) * 100}%`,
            background: 'linear-gradient(90deg, #FF6B6B, #F8B500)',
            transition: 'width 0.3s ease',
          }} />
        </div>

        <main style={{ padding: 20 }}>
          {/* Step 0: Choose Vibe */}
          {nightStep === 0 && (
            <section aria-labelledby="vibe-heading">
              <h2 id="vibe-heading" style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>What's the vibe?</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>Pick the energy level for tonight</p>
              
              <div style={{ display: 'grid', gap: 12 }}>
                {nightVibes.map(vibe => (
                  <button
                    key={vibe.id}
                    onClick={() => { setNightPlan({ ...nightPlan, vibe }); setNightStep(1); }}
                    aria-label={`${vibe.name}: ${vibe.desc}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: 20,
                      background: '#161625',
                      border: '2px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = vibe.color}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    onMouseEnter={(e) => e.target.style.borderColor = vibe.color}
                    onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  >
                    <div style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                      background: `${vibe.color}33`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 32,
                      flexShrink: 0,
                    }} aria-hidden="true">{vibe.emoji}</div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{vibe.name}</div>
                      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{vibe.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Step 1: Choose Area */}
          {nightStep === 1 && (
            <section aria-labelledby="area-heading">
              <h2 id="area-heading" style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>Where do you want to go?</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>Each neighborhood has its own character</p>
              
              <div style={{ display: 'grid', gap: 12 }}>
                {nightAreas.map(area => (
                  <button
                    key={area.id}
                    onClick={() => { setNightPlan({ ...nightPlan, area }); setNightStep(2); }}
                    aria-label={`${area.name}: ${area.desc}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: 20,
                      background: '#161625',
                      border: '2px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4ECDC4'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    onMouseEnter={(e) => e.target.style.borderColor = '#4ECDC4'}
                    onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  >
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      background: 'rgba(78,205,196,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      flexShrink: 0,
                    }} aria-hidden="true">{area.emoji}</div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{area.name}</div>
                      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{area.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setNightStep(0)}
                style={{
                  width: '100%',
                  marginTop: 16,
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                ← Back to vibes
              </button>
            </section>
          )}

          {/* Step 2: Build Itinerary */}
          {nightStep === 2 && (
            <section aria-labelledby="activities-heading">
              <h2 id="activities-heading" style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>Build your night</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
                Add activities to your {nightPlan.vibe?.name.toLowerCase()} night in {nightPlan.area?.name}
              </p>
              
              <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
                {nightActivities.map(activity => {
                  const isSelected = nightPlan.activities.find(a => a.id === activity.id);
                  return (
                    <button
                      key={activity.id}
                      onClick={() => handleActivityClick(activity)}
                      aria-pressed={!!isSelected}
                      aria-label={`${activity.name}, $${isSelected?.price || activity.price}, ${activity.time}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: 16,
                        background: isSelected ? 'rgba(78,205,196,0.15)' : '#161625',
                        border: isSelected ? '2px solid #4ECDC4' : '2px solid rgba(255,255,255,0.08)',
                        borderRadius: 14,
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: isSelected ? '#4ECDC4' : 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        flexShrink: 0,
                        color: isSelected ? '#0D0D0D' : '#fff',
                      }} aria-hidden="true">
                        {isSelected ? '✓' : activity.emoji}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>
                          {isSelected?.displayName || activity.name}
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{activity.time}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: isSelected ? '#4ECDC4' : '#fff' }}>
                          ${isSelected?.price || activity.price}
                        </div>
                        {activity.hasOptions && !isSelected && (
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>options →</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Summary */}
              {nightPlan.activities.length > 0 && (
                <div style={{
                  background: '#161625',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                  border: '1px solid rgba(78,205,196,0.3)',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Your Night:</div>
                  {nightPlan.activities.map((a, i) => (
                    <div key={`selected-${a.id}-${i}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{a.displayName || a.name}</span>
                      <span style={{ color: '#4ECDC4', fontSize: 14, fontWeight: 600 }}>${a.price}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#fff', fontWeight: 600 }}>Per person</span>
                    <span style={{ color: '#4ECDC4', fontSize: 18, fontWeight: 700 }}>${nightTotal}</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setNightStep(1)}
                  style={{
                    flex: 1,
                    padding: 14,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => setNightStep(3)}
                  disabled={nightPlan.activities.length === 0}
                  style={{
                    flex: 2,
                    padding: 14,
                    borderRadius: 12,
                    border: 'none',
                    background: nightPlan.activities.length > 0 ? 'linear-gradient(135deg, #FF6B6B, #C44569)' : 'rgba(255,255,255,0.1)',
                    color: nightPlan.activities.length > 0 ? '#fff' : 'rgba(255,255,255,0.4)',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: nightPlan.activities.length > 0 ? 'pointer' : 'not-allowed',
                  }}
                >
                  Continue →
                </button>
              </div>
            </section>
          )}

          {/* Step 3: Date & Details */}
          {nightStep === 3 && (
            <section aria-labelledby="details-heading">
              <h2 id="details-heading" style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>Final details</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>When is this happening?</p>
              
              {/* Date Selection - IMPROVED */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#fff', display: 'block', marginBottom: 12 }}>Select Date</label>
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
                  {dates.map((d, i) => (
                    <button
                      key={`night-date-${i}`}
                      onClick={() => setBooking({ ...booking, date: d.date.toISOString().split('T')[0] })}
                      aria-pressed={booking.date === d.date.toISOString().split('T')[0]}
                      style={{
                        minWidth: 70,
                        padding: '12px 8px',
                        borderRadius: 14,
                        border: booking.date === d.date.toISOString().split('T')[0] 
                          ? '2px solid #FF6B6B' 
                          : '2px solid rgba(255,255,255,0.1)',
                        background: booking.date === d.date.toISOString().split('T')[0] 
                          ? 'rgba(255,107,107,0.2)' 
                          : 'rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <div style={{ 
                        fontSize: 11, 
                        color: d.isWeekend ? '#F8B500' : 'rgba(255,255,255,0.5)', 
                        marginBottom: 4,
                        fontWeight: 500,
                      }}>
                        {d.isTomorrow ? 'TOM' : d.dayName.toUpperCase()}
                      </div>
                      <div style={{ 
                        fontSize: 20, 
                        fontWeight: 700, 
                        color: booking.date === d.date.toISOString().split('T')[0] ? '#FF6B6B' : '#fff' 
                      }}>
                        {d.dayNum}
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                        {d.month}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Size */}
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="night-guests" style={{ fontSize: 14, fontWeight: 600, color: '#fff', display: 'block', marginBottom: 12 }}>Group Size</label>
                <select
                  id="night-guests"
                  value={booking.guests}
                  onChange={(e) => setBooking({ ...booking, guests: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: 16,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: '#161625',
                    color: '#fff',
                    fontSize: 16,
                  }}
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={`night-guest-${n}`} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>

              {/* Total Summary */}
              <div style={{
                background: '#161625',
                borderRadius: 16,
                padding: 20,
                marginBottom: 24,
                border: '1px solid rgba(78,205,196,0.3)',
              }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                  {nightPlan.vibe?.emoji} {nightPlan.vibe?.name} in {nightPlan.area?.name}
                </div>
                {nightPlan.activities.map((a, i) => (
                  <div key={`summary-${a.id}-${i}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                    <span>{a.displayName || a.name}</span>
                    <span>${a.price} × {booking.guests}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: 16 }}>Total</span>
                    <span style={{ color: '#4ECDC4', fontSize: 28, fontWeight: 700 }}>${nightTotal * booking.guests}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setNightStep(2)}
                  style={{
                    flex: 1,
                    padding: 16,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 15,
                    cursor: 'pointer',
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={addNightToCart}
                  disabled={!booking.date}
                  style={{
                    flex: 2,
                    padding: 16,
                    borderRadius: 12,
                    border: 'none',
                    background: booking.date ? 'linear-gradient(135deg, #FF6B6B, #C44569)' : 'rgba(255,255,255,0.1)',
                    color: booking.date ? '#fff' : 'rgba(255,255,255,0.4)',
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: booking.date ? 'pointer' : 'not-allowed',
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </section>
          )}
        </main>

        <SubOptionsSheet />
      </div>
    );
  };

  // =============================================
  // CONCIERGE VIEW
  // =============================================
  const ConciergeView = () => (
    <div style={styles.container}>
      <header style={{
        padding: '20px 16px',
        background: '#161625',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <button
          onClick={() => setView('home')}
          aria-label="Go back to home"
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            fontSize: 18,
            cursor: 'pointer',
          }}
        >←</button>
        <h1 style={{ margin: 0, color: '#fff', fontSize: 20, fontWeight: 700 }}>Personal Concierge</h1>
      </header>

      <main style={{ padding: 20 }}>
        <div style={{
          background: '#161625',
          borderRadius: 20,
          padding: 24,
          marginBottom: 24,
          border: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }} aria-hidden="true">💬</div>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>
            Need something custom?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.5, marginBottom: 0 }}>
            Bachelor parties, proposals, special celebrations, specific requests — tell me what you need and I'll make it happen.
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label htmlFor="concierge-message" style={{ fontSize: 14, fontWeight: 600, color: '#fff', display: 'block', marginBottom: 12 }}>
            What do you need?
          </label>
          <textarea
            id="concierge-message"
            placeholder="Describe what you're looking for... dates, group size, budget, any special requirements"
            value={conciergeMsg}
            onChange={(e) => setConciergeMsg(e.target.value)}
            rows={6}
            style={{
              width: '100%',
              padding: 16,
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.15)',
              background: '#161625',
              color: '#fff',
              fontSize: 15,
              lineHeight: 1.5,
              resize: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          onClick={() => {
            const msg = encodeURIComponent(`Hey ${HOST_INFO.name}! I need help with something custom:\n\n${conciergeMsg}`);
            window.open(`https://wa.me/${HOST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
          }}
          disabled={!conciergeMsg.trim()}
          style={{
            width: '100%',
            padding: 18,
            borderRadius: 14,
            border: 'none',
            background: conciergeMsg.trim() ? '#25D366' : 'rgba(255,255,255,0.1)',
            color: conciergeMsg.trim() ? '#fff' : 'rgba(255,255,255,0.4)',
            fontSize: 16,
            fontWeight: 700,
            cursor: conciergeMsg.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span aria-hidden="true">💬</span> Send via WhatsApp
        </button>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 16 }}>
          I typically respond within {HOST_INFO.responseTime}
        </p>
      </main>
    </div>
  );

  // =============================================
  // CART SHEET - IMPROVED with validation
  // =============================================
  const CartSheet = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCheckout = async () => {
      if (!validateBookingForm()) {
        return;
      }
      
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setCartOpen(false);
      setCart([]);
      setView('success');
      showToast('Booking confirmed! Check WhatsApp soon.');
    };

    if (!cartOpen) return null;

    return (
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'flex-end',
        }} 
        onClick={() => setCartOpen(false)}
      >
        <div 
          style={{
            background: '#0D0D0D',
            width: '100%',
            maxHeight: '90vh',
            borderRadius: '24px 24px 0 0',
            display: 'flex',
            flexDirection: 'column',
          }} 
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ 
            padding: 20, 
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <h2 id="cart-title" style={{ margin: 0, color: '#fff', fontSize: 20, fontWeight: 700 }}>Your Cart</h2>
            <button 
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >✕</button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            {/* QUICK WIN: Empty cart state */}
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }} aria-hidden="true">🛒</div>
                <h3 style={{ color: '#fff', fontSize: 18, marginBottom: 8 }}>Your cart is empty</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 24 }}>
                  Add tours, transport, or experiences to get started
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  style={{
                    padding: '14px 28px',
                    borderRadius: 12,
                    border: 'none',
                    background: '#4ECDC4',
                    color: '#0D0D0D',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Browse Services
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div style={{ marginBottom: 24 }}>
                  {cart.map((item, index) => (
                    <div key={item.cartId} style={{
                      display: 'flex',
                      gap: 14,
                      padding: 16,
                      background: '#161625',
                      borderRadius: 16,
                      marginBottom: 12,
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <div style={{
                        width: 50,
                        height: 50,
                        borderRadius: 12,
                        background: item.color ? `${item.color}33` : 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        flexShrink: 0,
                      }} aria-hidden="true">{item.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                          {item.date} · {item.guests} {item.guests === 1 ? 'guest' : 'guests'}
                        </div>
                        {item.isNight && item.activities && (
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                            {item.activities.map(a => a.displayName || a.name).join(' → ')}
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#4ECDC4' }}>${item.total}</div>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          aria-label={`Remove ${item.name} from cart`}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#FF6B6B',
                            fontSize: 12,
                            cursor: 'pointer',
                            marginTop: 4,
                            padding: 0,
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Details - IMPROVED with validation */}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16, marginTop: 0 }}>Contact Details</h3>
                  <div style={{ display: 'grid', gap: 12 }}>
                    <FormInput
                      placeholder="Your name"
                      value={booking.name}
                      onChange={(e) => {
                        setBooking({ ...booking, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      error={errors.name}
                      required
                      ariaLabel="Your name"
                    />
                    <FormInput
                      type="tel"
                      placeholder="WhatsApp number (with country code)"
                      value={booking.whatsapp}
                      onChange={(e) => {
                        const formatted = formatWhatsApp(e.target.value);
                        setBooking({ ...booking, whatsapp: formatted });
                        if (errors.whatsapp) setErrors({ ...errors, whatsapp: null });
                      }}
                      error={errors.whatsapp}
                      required
                      ariaLabel="WhatsApp number with country code"
                    />
                    <FormInput
                      type="email"
                      placeholder="Email (for confirmation)"
                      value={booking.email}
                      onChange={(e) => {
                        setBooking({ ...booking, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      error={errors.email}
                      ariaLabel="Email address for confirmation"
                    />
                    <textarea
                      placeholder="Special requests (optional)"
                      value={booking.notes}
                      onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                      rows={2}
                      aria-label="Special requests"
                      style={{
                        width: '100%',
                        padding: 14,
                        borderRadius: 12,
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        fontSize: 15,
                        outline: 'none',
                        resize: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.2)', borderRadius: 12, padding: 12, marginBottom: 20 }}>
                  <div style={{ fontSize: 13, color: '#4ECDC4', fontWeight: 600, marginBottom: 4 }}>
                    <span aria-hidden="true">✅</span> Free cancellation
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                    Cancel up to 24 hours before for a full refund on most bookings.
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer - only show if cart has items */}
          {cart.length > 0 && (
            <div style={{ padding: 20, borderTop: '1px solid rgba(255,255,255,0.1)', background: '#0D0D0D', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>Total</span>
                <span style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>${cartTotal}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={!booking.name || !booking.whatsapp || isSubmitting}
                aria-busy={isSubmitting}
                style={{
                  width: '100%',
                  padding: 18,
                  borderRadius: 14,
                  border: 'none',
                  background: (booking.name && booking.whatsapp && !isSubmitting) 
                    ? 'linear-gradient(135deg, #FF6B6B, #C44569)' 
                    : 'rgba(255,255,255,0.1)',
                  color: (booking.name && booking.whatsapp && !isSubmitting) 
                    ? '#fff' 
                    : 'rgba(255,255,255,0.4)',
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: (booking.name && booking.whatsapp && !isSubmitting) ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size={20} />
                    Processing...
                  </>
                ) : (booking.name && booking.whatsapp) ? (
                  `Confirm Booking · $${cartTotal}`
                ) : (
                  'Enter your details above'
                )}
              </button>
              <div style={{ textAlign: 'center', marginTop: 12, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                <span aria-hidden="true">🔒</span> Secure payment · You'll receive a WhatsApp to confirm & pay
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // =============================================
  // SUCCESS VIEW
  // =============================================
  const SuccessView = () => (
    <div style={{
      ...styles.container,
      background: 'linear-gradient(180deg, #0f3460 0%, #16213e 50%, #0D0D0D 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <main style={{ textAlign: 'center', maxWidth: 320 }} role="status" aria-live="polite">
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          background: 'linear-gradient(135deg, #4ECDC4, #06D6A0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: 48,
        }} aria-hidden="true">✓</div>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          Listo, parce! <span aria-hidden="true">🎉</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 32, lineHeight: 1.5 }}>
          I'll WhatsApp you within the hour to confirm everything and arrange payment.
        </p>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: 20,
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Confirmation</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#4ECDC4', fontFamily: 'monospace' }}>
            MDE-{Date.now().toString().slice(-6)}
          </div>
        </div>

        <button
          onClick={() => setView('home')}
          style={{
            width: '100%',
            padding: 18,
            borderRadius: 14,
            border: 'none',
            background: '#fff',
            color: '#0D0D0D',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: 12,
          }}
        >
          Book More
        </button>
        
        <button
          onClick={() => window.open(`https://wa.me/${HOST_INFO.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
          aria-label="Chat with Carlos on WhatsApp"
          style={{
            width: '100%',
            padding: 18,
            borderRadius: 14,
            border: '2px solid #4ECDC4',
            background: 'transparent',
            color: '#4ECDC4',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Chat on WhatsApp <span aria-hidden="true">💬</span>
        </button>
      </main>
    </div>
  );

  // =============================================
  // RENDER
  // =============================================
  return (
    <>
      {view === 'home' && <HomeView />}
      {view === 'night-builder' && <NightBuilderView />}
      {view === 'concierge' && <ConciergeView />}
      {view === 'detail' && <DetailView />}
      {view === 'success' && <SuccessView />}
      <CartSheet />
      
      {/* Toast notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes toastSlideIn {
          from { transform: translate(-50%, -20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Focus visible styles for accessibility */
        *:focus-visible {
          outline: 2px solid #4ECDC4;
          outline-offset: 2px;
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Hide scrollbars but allow scrolling */
        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 3px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
        
        /* ===== RESPONSIVE DESKTOP STYLES ===== */
        
        /* Tablet (640px+) */
        @media (min-width: 640px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
            padding: 24px !important;
          }
          .quick-actions {
            padding: 16px 24px 24px !important;
            gap: 16px !important;
          }
          .host-section {
            padding: 24px !important;
          }
          .category-tabs {
            padding: 16px 24px !important;
            max-width: 500px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .testimonials-section {
            padding: 32px 24px 16px !important;
          }
          .faq-section {
            padding: 16px 24px 32px !important;
          }
        }
        
        /* Desktop (1024px+) */
        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 24px !important;
            padding: 32px 48px !important;
          }
          .quick-actions {
            padding: 24px 48px 32px !important;
            gap: 20px !important;
          }
          .quick-actions > button:first-child {
            grid-column: span 1 !important;
          }
          .quick-actions > button:nth-child(2) {
            grid-column: span 1 !important;
          }
          .host-section {
            padding: 32px 48px !important;
          }
          .testimonials-section {
            padding: 32px 48px 16px !important;
          }
          .testimonials-grid {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 20px !important;
            overflow-x: visible !important;
          }
          .testimonials-grid > article {
            min-width: unset !important;
          }
          .faq-section {
            padding: 16px 48px 48px !important;
          }
          .faq-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        
        /* Large Desktop (1200px+) */
        @media (min-width: 1200px) {
          .services-grid {
            padding: 32px 64px !important;
          }
          .quick-actions {
            padding: 24px 64px 32px !important;
          }
          .host-section {
            padding: 32px 64px !important;
          }
          .testimonials-section {
            padding: 32px 64px 16px !important;
          }
          .faq-section {
            padding: 16px 64px 48px !important;
          }
        }
      `}</style>
    </>
  );
}
