const form = document.getElementById('scanForm');
const targetInput = document.getElementById('targetInput');
const resultsPre = document.getElementById('results');
const statusDiv = document.getElementById('status');


form.addEventListener('submit', async (e) => {
e.preventDefault();
const target = targetInput.value.trim();
if (!target) return alert('Please enter a target domain or URL');


statusDiv.textContent = 'Scanning... (this is a quick check)';
resultsPre.textContent = '';


try {
const res = await fetch('/api/scan', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ target })
});
const data = await res.json();
if (data.error) {
resultsPre.textContent = JSON.stringify(data, null, 2);
statusDiv.textContent = 'Error';
} else {
resultsPre.textContent = JSON.stringify(data, null, 2);
statusDiv.textContent = 'Done';
}
} catch (err) {
statusDiv.textContent = 'Request failed';
resultsPre.textContent = err.message;
}
});