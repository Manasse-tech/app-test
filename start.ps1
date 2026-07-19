$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
Write-Host 'Starting NSUG infrastructure...'
docker compose up -d
Write-Host 'Starting web application...'
Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', 'npm run dev -- --filter=web' -WindowStyle Hidden
Write-Host 'NSUG is starting. Open http://localhost:3000 when ready.'
