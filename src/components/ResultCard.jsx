import { useState, useEffect } from 'react';
import { lenders, creditScoreRanges, lendingAdvice } from '../data/dummyData';
import { formatCurrency, formatCreditScore } from '../utils/formatting';

const ResultCard = ({ analysisResult, borrowerData }) => {
  const [matchedLenders, setMatchedLenders] = useState([]);
  const [scoreCategory, setScoreCategory] = useState('');

  useEffect(() => {
    if (!analysisResult || !analysisResult.score) return;

    // Find the credit score category
    const score = analysisResult.score;
    let category = '';
    
    Object.entries(creditScoreRanges).forEach(([key, range]) => {
      if (score >= range.min && score <= range.max) {
        category = key;
      }
    });
    
    setScoreCategory(category);

    // Match with lenders based on credit score
    const filteredLenders = lenders.filter(
      lender => lender.minCreditScore <= score
    ).sort((a, b) => {
      // Sort by how close the minimum credit score is to the user's score
      // This prioritizes lenders who are best suited for the user's score range
      return Math.abs(b.minCreditScore - score) - Math.abs(a.minCreditScore - score);
    });
    
    setMatchedLenders(filteredLenders.slice(0, 3)); // Get top 3 matches
  }, [analysisResult]);

  if (!analysisResult) return null;
  
  const { colorClass } = formatCreditScore(analysisResult.score);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Credit Analysis</h2>
        <div className="mt-4 mb-2">
          <div className="text-5xl font-bold my-3">
            <span className={colorClass}>
              {analysisResult.score}
            </span>
          </div>
          <p className="text-gray-600">
            {scoreCategory && creditScoreRanges[scoreCategory]?.description}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Personalized Tips</h3>
        <ul className="list-disc pl-5 space-y-1">
          {analysisResult.tips.map((tip, index) => (
            <li key={index} className="text-gray-600">{tip}</li>
          ))}
        </ul>
      </div>

      {borrowerData.purpose && lendingAdvice[borrowerData.purpose] && (
        <div className="mb-6 p-3 bg-blue-50 rounded-md">
          <h3 className="text-md font-semibold text-gray-700 mb-1">Advice for {borrowerData.purpose} Loans</h3>
          <p className="text-gray-600 text-sm">{lendingAdvice[borrowerData.purpose]}</p>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Recommended Lenders</h3>
        
        {matchedLenders.length > 0 ? (
          <div className="space-y-3">
            {matchedLenders.map(lender => (
              <div key={lender.id} className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">{lender.name}</h4>
                  <span className="text-sm text-blue-600">{lender.interestRate}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{lender.description}</p>
                <div className="mt-2 flex justify-between">
                  <div className="flex flex-wrap gap-1">
                    {lender.loanTypes.map((type, i) => (
                      <span key={i} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    Up to {formatCurrency(lender.maxLoanAmount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No matching lenders found for your profile.</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard; 