import React, { useState } from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useCart();
  const [activeTab, setActiveTab] = useState<'men' | 'women' | 'kids'>('men');

  if (!isSizeGuideOpen) return null;

  const menSizes = [
    { us: '7', uk: '6.5', eu: '40', cm: '25.0', in: '9.8' },
    { us: '7.5', uk: '7', eu: '40.5', cm: '25.5', in: '10.0' },
    { us: '8', uk: '7.5', eu: '41', cm: '26.0', in: '10.2' },
    { us: '8.5', uk: '8', eu: '42', cm: '26.5', in: '10.4' },
    { us: '9', uk: '8.5', eu: '42.5', cm: '27.0', in: '10.6' },
    { us: '9.5', uk: '9', eu: '43', cm: '27.5', in: '10.8' },
    { us: '10', uk: '9.5', eu: '44', cm: '28.0', in: '11.0' },
    { us: '10.5', uk: '10', eu: '44.5', cm: '28.5', in: '11.2' },
    { us: '11', uk: '10.5', eu: '45', cm: '29.0', in: '11.4' },
    { us: '12', uk: '11.5', eu: '46.5', cm: '30.0', in: '11.8' },
    { us: '13', uk: '12.5', eu: '48', cm: '31.0', in: '12.2' },
  ];

  const womenSizes = [
    { us: '5.5', uk: '3.5', eu: '36', cm: '22.5', in: '8.8' },
    { us: '6', uk: '4', eu: '36.5', cm: '23.0', in: '9.0' },
    { us: '6.5', uk: '4.5', eu: '37.5', cm: '23.5', in: '9.2' },
    { us: '7', uk: '5', eu: '38', cm: '24.0', in: '9.4' },
    { us: '7.5', uk: '5.5', eu: '38.5', cm: '24.5', in: '9.6' },
    { us: '8', uk: '6', eu: '39', cm: '25.0', in: '9.8' },
    { us: '8.5', uk: '6.5', eu: '40', cm: '25.5', in: '10.0' },
    { us: '9', uk: '7', eu: '40.5', cm: '26.0', in: '10.2' },
    { us: '9.5', uk: '7.5', eu: '41', cm: '26.5', in: '10.4' },
    { us: '10', uk: '8', eu: '42', cm: '27.0', in: '10.6' },
  ];

  const kidsSizes = [
    { us: '10C', uk: '9.5', eu: '27', cm: '16.5', in: '6.5' },
    { us: '11C', uk: '10.5', eu: '28', cm: '17.5', in: '6.8' },
    { us: '12C', uk: '11.5', eu: '30', cm: '18.5', in: '7.2' },
    { us: '13C', uk: '12.5', eu: '31', cm: '19.5', in: '7.6' },
    { us: '1Y', uk: '13.5', eu: '32', cm: '20.0', in: '7.9' },
    { us: '2Y', uk: '1.5', eu: '33.5', cm: '21.0', in: '8.3' },
    { us: '3Y', uk: '2.5', eu: '35', cm: '22.0', in: '8.6' },
    { us: '4Y', uk: '3.5', eu: '36', cm: '23.0', in: '9.0' },
    { us: '5Y', uk: '4.5', eu: '37.5', cm: '23.5', in: '9.2' },
    { us: '6Y', uk: '5.5', eu: '38.5', cm: '24.0', in: '9.4' },
  ];

  const activeSizes =
    activeTab === 'men' ? menSizes : activeTab === 'women' ? womenSizes : kidsSizes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#C8102E]" />
            <h3 className="text-xl font-bold text-neutral-900 font-heading">
              RED FOX Footwear Size Guide
            </h3>
          </div>
          <button
            onClick={closeSizeGuide}
            className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Fit Tip */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-900 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">True-To-Size Guaranteed</strong>
              <p className="text-neutral-700">
                RED FOX running silhouettes run true to standard US athletic sizing. If you possess a wider foot or prefer additional toe splay during marathons, consider sizing up by a half size (0.5).
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex rounded-lg bg-neutral-100 p-1 border border-neutral-200">
            <button
              onClick={() => setActiveTab('men')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                activeTab === 'men'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Men's Sizing
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                activeTab === 'women'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Women's Sizing
            </button>
            <button
              onClick={() => setActiveTab('kids')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                activeTab === 'kids'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Junior / Kids
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-neutral-200 rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-900 text-white font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">US Size</th>
                  <th className="px-4 py-3">UK</th>
                  <th className="px-4 py-3">EU</th>
                  <th className="px-4 py-3">Foot Length (cm)</th>
                  <th className="px-4 py-3">Inches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-mono text-xs text-neutral-800">
                {activeSizes.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50 hover:bg-red-50/50'}>
                    <td className="px-4 py-2.5 font-bold text-neutral-950 font-sans">{row.us}</td>
                    <td className="px-4 py-2.5">{row.uk}</td>
                    <td className="px-4 py-2.5">{row.eu}</td>
                    <td className="px-4 py-2.5 font-bold text-[#C8102E]">{row.cm} cm</td>
                    <td className="px-4 py-2.5 text-neutral-500">{row.in}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Instructions */}
          <div className="border border-neutral-200 rounded-xl p-5 bg-neutral-50/50">
            <h4 className="font-bold text-neutral-900 mb-3 text-sm flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#C8102E]" />
              How to Measure Your Feet in 3 Easy Steps
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-600">
              <div className="p-3 bg-white rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-950 block mb-1">1. Trace Outline</span>
                Stand on a piece of clean white paper with your heel against a flat wall. Trace around the perimeter of your foot.
              </div>
              <div className="p-3 bg-white rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-950 block mb-1">2. Measure Length</span>
                Measure the longest distance from your heel point to your furthest toe in centimeters using a standard ruler.
              </div>
              <div className="p-3 bg-white rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-950 block mb-1">3. Compare Chart</span>
                Locate your exact centimeter measurement on the table above to find your ideal RED FOX athletic shoe size.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-100 border-t border-neutral-200 flex justify-end">
          <button
            onClick={closeSizeGuide}
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Got It, Close
          </button>
        </div>
      </div>
    </div>
  );
};
