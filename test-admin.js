// Test script to verify admin functionality
const { readJSON, writeJSON, generateId } = require('./server/db');

console.log('🧪 Testing Admin Dashboard Functionality...\n');

// Test 1: Read Services
console.log('1️⃣ Testing Read Services:');
const services = readJSON('services.json');
console.log(`   ✅ Found ${services.length} services`);

// Test 2: Read Projects
console.log('\n2️⃣ Testing Read Projects:');
const projects = readJSON('projects.json');
console.log(`   ✅ Found ${projects.length} projects`);

// Test 3: Read Reviews
console.log('\n3️⃣ Testing Read Reviews:');
const reviews = readJSON('reviews.json');
console.log(`   ✅ Found ${reviews.length} reviews`);

// Test 4: Test Write (Create a test service)
console.log('\n4️⃣ Testing Write Operation:');
const testService = {
  id: generateId(),
  title: { en: 'Test Service', ar: 'خدمة تجريبية' },
  description: { en: 'Test Description', ar: 'وصف تجريبي' },
  price: 100,
  deliveryTime: '1 week',
  features: { en: ['Test Feature'], ar: ['ميزة تجريبية'] },
  image: '',
  active: true,
  createdAt: new Date().toISOString()
};

services.push(testService);
const writeResult = writeJSON('services.json', services);

if (writeResult) {
  console.log('   ✅ Write operation successful');
  
  // Remove test service
  const updatedServices = services.filter(s => s.id !== testService.id);
  writeJSON('services.json', updatedServices);
  console.log('   ✅ Test service removed');
} else {
  console.log('   ❌ Write operation failed');
}

// Test 5: Check file permissions
console.log('\n5️⃣ Checking File Permissions:');
const fs = require('fs');
const path = require('path');

const files = ['services.json', 'projects.json', 'reviews.json', 'messages.json'];
files.forEach(file => {
  const filePath = path.join(__dirname, 'server', 'data', file);
  try {
    fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    console.log(`   ✅ ${file} - Read/Write OK`);
  } catch (err) {
    console.log(`   ❌ ${file} - Permission Error`);
  }
});

console.log('\n✅ All tests completed!\n');
console.log('📝 Summary:');
console.log(`   - Services: ${services.length}`);
console.log(`   - Projects: ${projects.length}`);
console.log(`   - Reviews: ${reviews.length}`);
console.log('\n🚀 If all tests passed, the admin dashboard should work correctly.');
console.log('💡 If you still have issues, check the browser console for errors.\n');
