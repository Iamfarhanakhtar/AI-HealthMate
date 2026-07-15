const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const regex = /<span\s+className=(['"`])([^'"`]*material-symbols-outlined[^'"`]*)\1(?:[^>]*?aria-hidden=(['"`])([^'"`]+)\3)?[^>]*>(.*?)<\/span>/g;
      
      let modified = false;
      let newContent = content.replace(regex, (match, q1, cls, q3, aria, innerText) => {
        modified = true;
        
        let newCls = cls.replace(/\bmaterial-symbols-outlined\b/g, '').replace(/\s+/g, ' ').trim();
        let clsAttr = newCls ? ` className="${newCls}"` : '';
        
        return `<MaterialIcon icon="${innerText}"${clsAttr} />`;
      });
      
      if (modified) {
        // Only add import if not already there
        if (!newContent.includes('MaterialIcon')) {
          // Find the last import statement and add it after
          const importMatch = newContent.match(/import .*?;?\n/g);
          if (importMatch) {
            const lastImport = importMatch[importMatch.length - 1];
            // Compute relative path
            const componentDir = path.dirname(fullPath);
            let relPath = path.relative(componentDir, path.join(__dirname, 'src/components/UI/MaterialIcon'));
            if (!relPath.startsWith('.')) relPath = './' + relPath;
            relPath = relPath.replace(/\\/g, '/');
            newContent = newContent.replace(lastImport, `${lastImport}import MaterialIcon from '${relPath}';\n`);
          }
        }
        
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));
