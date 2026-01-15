// i18n loader with dropdown support
const LANGS = {
  es: {
    flag: 'https://flagcdn.com/24x18/es.png',
    label: 'ES',
    alt: 'Español'
  },
  en: {
    flag: 'https://flagcdn.com/24x18/gb.png',
    label: 'EN',
    alt: 'English'
  }
};

function setLanguage(lang) {
  fetch('js/lang/' + lang + '.json')
    .then(response => response.json())
    .then(dict => {
      // Cambiar el atributo lang del elemento <html>
      const htmlTag = document.getElementById('html-lang') || document.documentElement;
      if (htmlTag) htmlTag.setAttribute('lang', lang);
      
      // Traducir todos los elementos con data-i18n (UNA SOLA VEZ)
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = dict[key];
          } else {
            el.innerHTML = dict[key];
          }
        }
      });

      // Traducción de labels y textos fijos fuera de data-i18n
      // Menú principal desktop
      const nav = document.querySelector('nav.md\\:hidden');
      if (nav) {
        // Productos
        const prodLabel = nav.querySelector('label[for="productos-toggle"]');
        if (prodLabel) prodLabel.childNodes.forEach(n => {
          if (n.nodeType === 3 && n.textContent.trim().length > 0) n.textContent = dict['products_header'] || n.textContent;
        });
        // Marcas
        const marcasLabel = nav.querySelector('label[for="marcas-toggle"]');
        if (marcasLabel) marcasLabel.childNodes.forEach(n => {
          if (n.nodeType === 3 && n.textContent.trim().length > 0) n.textContent = dict['brands'] || n.textContent;
        });
        // Sobre nosotros
        const about = nav.querySelector('a.font-semibold.text-lg.block');
        if (about) about.textContent = dict['about_us'] || about.textContent;
        // Submenús
        const prodLinks = nav.querySelectorAll('div.max-h-0 a, div.max-h-40 a, div.max-h-32 a');
        const prodKeys = ['product_guitars','product_drums','product_pro_guitars','product_pads','product_mics'];
        prodLinks.forEach((a,i) => { if (dict[prodKeys[i]]) a.textContent = dict[prodKeys[i]]; });
        // Marcas links no traducibles (CRKD, RiffMaster, Mad Catz)
      }
      // Botones de usuario, carrito, buscar (mobile)
      const mobileBtns = document.querySelectorAll('.sm\\:hidden button[aria-label], .sm\\:hidden a[aria-label]');
      mobileBtns.forEach(btn => {
        if (btn.getAttribute('aria-label') === 'Search') btn.querySelector('.sr-only').textContent = dict['search'] || 'Search';
        if (btn.getAttribute('aria-label') === 'User') btn.querySelector('.sr-only').textContent = dict['user'] || 'User';
        if (btn.getAttribute('aria-label') === 'Cart') btn.querySelector('.sr-only').textContent = dict['cart'] || 'Cart';
      });
      
      // Guardar idioma y actualizar dropdowns DESPUÉS de cargar las traducciones
      localStorage.setItem('lang', lang);
      updateDropdowns(lang);
    })
    .catch(error => {
      console.error('Error loading language file:', error);
    });
}

function getLanguage() {
  return localStorage.getItem('lang') || 'es';
}

function updateDropdowns(lang) {
  // Desktop
  const flag = document.getElementById('lang-flag');
  const label = document.getElementById('lang-label');
  if (flag && label) {
    flag.src = LANGS[lang].flag;
    flag.alt = LANGS[lang].alt;
    label.textContent = LANGS[lang].label;
  }
  // Mobile
  const flagM = document.getElementById('lang-flag-mobile');
  const labelM = document.getElementById('lang-label-mobile');
  if (flagM && labelM) {
    flagM.src = LANGS[lang].flag;
    flagM.alt = LANGS[lang].alt;
    labelM.textContent = LANGS[lang].label;
  }
  // For dark mode: force update classes on dropdowns
  const dropdownBtnMobile = document.getElementById('dropdownLangBtnMobile');
  const dropdownMenuMobile = document.getElementById('dropdownLangMenuMobile');
  if (dropdownBtnMobile && dropdownMenuMobile) {
    // Remove/add dark classes based on body
    const isDark = document.body.classList.contains('dark');
    dropdownBtnMobile.classList.toggle('dark:bg-[#23272f]', isDark);
    dropdownBtnMobile.classList.toggle('dark:border-gray-700', isDark);
    dropdownBtnMobile.classList.toggle('dark:hover:bg-[#18181b]', isDark);
    dropdownMenuMobile.classList.toggle('dark:bg-[#23272f]', isDark);
    dropdownMenuMobile.querySelectorAll('button[data-lang]').forEach(btn => {
      btn.classList.toggle('dark:text-gray-100', isDark);
      btn.classList.toggle('dark:hover:bg-[#18181b]', isDark);
    });
  }
}

function setupDropdown(dropdownBtnId, dropdownMenuId) {
  const btn = document.getElementById(dropdownBtnId);
  const menu = document.getElementById(dropdownMenuId);
  if (!btn || !menu) return;
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
  });
  menu.querySelectorAll('button[data-lang]').forEach(option => {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      setLanguage(this.dataset.lang);
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    if (!menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const lang = getLanguage();
  setLanguage(lang);
  updateDropdowns(lang);
  setupDropdown('dropdownLangBtn', 'dropdownLangMenu');
  setupDropdown('dropdownLangBtnMobile', 'dropdownLangMenuMobile');
});