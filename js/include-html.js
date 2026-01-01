(function () {
  function includeHTML() {
    var elements = document.querySelectorAll('[data-include]');

    elements.forEach(function (el) {
      var file = el.getAttribute('data-include');

      fetch(file)
        .then(function (res) { return res.text(); })
        .then(function (html) {
          el.innerHTML = html;
          el.removeAttribute('data-include');

          // Check if there is a script to run inside the included HTML
          var scripts = el.querySelectorAll('script');
          scripts.forEach(function(script) {
            var newScript = document.createElement('script');
            if (script.src) {
              newScript.src = script.src; // external script
            } else {
              newScript.textContent = script.textContent; // inline script
            }
            document.body.appendChild(newScript); // append to body to execute
          });
        })
        .catch(function () { el.innerHTML = ''; });
    });
  }

  document.addEventListener('DOMContentLoaded', includeHTML);
})();
