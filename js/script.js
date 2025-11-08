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
  (function() {
    const canvas = document.getElementById('floatCanvas');
    const ctx = canvas.getContext('2d');
  
    let DPR = Math.max(1, window.devicePixelRatio || 1);
    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener('resize', () => {
      resize();
      initParticles(); // re-init for good layout
    });
  
    // Soft blur (CSS) gives dreamy look
    canvas.style.filter = 'blur(6px) saturate(1.05)';
    canvas.style.opacity = '0.95';
  
    // Particle blueprint
    const colors = [
      {a:'#ffd6d6', b:'#ff9aa2'},
      {a:'#d6e7ff', b:'#8fb3ff'},
      {a:'#fff1d6', b:'#ffd48f'},
      {a:'#e8fbe8', b:'#bfeec3'}
    ];
  
    let particles = [];
    const PARTICLE_COUNT = Math.max(6, Math.floor((canvas.clientWidth * canvas.clientHeight) / 120000)); // responsive count
  
    function rand(min, max){ return Math.random()*(max-min)+min; }
  
    function createParticle(i){
      const palette = colors[i % colors.length];
      const size = rand(160, 420) * (canvas.clientWidth / 1400); // scale by width
      const x = rand(-0.2*canvas.clientWidth, 1.2*canvas.clientWidth);
      const y = rand(-0.2*canvas.clientHeight, 1.2*canvas.clientHeight);
      const speed = rand(0.02, 0.12);
      const drift = rand(-0.05, 0.05);
      const angle = rand(0, Math.PI*2);
      return {x,y,size,speed,drift,angle, palette, t: rand(0,1000), sway: rand(20,120)};
    }
  
    function initParticles(){
      particles = [];
      for(let i=0;i<PARTICLE_COUNT;i++){
        particles.push(createParticle(i));
      }
    }
  
    function drawParticle(p){
      const grd = ctx.createLinearGradient(p.x - p.size*0.6, p.y - p.size*0.6, p.x + p.size*0.6, p.y + p.size*0.6);
      grd.addColorStop(0, p.palette.a);
      grd.addColorStop(1, p.palette.b);
  
      // soft shape via multiple layered circles to resemble organic blob
      ctx.globalCompositeOperation = 'lighter';
      for(let layer=0; layer<5; layer++){
        const alpha = 0.12 * (1 - layer*0.12);
        ctx.beginPath();
        const r = p.size * (1 - layer*0.12);
        ctx.fillStyle = grd;
        ctx.globalAlpha = alpha;
        ctx.ellipse(p.x + Math.sin((p.t+layer*15)/p.sway)* (p.size*0.02), p.y + Math.cos((p.t+layer*25)/p.sway)*(p.size*0.02), r, r*0.74, p.angle + layer*0.04, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
  
    function animate(now){
      ctx.clearRect(0,0,canvas.width, canvas.height);
  
      // subtle backdrop: very faint radial vignette
      const vw = canvas.clientWidth;
      const vh = canvas.clientHeight;
      const vignette = ctx.createRadialGradient(vw/2, vh/2, Math.min(vw,vh)*0.2, vw/2, vh/2, Math.max(vw,vh));
      vignette.addColorStop(0, 'rgba(255,255,255,0)');
      vignette.addColorStop(1, 'rgba(240,240,245,0.04)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0,0,vw,vh);
  
      // move & draw each particle
      particles.forEach((p, idx) => {
        p.t += p.speed * 6;
        // slow drifting motion with gentle sinusoidal sway
        p.x += Math.sin(p.t/p.sway) * (p.drift + 0.12*p.speed);
        p.y += Math.cos(p.t/(p.sway*0.9)) * (0.03 + 0.05*p.speed) - 0.02*p.speed;
        p.angle += 0.0008;
  
        // wrap around edges gently
        if(p.x < -p.size) p.x = canvas.clientWidth + p.size;
        if(p.x > canvas.clientWidth + p.size) p.x = -p.size;
        if(p.y < -p.size) p.y = canvas.clientHeight + p.size;
        if(p.y > canvas.clientHeight + p.size) p.y = -p.size;
  
        drawParticle(p);
      });
  
      // draw a soft focused layer of subtle shapes near center (higher z)
      // (We draw again with less blur by temporarily reducing canvas filter)
      requestAnimationFrame(animate);
    }
  
    // init & run
    initParticles();
    requestAnimationFrame(animate);
  
    // On visibility change, pause animation for battery savings
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // stop ticking by emptying particles (cheap)
        // (we'll re-init on focus)
      } else {
        initParticles();
      }
    });
  })();