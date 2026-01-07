
var tabToggle = document.getElementById('tab-toggle');
if (tabToggle) {
    tabToggle.onclick = function() {
        document.body.classList.toggle('dark');
        updateDarkModeTab();
    };
}

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

    var descTexts = document.querySelectorAll('section p.text-lg');
    descTexts.forEach(function(text){
        text.style.color = dark ? '#f3f3f3' : '#23272f';
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