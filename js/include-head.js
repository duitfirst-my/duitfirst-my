// /js/include-head.js
(function () {
  function includeHead() {
    const head = document.head; // get the single <head> element
    const file = '/includes/head-links.html'; // path to your HTML snippet

    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load head-links.html');
        return res.text();
      })
      .then((html) => {
        const temp = document.createElement('div');
        temp.innerHTML = html;

        Array.from(temp.childNodes).forEach((node) => {
          // If it's a <script>, create a new one to execute
          if (node.tagName && node.tagName.toLowerCase() === 'script') {
            const script = document.createElement('script');
            if (node.src) script.src = node.src;
            if (node.type) script.type = node.type;
            script.text = node.textContent;
            head.appendChild(script);
          } else {
            // For <link>, <meta>, <style>, etc.
            head.appendChild(node.cloneNode(true));
          }
        });
      })
      .catch((err) => {
        console.error('Error including head-links.html:', err);
      });
  }

  document.addEventListener('DOMContentLoaded', includeHead);
})();
