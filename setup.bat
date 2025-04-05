@echo off
echo ===================================================
echo P2P Lending App Setup Script
echo ===================================================
echo.
echo This script will help install dependencies and start the application.
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Error: Node.js is not installed or not in your PATH.
  echo Please install Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

REM Display Node.js version
echo Node.js version:
node --version
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %ERRORLEVEL% neq 0 (
  echo.
  echo Error: Failed to install dependencies.
  echo.
  pause
  exit /b 1
)

REM Create .env file if it doesn't exist
if not exist .env (
  echo Creating .env file...
  copy .env.example .env
  echo.
  echo Please edit the .env file and add your Gemini API key.
  echo You can get a key from https://makersuite.google.com/app/apikey
  echo.
)

echo.
echo ===================================================
echo Setup complete! 
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Would you like to start the development server now?
echo.
set /p START_SERVER=Start server now? (Y/N): 

if /i "%START_SERVER%"=="Y" (
  echo.
  echo Starting development server...
  call npm run dev
) else (
  echo.
  echo You can start the server later with: npm run dev
)

echo.
pause 