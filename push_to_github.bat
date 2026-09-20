@echo off
chcp 65001 >nul
echo ==============================================
echo  Отправка обновлений cash'u на GitHub Pages
echo ==============================================
echo.
git push origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [OK] Успешно отправлено на GitHub Pages!
) else (
    echo [ОШИБКА] Не удалось отправить. Проверьте авторизацию в GitHub.
)
echo.
pause
