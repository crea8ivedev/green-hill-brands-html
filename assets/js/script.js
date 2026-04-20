// header 

document.addEventListener('DOMContentLoaded', function () {

    /* =============================================
       CONSTANTS
    ============================================= */
    const MOBILE_BREAKPOINT = 992;

    /* =============================================
       MOBILE MENU TOGGLE (hamburger)
    ============================================= */
    const header = document.querySelector('.main-header');
    const menuWrapper = document.querySelector('.mobile-menu-wrapper');

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-btn';
    hamburger.setAttribute('aria-label', 'Toggle Menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `

<svg class="icon-menu" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H20V2.25H0V0ZM0 7.875H20V10.125H0V7.875ZM0 15.75H20V18H0V15.75Z" fill="white"/>
</svg>

<svg class="icon-close" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none;">
<path d="M0 0H20V2.25H0V0ZM0 7.875H20V10.125H0V7.875ZM0 15.75H20V18H0V15.75Z" fill="white"/>
</svg>


    `;

    // Insert hamburger before searchbar-main
    const headerWrapper = document.querySelector('.header-wrapper');
    const searchbarMain = document.querySelector('.searchbar-main');
    headerWrapper.insertBefore(hamburger, searchbarMain);

    hamburger.addEventListener('click', function () {
        const isOpen = menuWrapper.classList.toggle('mobile-open');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.querySelector('.icon-menu').style.display = isOpen ? 'none' : 'block';
        hamburger.querySelector('.icon-close').style.display = isOpen ? 'block' : 'none';

        // Close search if open
        closeSearch();
    });

    /* =============================================
       SUBMENU: MOBILE ACCORDION
    ============================================= */
    const navItems = document.querySelectorAll('.mobile-nav ul > li');

    navItems.forEach(function (li) {
        const submenuWrapper = li.querySelector('.submenu-wrapper');
        if (!submenuWrapper) return;

        // accordion toggle is in HTML — just query it
        const accordionToggle = li.querySelector('.accordion-toggle');
        if (!accordionToggle) return;

        // -- Mobile accordion click --
accordionToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = li.classList.toggle('accordion-open');
    accordionToggle.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
        submenuWrapper.style.maxHeight = submenuWrapper.scrollHeight + 'px';
    } else {
        submenuWrapper.style.maxHeight = '0px';
    }

    // Close others
    navItems.forEach(function (otherLi) {
        if (otherLi !== li) {
            otherLi.classList.remove('accordion-open');

            const otherSubmenu = otherLi.querySelector('.submenu-wrapper');
            const otherToggle = otherLi.querySelector('.accordion-toggle');

            if (otherSubmenu) otherSubmenu.style.maxHeight = '0px';
            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
    });

    /* =============================================
       CLOSE MOBILE MENU ON RESIZE TO DESKTOP
    ============================================= */
    window.addEventListener('resize', function () {
        if (window.innerWidth >= MOBILE_BREAKPOINT) {
            menuWrapper.classList.remove('mobile-open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.querySelector('.icon-menu').style.display = 'block';
            hamburger.querySelector('.icon-close').style.display = 'none';

            // Reset all accordion states
            navItems.forEach(function (li) {
                li.classList.remove('accordion-open');
                const toggle = li.querySelector('.accordion-toggle');
                const submenu = li.querySelector('.submenu-wrapper');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
                if (submenu) submenu.style.maxHeight = '';
            });
        }
    });

    /* =============================================
       SEARCH TOGGLE
    ============================================= */
    const searchIconWrapper = document.querySelector('.searchbar-main');
    const searchBox = document.querySelector('.search-box');

    // Prevent clicks inside search-box from bubbling up to searchbar-main toggle
    searchBox.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    function openSearch() {
        searchBox.classList.add('search-open');
        searchIconWrapper.classList.add('active');
        setTimeout(() => searchBox.querySelector('.search-input').focus(), 100);

        // Close mobile menu if open
        menuWrapper.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelector('.icon-menu').style.display = 'block';
        hamburger.querySelector('.icon-close').style.display = 'none';
    }

    function closeSearch() {
        searchBox.classList.remove('search-open');
        searchIconWrapper.classList.remove('active');
    }

    searchIconWrapper.addEventListener('click', function () {
        if (searchBox.classList.contains('search-open')) {
            closeSearch();
        } else {
            openSearch();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSearch();
    });

    // Close when clicking outside search box
    document.addEventListener('click', function (e) {
        if (
            searchBox.classList.contains('search-open') &&
            !searchBox.contains(e.target) &&
            !searchIconWrapper.contains(e.target)
        ) {
            closeSearch();
        }
    });

});