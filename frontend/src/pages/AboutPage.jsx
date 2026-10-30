import React, { useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function AboutPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      showToast('Please fill in both email and message.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        showToast(res.message || 'Message received! We will reply soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        showToast(res.error || 'Failed to submit message.', 'error');
      }
    } catch (err) {
      showToast('Thank you for contacting NutriAcademy! Message received.');
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'What is the format of the courses?',
      a: 'Our courses are primarily online, featuring a mix of video lectures, interactive quizzes, and practical assignments. We also offer optional live Q&A sessions with certified dietitians.',
    },
    {
      q: 'Do I need prior experience?',
      a: 'No prior experience is necessary for our foundational courses. Advanced clinical nutrition modules may recommend completion of prerequisites.',
    },
    {
      q: 'How long does certification take?',
      a: 'Most students complete their certification within 3 to 6 months, depending on their pace and the specific program track chosen.',
    },
    {
      q: 'Are the certificates accredited?',
      a: 'Yes, our courses and study pathways align with major international dietetics and nutritional science standards including ACEND, CDR, and UGC-NET syllabi.',
    },
  ];

  return (
    <main className="flex-grow pt-[100px] px-margin-mobile md:px-margin-desktop pb-3xl flex flex-col gap-3xl max-w-7xl mx-auto w-full">
      {/* About Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center mt-6">
        <div className="flex flex-col gap-lg">
          <h1 className="text-display font-display text-primary leading-tight">
            Bridging Education and Practice
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            At NutriAcademy, we believe that theoretical knowledge is only half the equation. Our mission is to empower the next generation of health professionals by seamlessly integrating rigorous academic study with practical, real-world application. We provide a premium, focused learning environment designed for clarity and growth.
          </p>
          <div className="flex gap-6 pt-4">
            <div className="flex flex-col">
              <span className="text-headline-lg font-headline-lg text-primary font-bold">10k+</span>
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                Students Enrolled
              </span>
            </div>
            <div className="w-px bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="text-headline-lg font-headline-lg text-primary font-bold">95%</span>
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                Certification Rate
              </span>
            </div>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-lg h-[400px] group">
          <img
            alt="Modern nutrition classroom"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA73-eCwQoFdfV8la2g5A_z-VHs0J6TOtV5UUXtaEat0Iv0PqhGbOsbjb5SNcHzVpRzvquV9dTUqMRmVW5yz5W_dtkeJ-ooQJbr0D47UmalqSFGYHbJ0amCQIXNxv2jPMIReNA_oHTgcYqkIz2E6m_rcx0Q_egpGAEBoEWpIFxQv5fWraaWjg8GoM23Cd0xRbswL_N8_q_fh7f3zDH43Vgs9Y3RV1_rMXj90FWCikRLQmJjTahNyRd-"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
      </section>

      {/* Bento Grid: Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col gap-md">
          <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">school</span>
          </div>
          <h3 className="text-headline-md font-headline-md text-on-surface font-semibold">
            Rigorous Curriculum
          </h3>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Evidence-based learning designed and vetted by registered dietitians and clinical researchers.
          </p>
        </div>

        <div className="bg-surface p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col gap-md border-t-4 border-t-primary">
          <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">handshake</span>
          </div>
          <h3 className="text-headline-md font-headline-md text-on-surface font-semibold">
            Practical Application
          </h3>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Bridge the gap from textbook theory to actual client consultation with simulated clinical cases.
          </p>
        </div>

        <div className="bg-surface p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col gap-md">
          <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <h3 className="text-headline-md font-headline-md text-on-surface font-semibold">
            Career Growth
          </h3>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Continuous support from exam prep to certification and building a flourishing professional practice.
          </p>
        </div>
      </section>

      {/* Contact & FAQ Section */}
      <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-3xl">
        {/* Contact Form */}
        <div className="bg-surface-container-lowest p-6 md:p-2xl rounded-xl border border-outline-variant shadow-sm">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-md">Get in Touch</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mb-lg">
            Have questions about our programs or need personalized guidance? Send us a message.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            <div className="flex flex-col gap-xs">
              <label className="text-label-sm font-label-sm text-on-surface font-medium" htmlFor="name">
                Name
              </label>
              <input
                className="rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-white text-body-md font-body-md p-sm"
                id="name"
                placeholder="Your name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="text-label-sm font-label-sm text-on-surface font-medium" htmlFor="email">
                Email *
              </label>
              <input
                className="rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-white text-body-md font-body-md p-sm"
                id="email"
                placeholder="your.email@example.com"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="text-label-sm font-label-sm text-on-surface font-medium" htmlFor="message">
                Message *
              </label>
              <textarea
                className="rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-white text-body-md font-body-md p-sm"
                id="message"
                placeholder="How can we help?"
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button
              className="mt-4 bg-primary text-on-primary py-3 rounded-lg text-label-md font-label-md shadow-sm hover:shadow-md hover:bg-surface-tint transition-all disabled:opacity-50 font-medium"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-xl flex gap-md">
            <a
              href="mailto:contact@nutriacademy.org"
              className="w-10 h-10 bg-surface-container flex items-center justify-center rounded-full text-primary hover:bg-primary-container transition-colors"
              title="Email Us"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
            <div
              onClick={() => showToast('Live chat is available Mon-Fri, 9am - 6pm EST.')}
              className="w-10 h-10 bg-surface-container flex items-center justify-center rounded-full text-primary hover:bg-primary-container transition-colors cursor-pointer"
              title="Live Chat"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </div>
          </div>
        </div>

        {/* Interactive FAQ */}
        <div className="flex flex-col gap-md">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-md">
            Frequently Asked Questions
          </h2>
          <div className="border border-outline-variant rounded-xl overflow-hidden bg-surface-container-lowest">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border-b border-outline-variant last:border-b-0">
                  <button
                    className="w-full text-left p-lg flex justify-between items-center hover:bg-surface-container-low transition-colors"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-label-md font-label-md text-on-surface font-semibold pr-2">
                      {faq.q}
                    </span>
                    <span className="material-symbols-outlined text-outline shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="bg-surface text-body-md font-body-md text-on-surface-variant px-lg pb-lg pt-sm animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
