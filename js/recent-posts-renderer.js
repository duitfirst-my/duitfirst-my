(function () {

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderRecentPosts(containerId, jsonPath) {
    var container = document.getElementById(containerId);
    if (!container) return;

    fetch(jsonPath)
      .then(function(res) {
        if (!res.ok) throw new Error('Failed to load JSON');
        return res.json();
      })
      .then(function(data) {
        if (!Array.isArray(data)) throw new Error('Invalid JSON format');

        // Sort by lastUpdateDate descending and take top 5
        var top5 = data
          .slice()
          .sort(function(a, b) { return b.lastUpdateDate - a.lastUpdateDate; })
          .slice(0, 5);

        var html = '';

        html += '<h3 class="widget-title">Recent Posts</h3>';

        top5.forEach(function(card) {
          html += `
            <div class="post-item d-flex mb-3">
              <img src="${card.imageUrl}" alt="${escapeHTML(card.name)} Image" 
                   class="img-fluid flex-shrink-0" style="width:80px; height:auto; margin-right:10px;">
              <div>
                <h4>
                  <a href="${card.localPageUrl}" target="_blank">
                    Unlock Amazing Benefits with the ${escapeHTML(card.name)}!
                  </a>
                </h4>
                <time datetime="${new Date(card.lastUpdateDate).toISOString()}">
                  ${new Date(card.lastUpdateDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                </time>
              </div>
            </div>
          `;
        });

        container.innerHTML = html;

      })
      .catch(function(err) {
        console.error(err);
        container.innerHTML = '<p class="text-danger">Unable to load recent posts.</p>';
      });
  }

  // Get container ID and JSON path from script tag attributes
  var script = document.currentScript;
  var containerId = script.getAttribute('data-container') || 'recent-posts';
  var jsonPath = script.getAttribute('data-json') || '/data/credit-cards/all-card-data.json';

  renderRecentPosts(containerId, jsonPath);

})();
