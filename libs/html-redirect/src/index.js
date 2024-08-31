const fs = require('node:fs');

const DEFAULT_TITLE = 'Conference Talks by HormCodes';
const DEFAULT_URL = 'https://github.com/HormCodes/conference-talks';

const inputs = getInputs();

const { slug } = inputs;

writeToFile({
  directory: '../../dist',
  fileName: `${slug}.html`,
  content: getRedirectPage(inputs),
});

function getRedirectPage({ title = DEFAULT_TITLE, url = DEFAULT_URL }) {
  return `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta http-equiv="refresh" content="0; url=${url}" />
</head>
<body>
    <p>In case there was not automatic redirect, <a href="${url}">please click here</a>.</p>
</body>
</html>
  `;
}

function getInputs() {
  return {
    slug: process.argv[2] || DEFAULT_TITLE,
    title: process.argv[3] || DEFAULT_TITLE,
    url: process.argv[4] || DEFAULT_URL,
  };
}

function writeToFile({
  directory = './',
  fileName = 'output',
  content = 'No output provided.',
}) {
  try {
    fs.mkdirSync(directory);
  } catch (e) {}
  try {
    fs.writeFileSync(`${directory}/${fileName}`, content);
  } catch (e) {}
}

console.log(getRedirectPage(getInputs()));
