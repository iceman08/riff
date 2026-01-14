


function setDarkModeStorage(isDark) {
    try {
        localStorage.setItem('riff-darkmode', isDark ? '1' : '0');
    } catch (e) {}
}

function getDarkModeStorage() {
    try {
        return localStorage.getItem('riff-darkmode') === '1';
    } catch (e) { return false; }
}


var tabToggle = document.getElementById('tab-toggle');
if (tabToggle) {
    tabToggle.onclick = function() {
        var isDark = !document.body.classList.contains('dark');
        document.body.classList.toggle('dark');
        setDarkModeStorage(isDark);
        updateDarkModeTab();
        applyDarkModeStyles(); // Forzar actualización de estilos en todas las secciones
    };
}


window.addEventListener('DOMContentLoaded', function() {
    if (getDarkModeStorage()) {
        document.body.classList.add('dark');
    }
    applyDarkModeStyles(); // Asegura que los estilos se apliquen al cargar
});

function updateDarkModeTab() {
    var tab = document.getElementById('tab-toggle');
    if (!tab) return;
    var dark = document.body.classList.contains('dark');
    if (dark) {
        tab.innerText = '☀️';
        tab.style.background = '#f3f3f3';
        tab.style.color = '#23272f';
    } else {
        tab.innerText = '🌙';
        tab.style.background = '#23272f';
        tab.style.color = '#fff';
    }
}
function applyDarkModeStyles() {
    var dark = document.body.classList.contains('dark');
    // "Ver más" label modo oscuro
    var seeMore = document.querySelector('.darkmode-see-more');
    if (seeMore) {
        seeMore.style.color = dark ? '#8AE2FF' : '#374151';
    }
    // About section dark mode
    var aboutBg = document.querySelector('.about-bg');
    var aboutTitle = document.querySelector('.about-title');
    var aboutTexts = document.querySelectorAll('.about-text');
    if (aboutBg) {
        aboutBg.style.background = dark ? '#18181b' : '#fff';
        aboutBg.style.color = dark ? '#f3f3f3' : '#23272f';
    }
    if (aboutTitle) {
        aboutTitle.style.color = dark ? '#fff' : '#23272f';
    }
    aboutTexts.forEach(function(p){
        p.style.color = dark ? '#f3f3f3' : '#23272f';
    });
    var unifiedBg = dark ? '#23272f' : '';
    document.body.style.background = unifiedBg;
    document.body.style.color = dark ? '#f3f3f3' : '';
    var header = document.querySelector('header');
    if(header) header.style.background = unifiedBg;
    var headerIcons = header ? header.querySelectorAll('svg') : [];
    headerIcons.forEach(function(svg){
        svg.style.color = dark ? '#fff' : '';
        svg.style.fill = dark ? '#fff' : '';
        svg.style.stroke = dark ? '#fff' : '';
    });
    
    // Botones de idioma (desktop y móvil) - Aplicar DESPUÉS de headerIcons para sobrescribir
    var langBtnDesktop = document.getElementById('dropdownLangBtn');
    var langBtnMobile = document.getElementById('dropdownLangBtnMobile');
    if (langBtnDesktop) {
        langBtnDesktop.style.background = dark ? '#23272f' : '#fff';
        langBtnDesktop.style.color = dark ? '#f3f3f3' : '#23272f';
        langBtnDesktop.style.borderColor = dark ? '#555' : '#d1d5db';
        var desktopLabel = langBtnDesktop.querySelector('#lang-label');
        if (desktopLabel) desktopLabel.style.color = dark ? '#f3f3f3' : '#23272f';
        var desktopSvg = langBtnDesktop.querySelector('svg');
        if (desktopSvg) {
            desktopSvg.style.color = dark ? '#f3f3f3' : '#23272f';
            desktopSvg.style.stroke = dark ? '#f3f3f3' : '#23272f';
            desktopSvg.setAttribute('stroke', dark ? '#f3f3f3' : '#23272f');
        }
    }
    if (langBtnMobile) {
        langBtnMobile.style.background = dark ? '#23272f' : '#fff';
        langBtnMobile.style.color = dark ? '#f3f3f3' : '#23272f';
        langBtnMobile.style.borderColor = dark ? '#555' : '#d1d5db';
        var mobileLabel = langBtnMobile.querySelector('#lang-label-mobile');
        if (mobileLabel) mobileLabel.style.color = dark ? '#f3f3f3' : '#23272f';
        var mobileSvg = langBtnMobile.querySelector('svg');
        if (mobileSvg) {
            mobileSvg.style.color = dark ? '#f3f3f3' : '#23272f';
            mobileSvg.style.stroke = dark ? '#f3f3f3' : '#23272f';
            mobileSvg.setAttribute('stroke', dark ? '#f3f3f3' : '#23272f');
        }
    }
    
    // Menús desplegables de idioma
    var langMenuDesktop = document.getElementById('dropdownLangMenu');
    var langMenuMobile = document.getElementById('dropdownLangMenuMobile');
    if (langMenuDesktop) {
        langMenuDesktop.style.background = dark ? '#23272f' : '#fff';
        langMenuDesktop.style.borderColor = dark ? '#444' : 'rgba(0, 0, 0, 0.05)';
        var desktopMenuItems = langMenuDesktop.querySelectorAll('button');
        desktopMenuItems.forEach(function(item){
            item.style.color = dark ? '#f3f3f3' : '#374151';
            item.style.background = dark ? '#23272f' : 'transparent';
        });
    }
    if (langMenuMobile) {
        langMenuMobile.style.background = dark ? '#23272f' : '#fff';
        langMenuMobile.style.borderColor = dark ? '#444' : 'rgba(0, 0, 0, 0.05)';
        var mobileMenuItems = langMenuMobile.querySelectorAll('button');
        mobileMenuItems.forEach(function(item){
            item.style.color = dark ? '#f3f3f3' : '#374151';
            item.style.background = dark ? '#23272f' : 'transparent';
        });
    }
    var inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(function(el){
        el.style.background = unifiedBg;
        el.style.color = dark ? '#fff' : '';
        el.style.borderColor = dark ? '#444' : '';
    });
    var labels = document.querySelectorAll('form label, form .text-gray-900');
    labels.forEach(function(label){
        label.style.color = dark ? '#fff' : '';
    });
    var heading = document.querySelector('main h2');
    if(heading) heading.style.color = dark ? '#fff' : '';
    var allSvgs = document.querySelectorAll('svg');
    allSvgs.forEach(function(svg){
        if (dark) {
            svg.style.strokeWidth = '0.3';
        } else {
            svg.style.strokeWidth = '';
        }
    });
    var headerLogo = document.querySelector('header img[alt="Logo"]');
    if(headerLogo) {
        headerLogo.style.filter = dark ? 'invert(1)' : '';
    }
    var main = document.querySelector('main');
    if(main) main.style.background = unifiedBg;

    var productPanels = document.querySelectorAll('.bg-gray-100.rounded-xl');
    productPanels.forEach(function(panel){
        panel.style.background = dark ? '#18181b' : '#f3f4f6'; // gris oscuro en modo oscuro
        panel.style.color = dark ? '#f3f3f3' : '#23272f';
    });

    var productTexts = document.querySelectorAll('.bg-gray-100.rounded-xl .text-gray-900, .bg-gray-100.rounded-xl .text-gray-700, .bg-gray-100.rounded-xl .text-gray-600');
    productTexts.forEach(function(text){
        text.style.color = dark ? '#f3f3f3' : '#23272f';
    });

    var mainTitle = document.querySelector('.darkmode-main-title');
    if(mainTitle) mainTitle.style.color = dark ? '#f3f3f3' : '#23272f';
    var mainOpiniones = document.querySelector('.darkmode-main-opiniones');
    if(mainOpiniones) mainOpiniones.style.color = dark ? '#bdbdbd' : '#6b7280';
    var mainList = document.querySelector('.darkmode-main-list');
    if(mainList) mainList.style.color = dark ? '#f3f3f3' : '#374151';
    var mainListItems = document.querySelectorAll('.darkmode-main-listitem');
    mainListItems.forEach(function(item){
        item.style.color = dark ? '#f3f3f3' : '#374151';
    });
    var mainStrong = document.querySelectorAll('.darkmode-main-strong');
    mainStrong.forEach(function(strong){
        strong.style.color = dark ? '#fff' : '#23272f';
    });

    var descSection = document.querySelector('section.darkmode-desc');
    if(descSection) descSection.style.background = dark ? '#18181b' : '#fff';
    var descTitle = document.querySelector('.darkmode-desc-title');
    if(descTitle) descTitle.style.color = dark ? '#f3f3f3' : '#23272f';
    var descList = document.querySelector('.darkmode-desc-list');
    if(descList) descList.style.color = dark ? '#f3f3f3' : '#23272f';
    var descItems = document.querySelectorAll('.darkmode-desc-item');
    descItems.forEach(function(item){
        item.style.color = dark ? '#f3f3f3' : '#23272f';
    });
    var descStrong = document.querySelectorAll('.darkmode-desc-strong');
    descStrong.forEach(function(strong){
        strong.style.color = dark ? '#fff' : '#23272f';
    });

    var mobileMenu = document.querySelector('nav.md\\:hidden');
    if(mobileMenu) {
        mobileMenu.style.background = dark ? '#23272f' : '';
        mobileMenu.style.color = dark ? '#fff' : '';
        var submenus = mobileMenu.querySelectorAll('div[max-h-0], div[max-h-40], div[max-h-32], div[max-h-40], div[max-h-32]');
        var submenuPanels = mobileMenu.querySelectorAll('div[style*="max-h"]');
        var submenuDivs = mobileMenu.querySelectorAll('div.bg-gray-50');
        var links = mobileMenu.querySelectorAll('a');
        submenuDivs.forEach(function(panel){
            panel.style.background = dark ? '#23272f' : '#f8fafc';
            panel.style.color = dark ? '#fff' : '#1a202c';
        });
        links.forEach(function(link){
            link.style.background = dark ? '#23272f' : '';
            link.style.color = dark ? '#fff' : '';
        });
    }
    var hamburgerIcon = document.querySelector('label[for="menu-toggle"]');
    if(hamburgerIcon) {
        var bars = hamburgerIcon.querySelectorAll('div');
        bars.forEach(function(bar){
            bar.style.background = dark ? '#fff' : '#1a202c';
        });
    }
    var footer = document.querySelector('footer');
    if(footer) footer.style.background = dark ? '#18181b' : '';
    if(footer) footer.style.color = dark ? '#f3f3f3' : '';
}
var observer = new MutationObserver(applyDarkModeStyles);
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
window.addEventListener('DOMContentLoaded', applyDarkModeStyles);
    window.addEventListener('DOMContentLoaded', updateDarkModeTab);
    var tabObserver = new MutationObserver(updateDarkModeTab);
    tabObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });