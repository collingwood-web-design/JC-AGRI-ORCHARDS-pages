(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  document.querySelectorAll(".has-sub > a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (window.matchMedia("(max-width: 980px)").matches) {
        event.preventDefault();
        link.parentElement.classList.toggle("is-open");
      }
    });
  });

  var copy = document.getElementById("copy-date");
  if (copy) {
    copy.textContent = new Date().toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  var spins = document.querySelectorAll(".js-spin");
  if (spins.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ticking = false;
    function spinOnScroll() {
      var rot = window.scrollY * 0.07;
      spins.forEach(function (el) {
        el.style.transform = "rotate(" + rot + "deg)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(spinOnScroll);
        ticking = true;
      }
    }, { passive: true });
    spinOnScroll();
  }
  var contentToggles = document.querySelectorAll(".toggle-trigger");
  contentToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".toggle");
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
})();
