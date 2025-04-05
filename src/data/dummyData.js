// Dummy lender data for P2P lending app
export const lenders = [
  {
    id: 1,
    name: "SafeLoan Financial",
    interestRate: "5.5-8.2%",
    loanTypes: ["Personal", "Debt Consolidation", "Home Improvement"],
    minCreditScore: 680,
    description: "Premium lender focusing on low-risk borrowers with excellent terms.",
    maxLoanAmount: 50000
  },
  {
    id: 2,
    name: "OpportunityFunds",
    interestRate: "7.8-12.5%",
    loanTypes: ["Personal", "Business", "Education"],
    minCreditScore: 620,
    description: "Mid-tier lender with flexible terms and moderate interest rates.",
    maxLoanAmount: 35000
  },
  {
    id: 3,
    name: "NewStart Lending",
    interestRate: "9.9-15.5%",
    loanTypes: ["Personal", "Debt Consolidation", "Emergency"],
    minCreditScore: 580,
    description: "Specialized in helping borrowers with lower credit scores rebuild their financial history.",
    maxLoanAmount: 25000
  },
  {
    id: 4,
    name: "GrowthCapital",
    interestRate: "6.5-10.2%",
    loanTypes: ["Business", "Expansion", "Equipment"],
    minCreditScore: 650,
    description: "Focused on small business loans and entrepreneurial ventures.",
    maxLoanAmount: 75000
  },
  {
    id: 5,
    name: "CommunityFirst",
    interestRate: "8.0-13.5%",
    loanTypes: ["Personal", "Community Projects", "Education"],
    minCreditScore: 600,
    description: "Community-oriented lender with special programs for education and local development.",
    maxLoanAmount: 30000
  }
];

// Mock credit score ranges and recommendations
export const creditScoreRanges = {
  excellent: { min: 750, max: 850, description: "Excellent credit score. You qualify for premium rates." },
  good: { min: 700, max: 749, description: "Good credit score. You qualify for competitive rates." },
  fair: { min: 650, max: 699, description: "Fair credit score. You qualify for standard rates." },
  poor: { min: 600, max: 649, description: "Below average credit score. Limited options available." },
  bad: { min: 300, max: 599, description: "Poor credit score. Consider credit improvement before applying." }
};

// Mock lending advice based on loan purpose
export const lendingAdvice = {
  "Debt Consolidation": "When consolidating debt, focus on getting a lower interest rate than your current debts to save money over time.",
  "Home Improvement": "Home improvement loans may qualify for tax benefits if they substantially improve your property value.",
  "Education": "Consider federal student loans before private options, as they typically offer better protections and forgiveness programs.",
  "Business": "Business loans should be calculated against projected returns to ensure positive ROI.",
  "Emergency": "For emergency loans, prioritize quick disbursement and manageable repayment terms.",
  "Personal": "Personal loans should ideally be used for necessary expenses rather than discretionary spending."
}; 