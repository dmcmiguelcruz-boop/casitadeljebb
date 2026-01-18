import React, { useState, useEffect, useMemo, useCallback } from 'react';

// =============================================
// CASITA DEL JEBB - Premium Medellín Concierge
// Stunning Desktop + Mobile Experience
// =============================================

// Host Info
const HOST_INFO = {
  name: 'Jeb',
  photo: 'https://i.ibb.co/8gTcfDLy/carlos.jpg',
  whatsapp: '+573001234567',
  responseTime: '< 2 hours',
  bio: "I came to Medellín 5 years ago and never left. Now I help visitors skip the tourist traps and experience the city like I do — the hidden spots, the best food, the nights out that actually deliver. Think of me as your friend who already made all the mistakes so you don't have to.",
  stats: {
    guests: '2,400+',
    rating: '4.9',
    reviews: '847',
    years: '5',
  }
};

// Testimonials
const testimonials = [
  {
    name: 'Sarah & Mike',
    location: 'Austin, TX',
    text: "Jeb planned our entire week and it was PERFECT. The coffee farm tour was a highlight of our whole South America trip. Skip the apps, just message this guy.",
    rating: 5,
    trip: 'Coffee Farm + Guatapé',
    avatar: '👫'
  },
  {
    name: 'James',
    location: 'London, UK',
    text: "The night out he planned was incredible. We never would have found that speakeasy on our own. Felt like we had a local friend showing us around.",
    rating: 5,
    trip: 'Night Out Package',
    avatar: '🧔'
  },
  {
    name: 'Ana & Friends',
    location: 'Miami, FL',
    text: "Group of 6 girls, we were nervous about safety. Jeb had everything handled — reliable drivers, reservations, even a backup plan when one place was too crowded. 10/10.",
    rating: 5,
    trip: 'Bachelorette Weekend',
    avatar: '👯‍♀️'
  },
  {
    name: 'Marcus',
    location: 'Berlin, DE',
    text: "As a solo traveler, having Jeb coordinate everything made the trip stress-free. His restaurant picks were spot on, and the Comuna 13 tour guide was phenomenal.",
    rating: 5,
    trip: 'Solo Explorer Package',
    avatar: '🧳'
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
      { id: 'd5', name: 'Hacienda', vibe: 'Traditional paisa food. Huge portions.', price: 35, emoji: '🥘' },
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

// Services Data
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
      fullDesc: "This isn't a walking tour — it's a story. Your guide grew up in Comuna 13 during the worst years and watched it transform into what it is today. You'll ride the famous outdoor escalators, see world-class street art, and hear stories you won't find in any guidebook.",
      includes: ['Local guide FROM Comuna 13', 'Outdoor escalator ride', 'Street art walking tour', 'Traditional snacks & fresh juice', 'Small group (max 10)', 'Photos at the best spots'],
      meetingPoint: 'San Javier Metro Station',
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
      fullDesc: "Escape the city for a day. We drive 90 minutes into the mountains to a third-generation coffee farm. You'll pick your own beans, learn the entire process, roast coffee yourself, and sit down for a traditional campo lunch.",
      includes: ['Private transport', 'English-speaking guide', 'Coffee picking & processing', 'Roasting demonstration', 'Farm lunch', '500g fresh coffee to take home'],
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
      fullDesc: "If you only do ONE day trip from Medellín, this is it. We start early to beat the crowds at El Peñol — that famous rock with 740 steps to the top. The view is insane. Then we explore Guatapé's colorful streets, have lunch, and take a boat ride.",
      includes: ['Transport with AC', 'Breakfast snacks', 'El Peñol entrance fee', 'Boat ride', 'Lunch in Guatapé', 'English-speaking guide'],
      meetingPoint: 'Hotel pickup at 7:00 AM',
      cancellation: 'Free cancellation up to 24 hours before',
    },
    {
      id: 't4',
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
      fullDesc: "No experience needed — you fly tandem with a certified pilot who has 10+ years of experience. Launch from the hills above the city, soar for 15-25 minutes, and get photos/videos of the whole thing.",
      includes: ['Transport to launch site', 'All safety equipment', 'Certified pilot', '15-25 minute flight', 'Photos & video', 'Return transport'],
      meetingPoint: 'Hotel pickup included',
      cancellation: 'Free cancellation up to 24 hours before',
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
      fullDesc: "After a long flight, the last thing you want is to negotiate with taxi drivers. Your driver will be waiting in arrivals with your name, help with bags, and get you to your accommodation in a clean, air-conditioned car.",
      includes: ['Meet & greet in arrivals', 'Flight tracking', 'Luggage assistance', 'AC vehicle', 'Cold water', 'Up to 4 passengers'],
      cancellation: 'Free cancellation up to 12 hours before',
    },
    {
      id: 'tr2',
      name: 'Airport Drop-off',
      price: 30,
      time: 'Any time',
      emoji: '🛫',
      color: '#0077B6',
      rating: 4.95,
      reviews: 1654,
      shortDesc: 'On-time guarantee. Never miss a flight.',
      fullDesc: "We pick you up with plenty of buffer time. Driver knows exactly how long it takes and monitors traffic. You're not stressing about Uber surge pricing at 5am.",
      includes: ['Pickup from your door', 'Flight monitoring', 'Luggage assistance', 'Cold water', 'On-time guarantee', 'Up to 4 passengers'],
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
      fullDesc: "This is the best way to see Medellín if you have limited time. Driver picks you up, you tell them where to go (or ask for recommendations), and they handle everything.",
      includes: ['8 hours drive time', 'AC vehicle', 'English-speaking driver', 'Local recommendations', 'Flexible itinerary', 'Unlimited stops'],
      cancellation: 'Free cancellation up to 24 hours before',
    },
  ],
  food: [
    {
      id: 'm1',
      name: 'Luxury Welcome Package',
      price: 65,
      time: 'Pre-arrival',
      emoji: '🧺',
      color: '#E63946',
      tag: 'GUEST FAVORITE',
      tagColor: '#E63946',
      rating: 4.95,
      reviews: 234,
      shortDesc: 'Arrive to a stocked apartment. The little things matter.',
      fullDesc: "You land tired, you get to your place, and everything is waiting: fresh tropical fruits, premium Colombian coffee, a nice bottle of wine, artisan chocolates, and a guide with my actual recommendations.",
      includes: ['Fresh tropical fruit basket', 'Premium Colombian coffee', 'Bottle of wine', 'Artisan chocolate selection', 'Personalized neighborhood guide', 'Delivered before arrival'],
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
      fullDesc: "A professional chef comes to YOUR kitchen and cooks a 4-course Colombian tasting menu while you watch. Wine pairing included. They bring everything, cook everything, and clean everything.",
      includes: ['4-course tasting menu', 'Wine pairing (2 bottles)', 'All ingredients', 'Full kitchen cleanup', 'Menu customization', 'Serves 2-6 guests'],
      cancellation: 'Free cancellation up to 48 hours before',
    },
  ],
};

