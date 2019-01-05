var body = document.getElementsByTagName("body");
var wrapper = document.getElementById("wrapper");
var main = document.getElementById("main");
var panels = Array.from(main.getElementsByTagName("article")); // panels class components with article tag
var nav = document.getElementById("nav");
var nav_links = Array.from(nav.getElementsByTagName("a"));



// Play initial animations on page load.
window.addEventListener("load", function() {
  window.setTimeout(function() {
    body[0].classList.remove("is-preload");
  }, 100);
});

// Nav.
nav.addEventListener("click", function(event) {
  if (!event.target && !event.target.nodeName == "A") {
    return;
  }
  var href = event.target.getAttribute("href");
  
  // Not a panel link? Bail.
  if (href == null || href.charAt(0) != "#") return;

  // Prevent default.
  event.preventDefault();
  event.stopPropagation();

  // Change panels.
  if (window.location.hash != href) window.location.hash = href;
});

// Panels.

// Initialize.
(function() {
  var panel, link;
  // Get panel, link.
  if (window.location.hash) {
    panels.forEach(pp => {
      if (pp.getAttribute("id") === window.location.hash.slice(1)) {
        panel = pp;
      }
    });
    nav_links.forEach(ll => {
      if (ll.getAttribute("href") === window.location.hash) {
        link = ll;
      }
    });
  }

  // No panel/link? Default to first.
  if (!panel || panel.length == 0) {
    panel = panels[0];
    link = nav_links[0];
  }

  // Deactivate all panels except this one.
  panels.forEach(pp => {
    if (pp != panel) {
      pp.classList.add("inactive");
      pp.style.display = "none";
    } else {
      pp.style.display = "grid";
    }
  });
  // Activate link.
  link.classList.add("active");

  // Reset scroll.
  window.scrollTo(0, 0);
})();

// Hashchange event.
window.addEventListener("hashchange", function(event) {
  var panel, link;

  // Get panel, link.
  if (window.location.hash) {
    panels.forEach(pp => {
      if (pp.getAttribute("id") === window.location.hash.slice(1)) {
        panel = pp;
      }
    });
    nav_links.forEach(ll => {
      if (ll.getAttribute("href") === window.location.hash) {
        link = ll;
      }
    });
    // No target panel? Bail.
    if (panel.length == 0) return;
  }

  // No panel/link? Default to first.
  else {
    panel = panels[0];
    link = nav_links[0];
  }

  // Deactivate all panels.
  panels.forEach(pp => {
      pp.classList.add("inactive");
  });
  // Deactivate all links.
  nav_links.forEach(ll => {
      ll.classList.remove("active");
  });

  // Activate target link.
  link.classList.add("active");
  panel.classList.remove("inactive");
  panel.classList.add("active");
  // Set max/min height.
  main.style.maxHeight = getComputedStyle(main).height + "px";
  main.style.minHeight = getComputedStyle(main).height+ "px";

  // Delay.
  setTimeout(function() {
    // Hide all panels.
    panels.forEach(pan => {
      pan.style.display = "none";
    });

    // Show target panel.
    panel.style.display = "grid";

    // Set new max/min height.
    main.style.maxHeight = getComputedStyle(main).outerHeight + "px";
    main.style.minHeight = getComputedStyle(main).outerHeight+ "px";

    // Reset scroll.
    window.scroll(0,0);

    // Delay.
    // window.setTimeout(
    //   function() {
    //     // Activate target panel.
    //     panel.classList.remove("inactive");

    //     // Clear max/min height.
    //     main.style.maxHeight = 0 + "px";
    //     main.style.minHeight = 0 + "px";

    //     // IE: Refresh.
    //     // window.triggerHandler("--refresh");

    //     // Unlock.
    //     locked = false;
    //   },
    //   breakpoints.active("small") ? 0 : 500
    // );
  }, 250);
});
document.getElementById("sendmessage").addEventListener("click", function(e) {
  var emailadd = "contact@aavgeen.com";
  var name = document.getElementById("contact_name").value;
  var subj = document.getElementById("contact_subject").value;
  var message = document.getElementById("contact_message").value;
  var body = "Hi Aavgeen.   " + "This is " + name + " here.    " + message;
  var emailwindowaddress =
    "mailto:" + emailadd + "?subject=" + subj + "&body=" + body;
  window.open(emailwindowaddress);
});
