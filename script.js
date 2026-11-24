const search = document.getElementById('searchBox');
const saved = document.getElementById('savedSkills');

function safeText(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character];
  });
}

// Show saved skills on the Find a Student page.
if (saved) {
  const skills = JSON.parse(localStorage.getItem('sharedSkills') || '[]');

  skills.forEach(function (item) {
    const emailLink = item.email
      ? '<p><a href="https://mail.google.com/mail/?view=cm&to=' +
        encodeURIComponent(item.email) +
        '" target="_blank" rel="noopener">Email with Gmail</a></p>'
      : '<p>No Gmail address provided.</p>';

    saved.innerHTML +=
      '<article class="student-card"><h3>' + safeText(item.name) +
      '</h3><p>Skill: ' + safeText(item.skill) +
      '</p><p>Year: ' + safeText(item.year) +
      '</p><p>Email: ' + safeText(item.email) +
      '</p>' + emailLink + '</article>';
  });
}

// Search student cards.
if (search) {
  search.addEventListener('input', function () {
    let shown = 0;

    document.querySelectorAll('.student-card').forEach(function (card) {
      const match = card.textContent.toLowerCase().includes(search.value.toLowerCase());
      card.style.display = match ? 'block' : 'none';
      if (match) shown++;
    });

    document.getElementById('noResults').hidden = shown > 0;
  });
}

// Save a submitted skill.
const form = document.getElementById('skillForm');

if (form) {
  form.onsubmit = function (event) {
    event.preventDefault();

    const skills = JSON.parse(localStorage.getItem('sharedSkills') || '[]');

    skills.push({
      name: document.getElementById('studentName').value,
      skill: document.getElementById('skillName').value,
      email: document.getElementById('studentEmail').value,
      year: document.getElementById('studyYear').value
    });

    localStorage.setItem('sharedSkills', JSON.stringify(skills));

    document.getElementById('formMessage').textContent =
      'Skill saved! See it on the Find a Student page.';

    form.reset();
  };
}