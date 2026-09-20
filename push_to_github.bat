@echo off
chcp 65001 >nul
echo ==============================================
echo  Git Push - cash'u GitHub Pages
echo ==============================================
echo.
git push origin main
if errorlevel 1 goto err
echo.
echo [OK] Uspeshno otpravleno na GitHub Pages!
goto end
:err
echo.
echo [ERROR] Oshibka otpravki. Proverte dostup k GitHub.
:end
echo.
pause
