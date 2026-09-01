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

  var contactForm = document.getElementById("contact-form");
  var formModal = document.getElementById("form-sent-modal");
  if (contactForm && formModal) {
    var modalTitle = formModal.querySelector("#form-sent-title");
    var modalMessage = formModal.querySelector("#form-sent-message");
    var modalIcon = formModal.querySelector(".form-modal-icon-mark");
    var lastFocus = null;

    function openFormModal(isError, message) {
      lastFocus = document.activeElement;
      if (modalTitle) {
        modalTitle.textContent = isError ? "Could Not Send Request" : "Booking Request Sent";
      }
      if (modalMessage) {
        modalMessage.textContent = message || (isError
          ? "Sorry, we could not send your request. Please try again."
          : "Thank you — your booking request has been sent. We will be in touch soon.");
      }
      if (modalIcon) {
        modalIcon.className = isError
          ? "fa-solid fa-circle-exclamation form-modal-icon-mark"
          : "fa-solid fa-check form-modal-icon-mark";
      }
      formModal.classList.toggle("is-error", !!isError);
      formModal.hidden = false;
      document.body.classList.add("modal-open");
      var closeBtn = formModal.querySelector(".form-modal-close");
      if (closeBtn) closeBtn.focus();
    }

    function closeFormModal() {
      formModal.hidden = true;
      formModal.classList.remove("is-error");
      document.body.classList.remove("modal-open");
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    }

    contactForm.addEventListener("cwd-contact:success", function (event) {
      var message = (event.detail && event.detail.message)
        ? event.detail.message.replace("your message", "your booking request")
        : "Thank you — your booking request has been sent. We will be in touch soon.";
      openFormModal(false, message);
    });

    contactForm.addEventListener("cwd-contact:error", function (event) {
      var message = (event.detail && event.detail.message) || "Sorry, we could not send your request. Please try again.";
      openFormModal(true, message);
    });

    formModal.querySelectorAll("[data-form-modal-close]").forEach(function (el) {
      el.addEventListener("click", closeFormModal);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !formModal.hidden) {
        closeFormModal();
      }
    });
  }
})();
