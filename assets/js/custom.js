document.addEventListener("DOMContentLoaded", () => {
  // Get all summary elements
  const summaries = document.querySelectorAll(".accordion__quesion");
  // Add click event listener to each summary
  summaries.forEach((summary) => {
    summary.addEventListener("click", function (e) {
      // Prevent the default toggle behavior
      e.preventDefault();

      // Get the details element that contains this summary
      const currentDetails = this.parentElement;

      // Find the closest section parent
      const parentSection = currentDetails.closest("section");

      if (parentSection) {
        // Find all details elements within this section
        const allDetails = parentSection.querySelectorAll(
          "details.accordion__item"
        );

        // Close all other details elements in this section
        allDetails.forEach((details) => {
          if (details !== currentDetails) {
            details.removeAttribute("open");
          }
        });

        // Toggle the current details element
        if (currentDetails.hasAttribute("open")) {
          currentDetails.removeAttribute("open");
        } else {
          currentDetails.setAttribute("open", "");
        }
      }
    });
  });


});

window.addEventListener("load", function () {

  // Initialize Swiper for testimonials
  if (document.querySelector('.lp-testmonial-swiper')) {
    const testimonialSwiper = new Swiper('.lp-testmonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 14,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: '.lp-testmonial__nav--next',
        prevEl: '.lp-testmonial__nav--prev',
      },
      breakpoints: {
        // Mobile
        320: {
          slidesPerView: 1.2,
          spaceBetween: 14,
        },
        // Tablet
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // Desktop
        1024: {
          slidesPerView: 3,
          spaceBetween: 29,
        },
      },
    });
  }

  // Initialize Swiper for Results Slider
  if (document.querySelector('.lp-results-swiper')) {
    const resultsSwiper = new Swiper('.lp-results-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      centeredSlides: true,
      loop: true,
      // Default to disabled autoplay
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        enabled: false, 
      },
      navigation: {
        nextEl: '.lp-results-nav--next',
        prevEl: '.lp-results-nav--prev',
      },
      breakpoints: {
        // Mobile
        320: {
            slidesPerView: 'auto',
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: {
              enabled: false
            },
        },
        // Tablet
        768: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true,
            autoplay: {
              enabled: false
            },
        },
        // Desktop
        1200: {
            slidesPerView: 'auto',
            spaceBetween: 24,
            centeredSlides: false,
            speed: 4000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                enabled: true, // Enable only on desktop
            },
        }
      }
    });

    // Clean up or restart autoplay on resize to avoid stuck states
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if(resultsSwiper && !resultsSwiper.destroyed) {
          resultsSwiper.update(); 
          
          // Force autoplay check based on width
          if (window.innerWidth >= 1200) {
            resultsSwiper.params.speed = 4000;
            resultsSwiper.params.autoplay.delay = 0;
            resultsSwiper.params.autoplay.enabled = true;
            resultsSwiper.autoplay.start();
            // Ensure wrapper has linear transition for ticker effect
            const wrapper = resultsSwiper.wrapperEl;
            if(wrapper) wrapper.style.transitionTimingFunction = 'linear';
          } else {
             resultsSwiper.params.speed = 300; // Reset to normal speed
             resultsSwiper.params.autoplay.enabled = false;
             resultsSwiper.autoplay.stop();
             // Reset transition timing
             const wrapper = resultsSwiper.wrapperEl;
             if(wrapper) wrapper.style.transitionTimingFunction = 'ease';
          }
        }
      }, 200);
    });
  }

  // Vimeo video player functionality
  document.querySelectorAll(".lp-custom-vimeo")?.forEach(function (videoCard) {
    videoCard.addEventListener("click", function () {
      // If already playing, don't recreate the iframe
      if (videoCard.classList.contains("active")) return;
      
      // Close all other videos
      document.querySelectorAll(".lp-custom-vimeo").forEach(function (card) {
        card.classList.remove("active");
        const wrapper = card.querySelector(".lp-custom-vimeo__iframe-wrp");
        if (wrapper) {
          wrapper.innerHTML = "";
        }
      });

      // Get video ID and create iframe
      const vimeoId = this.getAttribute("data-vimeo-id");
      const iframe = document.createElement("iframe");
      const iframeWrapper = videoCard.querySelector(".lp-custom-vimeo__iframe-wrp");
      
      if (!vimeoId || !iframeWrapper) return;

      // Set iframe attributes
      iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.allowFullscreen = true;

      // Add iframe to wrapper and mark as active
      iframeWrapper.innerHTML = "";
      iframeWrapper.appendChild(iframe);
      videoCard.classList.add("active");
    });
  });

  // YouTube video player functionality
  document.querySelectorAll(".lp-custom-youtube")?.forEach(function (videoCard) {
    videoCard.addEventListener("click", function () {
      // If already playing, don't recreate the iframe
      if (videoCard.classList.contains("active")) return;
      
      // Close all other videos
      document.querySelectorAll(".lp-custom-youtube").forEach(function (card) {
        card.classList.remove("active");
        const wrapper = card.querySelector(".lp-custom-youtube__iframe-wrp");
        if (wrapper) {
          wrapper.innerHTML = "";
        }
      });

      // Get video ID and create iframe
      const youtubeId = this.getAttribute("data-youtube-id");
      const iframe = document.createElement("iframe");
      const iframeWrapper = videoCard.querySelector(".lp-custom-youtube__iframe-wrp");
      
      if (!youtubeId || !iframeWrapper) return;

      // Set iframe attributes
      iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.allowFullscreen = true;

      // Add iframe to wrapper and mark as active
      iframeWrapper.innerHTML = "";
      iframeWrapper.appendChild(iframe);
      videoCard.classList.add("active");
    });
  });
});
