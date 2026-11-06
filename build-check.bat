@echo off
cd /d "c:\Users\Dell Latitude\Desktop\Renewed Minds"
npm run build > build-output.txt 2>&1
echo BUILD_EXIT_CODE=%ERRORLEVEL% >> build-output.txt
