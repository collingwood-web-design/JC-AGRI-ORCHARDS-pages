(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("nav-open", open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (link.parentElement && link.parentElement.classList.contains("has-sub") &&
            window.matchMedia("(max-width: 980px)").matches) {
          return;
        }
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        document.body.classList.remove("nav-open");
      });
    });
  }

  document.querySelectorAll(".has-sub").forEach(function (item) {
    var link = item.querySelector(":scope > a");
    if (!link) return;
    link.setAttribute("aria-haspopup", "true");
    link.setAttribute("aria-expanded", "false");
    link.addEventListener("click", function (event) {
      if (window.matchMedia("(max-width: 980px)").matches) {
        event.preventDefault();
        var open = item.classList.toggle("is-open");
        link.setAttribute("aria-expanded", open ? "true" : "false");
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
  contentToggles.forEach(function (btn, index) {
    var item = btn.closest(".toggle");
    var panel = item ? item.querySelector(".toggle-panel") : null;
    var panelId = "toggle-panel-" + index;
    if (panel) {
      panel.id = panelId;
      btn.setAttribute("aria-controls", panelId);
    }
    btn.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
})();
