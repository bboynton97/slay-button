const slayConfig = {
    "github.com": [
        "span[data-component=\"buttonContent\"]",
        async (document) => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // wait for the page to load
            return Array.from(document.querySelectorAll('span')).find(span => 
                span.textContent.trim() === 'Squash and merge'
            );
        }
    ],
    "google.com": [
        "input[value=\"Google Search\"]",
        (document) => {
            return Array.from(document.querySelectorAll('span')).find(
                el => el.textContent.trim() === 'Search'
            );
        }
    ],
}

const hostname = window.location.hostname.replace(/^www\./, '');
const rules = slayConfig[hostname];

if (rules && Array.isArray(rules)) {
    console.log(`patching for '${hostname}'`);
    (async () => {
      for (const rule of rules) {
        let elements = [];
        if (typeof rule === 'string') {
          console.log(`patching '${rule}'`);
          elements = document.querySelectorAll(rule);
        } else if (typeof rule === 'function') {
          console.log(`patching with function'${rule}'`);
          let result = rule(document);
          if (result instanceof Promise) {
            result = await result;
          }
          console.log(result);
          if (Array.isArray(result)) {
            console.log(result);
            elements = result;
          } else if (result) {
            console.log(result);
            elements = [result];
          }
        }
        elements.forEach(el => {
          if (el) {
            el.textContent = 'slay';
            el.value = 'slay';
            el.innerHTML = 'slay';
          }
        });
      }
    })();
} 