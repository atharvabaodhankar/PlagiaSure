// Quick test for GPT-5-nano integration
import axios from 'axios';

const testGPT5Nano = async () => {
  try {
    console.log('🧪 Testing GPT-5-nano API integration...\n');

    const testText = `
      Artificial intelligence has revolutionized numerous industries by providing 
      innovative solutions to complex problems. Machine learning algorithms enable 
      systems to learn from data and improve their performance over time without 
      explicit programming. This technology has applications in healthcare, finance, 
      transportation, and many other sectors.
    `;

    const response = await axios.post(
      'https://prod.api.market/api/v1/swift-api/gpt-5-nano/chat/completions',
      {
        model: 'gpt-5-nano',
        stream: false,
        messages: [
          {
            role: 'user',
            content: `You are an AI content detector. Analyze the following text and determine if it was likely written by AI or a human. Respond with ONLY a JSON object containing: {"ai_probability": <number between 0 and 1>, "reasoning": "<brief explanation>"}\n\nText to analyze:\n${testText}`
          }
        ]
      },
      {
        headers: {
          'accept': 'application/json',
          'x-api-market-key': 'cmig1rhtm0004ky04pflmu0l5',
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    console.log('✅ API Response received!\n');
    console.log('Response data:', JSON.stringify(response.data, null, 2));

    if (response.data && response.data.choices && response.data.choices[0]) {
      const content = response.data.choices[0].message.content;
      console.log('\n📝 GPT-5-nano Response:');
      console.log(content);

      try {
        const result = JSON.parse(content);
        console.log('\n🎯 Parsed Result:');
        console.log(`   AI Probability: ${(result.ai_probability * 100).toFixed(1)}%`);
        console.log(`   Reasoning: ${result.reasoning}`);
      } catch (parseError) {
        console.log('\n⚠️ Response is not in JSON format');
      }
    }

    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
};

testGPT5Nano();
