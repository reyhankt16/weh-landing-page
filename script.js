
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Tutup navigasi' : 'Buka navigasi'
    );
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Buka navigasi');
    });
  });
}

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

document.querySelectorAll('.choose-program').forEach((link) => {
  link.addEventListener('click', () => {
    const program = link.dataset.program;
    const select = document.querySelector('#student-program');

    if (select && program) {
      select.value = program;
    }
  });
});

const signupForm = document.querySelector('#signup-form');
const formError = document.querySelector('#form-error');

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#student-name').value.trim();
    const program = document.querySelector('#student-program').value;

    if (!name || !program) {
      if (formError) {
        formError.textContent =
          'Isi nama dan pilih program terlebih dahulu.';
      }
      return;
    }

    const whatsappNumber = '6282148839454';

    const message =
      `Halo WEH! Nama saya ${name}. Saya tertarik dengan program ${program}. Boleh minta informasi jadwal, biaya, dan cara pendaftarannya?`;

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    if (formError) {
      formError.textContent =
        'WhatsApp akan terbuka dengan pesan yang sudah disiapkan.';
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}


const programCards = document.querySelectorAll('.program-card');
const programSelect = document.querySelector('#student-program');

function selectProgram(card) {
  const link = card.querySelector('.choose-program');
  if (!link) return;

  const program = link.dataset.program;

  programCards.forEach((item) => {
    const active = item === card;
    item.classList.toggle('selected', active);

    if (active) {
      item.setAttribute('aria-current', 'true');
    } else {
      item.removeAttribute('aria-current');
    }
  });

  if (programSelect && program) {
    programSelect.value = program;
  }
}

programCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button, input, select, label')) return;
    selectProgram(card);
  });

  card.addEventListener('keydown', (event) => {
    if (event.target !== card) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectProgram(card);
    }
  });

  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute(
    'aria-label',
    `Pilih program ${card.querySelector('h3')?.textContent.trim() || ''}`
  );
});

document.querySelectorAll('.choose-program').forEach((link) => {
  link.addEventListener('click', () => {
    const card = link.closest('.program-card');
    if (card) selectProgram(card);
  });
});


if (year) {
  year.textContent = new Date().getFullYear();
}

const journeySteps = document.querySelectorAll('.step-item');
const journeyProgressFill = document.querySelector('#journey-progress-fill');
const journeyProgressCount = document.querySelector('#journey-progress-count');
const methodNoteTitle = document.querySelector('#method-note-title');
const methodNoteDescription = document.querySelector('#method-note-description');
const imageStepNumber = document.querySelector('.image-step-number');
const imageStepLabel = document.querySelector('.image-step-label');

const journeyDetails = [
  {
    title: 'Start with clarity',
    description: 'Kenali tujuanmu sebelum mulai belajar.',
    label: 'DISCOVER YOUR GOAL'
  },
  {
    title: 'Build a strong foundation',
    description: 'Kuatkan dasar bahasa Inggris selangkah demi selangkah.',
    label: 'BUILD YOUR FOUNDATION'
  },
  {
    title: 'Learn by doing',
    description: 'Latih kemampuanmu melalui praktik yang terarah.',
    label: 'PRACTICE WITH PURPOSE'
  },
  {
    title: 'Progress through feedback',
    description: 'Kenali kekurangan dan tingkatkan kemampuanmu.',
    label: 'IMPROVE YOUR SKILLS'
  },
  {
    title: 'Move toward your goals',
    description: 'Terapkan kemampuanmu untuk peluang berikutnya.',
    label: 'ACHIEVE YOUR NEXT GOAL'
  }
];

function activateJourneyStep(index) {
 if (index < -1 || index >= journeySteps.length) return;

if (index === -1) {
  journeySteps.forEach((step) => {
    step.classList.remove('active');
    step.setAttribute('aria-pressed', 'false');
  });

  if (journeyProgressFill) journeyProgressFill.style.width = '0%';
  if (journeyProgressCount) journeyProgressCount.textContent = '00 / 05';
  if (methodNoteTitle) methodNoteTitle.textContent = 'Progress over perfection';
  if (methodNoteDescription) methodNoteDescription.textContent = 'Konsisten lebih penting daripada terburu-buru.';
  if (imageStepNumber) imageStepNumber.textContent = '01';
  if (imageStepLabel) imageStepLabel.textContent = 'YOUR LEARNING JOURNEY';

  return;
}

  journeySteps.forEach((step, stepIndex) => {
    const isActive = stepIndex === index;
    step.classList.toggle('active', isActive);
    step.setAttribute('aria-pressed', String(isActive));
  });

  const detail = journeyDetails[index];

  if (journeyProgressFill) {
    journeyProgressFill.style.width =
      `${((index + 1) / journeySteps.length) * 100}%`;
  }

  if (journeyProgressCount) {
    journeyProgressCount.textContent =
      `${String(index + 1).padStart(2, '0')} / ${String(journeySteps.length).padStart(2, '0')}`;
  }

  if (methodNoteTitle) {
    methodNoteTitle.textContent = detail.title;
  }

  if (methodNoteDescription) {
    methodNoteDescription.textContent = detail.description;
  }

  if (imageStepNumber) {
    imageStepNumber.textContent = String(index + 1).padStart(2, '0');
  }

  if (imageStepLabel) {
    imageStepLabel.textContent = detail.label;
  }
}

journeySteps.forEach((step, index) => {
  step.addEventListener('click', () => {
    activateJourneyStep(index);
  });

  step.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (index + 1) % journeySteps.length;
      journeySteps[nextIndex].focus();
      activateJourneyStep(nextIndex);
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const previousIndex =
        (index - 1 + journeySteps.length) % journeySteps.length;

      journeySteps[previousIndex].focus();
      activateJourneyStep(previousIndex);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      journeySteps[0].focus();
      activateJourneyStep(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      journeySteps[journeySteps.length - 1].focus();
      activateJourneyStep(journeySteps.length - 1);
    }
  });
});

if (journeySteps.length) {
  activateJourneyStep(-1);
}
