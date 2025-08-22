@echo off
setlocal

echo =========================
echo 1. Restaurando dependências .NET
echo =========================
dotnet restore ExamePratico.Services/ExamePratico.Services.csproj
if %errorlevel% neq 0 (
    echo Erro ao restaurar pacotes NuGet
    exit /b %errorlevel%
)

echo =========================
echo 2. Instalando dependências NPM do Angular
echo =========================
cd Frontend
npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar pacotes NPM
    exit /b %errorlevel%
)
cd ..

echo =========================
echo 3. Subindo Docker Compose
echo =========================
docker-compose up -d --build
if %errorlevel% neq 0 (
    echo Erro ao subir Docker Compose
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
echo 5. Atualizando migrations do Entity Framework
echo =========================
dotnet ef database update --startup-project ExamePratico.Services/ExamePratico.Services.csproj --project ExamePratico.Infra.Data/ExamePratico.Infra.Data.csproj
if %errorlevel% neq 0 (
    echo Erro ao atualizar o banco de dados com migrations
    exit /b %errorlevel%
)

echo =========================
echo ✅ Tudo pronto! Aplicação inicializada e banco atualizado.
echo =========================
pause
