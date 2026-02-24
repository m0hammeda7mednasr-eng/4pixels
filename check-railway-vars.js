#!/usr/bin/env node

/**
 * Railway Variables Checker
 * يفحص المتغيرات المطلوبة في Railway
 */

console.log('🔍 Checking Railway Environment Variables...\n');

const requiredVars = {
  'CORS_ORIGIN': 'URL الفرونت (Vercel)',
  'FRONTEND_URL': 'URL الفرونت (Vercel)',
  'NODE_ENV': 'production',
  'JWT_SECRET': 'مفتاح سري للـ JWT',
  'PORT': 'رقم البورت (Railway بيضيفه تلقائي)'
};

const optionalVars = {
  'SUPABASE_URL': 'رابط Supabase',
  'SUPABASE_ANON_KEY': 'مفتاح Supabase العام',
  'SUPABASE_SERVICE_KEY': 'مفتاح Supabase الخاص'
};

let missingRequired = [];
let missingOptional = [];

console.log('📋 Required Variables:\n');
Object.entries(requiredVars).forEach(([key, description]) => {
  const value = process.env[key];
  if (value) {
    console.log(`✅ ${key}: ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`);
  } else {
    console.log(`❌ ${key}: MISSING - ${description}`);
    missingRequired.push(key);
  }
});

console.log('\n📋 Optional Variables:\n');
Object.entries(optionalVars).forEach(([key, description]) => {
  const value = process.env[key];
  if (value) {
    console.log(`✅ ${key}: ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`);
  } else {
    console.log(`⚠️  ${key}: Not set - ${description}`);
    missingOptional.push(key);
  }
});

console.log('\n' + '='.repeat(60) + '\n');

if (missingRequired.length > 0) {
  console.log('❌ Missing Required Variables:');
  missingRequired.forEach(key => {
    console.log(`   - ${key}: ${requiredVars[key]}`);
  });
  console.log('\n⚠️  الموقع مش هيشتغل بدون المتغيرات دي!\n');
  process.exit(1);
} else {
  console.log('✅ All required variables are set!\n');
}

if (missingOptional.length > 0) {
  console.log('⚠️  Missing Optional Variables:');
  missingOptional.forEach(key => {
    console.log(`   - ${key}: ${optionalVars[key]}`);
  });
  console.log('\n💡 الموقع هيشتغل بس بعض المميزات ممكن متشتغلش\n');
}

// Check CORS configuration
console.log('🔍 CORS Configuration Check:\n');
const corsOrigin = process.env.CORS_ORIGIN;
const frontendUrl = process.env.FRONTEND_URL;

if (corsOrigin && frontendUrl) {
  if (corsOrigin === frontendUrl) {
    console.log('✅ CORS_ORIGIN and FRONTEND_URL match');
  } else {
    console.log('⚠️  CORS_ORIGIN and FRONTEND_URL are different:');
    console.log(`   CORS_ORIGIN: ${corsOrigin}`);
    console.log(`   FRONTEND_URL: ${frontendUrl}`);
  }
  
  if (corsOrigin.includes('vercel.app') || frontendUrl.includes('vercel.app')) {
    console.log('✅ Using Vercel URL');
  }
  
  if (corsOrigin.startsWith('https://') || frontendUrl.startsWith('https://')) {
    console.log('✅ Using HTTPS (secure)');
  } else {
    console.log('⚠️  Not using HTTPS - should use https:// in production');
  }
}

console.log('\n' + '='.repeat(60));
console.log('\n📝 Recommended Railway Variables:\n');
console.log('CORS_ORIGIN=https://4pixels-two.vercel.app');
console.log('FRONTEND_URL=https://4pixels-two.vercel.app');
console.log('NODE_ENV=production');
console.log('JWT_SECRET=4pixels-secret-key-2024-mohammed-ahmed');
console.log('SUPABASE_URL=https://kkwsonkyoaubyzkvfftl.supabase.co');
console.log('SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
console.log('SUPABASE_SERVICE_KEY=sb_publishable_64PNNISj3KMJXAubknLRVQ...');
console.log('\n' + '='.repeat(60) + '\n');

console.log('🚀 Next Steps:\n');
console.log('1. Update variables in Railway Dashboard');
console.log('2. Delete FRONTEND_UR (typo)');
console.log('3. Click "Redeploy"');
console.log('4. Wait 2-3 minutes');
console.log('5. Test: https://4pixels-production.up.railway.app/api/services');
console.log('\n✨ Done!\n');
