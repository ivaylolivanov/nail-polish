const NAV_PAGES = [
  { id: 'home',      href: 'index.html',     label: 'Начало' },
  {
    id: 'services',  href: 'services.html',  label: 'Услуги',
    dropdown: [
      { href: 'services.html#face', label: 'Грижа за лице' },
      { href: 'services.html#body', label: 'Грижа за тяло' },
    ],
  },
  { id: 'pricelist', href: 'pricelist.html', label: 'Ценоразпис' },
  { id: 'booking',   href: 'booking.html',   label: 'Резервирай онлайн' },
  { id: 'contacts',  href: 'contacts.html',  label: 'Контакти' },
];

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com', icon: 'fa-facebook-f', label: 'Facebook'  },
  { href: 'https://www.instagram.com', icon: 'fa-instagram',  label: 'Instagram' },
  { href: 'https://wa.me/',            icon: 'fa-whatsapp',   label: 'WhatsApp'  },
];

function buildPageItem(page, activePage) {
  const active = page.id === activePage ? ' nav-btn--active' : '';

  if (page.dropdown) {
    const dropdownItems = page.dropdown
      .map(item => `<li><a href="${item.href}">${item.label}</a></li>`)
      .join('');
    return `
      <li class="nav-dropdown">
        <a href="${page.href}" class="nav-btn${active}">${page.label}</a>
        <span class="dropdown-arrow">▾</span>
        <ul class="dropdown-menu">${dropdownItems}</ul>
      </li>`;
  }

  return `<li><a href="${page.href}" class="nav-btn${active}">${page.label}</a></li>`;
}

function buildSocialItem(social) {
  return `
    <li>
      <a href="${social.href}" target="_blank" rel="noopener"
         class="nav-btn nav-btn--icon" aria-label="${social.label}">
        <i class="fab ${social.icon}"></i>
      </a>
    </li>`;
}

function buildNavbarHTML(activePage) {
  const pageItems   = NAV_PAGES.map(page   => buildPageItem(page, activePage)).join('');
  const socialItems = SOCIAL_LINKS.map(social => buildSocialItem(social)).join('');

  return `
    <nav class="navbar">
      <a href="index.html" class="nav-logo">
        <img src="data/logo.png" alt="Elena - Студио за красота" class="nav-logo-img" />
      </a>
      <ul class="nav-links" id="navLinks">
        ${pageItems}
        ${socialItems}
      </ul>
      <button class="nav-hamburger" id="hamburger" aria-label="Меню">&#9776;</button>
    </nav>`;
}

function toggleMobileMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

function mountNavbar() {
  const container = document.getElementById('navbar-placeholder');
  if (!container) return;

  container.innerHTML = buildNavbarHTML(container.dataset.page);
  document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
}

document.addEventListener('DOMContentLoaded', mountNavbar);
