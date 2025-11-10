const axios = require('axios');
const cheerio = require('cheerio');


// A set of lightweight checks. These are *not* exhaustive or stealthy — educational only.


const defaultHeadersToCheck = [
'content-security-policy',
'x-frame-options',
'x-content-type-options',
'referrer-policy',
'strict-transport-security'
];


async function fetchUrl(url, opts = {}) {
try {
const res = await axios.get(url, {
maxRedirects: 5,
timeout: 10000,
validateStatus: () => true,
headers: { 'User-Agent': 'WebAppVulnScanner/1.0' },
...opts,
});
return res;
} catch (err) {
return { error: err.message };
}
}


function checkSecurityHeaders(headers) {
const missing = [];
const present = {};
for (const h of defaultHeadersToCheck) {
if (headers[h]) present[h] = headers[h];
else missing.push(h);
}
return { present, missing };
}


function fingerprintSqlErrors(body) {
if (!body) return [];
const fingerprints = [
'you have an error in your sql syntax',
'warning: mysql',
'unclosed quotation mark after the character string',
'quoted string not properly terminated',
'syntax error at or near',
'mysql_fetch',
'ORA-00933',
'SQL syntax',
];
const found = [];
const low = body.toLowerCase();
for (const f of fingerprints) if (low.includes(f)) found.push(f);
return found;
module.exports = { runAllChecks };