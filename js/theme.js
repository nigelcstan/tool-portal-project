// Light theme is the default. The choice is remembered when the browser allows it.
(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");

  function isDark() {
    return root.getAttribute("data-theme") === "dark";
  }

  function show() {
    button.textContent = isDark() ? "Switch to light theme" : "Switch to dark theme";
  }

  button.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // Storage can be blocked; the toggle still works for this visit.
    }
    show();
  });

  show();
})();
