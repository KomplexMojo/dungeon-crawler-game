const fs = require('fs');
const path = require('path');

const base = 'data';
const folders = [
  'src/schema',
  'src/encoding',
  'src/utils',
  'test'
];

// Create each folder and add a .gitkeep file
folders.forEach(subpath => {
  const fullPath = path.join(base, subpath);
  fs.mkdirSync(fullPath, { recursive: true });
  fs.writeFileSync(path.join(fullPath, '.gitkeep'), '');
  console.log(`✅ Created: ${fullPath}/.gitkeep`);
});

console.log('\n🎉 Workspace "data/" initialized successfully.');