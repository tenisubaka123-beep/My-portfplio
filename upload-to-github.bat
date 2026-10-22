@echo off
title Push Manga Portfolio to GitHub
chcp 65001 >nul
echo ========================================================
echo   GitHub リポジトリへアップロード中...
echo   https://github.com/tenisubaka123-beep/My-portfolio
echo ========================================================
cd /d "C:\Users\yoshi\.gemini\antigravity\scratch\manga-portfolio"

echo.
echo ブラウザ認証ウィンドウが表示されたら「Sign in with your browser」
echo または「Authorize」をクリックしてログインを完了してください。
echo （パスワードやトークンの手動入力は不要です）
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   【成功】GitHub へのアップロードが完了しました！
    echo   リポジトリURL: https://github.com/tenisubaka123-beep/My-portfolio
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   アップロードが完了しませんでした。
    echo   画面の指示に従って再試行してください。
    echo ========================================================
)
echo.
pause
