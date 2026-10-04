const fs = require('fs');
const files = [
  'src/components/AboutSection.jsx',
  'src/components/ContactSection.jsx',
  'src/components/EducationSection.jsx',
  'src/components/Footer.jsx'
];
files.forEach(f => {
  let code = fs.readFileSync(f, 'utf8');
  // First, remove existing rel="noopener noreferrer" around target="_blank"
  code = code.replace(/rel="noopener noreferrer"\s*target="_blank"/g, 'target="_blank"');
  code = code.replace(/target="_blank"\s*rel="noopener noreferrer"/g, 'target="_blank"');
  
  // Then, append rel to all target="_blank"
  code = code.replace(/target="_blank"/g, 'target="_blank" rel="noopener noreferrer"');
  
  fs.writeFileSync(f, code);
});
console.log("Done");
