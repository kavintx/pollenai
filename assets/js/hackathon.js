/* Pollen Applied AI Hackathon — page motion, counters, rail progress and forms.
   Forms open a pre-filled email draft to sponsors@usepollen.ai; no backend. */
(function () {
  "use strict";

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Scroll progress + 48-hour rail ---------- */
  var bar = $(".hk-progress span");
  var rail = $(".hk-rail");
  var stops = $$(".hk-stop");
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? clamp(y / max).toFixed(4) : 0) + ")";
    if (rail) {
      var r = rail.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = reduce ? 1 : clamp((vh * 0.84 - r.top) / (r.height + vh * 0.35));
      rail.style.setProperty("--rail", p.toFixed(3));
      stops.forEach(function (stop) {
        var b = stop.getBoundingClientRect();
        stop.classList.toggle("is-lit", reduce || b.top < vh * 0.74);
      });
    }
  }
  function kick() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", kick);
  onScroll();

  /* ---------- Cursor glow on hero ---------- */
  var hero = $(".hk-hero");
  if (hero && !reduce && window.matchMedia && matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (e.clientX - r.left).toFixed(0) + "px");
      hero.style.setProperty("--my", (e.clientY - r.top).toFixed(0) + "px");
    });
  }

  /* ---------- Event pass tilt ---------- */
  var stage = $(".hk-stage");
  var pass = $(".hk-pass");
  if (stage && pass && !reduce && window.matchMedia && matchMedia("(pointer: fine)").matches) {
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      pass.style.transform = "rotateX(" + (-y * 7).toFixed(2) + "deg) rotateY(" + (x * 9).toFixed(2) + "deg) translateY(-3px)";
    });
    stage.addEventListener("pointerleave", function () { pass.style.transform = ""; });
  }

  /* ---------- Number count-up ---------- */
  function fmt(n, dec) {
    return dec ? n.toFixed(dec) : Math.round(n).toLocaleString("en-US");
  }
  function count(el) {
    var target = parseFloat(el.getAttribute("data-num"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    if (isNaN(target)) return;
    if (reduce) { el.textContent = fmt(target, dec); return; }
    var start = performance.now();
    var dur = 1500;
    function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * ease, dec);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target, dec);
    }
    requestAnimationFrame(tick);
  }
  var numbers = $$("[data-num]");
  if ("IntersectionObserver" in window && numbers.length) {
    var nums = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        nums.unobserve(entry.target);
        count(entry.target);
      });
    }, { threshold: 0.55 });
    numbers.forEach(function (el) { nums.observe(el); });
  }

  /* ---------- Tier / judge links prefill the inquiry select ---------- */
  $$("[data-inquire]").forEach(function (link) {
    link.addEventListener("click", function () {
      var select = $('#inquiry-form select[name="inquiry_type"]');
      if (select) {
        select.value = link.getAttribute("data-inquire");
        select.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });

  /* ---------- Form helpers ---------- */
  function val(form, name) {
    var el = form.elements[name];
    return el && typeof el.value === "string" ? el.value.trim() : "";
  }
  function showError(form, msg) {
    var box = $(".form__error", form);
    if (!box) return;
    box.textContent = msg || "";
    box.hidden = !msg;
    if (msg) {
      var first = $(".input", form);
      if (first) first.focus({ preventScroll: false });
    }
  }
  function mailto(subject, lines) {
    return "mailto:sponsors@usepollen.ai?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
  }
  function draftPanel(form, title, copy, href) {
    var box = document.createElement("div");
    box.className = "hk-sent";
    box.setAttribute("role", "status");
    box.setAttribute("tabindex", "-1");

    var icon = document.createElement("span");
    icon.className = "hk-sent__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 10.4l3 3L15 6.6" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var h = document.createElement("h3");
    h.textContent = title;
    var p = document.createElement("p");
    p.textContent = copy;

    var actions = document.createElement("div");
    actions.className = "hk-sent__actions";
    var a = document.createElement("a");
    a.className = "pill pill--black";
    a.href = href;
    a.textContent = "Open email draft";
    var again = document.createElement("button");
    again.type = "button";
    again.className = "pill glass";
    again.textContent = "Back to form";
    actions.appendChild(a);
    actions.appendChild(again);

    var mail = document.createElement("p");
    mail.className = "hk-sent__mail";
    mail.innerHTML = 'Or email <a href="mailto:sponsors@usepollen.ai">sponsors@usepollen.ai</a> directly.';

    box.appendChild(icon);
    box.appendChild(h);
    box.appendChild(p);
    box.appendChild(actions);
    box.appendChild(mail);

    var original = form.cloneNode(true);
    form.replaceWith(box);
    box.focus();
    again.addEventListener("click", function () {
      box.replaceWith(original);
      var first = $(".input", original);
      if (first) first.focus();
      bind(original);
    });
  }
  function bind(form) {
    form.addEventListener("input", function () { showError(form, ""); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (val(form, "website")) return;

      if (form.getAttribute("data-form") === "hackathon-inquiry") {
        var name = val(form, "name"), company = val(form, "company"), email = val(form, "email").toLowerCase();
        var type = val(form, "inquiry_type"), message = val(form, "message");
        if (!name) return showError(form, "Add your name so we know who we're talking to.");
        if (!company) return showError(form, "Add your company, university or club.");
        if (!EMAIL.test(email) || email.length > 254) return showError(form, "Enter a valid email so we can reply.");
        if (!type) return showError(form, "Choose an inquiry type.");
        if (message.length < 10) return showError(form, "Tell us a little more about what you have in mind.");
        var href = mailto("Hackathon " + type + " inquiry — " + company, [
          "Name: " + name,
          "Company / University Club: " + company,
          "Email: " + email,
          "Inquiry type: " + type,
          "",
          message,
          "",
          "Sent from hackathon.usepollen.ai"
        ]);
        draftPanel(form, "Your draft is ready.", "Send it from your email app and it lands with the Pollen team at sponsors@usepollen.ai.", href);
        return;
      }

      var wname = val(form, "name"), wemail = val(form, "email").toLowerCase();
      var age = val(form, "age_group"), handle = val(form, "handle");
      if (!wname) return showError(form, "Add your name so we know who you are.");
      if (!EMAIL.test(wemail) || wemail.length > 254) return showError(form, "Enter a valid email to join the waitlist.");
      if (!age) return showError(form, "Choose your age group.");
      var lines = [
        "Name: " + wname,
        "Email: " + wemail,
        "Age group: " + age,
        "GitHub or X: " + (handle || "Not provided"),
        "",
        "I'd like to join the builder waitlist for The Pollen Applied AI Hackathon.",
        ""
      ];
      if (age === "Under 18") lines.push("I understand a parent or guardian must sign the consent waiver before check-in.", "");
      lines.push("Sent from hackathon.usepollen.ai");
      var wHref = mailto("Hacker waitlist — " + wname + " (" + age + ")", lines);
      draftPanel(form, "Your spot is drafted.", "Send the email and the Pollen team has your details for the builder waitlist.", wHref);
    });
  }
  $$('form[data-form="hackathon-inquiry"], form[data-form="hackathon-waitlist"]').forEach(bind);

  /* ---------- In-page buttons ----------
     Scroll directly instead of relying on the shared smooth-wheel rAF loop, which
     is paused when the page is hidden (e.g. inside a preview panel). */
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href === "#" || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      if (history.pushState) history.pushState(null, "", href);
      el.scrollIntoView({ behavior: document.hidden ? "auto" : "smooth", block: "start" });
    });
  });
})();
