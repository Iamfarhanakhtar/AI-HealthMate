const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/Quizzes.jsx',
  'src/pages/SessionMode.jsx',
  'src/pages/CommunityFeedback.jsx',
  'src/pages/Explore.jsx',
  'src/pages/Feedback.jsx',
  'src/pages/Triage.jsx',
  'src/components/Navbar.jsx',
  'src/components/CertificateCard.jsx',
  'src/components/landing/Hero.jsx',
  'src/components/landing/AIAssistantPreview.jsx',
  'src/components/landing/CallToAction.jsx'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  const componentDir = path.dirname(fullPath);
  let relPath = path.relative(componentDir, path.join(__dirname, 'src/components/UI/MaterialIcon'));
  if (!relPath.startsWith('.')) relPath = './' + relPath;
  relPath = relPath.replace(/\\/g, '/');
  
  const importStmt = `import MaterialIcon from '${relPath}';\n`;
  
  // insert after first import
  content = content.replace(/^(import\s+.*)$/m, `$1\n${importStmt}`);
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Added import to ${file}`);
});
