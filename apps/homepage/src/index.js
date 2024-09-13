const { execSync } = require('node:child_process');
const { writeToFile } = require('../../../libs/file-utils/src');

const nxProjectsOutput = execSync('nx show projects --type app --json');
const projects = JSON.parse(nxProjectsOutput);

const projectsPerYear = projects
  .filter((project) => project.includes('20'))
  .reduce((result, project) => {
    const year = project.split('-').pop();
    const projects = result[year] || [];
    return {
      ...result,
      [year]: [...projects, project],
    };
  }, {});

const years = Object.keys(projectsPerYear).sort().reverse();

const content = `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Conference Slides | Horm Codes</title>
</head>
<body>
<h1>Slides from Conference Talks by Matěj 'Horm' Horák (Horm Codes)</h1>
<p>Here are all the slides from my conference talks. I recommend checking also <a href="https://horm.codes/category/conferences/">my personal website with more resources</a>.</p>
${years
  .map(
    (year) =>
      `
<h2>${year}</h2>
<ul>
${projectsPerYear[year].map((projectSlug) => `<li><a href="/${projectSlug}">${projectSlug}</a></li>`).join('\n')}
</ul>
`,
  )
  .join('\n')}
</body>
</html>
`;

writeToFile({
  directory: '../../dist',
  fileName: `index.html`,
  content,
});
