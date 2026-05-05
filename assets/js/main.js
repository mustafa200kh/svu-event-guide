/* ============================================================
   SVU Events Guide - Main JavaScript
   Project: BWP401 - Syrian Virtual University
   ============================================================ */

/* ============================================================
   EVENT DATA - Central data store for all events
   ============================================================ */
const eventsData = [
  {
    id: 1,
    title: "Spring Cultural Festival",
    titleAr: "مهرجان الربيع الثقافي",
    category: "culture",
    date: "2026-05-15",
    dateDisplay: "May 15, 2026",
    location: "Damascus Cultural Center",
    image: "https://picsum.photos/seed/culture1/600/400",
    description: "A vibrant celebration of Syrian arts, literature, and heritage featuring local artists, poets, and cultural exhibitions.",
    featured: true,
    upcoming: true
  },
  {
    id: 2,
    title: "University Sports Championship",
    titleAr: "بطولة الجامعة الرياضية",
    category: "sports",
    date: "2026-05-20",
    dateDisplay: "May 20, 2026",
    location: "SVU Sports Complex",
    image: "https://picsum.photos/seed/sports1/600/400",
    description: "Annual inter-faculty sports competition including football, basketball, volleyball, and athletics.",
    featured: true,
    upcoming: true
  },
  {
    id: 3,
    title: "Music & Arts Night",
    titleAr: "ليلة الموسيقى والفنون",
    category: "music",
    date: "2026-05-25",
    dateDisplay: "May 25, 2026",
    location: "SVU Main Auditorium",
    image: "https://picsum.photos/seed/music1/600/400",
    description: "An enchanting evening of classical and contemporary music performed by talented SVU students and faculty.",
    featured: true,
    upcoming: true
  },
  {
    id: 4,
    title: "Family Day Celebration",
    titleAr: "يوم العائلة",
    category: "family",
    date: "2026-06-01",
    dateDisplay: "June 1, 2026",
    location: "University Garden",
    image: "https://picsum.photos/seed/family1/600/400",
    description: "A fun-filled day for students and their families with activities, games, food stalls, and entertainment.",
    featured: false,
    upcoming: true
  },
  {
    id: 5,
    title: "Tech & Innovation Expo",
    titleAr: "معرض التقنية والابتكار",
    category: "culture",
    date: "2026-06-10",
    dateDisplay: "June 10, 2026",
    location: "SVU Innovation Hub",
    image: "https://picsum.photos/seed/tech1/600/400",
    description: "Showcasing student projects, startups, and technological innovations from across all faculties.",
    featured: false,
    upcoming: true
  },
  {
    id: 6,
    title: "Summer Sports League",
    titleAr: "دوري الصيف الرياضي",
    category: "sports",
    date: "2026-06-15",
    dateDisplay: "June 15, 2026",
    location: "SVU Sports Fields",
    image: "https://picsum.photos/seed/sports2/600/400",
    description: "A month-long summer sports league open to all students with prizes and certificates for winners.",
    featured: false,
    upcoming: true
  },
  {
    id: 7,
    title: "Arabic Music Workshop",
    titleAr: "ورشة الموسيقى العربية",
    category: "music",
    date: "2026-04-10",
    dateDisplay: "April 10, 2026",
    location: "Music Department Hall",
    image: "https://picsum.photos/seed/music2/600/400",
    description: "An intensive workshop on traditional Arabic musical instruments and compositions.",
    featured: false,
    upcoming: false
  },
  {
    id: 8,
    title: "Children's Art Exhibition",
    titleAr: "معرض فنون الأطفال",
    category: "family",
    date: "2026-04-20",
    dateDisplay: "April 20, 2026",
    location: "SVU Gallery",
    image: "https://picsum.photos/seed/family2/600/400",
    description: "A colorful exhibition of artwork created by children of SVU staff and students.",
    featured: false,
    upcoming: false
  }
];

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */

// Get category badge HTML
function getCategoryBadge(category) {
  const labels = {
    culture: { label: "Culture", class: "badge-culture" },
    sports:  { label: "Sports",  class: "badge-sports"  },
    music:   { label: "Music",   class: "badge-music"   },
    family:  { label: "Family",  class: "badge-family"  }
  };
  const cat = labels[category] || { label: category, class: "bg-secondary" };
  return `<span class="badge ${cat.class} text-white">${cat.label}</span>`;
}

