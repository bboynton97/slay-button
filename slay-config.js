export default {
  "github.com": [
    "span[data-component=\"buttonContent\"]",
    (doc) => Array.from(doc.querySelectorAll('span')).find(span => 
      span.textContent.trim() === 'Squash and merge'
    )
  ],
  "google.com": [
    "input[value=\"Google Search\"]"
  ]
}; 