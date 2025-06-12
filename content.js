import config from './slay-config.js';

const hostname = window.location.hostname.replace(/^www\./, '');
const rules = config[hostname];

if (rules && Array.isArray(rules)) {
    console.log(`patching for '${hostname}'`);
  rules.forEach(rule => {
    let elements = [];
    if (typeof rule === 'string') {
      console.log(`patching '${rule}'`);
      elements = document.querySelectorAll(rule);
    } else if (typeof rule === 'function') {
      console.log(`patching '${rule}'`);
      const result = rule(document);
      if (Array.isArray(result)) {
        console.log(result);
        elements = result;
      } else if (result) {
        console.log(result);
        elements = [result];
      }
    }
    elements.forEach(el => {
      if (el) el.textContent = 'slay';
    });
  });
} 