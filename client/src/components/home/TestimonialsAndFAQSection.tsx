import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Star, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  batchOrDept: string;
  imageUrl: string;
  type: 'Student Volunteer' | 'Faculty Advisor' | 'Alumnus' | 'Community Member';
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Campus Intake' | 'Donations' | 'Operations';
}

export const TestimonialsAndFAQSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 't1',
      quote:
        'Teaching 20 young kids in Brajalalchak after my 4 PM lab lectures is the highlight of my college life. Seeing them read full sentences within 3 months is true engineering impact.',
      author: 'Ananya Roy',
      role: 'Student Coordinator',
      batchOrDept: 'B.Tech Computer Science (Batch of 2026)',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      type: 'Student Volunteer',
    },
    {
      id: 't2',
      quote:
        'Eklavya represents the true spirit of Haldia Institute of Technology. Their 24/7 stray animal rescue and daily free village school are managed with exemplary discipline and total financial transparency.',
      author: 'Dr. S. K. Mukherjee',
      role: 'Faculty Advisor',
      batchOrDept: 'Department of Chemical Engineering, HIT Haldia',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      type: 'Faculty Advisor',
    },
    {
      id: 't3',
      quote:
        'Even after joining TCS, I stay connected as an alumnus donor. The direct photo logs and transparent ledger give me 100% confidence that every rupee feeds an animal or buys a child’s books.',
      author: 'Vikramaditya Das',
      role: 'Former Society President (Alumnus)',
      batchOrDept: 'HIT Alumnus (Software Engineer @ TCS)',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      type: 'Alumnus',
    },
    {
      id: 't4',
      quote:
        'My daughter used to struggle with basic counting. The Eklavya bhaiya and didis come every evening without fail, and now she tops her class in primary school.',
      author: 'Saraswati Mondal',
      role: 'Village Parent',
      batchOrDept: 'Brajalalchak Colony, Haldia',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      type: 'Community Member',
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: 'f1',
      question: 'How does the annual student recruitment and campus intake work?',
      answer:
        'Undergraduate students at Haldia Institute of Technology can apply through our annual Campus Intake process. Membership is subject to our formal selection process, including written intent review and panel interviews by Domain Leads and the Faculty Advisor. Selected members undergo a 30-day ground orientation.',
      category: 'Campus Intake',
    },
    {
      id: 'f2',
      question: 'Where do financial donations go and how are they tracked?',
      answer:
        '100% of public donations go directly to field supplies: notebooks, school uniforms, evening snacks for children, and veterinary saline, bandages, and vaccinations for animals. Full ledger records are audited and visible in the Admin and Donor Portal.',
      category: 'Donations',
    },
    {
      id: 'f3',
      question: 'How does the emergency stray animal rescue helpline operate?',
      answer:
        'When a rescue alert is filed via our helpline or portal, our on-call student veterinary squad is dispatched within 15 minutes to assess, administer first-aid dressing, or transport the animal to a partner vet clinic.',
      category: 'Operations',
    },
    {
      id: 'f4',
      question: 'When and where are the free evening school classes conducted?',
      answer:
        'Classes run 6 days a week (Monday through Saturday) from 4:30 PM to 6:30 PM across 3 village centers around Haldia (Brajalalchak, Kshudiram Nagar, and Ranichak periphery).',
      category: 'Operations',
    },
    {
      id: 'f5',
      question: 'Can alumni and corporate donors sponsor a specific child or animal squad?',
      answer:
        'Yes! Through our Donate page, sponsors can choose specific packages like "Sponsor a Child\'s School Year" or "Fund Emergency Vet First-Aid Kits" with personalized digital certificate commendations.',
      category: 'Donations',
    },
  ];

  const [activeFaqId, setActiveFaqId] = useState<string>('f1');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Campus Intake' | 'Donations' | 'Operations'>('All');

  const filteredFaqs = faqs.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* 1. TESTIMONIALS SECTION ("Voices from the Ground & Campus") */}
      <div className="space-y-8 sm:space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-100 pb-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold tracking-tight text-teal-950 leading-[1.12]">
              <span className="italic bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Voices
              </span>{' '}
              from the Ground & Campus
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Hear directly from student volunteers, faculty mentors, alumni, and village families whose lives are transformed daily.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/80 text-xs font-bold text-teal-800 shrink-0 self-start md:self-auto shadow-2xs">
            <Sparkles size={13} className="text-emerald-600" />
            <span>100% Student-Powered Impact</span>
          </div>
        </div>

        {/* 2x2 Testimonial Cards Grid with Desktop Overlapping 3D Avatars & Mobile Soft Tint */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 md:gap-y-12 md:pt-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-emerald-50/40 md:bg-white border border-emerald-200/60 md:border-slate-200/80 shadow-none md:shadow-md hover:border-emerald-400/60 md:hover:shadow-lg transition-all duration-300 p-6 md:p-7 relative overflow-visible flex flex-col justify-between space-y-4 group"
            >
              {/* Card Header: Avatar, Name, Stars & Role Badge */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={t.imageUrl}
                    alt={t.author}
                    className="w-13 h-13 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0 border-2 md:border-4 border-emerald-100 md:border-white shadow-xs md:shadow-lg mt-0 md:-mt-10 relative z-10 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug truncate">
                      {t.author}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate">
                      {t.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {/* 5 Green Stars */}
                  <div className="flex items-center gap-0.5 text-emerald-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>

                  {/* Pill Badge */}
                  <span className="bg-emerald-100 text-teal-800 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-200/60">
                    {t.type}
                  </span>
                </div>
              </div>

              {/* Quote with Clean Legible Sans Typography */}
              <p className="font-sans text-slate-700 text-xs sm:text-sm leading-relaxed pt-1">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      <div id="faq" className="space-y-8 sm:space-y-10 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-100 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-extrabold uppercase tracking-wider text-teal-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Transparency & FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold tracking-tight text-teal-950 leading-[1.12]">
              Frequently Asked{' '}
              <span className="italic bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Got questions about our daily operations, volunteer registration, or direct donation tracking? Find quick answers below.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white/70 border border-emerald-200/80 rounded-full shrink-0 self-start md:self-auto text-xs shadow-2xs">
            {(['All', 'Campus Intake', 'Donations', 'Operations'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-teal-900 hover:bg-emerald-50/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Accordion Items */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl transition-all duration-200 overflow-hidden shadow-2xs ${
                  isOpen
                    ? 'bg-emerald-100/60 border-l-4 border-l-teal-600 border border-emerald-300/80'
                    : 'bg-emerald-50/70 border border-emerald-200/60 hover:bg-emerald-100/50'
                }`}
              >
                <button
                  onClick={() => setActiveFaqId(isOpen ? '' : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-teal-700 text-white' : 'bg-teal-100/80 text-teal-800'
                      }`}
                    >
                      <HelpCircle size={15} />
                    </div>
                    <span className="font-serif font-bold text-sm sm:text-base text-teal-950">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-teal-800 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed pl-13 space-y-2.5">
                    <p>{faq.answer}</p>
                    <div>
                      <span className="bg-teal-800 text-teal-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                        <CheckCircle2 size={10} />
                        <span>Category: {faq.category}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
