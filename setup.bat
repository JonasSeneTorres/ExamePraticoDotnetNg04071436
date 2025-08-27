@echo off
setlocal enabledelayedexpansion

echo =========================
echo 1. Restaurando dependências .NET
echo =========================
dotnet restore ExamePratico.Services/ExamePratico.Services.csproj
if %errorlevel% neq 0 (
    echo [ERRO 1] Erro ao restaurar pacotes NuGet
    echo.
    pause
    exit /b %errorlevel%
)

echo =========================
echo 2. Instalando dependências NPM do Angular
echo =========================
cd ExamePratico.Presentation/PortalSeguroDeCarro

if exist node_modules (
    echo Pacotes NPM já instalados. Pulando instalacao...
) else (
    npm install
    if %errorlevel% neq 0 (
        echo [ERRO 2] Erro ao instalar pacotes NPM
        echo.
        pause
        exit /b %errorlevel%
    )
)
cd ../..

echo =========================
echo 3. Subindo Docker Compose
echo =========================
docker-compose up -d --build
if %errorlevel% neq 0 (
    echo [ERRO 3] Erro ao subir Docker Compose
    echo.
    pause
    exit /b %errorlevel%
)

echo =========================
echo 4. Aguardando SQL Server ficar pronto...
echo =========================
:CheckSQL
powershell -Command "try { $tcp = Test-NetConnection -ComputerName 'localhost' -Port 1433; exit ([int](!$tcp.TcpTestSucceeded)) } catch { exit 1 }"
if %errorlevel% neq 0 (
    echo SQL Server ainda nao esta pronto, aguardando 5 segundos...
    timeout /t 5 >nul
    goto CheckSQL
)

echo =========================
echo 5. Checando Entity Framework Tools (dotnet-ef)
echo =========================
dotnet ef --version >nul 2>&1
if %errorlevel% neq 0 (
    echo dotnet-ef nao encontrado. Instalando como ferramenta local...
    cd ExamePratico.Services
    if not exist ..\.config\dotnet-tools.json (
        dotnet new tool-manifest
    )
    dotnet tool install dotnet-ef --version 8.*
    if %errorlevel% neq 0 (
        echo [ERRO 4] Erro ao instalar dotnet-ef
        echo.
        pause
        exit /b %errorlevel%
    )
    cd ..
)

echo =========================
echo 6. Atualizando migrations do Entity Framework
echo =========================
dotnet tool run dotnet-ef database update --startup-project ExamePratico.Services/ExamePratico.Services.csproj --project ExamePratico.Infra.Data/ExamePratico.Infra.Data.csproj
if %errorlevel% neq 0 (
    echo [ERRO 5] Erro ao atualizar o banco de dados com migrations
    echo.
    pause
    exit /b %errorlevel%
)

echo =========================
echo ✅ Tudo pronto! Aplicação inicializada e banco atualizado.
echo =========================
pause
