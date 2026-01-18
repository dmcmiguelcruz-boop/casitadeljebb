import React, { useState, useEffect, useMemo, useCallback } from 'react';

// =============================================
// CASITA DEL JEBB - Conversion Optimized
// "Parce, let's make it happen"
// =============================================

const HOST_INFO = {
  name: 'Jeb',
  photo: 'https://i.ibb.co/8gTcfDLy/carlos.jpg',
  whatsapp: '+573001234567',
  responseTime: '< 2 hours',
  bio: "5 years in Medellín. I know the spots, the people, and how to make your trip unforgettable.",
  stats: { guests: '2,400+', rating: '4.9', reviews: '847', years: '5' }
};

// Concierge quick request chips
const conciergeChips = [
  'Restaurant reservation',
  'Birthday surprise',
  'Spa day',
  'Custom tour',
  'Private security',
  'Yacht rental',
  'Event tickets',
  'Something else...',
];

const nightVibes = [
  { id: 'chill', name: 'Chill Vibes', emoji: '🌅', desc: 'Rooftops & good drinks', color: '#4ECDC4' },
  { id: 'party', name: 'Full Send', emoji: '🔥', desc: 'Clubs til sunrise', color: '#FF6B6B' },
  { id: 'date', name: 'Date Night', emoji: '💕', desc: 'Romantic & impressive', color: '#C44569' },
  { id: 'local', name: 'Local Style', emoji: '🇨🇴', desc: 'Where paisas go', color: '#F8B500' },
];

const nightAreas = [
  { id: 'provenza', name: 'Provenza', desc: 'Trendy & upscale', emoji: '✨' },
  { id: 'poblado', name: 'Parque Lleras', desc: 'High energy hub', emoji: '🎉' },
  { id: 'laureles', name: 'Laureles', desc: 'Authentic local vibe', emoji: '🏘️' },
  { id: 'centro', name: 'Centro', desc: 'Raw & real', emoji: '🎭' },
];

const nightActivities = [
  { id: 'dinner', name: 'Dinner', price: 50, emoji: '🍽️', time: '7-9pm', hasOptions: true,
    subOptions: [
      { id: 'd1', name: 'Carmen', vibe: 'Michelin-recommended fusion', price: 85, emoji: '🏆', popular: true },
      { id: 'd2', name: 'Alambique', vibe: 'Best steak in town', price: 70, emoji: '🥩' },
      { id: 'd3', name: 'OCI.Mde', vibe: 'Nikkei, Instagram-worthy', price: 60, emoji: '🍱' },
      { id: 'd4', name: 'El Cielo', vibe: '2 Michelin stars', price: 150, emoji: '⭐', premium: true },
      { id: 'd-surprise', name: "Surprise me", vibe: "You pick based on my budget", price: 50, emoji: '🎁' },
    ]
  },
  { id: 'rooftop', name: 'Rooftop Drinks', price: 30, emoji: '🌃', time: '9-11pm', hasOptions: true,
    subOptions: [
      { id: 'r1', name: 'Enso Rooftop', vibe: '360° views, chill house', price: 35, emoji: '🏙️', popular: true },
      { id: 'r2', name: 'The Charlee', vibe: 'See-and-be-seen', price: 40, emoji: '🏊' },
      { id: 'r3', name: 'Selina', vibe: 'Social, easy to meet people', price: 25, emoji: '🎒' },
      { id: 'r-surprise', name: "Surprise me", vibe: "Match to my vibe", price: 30, emoji: '🎁' },
    ]
  },
  { id: 'speakeasy', name: 'Speakeasy', price: 35, emoji: '🥃', time: '10pm-12am', hasOptions: true,
    subOptions: [
      { id: 's1', name: 'La Octava', vibe: 'Behind a bookshelf, jazz vibes', price: 40, emoji: '📚', popular: true },
      { id: 's2', name: 'El Apartamento', vibe: 'Ring the doorbell, intimate', price: 35, emoji: '🚪' },
      { id: 's-surprise', name: "Surprise me", vibe: "Send me the secret address", price: 35, emoji: '🎁' },
    ]
  },
  { id: 'club', name: 'Club + Table', price: 100, emoji: '🎵', time: '12am-late', hasOptions: true,
    subOptions: [
      { id: 'c1', name: 'Dulce', vibe: 'Electronic, international DJs', price: 120, emoji: '🎧', popular: true },
      { id: 'c2', name: 'Vintrash', vibe: 'Reggaeton & Latin hits', price: 100, emoji: '🔥' },
      { id: 'c3', name: 'Son Havana', vibe: 'Live salsa, you WILL dance', price: 60, emoji: '🎺' },
      { id: 'c-surprise', name: "Surprise me", vibe: "Based on music taste", price: 100, emoji: '🎁' },
    ]
  },
  { id: 'saferide', name: 'Safe Ride Home', price: 25, emoji: '🚗', time: 'End of night', hasOptions: false },
];

