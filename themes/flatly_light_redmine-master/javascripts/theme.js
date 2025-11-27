(function (window) {

  "use strict";

  /* Enable static sidebar */
  var activeStaticSidebar = false;

  /* ------------------------------------------------------------------
   * CLASS UTIL (as provided by original theme)
   * ------------------------------------------------------------------ */
  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  var hasClass, addClass, removeClass;

  if ("classList" in document.documentElement) {
    hasClass = function (elem, c) {
      return elem.classList.contains(c);
    };
    addClass = function (elem, c) {
      elem.classList.add(c);
    };
    removeClass = function (elem, c) {
      elem.classList.remove(c);
    };
  } else {
    hasClass = function (elem, c) {
      return classReg(c).test(elem.className);
    };
    addClass = function (elem, c) {
      if (!hasClass(elem, c)) {
        elem.className = elem.className + " " + c;
      }
    };
    removeClass = function (elem, c) {
      elem.className = elem.className.replace(classReg(c), " ");
    };
  }

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
  }

  window.classie = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass,
  };

  /* ------------------------------------------------------------------
   * MENU BUTTON (only used when sidebar is NOT static)
   * ------------------------------------------------------------------ */
  function addElements() {
    $(
      '<div id="menu"><div class="burger"><div class="one"></div><div class="two"></div><div class="three"></div></div><div class="circle"></div></div>'
    ).insertBefore($("#top-menu"));

    var menuLeft = document.getElementById("top-menu"),
      showLeft = document.getElementById("menu"),
      body = document.body,
      search = document.getElementById("quick-search"),
      menuButton = document.getElementById("menu");

    showLeft.onclick = function () {
      classie.toggle(this, "active");
      classie.toggle(body, "menu-push-toright");
      classie.toggle(menuButton, "menu-push-toright");
      if (search != null) classie.toggle(search, "menu-push-toright");
      classie.toggle(menuLeft, "open");
    };
  }

  if (!activeStaticSidebar) {
    $(document).ready(addElements);
  }

  /* ------------------------------------------------------------------
   * LOGO
   * ------------------------------------------------------------------ */
  function addLogo() {
    $("#loggedas").prepend("<div class='redmine-logo'></div>");
  }
  $(document).ready(addLogo);

  /* ------------------------------------------------------------------
   * FUNCTION: Enable static sidebar on modern Redmine layouts
   * ------------------------------------------------------------------ */
  function enableStaticSidebar() {
    if (!activeStaticSidebar) return;

    /* Modern Redmine layouts vary—select all possible sidebar elements */
    var sidebar = $("#sidebar, .splitcontentright");

    if (sidebar.length === 0) {
      console.warn("Flatly theme: No sidebar found on this page.");
      return;
    }

    /* Add static sidebar CSS class */
    sidebar.addClass("static-sidebar");

    /* Adjust layout */
    $("#wrapper3").css("margin-left", "215px");
    $("#quick-search").css("left", "200px");
    $("#top-menu").css({
      left: "0",
      width: "215px",
      transition: "none",
    });
    $("#quick-search").css("transition", "none");
  }

  $(document).ready(enableStaticSidebar);

  /* ------------------------------------------------------------------
   * HEADER CLICK CLOSE MENU
   * ------------------------------------------------------------------ */
  $(document).on("click", "#main, #header", function () {
    $("#top-menu").removeClass("open");
    $(".menu-push-toright").removeClass("menu-push-toright");
  });

  /* ------------------------------------------------------------------
   * FALLBACK FOR SOME PAGES (DMSF, Agile, etc.)
   * ------------------------------------------------------------------ */
  window.onerror = function () {
    if (
      location.href.indexOf("/dmsf") !== -1 ||
      location.href.indexOf("/master_backlog") !== -1
    ) {
      $(document).ready(addLogo);
      if (!activeStaticSidebar) $(document).ready(addElements);
    }
  };

  /* ------------------------------------------------------------------
   * REMOVE MOBILE MEDIA OVERRIDES (as original theme)
   * ------------------------------------------------------------------ */
  function removeRule() {
    if (typeof window.CSSMediaRule !== "function") return false;

    var s = document.styleSheets,
      r,
      i,
      j,
      k;

    if (!s) return false;

    for (i = 0; i < s.length; i++) {
      r = s[i].cssRules;
      if (!r) continue;

      for (j = 0; j < r.length; j++) {
        if (
          r[j] instanceof CSSMediaRule &&
          r[j].media.mediaText == "screen and (max-width: 899px)"
        ) {
          for (k = r[j].cssRules.length - 1; k >= 0; k--) {
            r[j].deleteRule(k);
          }
          return true;
        }
      }
    }
  }
  removeRule();
})(window);

