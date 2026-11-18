
const files = [
  // LOGOTIPI
  {
    title: 'FAMILY CITY • SFR LOGO 1',
    category: 'logotipi',
    file: 'assets/logotipi/sfr-logo-1.png'
  },
  {
    title: 'FAMILY CITY • SFR LOGO 2',
    category: 'logotipi',
    file: 'assets/logotipi/sfr-logo-2.png'
  },
  {
    title: 'FAMILY CITY • SFR LOGO 3',
    category: 'logotipi',
    file: 'assets/logotipi/sfr-logo-3.png'
  },
  {
    title: 'FAMILY CITY • SFR LOGO 4',
    category: 'logotipi',
    file: 'assets/logotipi/sfr-logo-4.png'
  },

  // OZADJA ZA RAČUNALNIK
  {
    title: 'FAMILY CITY • PC OZADJE 1',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-1.png'
  },
  {
    title: 'FAMILY CITY • PC OZADJE 2',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-2.png'
  },
  {
    title: 'FAMILY CITY • PC OZADJE 3',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-3.png'
  },
  {
    title: 'FAMILY CITY • PC OZADJE 4',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-4.png'
  },
  {
    title: 'FAMILY CITY • PC OZADJE 5',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-5.png'
  },
  {
    title: 'FAMILY CITY • PC OZADJE 6',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-6.png'
  },
  {
    title: 'FAMILY CITY • PC OZADJE 7',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-7.png'
  },

  // OZADJA ZA TELEFON
  {
    title: 'FAMILY CITY • TELEFON 1',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-phone-1.png'
  },
  {
    title: 'FAMILY CITY • TELEFON 2',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-phone-2.png'
  },
  {
    title: 'FAMILY CITY • TELEFON 3',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-phone-3.png'
  },
  {
    title: 'FAMILY CITY • TELEFON 4',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-phone-4.png'
  },
  {
    title: 'FAMILY CITY • TELEFON 5',
    category: 'ozadja',
    file: 'assets/ozadja/sfr-wall-phone-5.png'
  }
];

// Prenos slike
async function prenesiSliko(pot, ime) {
  try {
    const odgovor = await fetch(pot);

    if (!odgovor.ok) {
      throw new Error('Slike ni mogoče prenesti.');
    }

    const blob = await odgovor.blob();
    const url = URL.createObjectURL(blob);

    const povezava = document.createElement('a');
    povezava.href = url;
    povezava.download = ime;
    document.body.appendChild(povezava);
    povezava.click();
    povezava.remove();

    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch (napaka) {
    console.error('Napaka pri prenosu:', napaka);
    alert('Prenos ni uspel. Preveri, ali je slika pravilno naložena.');
  }
}

const container = document.querySelector('#items');
const empty = document.querySelector('#empty');
const dialog = document.querySelector('#preview');

let filter = 'all';

function render() {
  const selected = files.filter(
    item => filter === 'all' || item.category === filter
  );

  container.replaceChildren();
  empty.hidden = selected.length > 0;

  selected.forEach(item => {
    const card = document.createElement('article');
    card.className = 'item';

    // Slika in predogled
    const thumb = document.createElement('button');
    thumb.className = 'thumb';
    thumb.type = 'button';
    thumb.setAttribute('aria-label', `Predogled: ${item.title}`);

    const img = document.createElement('img');
    img.src = item.file;
    img.alt = item.title;
    img.loading = 'lazy';
    thumb.append(img);

    thumb.addEventListener('click', () => {
      document.querySelector('#preview-image').src = item.file;
      document.querySelector('#preview-image').alt = item.title;
      document.querySelector('#preview-title').textContent = item.title;

      const dl = document.querySelector('#preview-download');
      dl.href = item.file;
      dl.download = item.file.split('/').pop();

      dl.onclick = (e) => {
        e.preventDefault();
        prenesiSliko(item.file, item.file.split('/').pop());
      };

      dialog.showModal();
    });

    // Podatki o sliki
    const info = document.createElement('div');
    info.className = 'item-info';

    const label = document.createElement('div');
    label.className = 'category';
    label.textContent =
      item.category === 'logotipi' ? 'LOGOTIPI' : 'OZADJA';

    const title = document.createElement('h3');
    title.textContent = item.title;

    // Gumb PRENESI
    const link = document.createElement('a');
    link.className = 'download';
    link.href = item.file;
    link.download = item.file.split('/').pop();
    link.textContent = 'PRENESI ↓';

    link.addEventListener('click', (e) => {
      e.preventDefault();
      prenesiSliko(item.file, item.file.split('/').pop());
    });

    info.append(label, title, link);
    card.append(thumb, info);
    container.append(card);
  });
}

// Filtri
document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;

    document.querySelectorAll('.tab').forEach(b => {
      b.classList.toggle('active', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });

    render();
  });
});

// Zapiranje predogleda
document.querySelector('.close').addEventListener('click', () => {
  dialog.close();
});

dialog.addEventListener('click', e => {
  if (e.target === dialog) dialog.close();
});

render();