const services = {
  tours: [
    { id: 't1', name: 'Comuna 13 Tour', price: 45, time: '3h', emoji: '🎨', color: '#FF6B6B', tag: 'POPULAR', rating: 4.9, reviews: 847,
      shortDesc: 'Street art & transformation story', fullDesc: "Walk with a local guide who grew up here. Escalators, murals, real stories.",
      includes: ['Local guide', 'Escalator ride', 'Snacks & juice', 'Small group'] },
    { id: 't2', name: 'Coffee Farm', price: 89, time: '6h', emoji: '☕', color: '#06D6A0', tag: 'TOP RATED', rating: 4.95, reviews: 423,
      shortDesc: 'Bean-to-cup mountain experience', fullDesc: "Pick beans, roast coffee, eat farm lunch. Take home 500g fresh roasted.",
      includes: ['Private transport', 'Farm tour', 'Lunch', '500g coffee'] },
    { id: 't3', name: 'Guatapé Day Trip', price: 95, time: '10h', emoji: '🪨', color: '#4CC9F0', tag: 'BUCKET LIST', rating: 4.9, reviews: 1205,
      shortDesc: '740 steps, colorful town, boat ride', fullDesc: "The famous rock, the Instagram town, and a boat on the reservoir.",
      includes: ['Transport', 'Breakfast', 'Rock entry', 'Boat ride', 'Lunch'] },
    { id: 't4', name: 'Paragliding', price: 75, time: '2-3h', emoji: '🪂', color: '#7209B7', tag: 'ADVENTURE', rating: 4.9, reviews: 567,
      shortDesc: 'Fly tandem over the city', fullDesc: "15-25 min flight with certified pilot. Photos & video included.",
      includes: ['Transport', 'Equipment', 'Flight', 'Photos/Video'] },
    { id: 't5', name: 'Food Markets Tour', price: 55, time: '4h', emoji: '🥘', color: '#FFD93D', rating: 4.85, reviews: 312,
      shortDesc: 'Eat where locals actually eat', fullDesc: "10+ tastings, exotic fruits, hole-in-the-wall spots.",
      includes: ['10+ tastings', '2 markets', 'Fruit sampling', 'Local guide'] },
    { id: 't6', name: 'City Bike Tour', price: 40, time: '3h', emoji: '🚴', color: '#00B4D8', rating: 4.8, reviews: 234,
      shortDesc: 'Explore neighborhoods on two wheels', fullDesc: "Safe routes through parks, street art, local cafes.",
      includes: ['Bike rental', 'Helmet', 'Guide', 'Coffee stop'] },
  ],
  transport: [
    { id: 'tr1', name: 'Airport Pickup', price: 35, time: 'Any', emoji: '✈️', color: '#00B4D8', tag: 'ESSENTIAL', rating: 4.95, reviews: 2341,
      shortDesc: 'Driver waiting with your name', fullDesc: "Flight tracked. No haggling. AC car. Cold water.",
      includes: ['Meet & greet', 'Flight tracking', 'AC vehicle', 'Up to 4 pax'] },
    { id: 'tr2', name: 'Airport Drop-off', price: 30, time: 'Any', emoji: '🛫', color: '#0077B6', rating: 4.95, reviews: 1654,
      shortDesc: 'On-time guarantee', fullDesc: "Never miss a flight. Buffer time built in.",
      includes: ['Door pickup', 'Luggage help', 'On-time guarantee'] },
    { id: 'tr3', name: 'Full Day Driver', price: 140, time: '8h', emoji: '🚗', color: '#023E8A', tag: 'BEST VALUE', rating: 4.9, reviews: 567,
      shortDesc: 'Your own car for the day', fullDesc: "Go anywhere. No Ubers. No navigation. Full flexibility.",
      includes: ['8 hours', 'AC vehicle', 'Unlimited stops', 'Local tips'] },
    { id: 'tr4', name: 'Half Day Driver', price: 80, time: '4h', emoji: '🚙', color: '#0096C7', rating: 4.85, reviews: 423,
      shortDesc: 'Perfect for errands or exploring', fullDesc: "4 hours to hit a few spots without the hassle.",
      includes: ['4 hours', 'AC vehicle', 'Multiple stops'] },
  ],
  food: [
    { id: 'm1', name: 'Welcome Package', price: 65, time: 'Pre-arrival', emoji: '🧺', color: '#E63946', tag: 'FAVORITE', rating: 4.95, reviews: 234,
      shortDesc: 'Arrive to a stocked place', fullDesc: "Fruits, coffee, wine, chocolates + my neighborhood guide.",
      includes: ['Fruit basket', 'Coffee', 'Wine', 'Chocolates', 'Guide'] },
    { id: 'm2', name: 'Private Chef', price: 120, time: '3-4h', emoji: '👨‍🍳', color: '#F4A261', tag: 'PREMIUM', rating: 5.0, reviews: 156,
      shortDesc: '4 courses at your place', fullDesc: "Chef cooks, you eat, they clean. Wine pairing included.",
      includes: ['4 courses', 'Wine pairing', 'All ingredients', 'Cleanup'] },
    { id: 'm3', name: 'Breakfast Delivery', price: 22, time: 'Daily', emoji: '🥐', color: '#E9C46A', rating: 4.8, reviews: 387,
      shortDesc: 'Colombian breakfast at your door', fullDesc: "Fresh arepas, eggs, fruit, juice, coffee. Pick your time.",
      includes: ['Arepas', 'Eggs', 'Fruit', 'Juice', 'Coffee'] },
  ],
};

