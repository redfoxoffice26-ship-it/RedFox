import React from 'react';
import { Shield, Zap, Sparkles, Award, ArrowRight, HeartHandshake } from 'lucide-react';
import { FoxLogo } from '../components/FoxLogo';

interface AboutPageProps {
  onNavigate: (page: string, params?: Record<string, any>) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* Hero Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-16 lg:p-20 border border-neutral-800">
          <div className="absolute inset-0 opacity-25">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80"
              alt="RED FOX Performance"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C8102E]/20 text-[#C8102E] border border-[#C8102E]/40 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The RED FOX Manifesto</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-heading leading-tight">
              BORN IN THE WILD. <br />
              <span className="text-[#C8102E]">ENGINEERED FOR VELOCITY.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              We started RED FOX with a radical objective: build footwear with the predatory agility, relentless tenacity, and featherweight grace of the wild red fox.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
            Our Origins
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 font-heading">
            Challenging the Footwear Monopoly
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            For decades, runners and athletes faced a compromise: buy stiff, clunky marathon racers with brittle foam, or buy plush lifestyle sneakers with zero athletic response. We refused that trade-off.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-6">
          <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
            <p>
              In our biomechanics test facility, our engineers combined supercritical nitrogen injection techniques with anatomical foot casting to create our signature <strong>FoxNitro™</strong> core. The result is an explosive forward-propulsion feel that cushions every footfall while returning 82% of rebound energy directly into the runner’s toe-off.
            </p>
            <p>
              From the Boston Marathon course to the rugged rocky scrambles of the Colorado Rockies, RED FOX footwear has powered thousands of daily personal records, first 5Ks, and ultra-distance endurance crossings.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80"
              alt="Testing shoes on rugged trails"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-neutral-900 text-white py-16 sm:py-24 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-heading">
              Our Core Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">Uncompromised Speed</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Every stitch, sole contour, and upper yarn is scrutinized down to the milligram. If a design element doesn't make the runner faster, lighter, or safer, we eliminate it.
              </p>
            </div>

            <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">Tenacious Durability</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We believe true performance should last. Our shoes undergo 600-mile simulated abrasion tests, ensuring outsoles don't shear and uppers don't blow out prematurely.
              </p>
            </div>

            <div className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">Accessible Innovation</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Elite technology shouldn't be locked behind BDT 300 paywalls. We cut out wholesale middle-agents to deliver world-class racing shoes at transparent, honest prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing & Quality Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
            Material Science
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 font-heading">
            Precision Manufacturing
          </h2>
          <p className="text-sm text-neutral-500">
            Inside the advanced labs and heritage workshops that craft every pair of RED FOX shoes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="h-48 bg-neutral-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=600&q=80"
                alt="Leather Crafting"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-bold text-lg text-neutral-950 font-heading">
                1. Tuscan Leather & Suede
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our Metro Craft line sources certified gold-rated full-grain bovine hides from regional tanneries in Tuscany, finished by hand with natural waxes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="h-48 bg-neutral-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
                alt="Nitro Foam Lab"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-bold text-lg text-neutral-950 font-heading">
                2. Supercritical Nitrogen Foaming
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                By infusing molten polymers with pure nitrogen under extreme pressure, micro-cellular bubbles form that absorb heavy road impacts without fatigue.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="h-48 bg-neutral-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
                alt="BioKnit Marine Fibers"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-bold text-lg text-neutral-950 font-heading">
                3. Circular Marine BioKnit
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We partner with ocean clean-up initiatives to collect plastic debris, melt them into ultra-durable filaments, and 3D knit seamless foot-hugging uppers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200/80 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#C8102E] block mb-1">
                450K+
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Pairs Delivered Worldwide
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#C8102E] block mb-1">
                4.9 / 5
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Average Runner Rating
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#C8102E] block mb-1">
                65%
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Ocean Recycled Yarns
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#C8102E] block mb-1">
                30 Days
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Hassle-Free Road Trial
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <FoxLogo size="lg" showTagline={true} />
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-neutral-950 font-heading">
          Ready to Experience the Difference?
        </h2>
        <p className="text-sm text-neutral-600 max-w-md mx-auto">
          Take a pair on the road for 30 days. If you don't feel faster and more supported, return them for a 100% refund.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="bg-[#C8102E] hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2"
        >
          <span>Shop RED FOX Footwear</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
