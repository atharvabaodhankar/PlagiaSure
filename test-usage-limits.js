// Test script to verify usage limits are working correctly
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001';

// Test user credentials (you'll need to replace with actual test user)
const TEST_USER = {
  email: 'oplegend630@gmail.com', // Replace with your test user email
  password: 'your-password' // Replace with your test user password
};

async function testUsageLimits() {
  try {
    console.log('🧪 Testing Usage Limits...\n');

    // 1. Login to get auth token
    console.log('1. Logging in...');
    const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    });

    const token = loginResponse.data.session.access_token;
    console.log('✅ Login successful\n');

    // 2. Check current usage status
    console.log('2. Checking current usage status...');
    const statusResponse = await axios.get(`${API_BASE_URL}/api/billing/status`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { subscription, usage } = statusResponse.data;
    console.log('📊 Current Status:');
    console.log(`   - Has Subscription: ${statusResponse.data.hasSubscription}`);
    if (subscription) {
      console.log(`   - Plan: ${subscription.plan_type}`);
      console.log(`   - Active: ${subscription.isActive}`);
      console.log(`   - Checks Limit: ${subscription.checks_limit}`);
    }
    if (usage) {
      console.log(`   - Monthly Usage: ${usage.monthlyUsage}`);
      console.log(`   - Lifetime Usage: ${usage.lifetimeUsage}`);
      console.log(`   - Last Scan: ${usage.lastScanAt}`);
    }
    console.log('');

    // 3. Try to upload a file (this should be blocked if limit exceeded)
    console.log('3. Testing file upload (usage limit check)...');
    
    // Create a simple test file
    const FormData = require('form-data');
    const form = new FormData();
    form.append('assignment', Buffer.from('This is a test document for plagiarism checking.'), {
      filename: 'test.txt',
      contentType: 'text/plain'
    });
    form.append('studentName', 'Test Student');
    form.append('courseName', 'Test Course');
    form.append('assignmentTitle', 'Test Assignment');

    try {
      const uploadResponse = await axios.post(`${API_BASE_URL}/api/assignments/upload`, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${token}`
        }
      });

      console.log('✅ Upload successful - usage limit not exceeded');
      console.log(`   - Assignment ID: ${uploadResponse.data.assignment.id}`);
      if (uploadResponse.data.usageInfo) {
        console.log(`   - Current Usage: ${uploadResponse.data.usageInfo.currentUsage}/${uploadResponse.data.usageInfo.limit}`);
        console.log(`   - Limit Type: ${uploadResponse.data.usageInfo.limitType}`);
      }
    } catch (uploadError) {
      if (uploadError.response?.status === 403) {
        console.log('🚫 Upload blocked - usage limit exceeded');
        console.log(`   - Error: ${uploadError.response.data.error}`);
        console.log(`   - Message: ${uploadError.response.data.message}`);
        console.log(`   - Current Usage: ${uploadError.response.data.currentUsage}/${uploadError.response.data.limit}`);
        console.log(`   - Limit Type: ${uploadError.response.data.limitType}`);
      } else {
        console.log('❌ Upload failed with unexpected error:', uploadError.response?.data || uploadError.message);
      }
    }

    console.log('\n✅ Usage limit test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testUsageLimits();