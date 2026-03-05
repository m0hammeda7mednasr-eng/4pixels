const http = require('http');

const checkServer = () => {
  const options = {
    hostname: 'localhost',
    port: 5001,
    path: '/api/services',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log('✅ Server is running!');
    console.log(`Status Code: ${res.statusCode}`);
    process.exit(0);
  });

  req.on('error', (error) => {
    console.error('❌ Server is NOT running!');
    console.error('Error:', error.message);
    console.log('\n🔧 To fix this:');
    console.log('1. cd server');
    console.log('2. npm start');
    process.exit(1);
  });

  req.on('timeout', () => {
    console.error('❌ Server timeout!');
    req.destroy();
    process.exit(1);
  });

  req.end();
};

checkServer();
