$(document).ready(function () {
    $(window).scroll(function () {
      //  sticky navbar on scroll script  //
      if (this.scrollY > 20) {
        $(".navbar").addClass("sticky");
      } else {
        $(".navbar").removeClass("sticky");
      }
  
      //  scroll-up button show/hide script  //
      if (this.scrollY > 500) {
        $(".scroll-up-btn").addClass("show");
      } else {
        $(".scroll-up-btn").removeClass("show");
      }
    });
  
    //  slide-up script  //
  
    $(".scroll-up-btn").click(function () {
      $("html").animate({ scrollTop: 0 });
      //  removing smooth scroll on slide-up button click  //
      $("html").css("scrollBehavior", "auto");
    });
  
    $(".navbar .menu li a").click(function () {
      //  Smooth scroll on Menu Items click  //
  
      $("html").css("scrollBehavior", "smooth");
    });
  
    //  Toggle Navbar  //
  
    $(".menu-btn").click(function () {
      $(".navbar .menu").toggleClass("active");
      $(".menu-btn i").toggleClass("active");
    });
  
    //  Typing Text Animation  //
  
    var typed = new Typed(".typing", {
      strings: [
        "Fullstack Developer",
        "Software Developer",
      ],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
    });
  
    var typed = new Typed(".typing-2", {
      strings: [
        "Fullstack Developer",
        "Software Developer",
      ],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
    });
  
    //  Owl Carousel  //
  
    $(".carousel").owlCarousel({
      margin: 20,
      loop: true,
      autoplay: true,
      autoplayTimeOut: 2000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 3,
          nav: false
        }
      }
    });
  });

  const EMAILJS_PUBLIC_KEY = "-Npo8WFJ8mSxp2BQD";
  const EMAILJS_SERVICE_ID = "service_hx2e9y1";   // e.g. service_xxxxxx
  const EMAILJS_TEMPLATE_ID = "template_ckudeve"; // e.g. template_abcd123

  // initialize EmailJS
  (function(){
    emailjs.init(EMAILJS_PUBLIC_KEY);
  })();

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const sendBtn = document.getElementById('sendBtn');

  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    // basic UI lock while sending
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    formMessage.textContent = '';

    // send the form — sendForm reads inputs by their name attribute
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
      .then((response) => {
        formMessage.style.color = 'green';
        formMessage.textContent = '✅ Message sent successfully!';
        contactForm.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        formMessage.style.color = 'red';
        formMessage.textContent = '❌ Failed to send message. Check console and EmailJS settings.';
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send message';
      });
  });