// anoucement slider

const announcementSwiper = new Swiper('.announcement-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        allowTouchMove: false,
    });


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
    const navItems = document.querySelectorAll('.mobile-nav ul > li.menu-item-has-children');

    navItems.forEach(function (li) {
        const submenu = li.querySelector('.submenu-wrapper');
        if (!submenu) return;

        const parentLink = li.querySelector(':scope > a');
        if (!parentLink) return;

        // Initialise closed
        submenu.style.maxHeight = '0px';
        submenu.style.overflow = 'hidden';

        parentLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = li.classList.toggle('accordion-open');
            parentLink.setAttribute('aria-expanded', isOpen);
            submenu.style.maxHeight = isOpen ? submenu.scrollHeight + 'px' : '0px';

            // Close other open items
            navItems.forEach(function (otherLi) {
                if (otherLi !== li) {
                    otherLi.classList.remove('accordion-open');
                    const otherLink = otherLi.querySelector(':scope > a');
                    const otherSubmenu = otherLi.querySelector('.submenu-wrapper');
                    if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
                    if (otherSubmenu) otherSubmenu.style.maxHeight = '0px';
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
                const link = li.querySelector(':scope > a');
                const submenu = li.querySelector('.submenu-wrapper');
                if (link) link.setAttribute('aria-expanded', 'false');
                if (submenu) submenu.style.maxHeight = '';
            });
        }
    });

    /* =============================================
       SEARCH TOGGLE
    ============================================= */
    const searchIconWrapper = document.querySelector('.searchbar-main');
    const searchBox = document.querySelector('.search-box');

    searchBox.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    function openSearch() {
        searchBox.classList.add('search-open');
        searchIconWrapper.classList.add('active');
        setTimeout(() => searchBox.querySelector('.search-input').focus(), 100);

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

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSearch();
    });

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


//    STICKY HEADER ON SCROLL

const stickyHeader = document.querySelector('.header');
const headerHeight = stickyHeader.offsetHeight;

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

    if (isMobile) {
        video.play().then(() => {
            videoWrapper.classList.add("playing");
            playIcon.classList.add("hidden");
            pauseIcon.classList.add("hidden");
        }).catch(() => {
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

    const desktopSwiper = new Swiper('.hero-swiper-desktop', {
        loop: true,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        resizeObserver: true,
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false,
        // },
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
                setTimeout(() => swiper.update(), 300);
            },
        },
    });

    const mobileSwiper = new Swiper('.hero-swiper-mobile', {
        loop: true,
        observer: true,
        observeParents: true,
        resizeObserver: true,
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false,
        // },
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

    desktopSwiper.on('slideChange', function () {
        if (mobileSwiper && mobileSwiper.slideTo) {
            mobileSwiper.slideTo(desktopSwiper.realIndex + 1);
        }
    });

})();


// what we do FAQ

document.querySelectorAll('.faq-inner').forEach(function (item, index) {
    var heading = item.querySelector('.faq-heading');
    var content = item.querySelector('.faq-content');
    var arrow = item.querySelector('.down-aerrow');

    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.35s ease';
    arrow.style.transition = 'transform 0.35s ease';
    heading.style.cursor = 'pointer';

    if (index === 0) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        arrow.style.transform = 'rotate(180deg)';
    } else {
        content.style.maxHeight = '0';
        arrow.style.transform = 'rotate(0deg)';
    }

    heading.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-inner').forEach(function (el) {
            el.classList.remove('active');
            var c = el.querySelector('.faq-content');
            var a = el.querySelector('.down-aerrow');
            c.style.maxHeight = '0';
            a.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
            item.classList.add('active');
            content.style.maxHeight = 'none';
            var fullHeight = content.scrollHeight;
            content.style.maxHeight = '0';
            content.offsetHeight;
            content.style.maxHeight = fullHeight + 'px';
            arrow.style.transform = 'rotate(180deg)';
        }
    });
});


// card slider

document.addEventListener('DOMContentLoaded', function () {
    const sliderEl = document.querySelector('.cards-slider');
    if (!sliderEl) return;

    const slideCount = sliderEl.querySelectorAll('.swiper-slide').length;
    const enableOnDesktop = slideCount >= 5;

    const cardsSwiper = new Swiper('.cards-slider', {
        slidesPerView: 1.3,
        spaceBetween: 28,
        centeredSlides: true, 
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 16,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1365: {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: false,
                enabled: enableOnDesktop,
            },
        },
    });
});

// partner slider
document.addEventListener('DOMContentLoaded', function () {
    const sliderEl = document.querySelector('.partner-slider');
    if (!sliderEl) return;

    const slideCount = sliderEl.querySelectorAll('.swiper-slide').length;
    const enableOnDesktop = slideCount >= 5;

    const cardsSwiper = new Swiper('.partner-slider', {
        slidesPerView: 1.3,
        spaceBetween: 28,
        centeredSlides: true, 
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 16,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1365: {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: false,
                enabled: enableOnDesktop,
            },
        },
    });
});

// why partner slider
document.addEventListener('DOMContentLoaded', function () {
    const sliderEl = document.querySelector('.why-partner-slider');
    if (!sliderEl) return;

    const slideCount = sliderEl.querySelectorAll('.swiper-slide').length;
    const enableOnDesktop = slideCount >= 4;

    const cardsSwiper = new Swiper('.why-partner-slider', {
        slidesPerView: 1.3,
        spaceBetween: 28,
        centeredSlides: true, 
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 16,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1365: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
                enabled: enableOnDesktop,
            },
        },
    });
});

// opportunities slider
document.addEventListener('DOMContentLoaded', function () {
    const sliderEl = document.querySelector('.opportunities-slider');
    if (!sliderEl) return;

    const slideCount = sliderEl.querySelectorAll('.swiper-slide').length;
    const enableOnDesktop = slideCount >= 4;

    const cardsSwiper = new Swiper('.opportunities-slider', {
        slidesPerView: 1.3,
        spaceBetween: 28,
        centeredSlides: true, 
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 16,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1365: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
                enabled: enableOnDesktop,
            },
        },
    });
});

// blogs listing 

document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
    const trigger = dropdown.querySelector('[data-dropdown-trigger]');
    const menu    = dropdown.querySelector('[data-dropdown-menu]');
    const caret   = dropdown.querySelector('[data-dropdown-caret]');
    const label   = dropdown.querySelector('[data-dropdown-label]');
    const hidden  = document.getElementById('blog-category-filter');

    const close = () => {
      menu.classList.add('hidden');
      caret.classList.remove('rotate-180');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      menu.classList.remove('hidden');
      caret.classList.add('rotate-180');
      trigger.setAttribute('aria-expanded', 'true');
    };

    trigger.addEventListener('click', () => {
      menu.classList.contains('hidden') ? open() : close();
    });

    menu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        // visual selection
        menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('bg-[#FBE9D0]'));
        item.classList.add('bg-[#FBE9D0]');

        // update label + hidden value
        label.textContent = item.textContent.trim();
        label.classList.remove('italic', 'text-gray-500');
        label.classList.add('text-black');
        hidden.value = item.dataset.value;

        close();
        document.getElementById('categoryFilterForm').submit();
      });
    });

    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) close();
    });
  });