// Build a single event card HTML
function buildEventCard(event) {
  return `
    <div class="col-lg-3 col-md-4 col-sm-6 mb-4 event-item"
         data-category="${event.category}"
         data-date="${event.date}"
         data-location="${event.location.toLowerCase()}"
         data-upcoming="${event.upcoming}">
      <div class="card event-card h-100">
        <div style="overflow:hidden;">
          <img src="${event.image}" class="card-img-top" alt="${event.title}" loading="lazy">
        </div>
        <div class="card-body">
          <div class="mb-2">${getCategoryBadge(event.category)}</div>
          <h5 class="card-title">${event.title}</h5>
          <div class="event-meta"><i class="bi bi-calendar3"></i> ${event.dateDisplay}</div>
          <div class="event-meta"><i class="bi bi-geo-alt"></i> ${event.location}</div>
          <p class="card-text mt-2">${event.description.substring(0, 90)}...</p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
          <small class="text-muted">${event.upcoming ? '<span class="text-success fw-bold">Upcoming</span>' : '<span class="text-muted">Past</span>'}</small>
          <a href="event.html?id=${event.id}" class="btn btn-sm btn-primary-custom">Details</a>
        </div>
      </div>
    </div>`;
}

/* ============================================================
   HOMEPAGE - Render latest events grid
   ============================================================ */
function renderLatestEvents() {
  const container = document.getElementById('latestEventsGrid');
  if (!container) return;

  // Show 4 most recent upcoming events
  const latest = eventsData.filter(e => e.upcoming).slice(0, 4);
  container.innerHTML = latest.map(buildEventCard).join('');
}

/* ============================================================
   EVENTS PAGE - Render all events and filtering logic
   ============================================================ */
function renderAllEvents(filtered) {
  const container = document.getElementById('eventsGrid');
  const noResults = document.getElementById('noResults');
  if (!container) return;

  const list = filtered || eventsData;

  if (list.length === 0) {
    container.innerHTML = '';
    if (noResults) noResults.classList.remove('d-none');
    return;
  }

  if (noResults) noResults.classList.add('d-none');
  container.innerHTML = list.map(buildEventCard).join('');
}

// Filter events based on toolbar inputs
function filterEvents() {
  const categoryVal = document.getElementById('filterCategory')?.value || 'all';
  const dateVal     = document.getElementById('filterDate')?.value     || 'all';
  const locationVal = (document.getElementById('filterLocation')?.value || '').toLowerCase().trim();

  let filtered = [...eventsData];

  // Filter by category
  if (categoryVal !== 'all') {
    filtered = filtered.filter(e => e.category === categoryVal);
  }

  // Filter by upcoming/past
  if (dateVal === 'upcoming') {
    filtered = filtered.filter(e => e.upcoming === true);
  } else if (dateVal === 'past') {
    filtered = filtered.filter(e => e.upcoming === false);
  }

  // Filter by location text search
  if (locationVal) {
    filtered = filtered.filter(e => e.location.toLowerCase().includes(locationVal));
  }

  renderAllEvents(filtered);

  // Update result count
  const countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = filtered.length;
}

// Reset all filters
function resetFilters() {
  const catEl = document.getElementById('filterCategory');
  const dateEl = document.getElementById('filterDate');
  const locEl = document.getElementById('filterLocation');
  if (catEl)  catEl.value  = 'all';
  if (dateEl) dateEl.value = 'all';
  if (locEl)  locEl.value  = '';
  renderAllEvents();
  const countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = eventsData.length;
}

// Category quick-filter buttons (homepage & events page)
function initCategoryButtons() {
  document.querySelectorAll('[data-filter-cat]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const cat = this.dataset.filterCat;

      // If on events page, apply filter
      const catSelect = document.getElementById('filterCategory');
      if (catSelect) {
        catSelect.value = cat;
        filterEvents();
        // Scroll to events grid
        document.getElementById('eventsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Navigate to events page with category param
        window.location.href = `events.html?category=${cat}`;
      }
    });
  });
}

/* ============================================================
   EVENTS PAGE - Read URL params on load
   ============================================================ */
function applyUrlFilters() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat) {
    const catSelect = document.getElementById('filterCategory');
    if (catSelect) {
      catSelect.value = cat;
      filterEvents();
    }
  }
}

/* ============================================================
   EVENT DETAIL PAGE - Load event by ID
   ============================================================ */
