import { useState } from 'react';
import BorrowerForm from './components/BorrowerForm';
import ResultCard from './components/ResultCard';
import Chatbot from './components/Chatbot';
import { analyzeCreditProfile, getMockCreditAnalysis } from './services/geminiApi';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [borrowerData, setBorrowerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setBorrowerData(formData);
    
    try {
      // Check if API key is configured
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      let result;
      if (apiKey) {
        // Use the real API if key is available
        result = await analyzeCreditProfile(formData);
      } else {
        // Use mock data if no API key
        console.warn('No Gemini API key found. Using mock data.');
        result = getMockCreditAnalysis(formData);
      }
      
      setAnalysisResult(result);
    } catch (err) {
      console.error('Error analyzing credit profile:', err);
      setError('Failed to analyze your profile. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">P2P Lending Analysis</h1>
        <p className="text-gray-600 mt-2">Get matched with peer lenders based on your profile</p>
      </header>
      
      <main className="max-w-4xl mx-auto">
        <div className={`transition-all duration-300 ${analysisResult ? 'grid md:grid-cols-2 gap-6' : 'block'}`}>
          <div>
            <BorrowerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            
            {error && (
              <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-md">
                {error}
              </div>
            )}
          </div>
          
          {analysisResult && (
            <div>
              <ResultCard analysisResult={analysisResult} borrowerData={borrowerData} />
            </div>
          )}
        </div>
        
        <div className="mt-10 max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">How It Works</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <ol className="list-decimal text-left pl-6 space-y-2">
              <li className="text-gray-700">Fill out the form with your financial details</li>
              <li className="text-gray-700">Our AI analyzes your profile using <span className="font-medium">Gemini Flash 2.0</span></li>
              <li className="text-gray-700">Receive personalized lending recommendations</li>
              <li className="text-gray-700">Connect with matching P2P lenders</li>
            </ol>
            <p className="mt-4 text-sm text-gray-500">
              This is a demo application. No personal data is stored.
            </p>
          </div>
        </div>
      </main>
      
      {/* Chatbot component */}
      <Chatbot />
      
      <footer className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm">
        <p>© 2023 P2P Lending Analysis Tool | Powered by Gemini Flash 2.0</p>
      </footer>
    </div>
  );
}

export default App; 