(function ($) {

  "use strict";

  // ------------------------------------------------------------------------------ //
  // Overlay Menu Navigation
  // ------------------------------------------------------------------------------ //
  var overlayMenu = function () {

    if (!$('.nav-overlay').length) {
      return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
    };
    init();
  }


  // Portfolio Slider
  var portfolioSwiper = new Swiper(".portfolio-Swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: false,
    loop: true,
    breakpoints: {
      300: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Animate Portfolio Button
  var animatePortfolioBtn = document.getElementById('animate-portfolio');
  if (animatePortfolioBtn) {
    animatePortfolioBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (portfolioSwiper.autoplay.running) {
        // Stop autoplay
        portfolioSwiper.autoplay.stop();
        this.textContent = 'Animate Them!';
      } else {
        // Start autoplay with 3 second delay, endless loop
        portfolioSwiper.params.autoplay = {
          delay: 3000,
          disableOnInteraction: false,
        };
        portfolioSwiper.params.loop = true;
        portfolioSwiper.update();
        portfolioSwiper.autoplay.start();
        this.textContent = 'Stop Animation';
      }
    });
  }

  // Animate Texts
  var initTextFx = function () {
    $('.txt-fx').each(function () {
      var newstr = '';
      var count = 0;
      var delay = 100;
      var stagger = 10;
      var words = this.textContent.split(/\s/);
      var arrWords = new Array();
      
      $.each( words, function( key, value ) {
        newstr = '<span class="word">';

        for ( var i = 0, l = value.length; i < l; i++ ) {
          newstr += "<span class='letter' style='transition-delay:"+ ( delay + stagger * count ) +"ms;'>"+ value[ i ] +"</span>";
          count++;
        }
        newstr += '</span>';

        arrWords.push(newstr);
        count++;
      });

      this.innerHTML = arrWords.join("<span class='letter' style='transition-delay:"+ delay +"ms;'>&nbsp;</span>");
    });
  }

  // init Isotope
  var initIsotope = function() {
    
    $('.grid').each(function(){

      // $('.grid').imagesLoaded( function() {
        // images have loaded
        var $buttonGroup = $( '.button-group' );
        var $checked = $buttonGroup.find('.is-checked');
        var filterValue = $checked.attr('data-filter');
  
        var $grid = $('.grid').isotope({
          itemSelector: '.portfolio-item',
          // layoutMode: 'fitRows',
          filter: filterValue
        });
    
        // bind filter button click
        $('.button-group').on( 'click', 'a', function(e) {
          e.preventDefault();
          filterValue = $( this ).attr('data-filter');
          $grid.isotope({ filter: filterValue });
        });
    
        // change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
          $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      // });

    });
  }

  // init Chocolat light box
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  // Function to play iPhone-like notification sound
  function playTingSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create two oscillators for a richer, bell-like sound (like iPhone notifications)
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Connect both oscillators to the gain node
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // iPhone notification-like frequencies (bell/chime sound)
      osc1.frequency.value = 523.25; // C5 note
      osc2.frequency.value = 659.25; // E5 note
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      
      // iPhone-like envelope: quick attack, smooth decay
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01); // Quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.1); // First decay
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4); // Final decay
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } catch (e) {
      // Fallback if Web Audio API is not supported
      console.log('Audio not supported');
    }
  }

  // Theme Toggle Functionality
  var initThemeToggle = function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    const profileImage = document.getElementById('profile-image');
    const body = document.body;

    // Function to update profile image based on theme
    function updateProfileImage(isDark) {
      if (profileImage) {
        if (isDark) {
          profileImage.src = 'images/dirhamdark.png';
        } else {
          profileImage.src = 'images/dirhamlight.png';
        }
      }
    }

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    if (currentTheme === 'dark') {
      body.setAttribute('data-bs-theme', 'dark');
      updateThemeIcon(true);
      updateProfileImage(true);
    } else {
      body.removeAttribute('data-bs-theme');
      updateThemeIcon(false);
      updateProfileImage(false);
    }

    // Theme toggle button click handler
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        // Play "ting" sound
        playTingSound();
        
        const isDark = body.getAttribute('data-bs-theme') === 'dark';
        
        if (isDark) {
          // Switch to light theme
          body.removeAttribute('data-bs-theme');
          localStorage.setItem('theme', 'light');
          updateThemeIcon(false);
          updateProfileImage(false);
        } else {
          // Switch to dark theme
          body.setAttribute('data-bs-theme', 'dark');
          localStorage.setItem('theme', 'dark');
          updateThemeIcon(true);
          updateProfileImage(true);
        }
      });
    }

    function updateThemeIcon(isDark) {
      if (themeIcon && themeText) {
        if (isDark) {
          // Show sun icon for light mode (to switch back)
          themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
          themeText.textContent = 'Light Mode';
        } else {
          // Show moon icon for dark mode
          themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
          themeText.textContent = 'Dark Mode';
        }
      }
    }
  };

  $(document).ready(function () {

    overlayMenu();
    initTextFx();
    initChocolat();
    initThemeToggle();

    // mobile menu
    $('.menu-btn').click(function(e){
      e.preventDefault();
      $('body').toggleClass('nav-active');
    });

    AOS.init({
      duration: 1200,
      // once: true,
    })

  });


  // window load
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  })


})(jQuery);