function loadEventDetail() {
  const detailContainer = document.getElementById('eventDetailContent');
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const event = eventsData.find(e => e.id === id) || eventsData[0];

  // Update page title
  document.title = `${event.title} - SVU Events Guide`;

  // Populate hero
  const heroImg = document.getElementById('detailHeroImg');
  const heroTitle = document.getElementById('detailHeroTitle');
  const heroBadge = document.getElementById('detailHeroBadge');
  if (heroImg)   heroImg.src = event.image;
  if (heroTitle) heroTitle.textContent = event.title;
  if (heroBadge) heroBadge.innerHTML = getCategoryBadge(event.category);

  // Populate info
  const infoDate     = document.getElementById('detailDate');
  const infoLocation = document.getElementById('detailLocation');
  const infoCategory = document.getElementById('detailCategory');
  const infoStatus   = document.getElementById('detailStatus');
  const infoDesc     = document.getElementById('detailDescription');

  if (infoDate)     infoDate.textContent     = event.dateDisplay;
  if (infoLocation) infoLocation.textContent = event.location;
  if (infoCategory) infoCategory.innerHTML   = getCategoryBadge(event.category);
  if (infoStatus)   infoStatus.innerHTML     = event.upcoming
    ? '<span class="badge bg-success">Upcoming</span>'
    : '<span class="badge bg-secondary">Past</span>';
  if (infoDesc)     infoDesc.textContent     = event.description;

  // Populate related events (same category, different id)
  const relatedContainer = document.getElementById('relatedEvents');
  if (relatedContainer) {
    const related = eventsData.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);
    relatedContainer.innerHTML = related.map(e => `
      <div class="col-md-4 mb-3">
        <div class="card event-card h-100">
          <div style="overflow:hidden;">
            <img src="${e.image}" class="card-img-top" alt="${e.title}" loading="lazy">
          </div>
          <div class="card-body">
            <h6 class="card-title">${e.title}</h6>
            <div class="event-meta"><i class="bi bi-calendar3"></i> ${e.dateDisplay}</div>
          </div>
          <div class="card-footer">
            <a href="event.html?id=${e.id}" class="btn btn-sm btn-outline-primary-custom w-100">View Details</a>
          </div>
        </div>
      </div>`).join('');
  }
}

/* ============================================================
   ADD TO CALENDAR - Simple alert action
   ============================================================ */
function addToCalendar() {
  const title = document.getElementById('detailHeroTitle')?.textContent || 'Event';
  const date  = document.getElementById('detailDate')?.textContent || '';

  // Show a styled toast/alert
  showToast(`✅ "${title}" has been added to your calendar for ${date}!`, 'success');
}

/* ============================================================
   SHARE MODAL - Populate share links
   ============================================================ */
function openShareModal() {
  const title = encodeURIComponent(document.getElementById('detailHeroTitle')?.textContent || 'SVU Event');
  const url   = encodeURIComponent(window.location.href);

  const fbLink  = document.getElementById('shareFacebook');
  const twLink  = document.getElementById('shareTwitter');
  const waLink  = document.getElementById('shareWhatsapp');
  const tgLink  = document.getElementById('shareTelegram');
  const copyBtn = document.getElementById('shareCopyLink');

  if (fbLink)  fbLink.href  = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  if (twLink)  twLink.href  = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
  if (waLink)  waLink.href  = `https://wa.me/?text=${title}%20${url}`;
  if (tgLink)  tgLink.href  = `https://t.me/share/url?url=${url}&text=${title}`;

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(decodeURIComponent(url)).then(() => {
        this.textContent = '✅ Link Copied!';
        setTimeout(() => { this.innerHTML = '<i class="bi bi-clipboard"></i> Copy Link'; }, 2000);
      });
    });
  }

  const modal = new bootstrap.Modal(document.getElementById('shareModal'));
  modal.show();
}

