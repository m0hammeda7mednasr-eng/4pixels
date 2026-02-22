const bcrypt = require('bcryptjs');
const { writeJSON } = require('./db');

async function resetAdmin() {
  console.log('🔄 Resetting admin user...');
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const users = [
    {
      id: 'admin-001',
      email: 'admin@4pixels.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString()
    }
  ];
  
  writeJSON('users.json', users);
  
  console.log('✅ Admin user reset successfully!');
  console.log('📧 Email: admin@4pixels.com');
  console.log('🔑 Password: admin123');
  console.log('');
  console.log('You can now login at: http://localhost:3000/login');
}

resetAdmin().catch(console.error);
