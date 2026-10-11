@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install a supported Node.js LTS version first.
  pause
  exit /b 1
)
if not exist "node_modules\.package-lock.json" (
  echo Installing portfolio dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo Dependency installation failed. Check the network connection and try again.
    pause
    exit /b 1
  )
)
echo Starting portfolio at http://127.0.0.1:5173
call npm.cmd run dev -- --open
if errorlevel 1 pause
