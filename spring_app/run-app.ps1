# Script para ejecutar la aplicación y mostrar logs
Write-Host "Deteniendo procesos Java anteriores..." -ForegroundColor Yellow
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "`nEjecutando aplicación Spring Boot...`n" -ForegroundColor Cyan
Write-Host "Presiona Ctrl+C para detener la aplicación`n" -ForegroundColor Yellow
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Ejecutar y mostrar output en tiempo real
mvn spring-boot:run

