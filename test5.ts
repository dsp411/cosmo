fetch('https://example.com')
  .then(res => res.text().then(text => ({ status: res.status, text: text.substring(0, 100) })))
  .then(console.log)
  .catch(console.error);
