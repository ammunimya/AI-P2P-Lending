import { useState } from 'react';
import { validateBorrowerForm } from '../utils/formatting';

const BorrowerForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    loanAmount: '',
    income: '',
    creditHistory: '',
    purpose: 'Personal'
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submission
    const { isValid, errors } = validateBorrowerForm(formData);
    
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    
    // Convert string values to numbers for processing
    const processedData = {
      ...formData,
      loanAmount: Number(formData.loanAmount),
      income: Number(formData.income),
      creditHistory: Number(formData.creditHistory)
    };
    
    onSubmit(processedData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Loan Request Form</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="loanAmount" className="block text-gray-700 font-medium mb-2">
            Loan Amount ($)
          </label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${formErrors.loanAmount ? 'border-red-500' : 'border-gray-300'}`}
            min="1000"
            max="100000"
          />
          {formErrors.loanAmount && (
            <p className="mt-1 text-red-500 text-sm">{formErrors.loanAmount}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="income" className="block text-gray-700 font-medium mb-2">
            Monthly Income ($)
          </label>
          <input
            type="number"
            id="income"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
              ${formErrors.income ? 'border-red-500' : 'border-gray-300'}`}
            min="0"
          />
          {formErrors.income && (
            <p className="mt-1 text-red-500 text-sm">{formErrors.income}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="creditHistory" className="block text-gray-700 font-medium mb-2">
            Years of Credit History
          </label>
          <input
            type="number"
            id="creditHistory"
            name="creditHistory"
            value={formData.creditHistory}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
              ${formErrors.creditHistory ? 'border-red-500' : 'border-gray-300'}`}
            min="0"
            max="50"
            step="0.5"
          />
          {formErrors.creditHistory && (
            <p className="mt-1 text-red-500 text-sm">{formErrors.creditHistory}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="purpose" className="block text-gray-700 font-medium mb-2">
            Loan Purpose
          </label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
              ${formErrors.purpose ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="Personal">Personal</option>
            <option value="Debt Consolidation">Debt Consolidation</option>
            <option value="Home Improvement">Home Improvement</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Emergency">Emergency</option>
          </select>
          {formErrors.purpose && (
            <p className="mt-1 text-red-500 text-sm">{formErrors.purpose}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Get My Score'}
        </button>
      </form>
    </div>
  );
};

export default BorrowerForm; 