// CSS Keyframes as a string to inject
const keyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes toastSlideIn {
    from { opacity: 0; transform: translate(-50%, -20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(78, 205, 196, 0.3); }
    50% { box-shadow: 0 0 40px rgba(78, 205, 196, 0.6); }
  }
`;

// Main App Component
export default function CasitaDelJebb() {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('tours');
  const [selectedService, setSelectedService] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [booking, setBooking] = useState({ date: '', time: '09:00', guests: 2, name: '', whatsapp: '', email: '', notes: '' });
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [toast, setToast] = useState(null);
  const [nightStep, setNightStep] = useState(0);
  const [nightPlan, setNightPlan] = useState({ vibe: null, area: null, activities: [] });
  const [optionsSheet, setOptionsSheet] = useState({ open: false, activity: null });
  const [conciergeMsg, setConciergeMsg] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Inject keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Scroll listener for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem('casita-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('casita-cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

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
    showToast('Item removed', 'warning');
  }, [showToast]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.total, 0), [cart]);

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
      setNightPlan({ ...nightPlan, activities: nightPlan.activities.filter(a => a.id !== activity.id) });
    } else {
      const filtered = nightPlan.activities.filter(a => a.id !== activity.id);
      const activityToAdd = {
        ...activity,
        selectedOption,
        price: selectedOption ? selectedOption.price : activity.price,
        displayName: selectedOption ? `${activity.name}: ${selectedOption.name}` : activity.name
      };
      setNightPlan({ ...nightPlan, activities: [...filtered, activityToAdd] });
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

  // =============================================
  // COMPONENTS
  // =============================================

  // Toast Notification
  const Toast = () => {
    if (!toast) return null;
    const bgColor = toast.type === 'success' ? '#4ECDC4' : toast.type === 'error' ? '#FF6B6B' : '#F8B500';
    return (
      <div style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: bgColor,
        color: toast.type === 'warning' ? '#0D0D0D' : '#fff',
        padding: '16px 24px',
        borderRadius: 12,
        fontWeight: 600,
        zIndex: 1000,
        animation: 'toastSlideIn 0.3s ease',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      }}>
        {toast.message}
      </div>
    );
  };

  // Navigation Bar
  const Navbar = () => (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '16px 24px',
      background: scrolled ? 'rgba(13, 13, 13, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      transition: 'all 0.3s ease',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => setView('home')}>
        <span style={{ fontSize: 28 }}>🏠</span>
        <span style={{
          fontSize: 20,
          fontWeight: 800,
          color: '#fff',
          display: scrolled ? 'block' : 'none',
        }}>Casita del Jebb</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <button
          onClick={() => window.open(`https://wa.me/${HOST_INFO.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
          style={{
            padding: '10px 20px',
            borderRadius: 30,
            border: '2px solid #4ECDC4',
            background: 'transparent',
            color: '#4ECDC4',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>💬</span>
          <span className="hide-mobile">WhatsApp</span>
        </button>
        {cart.length > 0 && (
          <button
            onClick={() => setCartOpen(true)}
            style={{
              padding: '10px 20px',
              borderRadius: 30,
              border: 'none',
              background: '#FF6B6B',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              animation: 'glow 2s infinite',
            }}
          >
            🛒 {cart.length} · ${cartTotal}
          </button>
        )}
      </div>
    </nav>
  );

  // Hero Section
  const HeroSection = () => (
    <header style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '120px 24px 80px',
      background: 'linear-gradient(135deg, #0D0D0D 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        fontSize: 80,
        opacity: 0.1,
        animation: 'float 6s ease-in-out infinite',
      }}>🌴</div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        fontSize: 60,
        opacity: 0.1,
        animation: 'float 8s ease-in-out infinite',
        animationDelay: '1s',
      }}>☕</div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        fontSize: 70,
        opacity: 0.1,
        animation: 'float 7s ease-in-out infinite',
        animationDelay: '2s',
      }}>🎨</div>
      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '10%',
        fontSize: 50,
        opacity: 0.1,
        animation: 'float 5s ease-in-out infinite',
        animationDelay: '0.5s',
      }}>🪂</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
        {/* Trust badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(78, 205, 196, 0.15)',
          border: '1px solid rgba(78, 205, 196, 0.4)',
          borderRadius: 50,
          padding: '12px 24px',
          marginBottom: 32,
          animation: 'slideUp 0.6s ease',
        }}>
          <span style={{ width: 10, height: 10, background: '#4ECDC4', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          <span style={{ color: '#fff', fontSize: 15, fontWeight: 500 }}>{HOST_INFO.stats.guests} guests served · ⭐ {HOST_INFO.stats.rating} rating</span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 80px)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: 24,
          animation: 'slideUp 0.6s ease',
          animationDelay: '0.1s',
          animationFillMode: 'backwards',
        }}>
          Your Medellín Trip,<br />
          <span style={{
            background: 'linear-gradient(135deg, #4ECDC4, #44A08D, #4ECDC4)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 3s ease infinite',
          }}>Actually Sorted.</span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.6,
          maxWidth: 600,
          margin: '0 auto 40px',
          animation: 'slideUp 0.6s ease',
          animationDelay: '0.2s',
          animationFillMode: 'backwards',
        }}>
          Skip the research, the scams, and the tourist traps.<br />
          I'll plan everything — you just show up.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'slideUp 0.6s ease',
          animationDelay: '0.3s',
          animationFillMode: 'backwards',
        }}>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '18px 36px',
              borderRadius: 50,
              border: 'none',
              background: 'linear-gradient(135deg, #FF6B6B, #C44569)',
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 10px 40px rgba(255,107,107,0.4)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
          >
            Browse Experiences →
          </button>
          <button
            onClick={() => setView('night-builder')}
            style={{
              padding: '18px 36px',
              borderRadius: 50,
              border: '2px solid #4ECDC4',
              background: 'transparent',
              color: '#4ECDC4',
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = '#4ECDC4'; e.target.style.color = '#0D0D0D'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#4ECDC4'; }}
          >
            🌙 Plan Your Night
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        animation: 'float 2s ease-in-out infinite',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Scroll to explore</span>
        <span style={{ fontSize: 24 }}>↓</span>
      </div>
    </header>
  );

  // Meet Jeb Section
  const MeetJebSection = () => (
    <section style={{
      padding: 'clamp(60px, 10vw, 120px) 24px',
      background: '#0D0D0D',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 60,
        alignItems: 'center',
      }}>
        {/* Photo and info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <div style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4ECDC4, #FF6B6B)',
            padding: 4,
            marginBottom: 24,
          }}>
            <img
              src={HOST_INFO.photo}
              alt={HOST_INFO.name}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
            Hey, I'm {HOST_INFO.name} 👋
          </h2>
          <p style={{ color: '#4ECDC4', fontSize: 18, marginBottom: 16 }}>
            Your Medellín Insider
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{HOST_INFO.stats.guests}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Happy Guests</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>⭐ {HOST_INFO.stats.rating}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{HOST_INFO.stats.reviews} Reviews</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{HOST_INFO.stats.years}+</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Years Here</div>
            </div>
          </div>
        </div>

        {/* Bio and features */}
        <div>
          <p style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.8,
            marginBottom: 32,
          }}>
            {HOST_INFO.bio}
          </p>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { icon: '⚡', text: 'Response within 2 hours' },
              { icon: '🛡️', text: 'Only vetted, trusted partners' },
              { icon: '💬', text: 'Direct WhatsApp support 24/7' },
              { icon: '💰', text: 'Best price guarantee' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 16,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ color: '#fff', fontSize: 16 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // Services Section
  const ServicesSection = () => (
    <section id="services" style={{
      padding: 'clamp(60px, 10vw, 120px) 24px',
      background: 'linear-gradient(180deg, #0D0D0D 0%, #1a1a2e 100%)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 16,
          }}>
            What Can I Help You With?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18 }}>
            Everything you need for an unforgettable trip
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          marginBottom: 48,
          flexWrap: 'wrap',
        }}>
          {[
            { id: 'tours', label: 'Tours & Experiences', emoji: '🎯' },
            { id: 'transport', label: 'Transport', emoji: '🚗' },
            { id: 'food', label: 'Food & Dining', emoji: '🍽️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 32px',
                borderRadius: 50,
                border: activeTab === tab.id ? 'none' : '2px solid rgba(255,255,255,0.2)',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #FF6B6B, #C44569)' : 'transparent',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ fontSize: 20 }}>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {services[activeTab].map((service, i) => (
            <div
              key={service.id}
              onClick={() => { setSelectedService(service); setView('detail'); }}
              style={{
                background: '#161625',
                borderRadius: 24,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                animation: 'slideUp 0.5s ease',
                animationDelay: `${i * 0.1}s`,
                animationFillMode: 'backwards',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
                e.currentTarget.style.borderColor = '#4ECDC4';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              {/* Card Header */}
              <div style={{
                height: 160,
                background: `linear-gradient(135deg, ${service.color}dd, ${service.color}66)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{ fontSize: 72 }}>{service.emoji}</span>
                {service.tag && (
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    background: service.tagColor || '#FF6B6B',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '6px 12px',
                    borderRadius: 20,
                  }}>
                    {service.tag}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                  {service.name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>
                  {service.shortDesc}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 28, fontWeight: 800, color: '#4ECDC4' }}>${service.price}</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>/person</span>
                  </div>
                  {service.rating && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span>⭐</span>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{service.rating}</span>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>({service.reviews})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Testimonials Section
  const TestimonialsSection = () => (
    <section style={{
      padding: 'clamp(60px, 10vw, 120px) 24px',
      background: '#0D0D0D',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 16,
          }}>
            What Guests Are Saying
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18 }}>
            Real reviews from real travelers
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: 'linear-gradient(135deg, #161625 0%, #1a1a2e 100%)',
                borderRadius: 24,
                padding: 32,
                border: '1px solid rgba(255,255,255,0.1)',
                animation: 'slideUp 0.5s ease',
                animationDelay: `${i * 0.1}s`,
                animationFillMode: 'backwards',
              }}
            >
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{t.location}</div>
                </div>
              </div>
              <div style={{ color: '#F8B500', marginBottom: 16, letterSpacing: 2 }}>
                {'★'.repeat(t.rating)}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                "{t.text}"
              </p>
              <div style={{
                display: 'inline-block',
                background: 'rgba(78,205,196,0.15)',
                color: '#4ECDC4',
                padding: '6px 12px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
              }}>
                {t.trip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // FAQ Section
  const FAQSection = () => (
    <section style={{
      padding: 'clamp(60px, 10vw, 120px) 24px',
      background: 'linear-gradient(180deg, #0D0D0D 0%, #1a1a2e 100%)',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 16,
          }}>
            Questions? I've Got Answers
          </h2>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: '#161625',
                borderRadius: 16,
                border: expandedFaq === i ? '2px solid #4ECDC4' : '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{
                  width: '100%',
                  padding: 24,
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.q}
                <span style={{
                  transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                  fontSize: 20,
                }}>↓</span>
              </button>
              {expandedFaq === i && (
                <div style={{
                  padding: '0 24px 24px',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 16,
                  lineHeight: 1.7,
                  animation: 'slideUp 0.3s ease',
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // CTA Section
  const CTASection = () => (
    <section style={{
      padding: 'clamp(80px, 15vw, 160px) 24px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(32px, 6vw, 56px)',
          fontWeight: 900,
          color: '#fff',
          marginBottom: 24,
        }}>
          Ready to Experience<br />
          <span style={{ color: '#4ECDC4' }}>The Real Medellín?</span>
        </h2>
        <p style={{
          fontSize: 20,
          color: 'rgba(255,255,255,0.8)',
          marginBottom: 40,
        }}>
          Let's plan something unforgettable.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => window.open(`https://wa.me/${HOST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hey Jeb! I'm planning a trip to Medellín and would love your help.`, '_blank')}
            style={{
              padding: '20px 40px',
              borderRadius: 50,
              border: 'none',
              background: '#25D366',
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            💬 Message Me on WhatsApp
          </button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '20px 40px',
              borderRadius: 50,
              border: '2px solid #fff',
              background: 'transparent',
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Browse Experiences
          </button>
        </div>
      </div>
    </section>
  );

  // Footer
  const Footer = () => (
    <footer style={{
      padding: '40px 24px',
      background: '#0D0D0D',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center',
    }}>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
        © 2024 Casita del Jebb · Made with ❤️ in Medellín
      </div>
    </footer>
  );

  // Service Detail View
  const DetailView = () => {
    if (!selectedService) return null;
    const s = selectedService;

    return (
      <div style={{
        minHeight: '100vh',
        background: '#0D0D0D',
        paddingTop: 80,
      }}>
        {/* Back button */}
        <button
          onClick={() => { setSelectedService(null); setView('home'); }}
          style={{
            position: 'fixed',
            top: 100,
            left: 24,
            zIndex: 50,
            padding: '12px 24px',
            borderRadius: 30,
            border: 'none',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }}
        >
          ← Back
        </button>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${s.color}dd, ${s.color}66)`,
            borderRadius: 32,
            padding: '60px 40px',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <span style={{ fontSize: 80 }}>{s.emoji}</span>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginTop: 16 }}>{s.name}</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>⏱ {s.time}</span>
              {s.rating && <span style={{ color: 'rgba(255,255,255,0.9)' }}>⭐ {s.rating}</span>}
            </div>
          </div>

          {/* Content */}
          <div style={{ display: 'grid', gap: 24 }}>
            <div style={{ background: '#161625', borderRadius: 24, padding: 32 }}>
              <h2 style={{ color: '#fff', fontSize: 24, marginBottom: 16 }}>About This Experience</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.8 }}>{s.fullDesc}</p>
            </div>

            <div style={{ background: '#161625', borderRadius: 24, padding: 32 }}>
              <h2 style={{ color: '#fff', fontSize: 24, marginBottom: 16 }}>What's Included</h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {s.includes?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#4ECDC4', fontSize: 18 }}>✓</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking section */}
            <div style={{ background: '#161625', borderRadius: 24, padding: 32 }}>
              <h2 style={{ color: '#fff', fontSize: 24, marginBottom: 24 }}>Book Now</h2>
              <div style={{ display: 'grid', gap: 16 }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 8, display: 'block' }}>Number of guests</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <button
                        key={n}
                        onClick={() => setBooking({ ...booking, guests: n })}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          border: booking.guests === n ? '2px solid #4ECDC4' : '1px solid rgba(255,255,255,0.2)',
                          background: booking.guests === n ? 'rgba(78,205,196,0.2)' : 'transparent',
                          color: '#fff',
                          fontSize: 16,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 24,
                  background: 'rgba(78,205,196,0.1)',
                  borderRadius: 16,
                  marginTop: 16,
                }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Total</div>
                    <div style={{ color: '#fff', fontSize: 32, fontWeight: 800 }}>
                      ${s.price * booking.guests}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(s)}
                    style={{
                      padding: '16px 32px',
                      borderRadius: 30,
                      border: 'none',
                      background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Night Builder View
  const NightBuilderView = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #0D0D0D 100%)',
      padding: '100px 24px 40px',
    }}>
      <button
        onClick={() => { setView('home'); setNightStep(0); setNightPlan({ vibe: null, area: null, activities: [] }); }}
        style={{
          position: 'fixed',
          top: 100,
          left: 24,
          zIndex: 50,
          padding: '12px 24px',
          borderRadius: 30,
          border: 'none',
          background: 'rgba(255,255,255,0.1)',
          color: '#fff',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
        }}
      >
        ← Back
      </button>

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {[0, 1, 2].map(step => (
            <div
              key={step}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: nightStep >= step ? '#FF6B6B' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Step 1: Vibe */}
        {nightStep === 0 && (
          <div style={{ animation: 'slideUp 0.5s ease' }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              What's the vibe tonight? 🌙
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
              Pick the energy you're looking for
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {nightVibes.map(vibe => (
                <button
                  key={vibe.id}
                  onClick={() => { setNightPlan({ ...nightPlan, vibe }); setNightStep(1); }}
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    border: '2px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = vibe.color; e.target.style.background = `${vibe.color}22`; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  <span style={{ fontSize: 40 }}>{vibe.emoji}</span>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 12 }}>{vibe.name}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{vibe.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Area */}
        {nightStep === 1 && (
          <div style={{ animation: 'slideUp 0.5s ease' }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              Where do you want to go? 📍
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
              Each neighborhood has its own personality
            </p>
            <div style={{ display: 'grid', gap: 16 }}>
              {nightAreas.map(area => (
                <button
                  key={area.id}
                  onClick={() => { setNightPlan({ ...nightPlan, area }); setNightStep(2); }}
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    border: '2px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = '#4ECDC4'; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <span style={{ fontSize: 36 }}>{area.emoji}</span>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{area.name}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{area.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setNightStep(0)}
              style={{
                marginTop: 24,
                padding: '12px 24px',
                borderRadius: 30,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
              }}
            >
              ← Back to vibes
            </button>
          </div>
        )}

        {/* Step 3: Activities */}
        {nightStep === 2 && (
          <div style={{ animation: 'slideUp 0.5s ease' }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              Build your night 🎉
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
              Select what you want to include
            </p>
            <div style={{ display: 'grid', gap: 12 }}>
              {nightActivities.map(activity => {
                const selected = nightPlan.activities.find(a => a.id === activity.id);
                return (
                  <button
                    key={activity.id}
                    onClick={() => handleActivityClick(activity)}
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      border: selected ? '2px solid #4ECDC4' : '2px solid rgba(255,255,255,0.1)',
                      background: selected ? 'rgba(78,205,196,0.15)' : 'rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                    }}
                  >
                    <span style={{ fontSize: 32 }}>{activity.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>
                        {selected?.selectedOption ? `${activity.name}: ${selected.selectedOption.name}` : activity.name}
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{activity.time}</div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#4ECDC4' }}>
                      ${selected?.price || activity.price}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Summary */}
            {nightPlan.activities.length > 0 && (
              <div style={{
                marginTop: 32,
                padding: 24,
                background: 'rgba(78,205,196,0.1)',
                borderRadius: 20,
                border: '1px solid rgba(78,205,196,0.3)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
                    Your {nightPlan.vibe?.name} Night
                  </div>
                  <div style={{ color: '#4ECDC4', fontSize: 24, fontWeight: 800 }}>
                    ${nightPlan.activities.reduce((sum, a) => sum + a.price, 0) * booking.guests}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Group size</label>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <button
                        key={n}
                        onClick={() => setBooking({ ...booking, guests: n })}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          border: booking.guests === n ? '2px solid #4ECDC4' : '1px solid rgba(255,255,255,0.2)',
                          background: booking.guests === n ? 'rgba(78,205,196,0.2)' : 'transparent',
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={addNightToCart}
                  style={{
                    width: '100%',
                    padding: 16,
                    borderRadius: 30,
                    border: 'none',
                    background: 'linear-gradient(135deg, #FF6B6B, #C44569)',
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Add Night to Cart 🌙
                </button>
              </div>
            )}

            <button
              onClick={() => setNightStep(1)}
              style={{
                marginTop: 24,
                padding: '12px 24px',
                borderRadius: 30,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
              }}
            >
              ← Back to area
            </button>
          </div>
        )}
      </div>

      {/* Options Sheet */}
      {optionsSheet.open && optionsSheet.activity && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setOptionsSheet({ open: false, activity: null })}
        >
          <div
            style={{
              background: '#161625',
              width: '100%',
              maxWidth: 600,
              maxHeight: '80vh',
              borderRadius: '24px 24px 0 0',
              overflow: 'hidden',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: 24, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 }}>
                {optionsSheet.activity.emoji} Pick Your {optionsSheet.activity.name}
              </h3>
            </div>
            <div style={{ padding: 16, maxHeight: '60vh', overflowY: 'auto' }}>
              {optionsSheet.activity.subOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleActivity(optionsSheet.activity, option)}
                  style={{
                    width: '100%',
                    padding: 20,
                    marginBottom: 12,
                    borderRadius: 16,
                    border: '2px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    position: 'relative',
                  }}
                >
                  {option.popular && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: '#4ECDC4',
                      color: '#0D0D0D',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '0 14px 0 10px',
                    }}>POPULAR</div>
                  )}
                  <span style={{ fontSize: 28 }}>{option.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{option.name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{option.vibe}</div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#4ECDC4' }}>${option.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Cart Sidebar
  const CartSidebar = () => {
    if (!cartOpen) return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 300,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        onClick={() => setCartOpen(false)}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 480,
            background: '#0D0D0D',
            height: '100%',
            overflowY: 'auto',
            animation: 'slideIn 0.3s ease',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ padding: 24, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: 0 }}>Your Cart</h2>
            <button
              onClick={() => setCartOpen(false)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: 20,
                cursor: 'pointer',
              }}
            >×</button>
          </div>

          {cart.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <span style={{ fontSize: 64 }}>🛒</span>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div style={{ padding: 24 }}>
                {cart.map(item => (
                  <div key={item.cartId} style={{
                    background: '#161625',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: 32 }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{item.name}</div>
                      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{item.guests} guest{item.guests > 1 ? 's' : ''}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#4ECDC4' }}>${item.total}</div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        style={{
                          marginTop: 8,
                          padding: '4px 12px',
                          borderRadius: 20,
                          border: 'none',
                          background: 'rgba(255,107,107,0.2)',
                          color: '#FF6B6B',
                          fontSize: 12,
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <span style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>Total</span>
                  <span style={{ fontSize: 28, fontWeight: 800, color: '#4ECDC4' }}>${cartTotal}</span>
                </div>
                <button
                  onClick={() => window.open(`https://wa.me/${HOST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hey Jeb! I'd like to book: ${cart.map(i => i.name).join(', ')}. Total: $${cartTotal}`, '_blank')}
                  style={{
                    width: '100%',
                    padding: 18,
                    borderRadius: 30,
                    border: 'none',
                    background: '#25D366',
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                  }}
                >
                  💬 Complete on WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // =============================================
  // MAIN RENDER
  // =============================================
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0D0D0D',
      minHeight: '100vh',
      color: '#fff',
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0D0D; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>

      <Toast />
      <Navbar />
      <CartSidebar />

      {view === 'home' && (
        <>
          <HeroSection />
          <MeetJebSection />
          <ServicesSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
          <Footer />
        </>
      )}

      {view === 'detail' && <DetailView />}
      {view === 'night-builder' && <NightBuilderView />}
    </div>
  );
}
