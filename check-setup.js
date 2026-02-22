const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Four Pixels Setup...\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

// Check Node.js version
console.log('📦 Checking Node.js...');
const nodeVersion = process.version;
console.log(`   Node.js version: ${nodeVersion}`);
if (parseInt(nodeVersion.slice(1)) >= 14) {
  console.log('   ✅ Node.js version is compatible\n');
  checks.passed++;
} else {
  console.log('   ❌ Node.js version should be 14 or higher\n');
  checks.failed++;
}

// Check server files
console.log('📁 Checking server files...');
const serverFiles = [
  'server/server.js',
  'server/package.json',
  'server/.env',
  'server/db.js',
  'server/routes/auth.js',
  'server/routes/services.js',
  'server/routes/projects.js',
  'server/routes/messages.js',
  'server/middleware/auth.js'
];

serverFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
    checks.passed++;
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    checks.failed++;
  }
});
console.log('');

// Check client files
console.log('📁 Checking client files...');
const clientFiles = [
  'client/package.json',
  'client/src/App.jsx',
  'client/src/pages/Admin.jsx',
  'client/src/pages/Login.jsx',
  'client/src/context/AuthContext.jsx',
  'client/src/services/api.js'
];

clientFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
    checks.passed++;
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    checks.failed++;
  }
});
console.log('');

// Check data directory
console.log('📁 Checking data directory...');
if (fs.existsSync('server/data')) {
  console.log('   ✅ server/data directory exists');
  checks.passed++;
  
  const dataFiles = [
    'server/data/users.json',
    'server/data/services.json',
    'server/data/projects.json',
    'server/data/messages.json'
  ];
  
  dataFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file}`);
      checks.passed++;
    } else {
      console.log(`   ⚠️  ${file} - will be created automatically`);
      checks.warnings++;
    }
  });
} else {
  console.log('   ⚠️  server/data directory - will be created automatically');
  checks.warnings++;
}
console.log('');

// Check node_modules
console.log('📦 Checking dependencies...');
if (fs.existsSync('server/node_modules')) {
  console.log('   ✅ Server dependencies installed');
  checks.passed++;
} else {
  console.log('   ❌ Server dependencies NOT installed');
  console.log('      Run: cd server && npm install');
  checks.failed++;
}

if (fs.existsSync('client/node_modules')) {
  console.log('   ✅ Client dependencies installed');
  checks.passed++;
} else {
  console.log('   ❌ Client dependencies NOT installed');
  console.log('      Run: cd client && npm install');
  checks.failed++;
}
console.log('');

// Check .env file
console.log('⚙️  Checking configuration...');
if (fs.existsSync('server/.env')) {
  const envContent = fs.readFileSync('server/.env', 'utf8');
  
  if (envContent.includes('PORT=')) {
    console.log('   ✅ PORT configured');
    checks.passed++;
  } else {
    console.log('   ⚠️  PORT not configured');
    checks.warnings++;
  }
  
  if (envContent.includes('JWT_SECRET=')) {
    console.log('   ✅ JWT_SECRET configured');
    checks.passed++;
  } else {
    console.log('   ❌ JWT_SECRET not configured');
    checks.failed++;
  }
} else {
  console.log('   ❌ server/.env file missing');
  checks.failed++;
}
console.log('');

// Summary
console.log('═══════════════════════════════════════');
console.log('📊 Summary:');
console.log(`   ✅ Passed: ${checks.passed}`);
console.log(`   ❌ Failed: ${checks.failed}`);
console.log(`   ⚠️  Warnings: ${checks.warnings}`);
console.log('═══════════════════════════════════════\n');

if (checks.failed === 0) {
  console.log('🎉 Setup looks good! You can start the application.');
  console.log('\n📝 Next steps:');
  console.log('   1. cd server && npm start');
  console.log('   2. cd client && npm start (in a new terminal)');
  console.log('   3. Open http://localhost:3000');
  console.log('   4. Login with: admin@4pixels.com / admin123\n');
} else {
  console.log('⚠️  Please fix the failed checks before starting.\n');
  console.log('📚 For help, check:');
  console.log('   - START.md - Quick start guide');
  console.log('   - TROUBLESHOOTING.md - Common issues\n');
}
