/* Pollen — usepollen.ai. Menu, scroll-reveal fallback, and the two Supabase forms.
   The publishable key below is meant to be public: the database only lets it INSERT
   into `waitlist` and `company_requests`, and nobody can read rows back with it. */
(function () {
  "use strict";

  var SUPABASE_URL = "https://qxuborteybmstlnylghk.supabase.co";
  var SUPABASE_KEY = "sb_publishable_Dv2NliTtSz99CLdKfmeJAw_Slroz89z";
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var WAITLIST_KEY = "pollen-waitlist-v3";

  /* ---------- Menu ---------- */
  var menu = document.getElementById("menu");
  var opener = document.querySelector("[data-menu-open]");
  function openMenu() {
    if (!menu) return;
    menu.hidden = false;
    menu.classList.add("is-open");
    document.body.classList.add("menu-open");
    if (opener) opener.setAttribute("aria-expanded", "true");
    var first = menu.querySelector("a, button");
    if (first) first.focus();
  }
  function closeMenu() {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (opener) { opener.setAttribute("aria-expanded", "false"); opener.focus(); }
  }
  if (opener) opener.addEventListener("click", openMenu);
  if (menu) {
    menu.addEventListener("click", function (e) {
      if (e.target.closest("[data-menu-close]") || e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Smooth wheel scrolling (mouse/trackpad on desktop) ----------
     A mouse wheel jumps ~100px per notch, which makes scroll-linked animations step.
     This eases the page toward where the wheel wants to go, so every effect glides. */
  var docEl = document.documentElement;
  if (window.matchMedia && matchMedia("(pointer: fine)").matches) {
    docEl.classList.add("smooth-wheel");
    var target = window.scrollY, current = window.scrollY, running = false, last = 0;
    var maxScroll = function () { return docEl.scrollHeight - window.innerHeight; };
    var step = function (now) {
      var dt = last ? Math.min(now - last, 64) : 16.67;
      last = now;
      current += (target - current) * (1 - Math.pow(1 - 0.13, dt / 16.67));
      if (Math.abs(target - current) < 0.5) { current = target; running = false; last = 0; }
      window.scrollTo(0, current);
      if (running) requestAnimationFrame(step);
    };
    var go = function (to) {
      if (!running) { current = window.scrollY; }
      target = Math.max(0, Math.min(maxScroll(), to));
      if (!running) { running = true; requestAnimationFrame(step); }
    };
    var innerScroller = function (el) {
      for (; el && el !== document.body && el !== docEl; el = el.parentElement) {
        if (el.scrollHeight > el.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(el).overflowY)) return true;
      }
      return false;
    };
    window.addEventListener("wheel", function (e) {
      if (e.ctrlKey || e.metaKey || document.body.classList.contains("menu-open")) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || innerScroller(e.target)) return;
      e.preventDefault();
      var d = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1);
      go((running ? target : window.scrollY) + d);
    }, { passive: false });
    // Keyboard, scrollbar drag or anything else moved the page: follow it.
    window.addEventListener("scroll", function () { if (!running) target = current = window.scrollY; }, { passive: true });
    // Same-page anchor links glide too.
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href*='#']");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var url = new URL(a.getAttribute("href"), location.href);
      if (url.pathname.replace(/\.html$/, "").replace(/\/index$/, "/") !== location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/") || !url.hash) return;
      var el = document.getElementById(url.hash.slice(1));
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      var margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      go(el.getBoundingClientRect().top + window.scrollY - margin);
    });
  }

  /* ---------- Scroll motion for browsers without CSS scroll timelines ----------
     Chrome/Edge run these effects natively in CSS. Safari (older) and Firefox get the
     same effects here, driven by one requestAnimationFrame loop on scroll. */
  var supportsTimeline = window.CSS && CSS.supports && CSS.supports("animation-timeline: view()");
  if (!supportsTimeline) {
    document.documentElement.classList.add("js-motion");
    var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
    var q = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
    var tracks = q(".ribbon__track"), bars = q(".progress span"), reveals = q(".reveal"),
        rises = q(".rise"), zooms = q(".zoom"), lifts = q(".lift"), nums = q(".steps li"), spins = q(".spin"), par = [[q(".p1"), -160], [q(".p2"), -280], [q(".p3"), 120]];
    var ticking = false;
    var frame = function () {
      ticking = false;
      var vh = window.innerHeight, y = window.scrollY;
      tracks.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var p = clamp((vh - r.top) / (vh + r.height));
        el.style.transform = "translate3d(" + (4 - 62 * p).toFixed(2) + "%,0,0)";
      });
      bars.forEach(function (el) {
        var r = el.parentNode.parentNode.parentNode.getBoundingClientRect(); // the ribbon section
        var p = clamp(((vh - r.top) / (vh + r.height) - 0.1) / 0.8);
        el.style.transform = "scaleX(" + p.toFixed(3) + ")";
      });
      reveals.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var t = clamp((vh * 0.92 - r.top) / (vh * 0.42));
        el.style.opacity = (0.16 + 0.84 * t).toFixed(3);
      });
      rises.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var t = clamp((vh - r.top) / Math.min(r.height, vh));
        el.style.opacity = (0.6 + 0.4 * t).toFixed(3);
        el.style.transform = "scale(" + (0.92 + 0.08 * t).toFixed(4) + ")";
      });
      zooms.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var t = clamp((vh * 0.95 - r.top) / (vh * 0.55));
        el.style.opacity = (0.2 + 0.8 * t).toFixed(3);
        el.style.transform = "scale(" + (0.7 + 0.3 * t).toFixed(4) + ")";
      });
      lifts.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var t = clamp((vh - r.top) / (Math.min(r.height, vh) * 0.85 + 1));
        el.style.opacity = t.toFixed(3);
        el.style.transform = "translate3d(0," + (44 * (1 - t)).toFixed(1) + "px,0)";
      });
      nums.forEach(function (el) {
        var r = el.getBoundingClientRect();
        el.classList.toggle("on", r.top < vh * 0.62);
      });
      spins.forEach(function (el) { el.style.rotate = (y * 0.35).toFixed(1) + "deg"; });
      var k = clamp(y / 1000);
      par.forEach(function (set) {
        set[0].forEach(function (el) { el.style.transform = "translate3d(0," + (set[1] * k).toFixed(1) + "px,0)"; });
      });
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame();
  }

  /* ---------- Supabase insert (REST, no SDK) ---------- */
  function insert(table, row) {
    return fetch(SUPABASE_URL + "/rest/v1/" + table, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row)
    }).then(function (res) {
      if (res.status === 201 || res.status === 204) return "ok";
      if (res.status === 409) return "duplicate";
      return res.text().then(function (t) { console.error("Supabase " + res.status, t); return "error"; });
    }).catch(function (err) { console.error(err); return "error"; });
  }

  function val(form, name) {
    var el = form.elements[name];
    return el ? String(el.value || "").trim() : "";
  }
  function showError(form, msg) {
    var box = form.querySelector(".form__error");
    if (box) { box.textContent = msg; box.hidden = !msg; }
  }
  function done(form, title, body) {
    var div = document.createElement("div");
    div.className = "form__done" + (form.classList.contains("panel__main") ? " panel__main" : "") + (form.classList.contains("join") ? " join" : "");
    div.style.alignSelf = "flex-start";
    div.setAttribute("role", "status");
    var b = document.createElement("b"); b.textContent = title;
    var p = document.createElement("p"); p.textContent = body;
    div.appendChild(b); div.appendChild(p);
    form.replaceWith(div);
  }
  function firstName(n) { return n.split(/\s+/)[0]; }

  function handle(form, onSubmit) {
    form.addEventListener("input", function () { showError(form, ""); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (val(form, "website")) return; // honeypot: bots fill hidden fields
      var btn = form.querySelector("[type=submit]");
      var label = btn ? btn.textContent : "";
      var result = onSubmit();
      if (!result) return;
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      result.then(function () {
        if (btn && document.body.contains(btn)) { btn.disabled = false; btn.textContent = label; }
      });
    });
  }

  /* Waitlist (contributors) */
  function waitlistDone(form, name, already) {
    done(form,
      already ? "You're already on the list." : "You're on the list, " + firstName(name) + ".",
      "We'll email you when Pollen opens. You can unsubscribe anytime.");
  }
  document.querySelectorAll('form[data-form="waitlist"]').forEach(function (form) {
    try {
      var saved = JSON.parse(localStorage.getItem(WAITLIST_KEY) || "null");
      if (saved && saved.name) { waitlistDone(form, saved.name, true); return; }
    } catch (_) {}
    handle(form, function () {
      var name = val(form, "name"), email = val(form, "email").toLowerCase();
      var adult = form.elements.adult && form.elements.adult.checked;
      if (!name) return showError(form, "Add your name so we know who you are.");
      if (!EMAIL.test(email) || email.length > 254) return showError(form, "Enter a valid email to save your spot.");
      if (!adult) return showError(form, "You need to be 18 or older to join.");
      return insert("waitlist", { name: name.slice(0, 80), email: email, confirmed_18: true }).then(function (r) {
        if (r === "error") return showError(form, "That didn't go through. Try again, or email contact@usepollen.ai.");
        try { localStorage.setItem(WAITLIST_KEY, JSON.stringify({ name: name })); } catch (_) {}
        waitlistDone(form, name, r === "duplicate");
      });
    });
  });

  /* Dataset requests (companies) */
  document.querySelectorAll('form[data-form="request"]').forEach(function (form) {
    handle(form, function () {
      var name = val(form, "name"), email = val(form, "work_email").toLowerCase();
      var company = val(form, "company"), brief = val(form, "brief");
      if (!name) return showError(form, "Add your name.");
      if (!EMAIL.test(email) || email.length > 254) return showError(form, "Enter a valid work email so we can reply.");
      if (!company) return showError(form, "Add your company name.");
      if (brief.length < 10) return showError(form, "Tell us a bit about the data you need.");
      return insert("company_requests", {
        name: name.slice(0, 120), work_email: email, company: company.slice(0, 160), brief: brief.slice(0, 4000)
      }).then(function (r) {
        if (r === "error") return showError(form, "That didn't go through. Email us at contact@usepollen.ai instead.");
        done(form, "Thanks, " + firstName(name) + ". We have your brief.",
          "We'll reply to " + email + " from contact@usepollen.ai.");
      });
    });
  });
  /* ---------- Hero: cursor parallax + card tilt (desktop) ---------- */
  var hero = document.querySelector(".hero");
  if (hero && window.matchMedia && matchMedia("(pointer: fine)").matches) {
    var arts = Array.prototype.slice.call(hero.querySelectorAll(".art svg"));
    var shots = Array.prototype.slice.call(hero.querySelectorAll(".hero__photo img"));
    var tiltEl = hero.querySelector(".record, .phone");
    var mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
    var loop = function () {
      cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
      arts.forEach(function (s, i) {
        var d = (i % 3 + 1) * 16;
        s.style.translate = (cx * d).toFixed(1) + "px " + (cy * d).toFixed(1) + "px";
      });
      shots.forEach(function (s, i) {
        var d = i ? -26 : 26;
        s.style.translate = (cx * d).toFixed(1) + "px " + (cy * d).toFixed(1) + "px";
      });
      if (tiltEl) {
        var ang = Math.hypot(cx, cy) * 14;
        tiltEl.style.rotate = ang < 0.05 ? "none" : (-cy).toFixed(3) + " " + cx.toFixed(3) + " 0 " + ang.toFixed(2) + "deg";
      }
      raf = (Math.abs(mx - cx) + Math.abs(my - cy) > 0.0008) ? requestAnimationFrame(loop) : 0;
    };
    var kick = function () { if (!raf) raf = requestAnimationFrame(loop); };
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      kick();
    });
    hero.addEventListener("pointerleave", function () { mx = my = 0; kick(); });
  }

  /* ---------- Count up the pay range when it comes into view ---------- */
  if ("IntersectionObserver" in window) {
    Array.prototype.slice.call(document.querySelectorAll("[data-count]")).forEach(function (box) {
      var spans = Array.prototype.slice.call(box.querySelectorAll("[data-to]"));
      var fmt = function (el, v) { el.textContent = "$" + v.toFixed(+el.getAttribute("data-dec")); };
      spans.forEach(function (el) { fmt(el, 0); });
      var obs = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        var start = performance.now(), dur = 1600;
        var tick = function (now) {
          var p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
          spans.forEach(function (el) { fmt(el, parseFloat(el.getAttribute("data-to")) * e); });
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, { threshold: 0.5 });
      obs.observe(box);
    });
  }
})();