/* ============================================================
   CONTACT FORM VALIDATION
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Real-time validation helpers
  const nameInput    = document.getElementById('contactName');
  const emailInput   = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');

  function validateField(input, condition, errorMsg) {
    const feedback = input.nextElementSibling;
    if (condition) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (feedback && feedback.classList.contains('invalid-feedback')) feedback.textContent = '';
      return true;
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      if (feedback && feedback.classList.contains('invalid-feedback')) feedback.textContent = errorMsg;
      return false;
    }
  }

  // Real-time validation on input
  if (nameInput) {
    nameInput.addEventListener('input', () =>
      validateField(nameInput, nameInput.value.trim().length >= 2, 'Name must be at least 2 characters.'));
  }

  if (emailInput) {
    emailInput.addEventListener('input', () =>
      validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()), 'Please enter a valid email address.'));
  }

  if (messageInput) {
    messageInput.addEventListener('input', () =>
      validateField(messageInput, messageInput.value.trim().length >= 10, 'Message must be at least 10 characters.'));
  }

  // Form submit handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameOk    = validateField(nameInput,    nameInput.value.trim().length >= 2,                              'Name must be at least 2 characters.');
    const emailOk   = validateField(emailInput,   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()),     'Please enter a valid email address.');
    const messageOk = validateField(messageInput, messageInput.value.trim().length >= 10,                          'Message must be at least 10 characters.');

    const alertContainer = document.getElementById('formAlertContainer');

    if (nameOk && emailOk && messageOk) {
      // Success
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i>
            <strong>تم إرسال رسالتك بنجاح!</strong> Your message has been sent successfully. We'll get back to you soon.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>`;
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      // Remove validation classes after reset
      [nameInput, emailInput, messageInput].forEach(el => {
        if (el) { el.classList.remove('is-valid', 'is-invalid'); }
      });
    } else {
      // Failure
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Oops!</strong> Please fix the errors below and try again.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>`;
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function showToast(message, type = 'info') {
  // Remove existing toast
  const existing = document.getElementById('siteToast');
  if (existing) existing.remove();

  const colors = { success: '#198754', danger: '#dc3545', info: '#0dcaf0', warning: '#ffc107' };
  const toast = document.createElement('div');
  toast.id = 'siteToast';
  toast.style.cssText = `
    position: fixed; bottom: 5rem; right: 1.5rem; z-index: 9999;
    background: ${colors[type] || colors.info}; color: #fff;
    padding: 1rem 1.5rem; border-radius: 10px;
    box-shadow: 0 6px 25px rgba(0,0,0,0.2);
    font-family: 'Cairo', sans-serif; font-size: 0.92rem; font-weight: 600;
    max-width: 340px; animation: slideInRight 0.3s ease;
  `;
  toast.textContent = message;

  // Add animation keyframes if not present
  if (!document.getElementById('toastStyle')) {
    const style = document.createElement('style');
    style.id = 'toastStyle';
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(120%); opacity: 0; }
        to   { transform: translateX(0);   opacity: 1; }
      }`;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ============================================================
   SCROLL TO TOP BUTTON
   ============================================================ */
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   NAVBAR - Active link highlighting
   ============================================================ */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   LOADING SPINNER - Hide on page load
   ============================================================ */
function hideSpinner() {
  const spinner = document.getElementById('pageSpinner');
  if (spinner) {
    spinner.classList.add('hidden');
    setTimeout(() => spinner.remove(), 500);
  }
}

/* ============================================================
   COUNTER ANIMATION (stats section)
   ============================================================ */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ============================================================
   FILTER TOOLBAR - Live search on keyup
   ============================================================ */
function initFilterListeners() {
  const catSelect  = document.getElementById('filterCategory');
  const dateSelect = document.getElementById('filterDate');
  const locInput   = document.getElementById('filterLocation');
  const filterBtn  = document.getElementById('filterBtn');
  const resetBtn   = document.getElementById('resetBtn');

  if (catSelect)  catSelect.addEventListener('change', filterEvents);
  if (dateSelect) dateSelect.addEventListener('change', filterEvents);
  if (locInput)   locInput.addEventListener('input',   filterEvents);
  if (filterBtn)  filterBtn.addEventListener('click',  filterEvents);
  if (resetBtn)   resetBtn.addEventListener('click',   resetFilters);
}

/* ============================================================
   MAIN INIT - Run on DOM ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  // Common initializations
  hideSpinner();
  setActiveNavLink();
  initScrollTop();
  animateCounters();
  initCategoryButtons();

  // Page-specific initializations
  renderLatestEvents();   // index.html
  renderAllEvents();      // events.html
  applyUrlFilters();      // events.html (URL params)
  initFilterListeners();  // events.html
  loadEventDetail();      // event.html
  initContactForm();      // contact.html

  // Add to Calendar button
  const calBtn = document.getElementById('addToCalendarBtn');
  if (calBtn) calBtn.addEventListener('click', addToCalendar);

  // Share button
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) shareBtn.addEventListener('click', openShareModal);
});
