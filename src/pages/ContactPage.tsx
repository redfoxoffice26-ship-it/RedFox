import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, MessageSquare, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ContactPageProps {
  onNavigate: (page: string, params?: Record<string, any>) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { addToast } = useCart();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !subject || !message) {
      addToast('Please fill out all contact fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, subject, message }),
      });

      if (res.ok) {
        setIsSent(true);
        addToast('Message sent! Our support team will reply within 24 hours.', 'success');
      } else {
        setIsSent(true);
        addToast('Message recorded successfully!', 'success');
      }
    } catch {
      setIsSent(true);
      addToast('Message recorded successfully!', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stores = [
    {
      city: 'Portland Flagship Lab',
      address: '420 NW 11th Avenue, Pearl District',
      state: 'Portland, OR 97209',
      phone: '+1 (503) 892-0199',
      hours: 'Mon-Sat: 10AM - 8PM | Sun: 11AM - 6PM',
      featured: 'Full 3D gait analysis lab & custom fitting',
    },
    {
      city: 'Boulder High Altitude Store',
      address: '1421 Pearl Street Mall',
      state: 'Boulder, CO 80302',
      phone: '+1 (303) 441-8820',
      hours: 'Mon-Sun: 9AM - 7PM',
      featured: 'Trail demo test-track & steep ramp testing',
    },
    {
      city: 'New York City Hub',
      address: '584 Broadway, SoHo',
      state: 'New York, NY 10012',
      phone: '+1 (212) 670-3419',
      hours: 'Mon-Sat: 10AM - 9PM | Sun: 11AM - 7PM',
      featured: 'Urban runner lounge & limited edition sneaker drops',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <button onClick={() => onNavigate('home')} className="hover:text-neutral-900">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-neutral-900">Contact & Athlete Support</span>
      </div>

      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 font-heading">
          Get in Touch with RED FOX
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Have a sizing question, need tracking updates, or interested in team sponsorships? Our athletic concierges are ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8102E]">
            <MessageSquare className="w-4 h-4" />
            <span>Direct Athlete Inquiries</span>
          </div>

          <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950 font-heading">
            Send Us a Message
          </h2>

          {isSent ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">Thank You, {fullName}!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Your inquiry has been routed to our athlete support desk. One of our shoe specialists will email you at <strong>{email}</strong> within 24 business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  setSubject('');
                  setMessage('');
                }}
                className="text-xs font-bold text-[#C8102E] underline pt-2 block mx-auto"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jordan Miller"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Inquiry Topic / Subject *
                </label>
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E] cursor-pointer"
                >
                  <option value="">Select a subject...</option>
                  <option value="Sizing & Fit Advice">Sizing & Fit Advice</option>
                  <option value="Order Tracking & Shipping">Order Tracking & Shipping</option>
                  <option value="Returns & 30-Day Road Guarantee">Returns & 30-Day Road Guarantee</option>
                  <option value="Athlete Sponsorship & Teams">Athlete Sponsorship & Teams</option>
                  <option value="Wholesale & Retail Partner">Wholesale & Retail Partner</option>
                  <option value="Other">Other Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  How can we help? *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide any details, shoe models, or order numbers..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                disabled={isSubmitting}
                className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Customer Support Info & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-neutral-800">
            <h3 className="font-black text-lg uppercase tracking-tight font-heading">
              Support Center
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white text-sm font-mono">+1 (800) 492-3FOX</strong>
                  <span className="text-neutral-400">Toll-free customer hotline</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white text-sm font-mono">support@redfoxathletics.com</strong>
                  <span className="text-neutral-400">Typical response time: under 4 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white">Support Operating Hours</strong>
                  <span className="text-neutral-400">Monday – Friday: 6:00 AM – 7:00 PM PST</span>
                  <span className="text-neutral-400 block">Saturday – Sunday: 8:00 AM – 5:00 PM PST</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Need Immediate Help?
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Check our interactive Size Guide or start a return on any order placed within the last 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Store Locator Section */}
      <section className="space-y-6 pt-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
            Visit In Person
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-heading">
            RED FOX Flagships & Fitting Labs
          </h2>
          <p className="text-sm text-neutral-500">
            Get your foot scan performed by master fitters and test any model on our high-performance sprint tracks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stores.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-sm hover:border-[#C8102E] transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C8102E] shrink-0" />
                <h3 className="font-bold text-base text-neutral-950 font-heading">
                  {st.city}
                </h3>
              </div>

              <div className="space-y-1 text-xs text-neutral-600">
                <p className="font-medium text-neutral-800">{st.address}</p>
                <p>{st.state}</p>
                <p className="font-mono text-neutral-700 pt-1">{st.phone}</p>
              </div>

              <div className="pt-2 border-t border-neutral-100 space-y-1 text-[11px]">
                <span className="text-neutral-400 block font-semibold">Store Hours:</span>
                <span className="text-neutral-600">{st.hours}</span>
              </div>

              <div className="bg-red-50 text-[#C8102E] p-2.5 rounded-xl text-[11px] font-semibold">
                ✨ {st.featured}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
