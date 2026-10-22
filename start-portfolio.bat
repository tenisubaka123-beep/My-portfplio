@echo off
title Manga Portfolio Website Launcher
echo ========================================================
echo   Starting Skip and Loafer Manga Portfolio Website...
echo ========================================================
cd /d "C:\Users\yoshi\.gemini\antigravity\scratch\manga-portfolio"

echo Opening browser at http://localhost:3000 ...
start "" "http://localhost:3000"

echo Running Next.js server... (Keep this window open while browsing)
npm.cmd run dev
pause
