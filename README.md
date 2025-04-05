# P2P Lending Web App with Gemini Flash 2.0

A React-based Peer-to-Peer (P2P) lending web application that uses Gemini Flash 2.0 for AI credit analysis and a chatbot assistant.

## Features

- **No login/authentication required** - Simple UX focused on credit analysis
- **AI-powered credit analysis** using Gemini Flash 2.0
- **Borrower input form** to collect loan amount, income, credit history, and purpose
- **AI-generated credit assessment** with simulated score, personalized tips, and lender matching
- **Chatbot assistant** for answering common P2P lending questions
- **Responsive design** for desktop and mobile

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn

### Installation

#### Using setup script (Windows users)

Windows users who encounter PowerShell execution policy issues can use the provided setup script:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd p2p-lending-app
   ```

2. Run the setup script by double-clicking `setup.bat` or running it from Command Prompt:
   ```
   setup.bat
   ```

This script will:
- Install dependencies
- Create a .env file
- Offer to start the development server

#### Manual installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd p2p-lending-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey) and add it to the `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

The application will start at `http://localhost:3000`

## Project Structure

```
p2p-lending-app/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── BorrowerForm.jsx
│   │   ├── ResultCard.jsx
│   │   └── Chatbot.jsx
│   ├── services/        # API services
│   │   └── geminiApi.js
│   ├── data/            # Mock data
│   │   └── dummyData.js
│   ├── utils/           # Utility functions
│   │   └── formatting.js
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Example environment variables
├── index.html           # HTML template
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration
└── setup.bat            # Windows setup script
```

## Recent Improvements

- Added client-side form validation
- Improved formatting for currency values and credit scores
- Added setup script for Windows users to bypass PowerShell execution policy issues
- Enhanced UI with better error handling

## Notes

- The application uses a fallback mechanism when no Gemini API key is provided, using mock data for demonstration purposes.
- This is a demo application and does not store any user data.
- The credit score and analysis are simulated and should not be used for actual lending decisions.

## Troubleshooting

### PowerShell Execution Policy Error

If you see `npm : File ... cannot be loaded because running scripts is disabled on this system`, you can:

1. Use the provided `setup.bat` script
2. Run PowerShell as Administrator and execute: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Use Command Prompt instead of PowerShell to run npm commands

## Technologies Used

- React
- Vite
- Tailwind CSS
- Gemini Flash 2.0 API