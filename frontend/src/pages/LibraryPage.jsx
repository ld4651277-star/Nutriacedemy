import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function LibraryPage() {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All Resources');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState('Recommended');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const categories = [
    'All Resources',
    'Clinical Nutrition',
    'Dietetics & Counseling',
    'Food Science',
    'Biochemistry',
    'Public Health Nutrition',
    'Pediatric Nutrition',
    'Sports Nutrition',
  ];

  const books = [
    {
      id: 1,
      title: 'Advanced Medical Nutrition Therapy',
      author: 'Dr. Sarah Jenkins & Dr. Robert Cole',
      category: 'Clinical Nutrition',
      badge: 'Clinical',
      rating: '4.9',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB54YgWfHg6_YyFPUXOB9oDqq5NOFof4qr15VCJAKgPsNMWNPmyO56JjI4Px-aFc4p1XVHHfADWyr8PbWWKJ8tbs70yi7ezXGP1UJ83FRZmvoqf21EvBNgF0hv0qWuuhubGmdRa1jTYOuXRC-XJ-QgiUnJukri4nLbIPTbczX3fWnyKE7riidkIkUfBT55rxwFoloYiagKO7zqHdHY2-qofBJuLpBvOfZovyQb0GTnsKtcSDz4qlDEj',
    },
    {
      id: 2,
      title: 'Nutritional Biochemistry Fundamentals',
      author: 'Elena Rostova, PhD',
      category: 'Biochemistry',
      badge: 'Biochemistry',
      rating: '4.7',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDenUGUaTqpj_3ONf0Z8of4nmCIXnSJJAKEcczmxIX3r_X0jVwsLAzOwyERiCVCGcOdsFWICioYReJlGJc5MFThuXc_KYPUFTiOdd3Ma3ug3zuUcTyeH72-9cegSopGg0jYCoz2gL-6Rjugf--ntGqt6MDRJvQVBKovSfpSA4bXDWN0vNpEgYifbYDJQTDNkq0Y4-Boo25C__Ng3c6wDY3SvMpe3D3CwADzirXK9gAq4EFaHV5zia8g',
    },
    {
      id: 3,
      title: 'Principles of Modern Food Science',
      author: 'Dr. Marcus Vance',
      category: 'Food Science',
      badge: 'Food Science',
      rating: '4.8',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDW-CTLt5OnDrcAKctJDUCv1W9oPZeQzgbtCp7rvXzC8mhTcBp4Pmyuns7e_S6Tb_6APiye4mFKfrX06QEsH60iGYA356ZSZbjLootWMjNdaTqwllIQeJGrUCuw4g3x23FrBHCZMnAuiw6CCqme0tVtM7nBjpTo6UtXoDNsQFYQyyEm9TxkwMLFewClFMPwofeH9StAlhMdGNRxIZBgec5uLDc_VaEALlyQEjviJ9ey9niggH2dkjbx',
    },
    {
      id: 4,
      title: 'Effective Counseling in Dietetics Practice',
      author: 'Laura Simmons, RD',
      category: 'Dietetics & Counseling',
      badge: 'Dietetics',
      rating: '5.0',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCXjyhJTeQHCuWSIegTBEiYCt2b45PZdZ7gYZH71saP8MzqcuosZNkziEqlrvwlEMa-ojd_8AcOAQ1y_PXo9d4ChrMNCAPZ710zskkDHokAeoCe0lOFTIRrlaUZMvAKmA9gSXtesAVJOKOVV5rRzv1wwGlJFczeFhjsAtb_gxz5bqP7E3i3G30AaaPCqk5ehsSjY050x5EN89sJ34n4bbIKYt-CPRrFFGnH4x8NrSw3kndbSce0IdcW',
    },
    {
      id: 5,
      title: 'Pediatric Nutrition Handbook: 4th Edition',
      author: 'American Academy of Nutrition',
      category: 'Pediatric Nutrition',
      badge: 'Pediatric',
      rating: '4.6',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAPTZ5fhTuXBKg2Y_j2TCRW_BqbEEZk0V6nONn6bXba1er4jCW1HJspZdBaIehpA7aD8ZAd_T2-Vb7OF0d4TFEJy4L47N70wpeEo3LAwlzZWHqOpL10gYzNo0KdzXaLD3QFtA-R5g-0KCEvoNHzLTe1cNfCYotPrbbwWRN4lvpG0ukw5Dqrm-oAx2-WRsvkw2LOpzJY_34A-mFgSoDmAddp2IBnZV5IZc8bo5yoAsUv0zeRv4DJOt7S',
    },
    {
      id: 6,
      title: 'Performance Nutrition Strategies',
      author: 'Dr. T. J. Reynolds',
      category: 'Sports Nutrition',
      badge: 'Sports Nutrition',
      rating: '4.9',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAPlw9KNzq-A2RsmzwlJXOzWqzqy9Vr8zTDSmw5gaMRsZL74co2dedr_HMn2Ot5vzrlrNJndVpbq4ftvyhJxaL84uq2xhrarRmk5hzx6YqOWK77JA1xyDohotQsEklVxY8zmrRbzyGPqNO_BnNMvvhIlc8GlrL-o-aCfPcjytmFvQOIf5I8ifm8OYjdLDhm3gbdSJesZOs6iw-6S-C8Yo0f6Xm_ltLDupBx03Hv3FgJu5hFGKksd1D0',
    },
  ];

  const filteredBooks = books.filter((b) => {
    const matchesCat =
      activeCategory === 'All Resources' ||
      b.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesQuery =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <main className="flex-grow pt-[104px] pb-3xl px-margin-mobile md:px-margin-desktop max-w-[1600px] mx-auto w-full flex flex-col gap-2xl">
      {/* Header & Search Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-md pt-xl pb-lg">
        <h1 className="text-display font-display text-on-background font-bold">Study Resources</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Access thousands of textbooks, clinical guidelines, and research papers curated for nutrition and dietetics professionals.
        </p>

        {/* Big Search Bar */}
        <div className="w-full max-w-3xl mt-lg relative shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04),0_4px_6px_-2px_rgba(0,0,0,0.02)] rounded-full group">
          <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[28px]">
            search
          </span>
          <input
            className="w-full pl-16 pr-14 py-4 bg-surface-container-lowest border border-outline-variant rounded-full text-body-lg font-body-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant shadow-sm text-on-surface"
            placeholder="Search by title, author, or ISBN..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => showToast(`Searching for "${searchQuery}"...`)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-on-primary p-2 rounded-full hover:bg-secondary transition-colors aspect-square flex items-center justify-center active:scale-95 duration-150"
            aria-label="Submit search"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>

        {/* Toggle Recommended / New Releases */}
        <div className="flex bg-surface-container border border-outline-variant rounded-full p-1 mt-lg">
          <button
            onClick={() => setActiveTab('Recommended')}
            className={`px-xl py-2 rounded-full font-label-md text-label-md transition-all ${
              activeTab === 'Recommended'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-background'
            }`}
          >
            Recommended
          </button>
          <button
            onClick={() => setActiveTab('New Releases')}
            className={`px-xl py-2 rounded-full font-label-md text-label-md transition-all ${
              activeTab === 'New Releases'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-background'
            }`}
          >
            New Releases
          </button>
        </div>
      </section>

      {/* Library Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Desktop Sidebar: Categories */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col sticky top-[104px] max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pr-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-md">
            <h3 className="text-headline-md font-headline-md text-on-background border-b border-outline-variant pb-sm mb-sm font-semibold">
              Categories
            </h3>
            <nav className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center justify-between w-full text-left px-md py-3 rounded-lg text-label-md font-label-md transition-colors group ${
                    activeCategory === cat
                      ? 'bg-secondary-container text-on-secondary-container font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-background'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Book Grid */}
        <section className="col-span-1 lg:col-span-9">
          {/* Mobile Category Dropdown */}
          <div className="lg:hidden mb-lg">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md font-body-md text-on-background focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-low rounded-xl border border-outline-variant">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">menu_book</span>
              <p className="text-body-lg text-on-surface-variant">No titles found for this search or category.</p>
              <button
                onClick={() => {
                  setActiveCategory('All Resources');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-label-md"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
              {filteredBooks.map((book) => (
                <article
                  key={book.id}
                  className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04),0_4px_6px_-2px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  <div className="p-md bg-surface-container flex justify-center aspect-[3/4] overflow-hidden relative">
                    <img
                      className="h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      alt={book.title}
                      src={book.image}
                    />
                    <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur text-primary text-label-sm font-label-sm px-2 py-1 rounded-md border border-outline-variant font-medium">
                      {book.badge}
                    </span>
                  </div>
                  <div className="p-lg flex flex-col flex-grow">
                    <h3 className="text-body-lg font-body-lg font-semibold text-on-background mb-1 line-clamp-2 leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-label-md font-label-md text-on-surface-variant mb-4">
                      {book.author}
                    </p>
                    <div className="mt-auto pt-4 border-t border-outline-variant/50 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[16px] filled">star</span>
                        <span className="text-label-sm font-label-sm font-bold">{book.rating}</span>
                      </div>
                      <button
                        onClick={() =>
                          showToast(`Opening digital reader preview for "${book.title}"...`)
                        }
                        className="text-primary hover:text-secondary font-label-md text-label-md flex items-center gap-1 group/btn font-medium"
                      >
                        View Details
                        <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-2xl gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-40"
              aria-label="Previous Page"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              onClick={() => setPage(1)}
              className={`w-10 h-10 rounded-lg font-label-md text-label-md ${
                page === 1 ? 'bg-primary text-on-primary shadow-sm' : 'border border-outline-variant'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setPage(2)}
              className={`w-10 h-10 rounded-lg font-label-md text-label-md ${
                page === 2 ? 'bg-primary text-on-primary shadow-sm' : 'border border-outline-variant'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setPage(3)}
              className={`w-10 h-10 rounded-lg font-label-md text-label-md ${
                page === 3 ? 'bg-primary text-on-primary shadow-sm' : 'border border-outline-variant'
              }`}
            >
              3
            </button>
            <span className="w-10 h-10 flex items-center justify-center text-on-surface-variant">...</span>
            <button
              onClick={() => setPage((p) => Math.min(3, p + 1))}
              className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
              aria-label="Next Page"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