// Stripe publishable key (test mode - replace with your own)
const STRIPE_KEY = 'pk_test_YOUR_STRIPE_KEY';

const keyframes = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
  @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(78,205,196,0.3); } 50% { box-shadow: 0 0 30px rgba(78,205,196,0.5); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
`;

export default function CasitaDelJebb() {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('tours');
  const [selectedService, setSelectedService] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [booking, setBooking] = useState({ guests: 2, name: '', email: '', phone: '' });
  const [toast, setToast] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Night Builder
  const [nightStep, setNightStep] = useState(0);
  const [nightPlan, setNightPlan] = useState({ vibe: null, area: null, activities: [] });
  const [optionsSheet, setOptionsSheet] = useState({ open: false, activity: null });

  // Concierge
  const [conciergeChipSelected, setConciergeChipSelected] = useState([]);
  const [conciergeDetails, setConciergeDetails] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('casita-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('casita-cart', JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback((item) => {
    const cartItem = { ...item, cartId: Date.now(), guests: booking.guests, total: item.price * booking.guests };
    setCart(prev => [...prev, cartItem]);
    setSelectedService(null);
    setView('home');
    showToast(`${item.name} added!`);
  }, [booking.guests, showToast]);

  const removeFromCart = useCallback((cartId) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
    showToast('Removed', 'warning');
  }, [showToast]);

  const cartTotal = useMemo(() => cart.reduce((sum, i) => sum + i.total, 0), [cart]);

  const handleActivityClick = (activity) => {
    if (activity.hasOptions) {
      setOptionsSheet({ open: true, activity });
    } else {
      toggleActivity(activity);
    }
  };

  const toggleActivity = (activity, option = null) => {
    const existing = nightPlan.activities.find(a => a.id === activity.id);
    if (existing && !option) {
      setNightPlan({ ...nightPlan, activities: nightPlan.activities.filter(a => a.id !== activity.id) });
    } else {
      const filtered = nightPlan.activities.filter(a => a.id !== activity.id);
      setNightPlan({ ...nightPlan, activities: [...filtered, { ...activity, selectedOption: option, price: option?.price || activity.price }] });
    }
    setOptionsSheet({ open: false, activity: null });
  };

  const addNightToCart = () => {
    const total = nightPlan.activities.reduce((sum, a) => sum + a.price, 0) * booking.guests;
    const cartItem = {
      id: 'night-' + Date.now(), cartId: Date.now(),
      name: `${nightPlan.vibe.name} Night in ${nightPlan.area.name}`,
      emoji: '🌙', activities: nightPlan.activities, guests: booking.guests, total, isNight: true
    };
    setCart(prev => [...prev, cartItem]);
    setNightStep(0);
    setNightPlan({ vibe: null, area: null, activities: [] });
    setView('home');
    showToast('Night added to cart!');
  };

  const toggleConciergeChip = (chip) => {
    if (conciergeChipSelected.includes(chip)) {
      setConciergeChipSelected(conciergeChipSelected.filter(c => c !== chip));
    } else {
      setConciergeChipSelected([...conciergeChipSelected, chip]);
    }
  };

  const submitConcierge = () => {
    if (conciergeChipSelected.length === 0 && !conciergeDetails.trim()) return;
    const cartItem = {
      id: 'concierge-' + Date.now(), cartId: Date.now(),
      name: `Concierge: ${conciergeChipSelected.length > 0 ? conciergeChipSelected.join(', ') : 'Custom Request'}`,
      emoji: '🤝',
      details: conciergeDetails,
      guests: booking.guests,
      price: 0, total: 0,
      isConcierge: true
    };
    setCart(prev => [...prev, cartItem]);
    setView('home');
    setConciergeChipSelected([]);
    setConciergeDetails('');
    showToast('Request added! I\'ll confirm pricing.');
  };

  // =============================================
  // COMPONENTS
  // =============================================

  const Toast = () => toast && (
    <div style={{
      position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1000,
      background: toast.type === 'success' ? '#4ECDC4' : '#F8B500',
      color: '#0D0D0D', padding: '14px 28px', borderRadius: 30, fontWeight: 600,
      animation: 'slideUp 0.3s ease', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
    }}>{toast.msg}</div>
  );

  const Navbar = () => (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '12px 20px', background: 'rgba(13,13,13,0.95)', backdropFilter: 'blur(20px)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => setView('home')}>
        <span style={{ fontSize: 24 }}>🏠</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Casita del Jebb</span>
      </div>
      {cart.length > 0 && (
        <button onClick={() => setCartOpen(true)} style={{
          padding: '10px 20px', borderRadius: 25, border: 'none',
          background: 'linear-gradient(135deg, #FF6B6B, #C44569)', color: '#fff',
          fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
        }}>
          🛒 {cart.length} · ${cartTotal}
        </button>
      )}
    </nav>
  );

  // HOME VIEW
  const HomeView = () => (
    <div style={{ background: '#0D0D0D', minHeight: '100vh', paddingTop: 60 }}>
      {/* Hero - Compact */}
      <header style={{
        padding: '40px 20px 30px',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #0D0D0D 100%)',
        borderBottom: '3px solid #FF6B6B'
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(36px, 8vw, 52px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
            <span style={{ color: '#FF6B6B' }}>Parce,</span><br />
            <span style={{ color: '#fff' }}>Let's make it happen.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, marginBottom: 8 }}>
            Tours, transport, food & nights out — all sorted.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
            <span>⭐ {HOST_INFO.stats.rating}</span>
            <span>•</span>
            <span>{HOST_INFO.stats.guests} guests</span>
            <span>•</span>
            <span>{HOST_INFO.stats.years} years in Medellín</span>
          </div>
        </div>
      </header>

      {/* Main Actions */}
      <section style={{ padding: '20px', maxWidth: 600, margin: '0 auto' }}>
        {/* Night Builder Card */}
        <button
          onClick={() => setView('night-builder')}
          style={{
            width: '100%', textAlign: 'left', cursor: 'pointer', marginBottom: 16,
            background: 'linear-gradient(135deg, #FF6B6B 0%, #F8B500 100%)',
            borderRadius: 20, padding: '28px 24px', border: 'none', position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 60, opacity: 0.3 }}>🌙</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 4, letterSpacing: 1 }}>BUILD YOUR</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Night Out</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)' }}>Pick your vibe → Pick your spots → Go</div>
          </div>
        </button>

        {/* Concierge Card */}
        <button
          onClick={() => setView('concierge')}
          style={{
            width: '100%', textAlign: 'left', cursor: 'pointer', marginBottom: 24,
            background: '#161625', borderRadius: 20, padding: '24px',
            border: '2px solid #4ECDC4', display: 'flex', alignItems: 'center', gap: 16
          }}
        >
          <div style={{
            width: 50, height: 50, borderRadius: 25, background: 'rgba(78,205,196,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
          }}>💬</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Need something specific?</div>
            <div style={{ fontSize: 14, color: '#4ECDC4' }}>Tell me → I'll make it happen</div>
          </div>
        </button>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { id: 'tours', label: 'Tours', emoji: '🎯' },
            { id: 'transport', label: 'Transport', emoji: '🚗' },
            { id: 'food', label: 'Food', emoji: '🍽️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: '14px 8px', borderRadius: 14, cursor: 'pointer',
                border: activeTab === tab.id ? '2px solid #FF6B6B' : '2px solid transparent',
                background: activeTab === tab.id ? 'rgba(255,107,107,0.15)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.id ? '#FF6B6B' : 'rgba(255,255,255,0.6)',
                fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}
            >
              <span>{tab.emoji}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid - Always 2 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {services[activeTab].map((s, i) => (
            <div
              key={s.id}
              onClick={() => { setSelectedService(s); setView('detail'); }}
              style={{
                background: '#161625', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.2s, border-color 0.2s',
                animation: `fadeIn 0.4s ease ${i * 0.05}s both`
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = '#4ECDC4'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <div style={{
                height: 80, background: `linear-gradient(135deg, ${s.color}cc, ${s.color}66)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
              }}>
                <span style={{ fontSize: 36 }}>{s.emoji}</span>
                {s.tag && (
                  <div style={{
                    position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.6)',
                    color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 10
                  }}>{s.tag}</div>
                )}
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4, lineHeight: 1.3 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{s.time}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#4ECDC4' }}>${s.price}</span>
                  {s.rating && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>⭐ {s.rating}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section - Compact */}
        <div style={{
          marginTop: 32, padding: 20, background: '#161625', borderRadius: 16,
          display: 'flex', alignItems: 'center', gap: 16
        }}>
          <img src={HOST_INFO.photo} alt={HOST_INFO.name} style={{ width: 56, height: 56, borderRadius: 28, objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>I'm {HOST_INFO.name} 👋</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{HOST_INFO.bio}</div>
          </div>
        </div>

        {/* Quick FAQ */}
        <div style={{ marginTop: 24 }}>
          <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Quick answers</h3>
          {[
            { q: 'How do I pay?', a: 'Secure checkout with Stripe. Cards accepted.' },
            { q: 'Can I cancel?', a: 'Free cancellation 24h before for most things.' },
            { q: 'Is it safe?', a: 'I only use vetted drivers and guides I know personally.' },
          ].map((faq, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{faq.q}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4 }}>{faq.a}</div>
            </div>
          ))}
        </div>

        <div style={{ height: 100 }} />
      </section>
    </div>
  );

  // DETAIL VIEW
  const DetailView = () => {
    if (!selectedService) return null;
    const s = selectedService;
    return (
      <div style={{ background: '#0D0D0D', minHeight: '100vh', paddingTop: 60 }}>
        <button onClick={() => { setSelectedService(null); setView('home'); }} style={{
          position: 'fixed', top: 70, left: 16, zIndex: 50, padding: '10px 20px', borderRadius: 25,
          border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(10px)'
        }}>← Back</button>

        <div style={{ maxWidth: 500, margin: '0 auto', padding: '40px 20px' }}>
          <div style={{
            background: `linear-gradient(135deg, ${s.color}cc, ${s.color}66)`,
            borderRadius: 24, padding: '40px 24px', textAlign: 'center', marginBottom: 20
          }}>
            <span style={{ fontSize: 64 }}>{s.emoji}</span>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginTop: 12 }}>{s.name}</h1>
            <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>⏱ {s.time} {s.rating && `· ⭐ ${s.rating}`}</div>
          </div>

          <div style={{ background: '#161625', borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>About</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>{s.fullDesc}</p>
          </div>

          <div style={{ background: '#161625', borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Includes</h3>
            {s.includes?.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ color: '#4ECDC4' }}>✓</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#161625', borderRadius: 16, padding: 20 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Guests</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {[1,2,3,4,5,6].map(n => (
                  <button key={n} onClick={() => setBooking({...booking, guests: n})} style={{
                    width: 44, height: 44, borderRadius: 10, cursor: 'pointer',
                    border: booking.guests === n ? '2px solid #4ECDC4' : '1px solid rgba(255,255,255,0.2)',
                    background: booking.guests === n ? 'rgba(78,205,196,0.2)' : 'transparent', color: '#fff', fontWeight: 600
                  }}>{n}</button>
                ))}
              </div>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: 16, background: 'rgba(78,205,196,0.1)', borderRadius: 12, marginTop: 16
            }}>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Total</div>
                <div style={{ color: '#fff', fontSize: 28, fontWeight: 800 }}>${s.price * booking.guests}</div>
              </div>
              <button onClick={() => addToCart(s)} style={{
                padding: '14px 28px', borderRadius: 25, border: 'none',
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', color: '#fff', fontWeight: 700, cursor: 'pointer'
              }}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // NIGHT BUILDER
  const NightBuilderView = () => (
    <div style={{ background: '#0D0D0D', minHeight: '100vh', paddingTop: 60 }}>
      <button onClick={() => { setView('home'); setNightStep(0); setNightPlan({ vibe: null, area: null, activities: [] }); }} style={{
        position: 'fixed', top: 70, left: 16, zIndex: 50, padding: '10px 20px', borderRadius: 25,
        border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer'
      }}>← Back</button>

      <div style={{ maxWidth: 500, margin: '0 auto', padding: '40px 20px' }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: nightStep >= i ? '#FF6B6B' : 'rgba(255,255,255,0.2)', transition: 'background 0.3s' }} />
          ))}
        </div>

        {/* Step 1: Vibe */}
        {nightStep === 0 && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>What's the vibe? 🌙</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>Pick the energy</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {nightVibes.map(v => (
                <button key={v.id} onClick={() => { setNightPlan({...nightPlan, vibe: v}); setNightStep(1); }} style={{
                  padding: 20, borderRadius: 16, border: '2px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s, background 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = v.color; e.currentTarget.style.background = `${v.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                  <span style={{ fontSize: 32 }}>{v.emoji}</span>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginTop: 8 }}>{v.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{v.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Area */}
        {nightStep === 1 && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Where to? 📍</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>Each area has its own vibe</p>
            <div style={{ display: 'grid', gap: 12 }}>
              {nightAreas.map(a => (
                <button key={a.id} onClick={() => { setNightPlan({...nightPlan, area: a}); setNightStep(2); }} style={{
                  padding: 20, borderRadius: 16, border: '2px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 16, transition: 'border-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#4ECDC4'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
                  <span style={{ fontSize: 28 }}>{a.emoji}</span>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{a.name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{a.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setNightStep(0)} style={{
              marginTop: 20, padding: '10px 20px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer'
            }}>← Back</button>
          </div>
        )}

        {/* Step 3: Activities */}
        {nightStep === 2 && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Build your night 🎉</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>Pick what you want</p>
            <div style={{ display: 'grid', gap: 10 }}>
              {nightActivities.map(act => {
                const selected = nightPlan.activities.find(a => a.id === act.id);
                return (
                  <button key={act.id} onClick={() => handleActivityClick(act)} style={{
                    padding: 16, borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                    border: selected ? '2px solid #4ECDC4' : '2px solid rgba(255,255,255,0.1)',
                    background: selected ? 'rgba(78,205,196,0.15)' : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', gap: 14
                  }}>
                    <span style={{ fontSize: 28 }}>{act.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>
                        {selected?.selectedOption ? `${act.name}: ${selected.selectedOption.name}` : act.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{act.time}</div>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#4ECDC4' }}>${selected?.price || act.price}</div>
                  </button>
                );
              })}
            </div>

            {nightPlan.activities.length > 0 && (
              <div style={{
                marginTop: 24, padding: 20, background: 'rgba(78,205,196,0.1)',
                borderRadius: 16, border: '1px solid rgba(78,205,196,0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: '#fff', fontWeight: 600 }}>Your {nightPlan.vibe?.name} Night</span>
                  <span style={{ color: '#4ECDC4', fontSize: 20, fontWeight: 800 }}>
                    ${nightPlan.activities.reduce((s, a) => s + a.price, 0) * booking.guests}
                  </span>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 6 }}>Group size</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[1,2,3,4,5,6].map(n => (
                      <button key={n} onClick={() => setBooking({...booking, guests: n})} style={{
                        width: 40, height: 40, borderRadius: 8, cursor: 'pointer',
                        border: booking.guests === n ? '2px solid #4ECDC4' : '1px solid rgba(255,255,255,0.2)',
                        background: booking.guests === n ? 'rgba(78,205,196,0.2)' : 'transparent', color: '#fff'
                      }}>{n}</button>
                    ))}
                  </div>
                </div>
                <button onClick={addNightToCart} style={{
                  width: '100%', padding: 14, borderRadius: 25, border: 'none',
                  background: 'linear-gradient(135deg, #FF6B6B, #C44569)', color: '#fff', fontWeight: 700, cursor: 'pointer'
                }}>Add Night to Cart 🌙</button>
              </div>
            )}

            <button onClick={() => setNightStep(1)} style={{
              marginTop: 20, padding: '10px 20px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer'
            }}>← Back</button>
          </div>
        )}
      </div>

      {/* Options Sheet */}
      {optionsSheet.open && optionsSheet.activity && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
        }} onClick={() => setOptionsSheet({ open: false, activity: null })}>
          <div style={{
            background: '#161625', width: '100%', maxWidth: 500, maxHeight: '70vh',
            borderRadius: '20px 20px 0 0', overflow: 'hidden'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: 20, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{optionsSheet.activity.emoji} {optionsSheet.activity.name}</h3>
              <button onClick={() => setOptionsSheet({ open: false, activity: null })} style={{
                width: 32, height: 32, borderRadius: 16, border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer'
              }}>×</button>
            </div>
            <div style={{ padding: 16, maxHeight: '50vh', overflowY: 'auto' }}>
              {optionsSheet.activity.subOptions.map(opt => (
                <button key={opt.id} onClick={() => toggleActivity(optionsSheet.activity, opt)} style={{
                  width: '100%', padding: 16, marginBottom: 10, borderRadius: 14,
                  border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
                  cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 14, position: 'relative'
                }}>
                  {opt.popular && <div style={{ position: 'absolute', top: 0, right: 0, background: '#4ECDC4', color: '#0D0D0D', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: '0 12px 0 8px' }}>POPULAR</div>}
                  <span style={{ fontSize: 24 }}>{opt.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{opt.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{opt.vibe}</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#4ECDC4' }}>${opt.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // CONCIERGE VIEW (Full Page)
  const ConciergeView = () => (
    <div style={{ background: '#0D0D0D', minHeight: '100vh', paddingTop: 60 }}>
      {/* Header */}
      <header style={{
        padding: '20px', background: 'linear-gradient(180deg, #1a1a2e 0%, #0D0D0D 100%)',
        borderBottom: '3px solid #4ECDC4', display: 'flex', alignItems: 'center', gap: 16
      }}>
        <button onClick={() => setView('home')} style={{
          width: 44, height: 44, borderRadius: 22, border: 'none',
          background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: 18
        }}>←</button>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: 0 }}>Concierge 💬</h1>
          <p style={{ color: '#4ECDC4', fontSize: 14, margin: 0 }}>Tell me what you need</p>
        </div>
      </header>

      <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
        {/* Hero Card */}
        <div style={{
          background: '#161625', borderRadius: 20, padding: '40px 24px',
          textAlign: 'center', marginBottom: 32, border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <span style={{ fontSize: 56 }}>🤝</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginTop: 16, marginBottom: 12 }}>
            I'll make it happen
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.6 }}>
            Restaurant reservations, special celebrations, specific requests, "I need a helicopter for Tuesday" — whatever you need, just ask.
          </p>
        </div>

        {/* Quick Requests */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>
            QUICK REQUESTS
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {conciergeChips.map(chip => (
              <button
                key={chip}
                onClick={() => toggleConciergeChip(chip)}
                style={{
                  padding: '10px 18px', borderRadius: 25, cursor: 'pointer',
                  border: conciergeChipSelected.includes(chip) ? '2px solid #4ECDC4' : '2px solid rgba(255,255,255,0.2)',
                  background: conciergeChipSelected.includes(chip) ? 'rgba(78,205,196,0.15)' : 'transparent',
                  color: conciergeChipSelected.includes(chip) ? '#4ECDC4' : 'rgba(255,255,255,0.7)',
                  fontSize: 14, fontWeight: 500, transition: 'all 0.2s'
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Your Request */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>
            YOUR REQUEST
          </h3>
          <textarea
            value={conciergeDetails}
            onChange={e => setConciergeDetails(e.target.value)}
            placeholder="Tell me exactly what you need — be as specific as possible..."
            style={{
              width: '100%', padding: 18, borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.2)', background: '#161625',
              color: '#fff', fontSize: 15, minHeight: 140, resize: 'vertical', lineHeight: 1.5
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={submitConcierge}
          disabled={conciergeChipSelected.length === 0 && !conciergeDetails.trim()}
          style={{
            width: '100%', padding: 18, borderRadius: 30, border: 'none',
            background: (conciergeChipSelected.length > 0 || conciergeDetails.trim())
              ? 'linear-gradient(135deg, #4ECDC4, #44A08D)'
              : 'rgba(255,255,255,0.1)',
            color: (conciergeChipSelected.length > 0 || conciergeDetails.trim()) ? '#fff' : 'rgba(255,255,255,0.3)',
            fontSize: 16, fontWeight: 700, cursor: (conciergeChipSelected.length > 0 || conciergeDetails.trim()) ? 'pointer' : 'default'
          }}
        >
          Add to Cart →
        </button>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 16 }}>
          I'll review and send you a quote within 2 hours
        </p>
      </div>
    </div>
  );

  // CART SIDEBAR
  const CartSidebar = () => cartOpen && (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 300,
      display: 'flex', justifyContent: 'flex-end'
    }} onClick={() => setCartOpen(false)}>
      <div style={{
        width: '100%', maxWidth: 400, background: '#0D0D0D', height: '100%',
        overflowY: 'auto', animation: 'slideIn 0.3s ease'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: 20, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>Your Cart</h2>
          <button onClick={() => setCartOpen(false)} style={{
            width: 36, height: 36, borderRadius: 18, border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: 18
          }}>×</button>
        </div>

        {cart.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <span style={{ fontSize: 48 }}>🛒</span>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div style={{ padding: 20 }}>
              {cart.map(item => (
                <div key={item.cartId} style={{
                  background: '#161625', borderRadius: 14, padding: 16, marginBottom: 12,
                  display: 'flex', gap: 14, alignItems: 'flex-start'
                }}>
                  <span style={{ fontSize: 28 }}>{item.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                      {item.guests} guest{item.guests > 1 ? 's' : ''}
                      {item.isConcierge && ' · Price TBD'}
                    </div>
                    {item.isNight && item.activities && (
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                        {item.activities.map(a => a.selectedOption?.name || a.name).join(' → ')}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#4ECDC4' }}>
                      {item.isConcierge ? 'TBD' : `$${item.total}`}
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} style={{
                      marginTop: 6, padding: '4px 10px', borderRadius: 12, border: 'none',
                      background: 'rgba(255,107,107,0.2)', color: '#FF6B6B', fontSize: 11, cursor: 'pointer'
                    }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Total</span>
                <span style={{ color: '#4ECDC4', fontSize: 24, fontWeight: 800 }}>
                  ${cartTotal}{cart.some(i => i.isConcierge) && '+'}
                </span>
              </div>

              {/* Checkout Form */}
              <div style={{ marginBottom: 16 }}>
                <input
                  type="text" placeholder="Your name"
                  value={booking.name} onChange={e => setBooking({...booking, name: e.target.value})}
                  style={{
                    width: '100%', padding: 14, borderRadius: 12, marginBottom: 10,
                    border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)',
                    color: '#fff', fontSize: 14
                  }}
                />
                <input
                  type="email" placeholder="Email"
                  value={booking.email} onChange={e => setBooking({...booking, email: e.target.value})}
                  style={{
                    width: '100%', padding: 14, borderRadius: 12, marginBottom: 10,
                    border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)',
                    color: '#fff', fontSize: 14
                  }}
                />
                <input
                  type="tel" placeholder="WhatsApp number"
                  value={booking.phone} onChange={e => setBooking({...booking, phone: e.target.value})}
                  style={{
                    width: '100%', padding: 14, borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)',
                    color: '#fff', fontSize: 14
                  }}
                />
              </div>

              <button
                onClick={() => setCheckoutOpen(true)}
                disabled={!booking.name || !booking.email || !booking.phone}
                style={{
                  width: '100%', padding: 16, borderRadius: 25, border: 'none',
                  background: (booking.name && booking.email && booking.phone)
                    ? 'linear-gradient(135deg, #4ECDC4, #44A08D)'
                    : 'rgba(255,255,255,0.1)',
                  color: (booking.name && booking.email && booking.phone) ? '#fff' : 'rgba(255,255,255,0.3)',
                  fontWeight: 700, cursor: (booking.name && booking.email && booking.phone) ? 'pointer' : 'default',
                  fontSize: 16
                }}
              >
                💳 Pay ${cartTotal} with Stripe
              </button>

              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 12 }}>
                Secure payment · I'll confirm via WhatsApp within 2 hours
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // STRIPE CHECKOUT MODAL (simplified - in production you'd integrate real Stripe)
  const CheckoutModal = () => checkoutOpen && (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 400,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: '#fff', width: '100%', maxWidth: 400, borderRadius: 16, padding: 32, textAlign: 'center'
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>💳</div>
        <h2 style={{ color: '#0D0D0D', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Stripe Checkout</h2>
        <p style={{ color: '#666', marginBottom: 24 }}>
          Total: <strong>${cartTotal}</strong>
        </p>
        <p style={{ color: '#999', fontSize: 14, marginBottom: 24 }}>
          In production, this opens Stripe Checkout.<br />
          For now, this confirms your booking.
        </p>
        <button
          onClick={() => {
            setCheckoutOpen(false);
            setCartOpen(false);
            setCart([]);
            showToast('Booking confirmed! Check WhatsApp.');
          }}
          style={{
            width: '100%', padding: 16, borderRadius: 12, border: 'none',
            background: '#4ECDC4', color: '#fff', fontWeight: 700, cursor: 'pointer', marginBottom: 12
          }}
        >
          Confirm Booking
        </button>
        <button
          onClick={() => setCheckoutOpen(false)}
          style={{
            width: '100%', padding: 14, borderRadius: 12, border: '1px solid #ddd',
            background: 'transparent', color: '#666', cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  // MAIN RENDER
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0D0D; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.4); }
      `}</style>

      <Toast />
      <Navbar />
      <CartSidebar />
      <CheckoutModal />

      {view === 'home' && <HomeView />}
      {view === 'detail' && <DetailView />}
      {view === 'night-builder' && <NightBuilderView />}
      {view === 'concierge' && <ConciergeView />}
    </div>
  );
}
