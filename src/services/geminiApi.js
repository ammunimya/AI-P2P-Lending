// Gemini Flash 2.0 API Service
// This file contains functions to communicate with the Gemini API

// API Key is stored in .env file as VITE_GEMINI_API_KEY
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-2.0:generateContent';

// Function to analyze borrower data and return a simulated credit score and recommendations
export const analyzeCreditProfile = async (borrowerData) => {
  try {
    // Format the prompt for credit analysis
    const prompt = `
      Act as a P2P lending financial advisor. Analyze this borrower profile and provide:
      1. A simulated credit score (between 300-850)
      2. 3 personalized tips for improving their loan eligibility
      3. The most suitable lender category for them

      Borrower details:
      - Monthly Income: $${borrowerData.income}
      - Credit History: ${borrowerData.creditHistory} years
      - Loan Purpose: ${borrowerData.purpose}
      - Requested Amount: $${borrowerData.loanAmount}
      
      Format the response as a JSON object with fields: score, tips (array), and lenderType.
    `;

    // Check if API key is available
    if (!GEMINI_API_KEY) {
      console.warn('No Gemini API key provided. Using mock data instead.');
      return getMockCreditAnalysis(borrowerData);
    }

    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the response text to extract structured data
    // This assumes Gemini returns a valid JSON string in its response
    try {
      const text = data.candidates[0].content.parts[0].text;
      // Find JSON within text (in case there's any extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if no JSON found
        return getMockCreditAnalysis(borrowerData);
      }
    } catch (e) {
      console.error('Error parsing Gemini response:', e);
      return getMockCreditAnalysis(borrowerData);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getMockCreditAnalysis(borrowerData);
  }
};

// Function to handle chatbot queries
export const getChatbotResponse = async (userQuestion) => {
  try {
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      console.warn('No Gemini API key provided. Using mock responses instead.');
      return getMockChatbotResponse(userQuestion);
    }

    // Format the prompt for the chatbot
    const prompt = `
      You are a helpful assistant for a P2P lending platform. 
      Answer this question about P2P lending in a friendly, concise manner:
      "${userQuestion}"
      
      Keep your answer under 150 words and focus on being accurate and helpful.
    `;

    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Chatbot API Error:', errorText);
      return getMockChatbotResponse(userQuestion);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return getMockChatbotResponse(userQuestion);
    }
  } catch (error) {
    console.error('Error calling Gemini API for chatbot:', error);
    return getMockChatbotResponse(userQuestion);
  }
};

// Mock chatbot responses for common P2P lending questions
export const getMockChatbotResponse = (question) => {
  // Convert question to lowercase for easier matching
  const lowerQuestion = question.toLowerCase();
  
  // Array of question-answer pairs
  const responses = [
    {
      keywords: ['what is p2p', 'peer to peer', 'p2p lending'],
      response: "P2P (Peer-to-Peer) lending connects individual borrowers directly with lenders through online platforms, bypassing traditional banks. This often results in better interest rates for both parties. Borrowers get loans based on their credit profiles, while lenders can diversify investments across multiple loans to manage risk."
    },
    {
      keywords: ['credit score', 'affect', 'rate', 'interest'],
      response: "Your credit score significantly impacts loan rates in P2P lending. Higher scores (700+) qualify for the lowest rates (5-8%). Mid-range scores (640-699) receive moderate rates (8-15%). Lower scores (below 640) face higher rates (15-30%) or may be declined. Some P2P platforms consider additional factors beyond traditional credit scores."
    },
    {
      keywords: ['document', 'need', 'require', 'application'],
      response: "For a P2P loan, you typically need: identification (government-issued ID), proof of income (pay stubs, tax returns), bank statements (3-6 months), employment verification, and possibly utility bills for address verification. Some platforms may request additional documents depending on loan purpose or amount."
    },
    {
      keywords: ['safe', 'security', 'risk', 'protect'],
      response: "P2P lending has both risks and protections. Reputable platforms verify borrower identities, conduct credit checks, and offer some recovery processes. However, loans aren't FDIC-insured like bank deposits. Diversification across multiple loans helps lenders reduce risk. Always research the platform's security measures, regulatory compliance, and reviews before participating."
    },
    {
      keywords: ['benefit', 'advantage', 'better than bank'],
      response: "P2P lending offers several advantages: potentially higher returns for lenders than savings accounts, lower interest rates for borrowers compared to traditional loans, faster application processing, more flexible eligibility criteria, and transparent fee structures. It also enables people to access loans who might be rejected by traditional banks."
    }
  ];
  
  // Try to match the question with predefined responses
  for (const item of responses) {
    if (item.keywords.some(keyword => lowerQuestion.includes(keyword))) {
      return item.response;
    }
  }
  
  // Default response if no matches
  return "That's a great question about P2P lending. While I don't have specific information on that particular topic, P2P lending generally connects borrowers directly with lenders through online platforms. This often results in better rates for both parties compared to traditional banking. Would you like to know more about how P2P lending works, credit requirements, or investment strategies?";
};

// Fallback function for API testing or when key is not available
export const getMockCreditAnalysis = (borrowerData) => {
  // Calculate a simulated score based on income and credit history
  const baseScore = 550;
  const incomeScore = Math.min(100, Math.floor(borrowerData.income / 1000) * 10);
  const historyScore = Math.min(100, borrowerData.creditHistory * 20);
  const randomFactor = Math.floor(Math.random() * 50);
  
  const totalScore = Math.min(850, baseScore + incomeScore + historyScore + randomFactor);
  
  return {
    score: totalScore,
    tips: [
      "Keep your credit utilization below 30% of available credit",
      `For ${borrowerData.purpose} loans, consider saving for a larger down payment`,
      "Regularly review your credit report for errors and dispute any inaccuracies"
    ],
    lenderType: totalScore > 700 ? "premium" : totalScore > 620 ? "mid-tier" : "accessible"
  };
};