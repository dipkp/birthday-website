@echo off
rem Serve the replica and open it. ES modules, video seeking and the pricing
rem fetch all behave better over http than over file://, so this is the
rem recommended way to run it. Double-clicking index.html still works too.
setlocal
cd /d "%~dp0"

rem The replica is served on 8900 because 8899 is used by another local project.
set PORT=8900

where python >nul 2>nul
if errorlevel 1 (
  echo Python was not found on PATH. Open index.html directly instead,
  echo or serve this folder with any static server on port %PORT%.
  pause
  exit /b 1
)

echo Serving %CD%
echo   http://localhost:%PORT%/
echo Close this window to stop the server.
echo.

start "" "http://localhost:%PORT%/"
python -m http.server %PORT%
