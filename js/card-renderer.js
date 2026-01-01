(function () {

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderTables(tables) {
    var html = '';

    tables.forEach(function (table) {
      html += '<h3>' + escapeHTML(table.title) + '</h3>';
      html += '<div class="table-responsive">';
      html += '<table class="table table-bordered">';

      // Table header
      html += '<thead><tr>';
      table.columns.forEach(function (col) {
        html += '<th>' + escapeHTML(col.label) + '</th>';
      });
      html += '</tr></thead>';

      // Table body
      html += '<tbody>';
      table.rows.forEach(function (row) {
        html += '<tr>';
        table.columns.forEach(function (col) {
          html += '<td>' + escapeHTML(row[col.key] || '—') + '</td>';
        });
        html += '</tr>';
      });
      html += '</tbody>';

      html += '</table></div>';
    });

    return html;
  }

  function renderCard(provider, cardId) {
    var container = document.getElementById('card-data');
    if (!container) return;

    var jsonPath = '/data/credit-cards/' + provider + '/' + cardId + '.json';

    fetch(jsonPath)
      .then(function (res) {
        if (!res.ok) {
          throw new Error('Failed to load JSON');
        }
        return res.json();
      })
      .then(function (data) {
        var html = '';

        if (data.name) {
            html += `<h1 class="fw-bold text-success">${data.name}</h1>`;
        }

        if (data.description) {
            html += `<p class="fs-5">${data.description}</p>`;
        }

        if (data.imageUrl) {
            html += `<div class="text-center my-4"><img src="${data.imageUrl}" alt="${data.name}" class="img-fluid"></div>`;
        }

        // Highlights
        if (data.highlights && data.highlights.length) {
          html += '<h3>Highlights</h3><ul class="mb-5">';
          data.highlights.forEach(function (item) {
            html += '<li class="fs-5 fw-bold text-success">' + escapeHTML(item) + '</li>';
          });
          html += '</ul>';
        }

        // Tables
        if (data.tables && data.tables.length) {
          html += renderTables(data.tables);
        }

        html += `<p class="fs-5 mt-3">Too see any other details or perks of this card, please click on the button to view the official page.</p>`;

        // CTA
        if (data.referral) {
          html +=
            `<div class="text-center my-4">
                <a href="${escapeHTML(data.referral.url)}" target="_blank" rel="noopener noreferrer"
                 class="btn btn-success btn-lg">See More Details</a>
            </div>`;
        } else if (data.original) {
            html +=
            `<div class="text-center my-4">
                <a href="${escapeHTML(data.original.url)}" target="_blank" rel="noopener noreferrer"
                 class="btn btn-success btn-lg">See More Details</a>
            </div>`;
        }


        html += `<p class="text-success fw-bold fs-6 mt-4">
        DuitFirst highlights only the most relevant benefits.<br>Rewards, terms and conditions may change at any time.<br>Always refer to the official product page for latest full details.
        </p>`;

        container.innerHTML = html;
      })
      .catch(function () {
        container.innerHTML =
          '<p class="text-danger">Unable to load card details.</p>';
      });
  }

  var script = document.currentScript;
  var provider = script.getAttribute('data-provider');
  var cardId = script.getAttribute('data-card');

  if (provider && cardId) {
    renderCard(provider, cardId);
  }

})();
