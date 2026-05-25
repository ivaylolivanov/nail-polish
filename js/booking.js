const SALON_EMAIL = 'info@elena.bg'; // <- replace with the real salon email

function collectFormData(form) {
  return {
    name:    form.querySelector('#name').value.trim(),
    phone:   form.querySelector('#phone').value.trim(),
    email:   form.querySelector('#email').value.trim(),
    service: form.querySelector('#service').value,
    date:    form.querySelector('#date').value,
    time:    form.querySelector('#time').value,
    notes:   form.querySelector('#notes').value.trim(),
  };
}

function buildMailtoURL(data) {
  const subject = 'Нова резервация — Elena Студио за красота';

  const bodyLines = [
    'Нова заявка за резервация:',
    '',
    'Три имена:  ' + data.name,
    'Телефон:    ' + data.phone,
    'Имейл:      ' + (data.email  || '—'),
    'Услуга:     ' + data.service,
    'Дата:       ' + data.date,
    'Час:        ' + (data.time   || '—'),
    'Бележки:   '  + (data.notes  || '—'),
  ];

  return 'mailto:' + SALON_EMAIL
    + '?subject=' + encodeURIComponent(subject)
    + '&body='    + encodeURIComponent(bodyLines.join('\n'));
}

function showFeedback(formEl, feedbackEl) {
  formEl.hidden    = true;
  feedbackEl.hidden = false;
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const form       = event.target;
  const feedbackEl = document.getElementById('booking-feedback');
  const data       = collectFormData(form);
  const mailto     = buildMailtoURL(data);

  // Open the mail client
  const link  = document.createElement('a');
  link.href   = mailto;
  link.click();

  // After a short delay, always show the feedback panel.
  // We cannot detect whether the client actually opened,
  // so the message covers both outcomes honestly.
  setTimeout(function() { showFeedback(form, feedbackEl); }, 600);
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;
  form.addEventListener('submit', handleBookingSubmit);
}

document.addEventListener('DOMContentLoaded', initBookingForm);
