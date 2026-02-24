const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function resetAdminPassword() {
  const usersPath = path.join(__dirname, 'server', 'data', 'users.json');
  
  // New password
  const newPassword = '01066184859Mm#';
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  const users = [
    {
      "id": "admin-001",
      "email": "Mohammedahmed@gmail.com",
      "password": hashedPassword,
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ];
  
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  console.log('✅ Admin password reset successfully!');
  console.log('📧 Email: Mohammedahmed@gmail.com');
  console.log('🔑 Password: 01066184859Mm#');
  console.log('🔐 New Hashed Password:', hashedPassword);
  console.log('');
  console.log('⚠️  IMPORTANT: Update Railway JWT_SECRET to: fourpixels_secret_key_2024');
}

resetAdminPassword().catch(console.error);
