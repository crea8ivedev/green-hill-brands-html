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

/* =============================================
   STICKY HEADER ON SCROLL
============================================= */
const stickyHeader = document.querySelector('.header');
const headerHeight = stickyHeader.offsetHeight;

// Add transition style for smooth effect
stickyHeader.style.transition = 'background 0.3s ease, box-shadow 0.3s ease, top 0.3s ease';

window.addEventListener('scroll', function () {
    if (window.scrollY > headerHeight) {
        stickyHeader.classList.add('header-sticky');
    } else {
        stickyHeader.classList.remove('header-sticky');
    }
});



// hero banner video 

document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth < 992;

    // Select the active video wrapper based on viewport
    const videoWrapper = isMobile
        ? document.querySelector(".mobile-video-bg .video")
        : document.querySelector(".zigzag-right .video");

    if (!videoWrapper) return;

    const video = videoWrapper.querySelector(".hero-video");
    const btn = videoWrapper.querySelector(".video-control");
    const playIcon = btn.querySelector(".play-icon");
    const pauseIcon = btn.querySelector(".pause-icon");

    // Autoplay on mobile (muted is already set on the element)
    if (isMobile) {
        video.play().then(() => {
            videoWrapper.classList.add("playing");
            // Keep both icons hidden while autoplaying — no button needed
            playIcon.classList.add("hidden");
            pauseIcon.classList.add("hidden");
        }).catch(() => {
            // Autoplay blocked — show play button as fallback
            playIcon.classList.remove("hidden");
        });
    }

    btn.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            videoWrapper.classList.add("playing");
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");
        } else {
            video.pause();
            videoWrapper.classList.remove("playing");
            playIcon.classList.remove("hidden");
            pauseIcon.classList.add("hidden");
        }
    });
});

// banner slider


(function () {

    // Desktop: 2x2 grid slides — fade + autoplay
    const desktopSwiper = new Swiper('.hero-swiper-desktop', {
        loop: true,
        slidesPerView: 1,
        observer: true,           
        observeParents: true,     
        resizeObserver: true,    
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 700,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: '.hero-swiper-pagination',
            clickable: true,
        },
        on: {
            afterInit: function (swiper) {
                // Force recalculate after layout settles
                setTimeout(() => swiper.update(), 300);
            },
        },
    });

    // Mobile: full-bleed background slider
    const mobileSwiper = new Swiper('.hero-swiper-mobile', {
        loop: true,
        observer: true,
        observeParents: true,
        resizeObserver: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 700,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: '.hero-swiper-mobile-pagination',
            clickable: true,
        },
    });

    // Sync both swipers to the same slide index (optional but nice UX)
    desktopSwiper.on('slideChange', function () {
        if (mobileSwiper && mobileSwiper.slideTo) {
            mobileSwiper.slideTo(desktopSwiper.realIndex + 1);
        }
    });

})();
