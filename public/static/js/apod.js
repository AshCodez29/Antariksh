(() => {
  const fallback = { title: 'Astronomy Picture of the Day', date: new Date().toISOString().slice(0, 10), explanation: 'NASA’s Astronomy Picture of the Day brings a new view of our universe every day.', url: 'https://apod.nasa.gov/apod/image/2401/OrionNebula_Hubble_960.jpg', media_type: 'image' };
  const card = document.getElementById('apod-card'), modal = document.getElementById('apod-modal');
  let apod = fallback;
  const pageUrl = data => `https://apod.nasa.gov/apod/ap${data.date.replaceAll('-', '').slice(2)}.html`;
  const render = data => { const image = data.media_type === 'image' ? data.url : (data.thumbnail_url || fallback.url); document.getElementById('apod-thumb').src = image; document.getElementById('apod-image').src = image; document.getElementById('apod-card-title').textContent = data.title; document.getElementById('apod-title').textContent = data.title; document.getElementById('apod-date').textContent = data.date; document.getElementById('apod-description').textContent = data.explanation; document.getElementById('apod-link').href = pageUrl(data); };
  const open = () => { render(apod); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.querySelector('.apod-close').focus(); };
  const close = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
  card.addEventListener('click', open); document.querySelector('.apod-close').addEventListener('click', close); modal.addEventListener('click', event => { if (event.target === modal) close(); }); document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  render(apod); fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then(response => response.ok ? response.json() : Promise.reject()).then(data => { apod = data; render(apod); }).catch(() => { });
})();
