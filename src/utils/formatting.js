// Utility functions for formatting and validation

/**
 * Format a number as US currency
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format a credit score with appropriate color class
 * @param {number} score - Credit score (300-850)
 * @returns {object} - Contains the formatted score and the color class
 */
export const formatCreditScore = (score) => {
  let colorClass = '';
  
  if (score >= 750) colorClass = 'text-green-600';
  else if (score >= 700) colorClass = 'text-green-500';
  else if (score >= 650) colorClass = 'text-yellow-500';
  else if (score >= 600) colorClass = 'text-orange-500';
  else colorClass = 'text-red-500';
  
  return {
    score,
    colorClass
  };
};

/**
 * Validate borrower form input
 * @param {object} formData - The form data to validate
 * @returns {object} - Contains isValid flag and any error messages
 */
export const validateBorrowerForm = (formData) => {
  const errors = {};
  
  if (!formData.loanAmount || formData.loanAmount <= 0) {
    errors.loanAmount = 'Please enter a valid loan amount';
  } else if (formData.loanAmount > 100000) {
    errors.loanAmount = 'Loan amount cannot exceed $100,000';
  }
  
  if (!formData.income || formData.income <= 0) {
    errors.income = 'Please enter a valid income amount';
  }
  
  if (formData.creditHistory === '' || formData.creditHistory < 0) {
    errors.creditHistory = 'Please enter valid credit history years';
  }
  
  if (!formData.purpose) {
    errors.purpose = 'Please select a loan purpose';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 