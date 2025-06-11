// Fetch the config and slay the buttons based on domain and selectors
fetch(chrome.runtime.getURL('slay-config.json'))
  .then(response => response.json())
  .then(config => {
    const hostname = window.location.hostname.replace(/^www\./, '');
    console.log(`patching for '${hostname}'`);
    const selectors = config[hostname];
    if (selectors && Array.isArray(selectors)) {
      selectors.forEach(selector => {
        console.log(`patching '${selector}'`);
        document.querySelectorAll(selector).forEach(el => {
          console.log(el);
          el.textContent = 'slay';
          el.value = 'slay';
          el.innerHTML = 'slay';
        });
      });
    }
  })
  .catch(err => {
    console.error('Failed to load slay-config.json', err);
  }); 