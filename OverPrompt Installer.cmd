@echo off

echo Install chocolately
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

pause

echo sets the restriction policies
powershell -command Set-ExecutionPolicy AllSigned 

pause

echo Install Node.js using Chocolatey
powershell -command choco install -y --force nodejs-lts 

pause

echo Add Node.js and NPM to the path variables
SET PATH=C:\Program Files\Nodejs;%PATH%

pause

echo install additional packages
cd C:\Program Files\nodejs\install_tools.bat

echo Install ffmpeg using Chocolatey
choco install ffmpeg -y

pause

echo install NPM
npm i -g npm 

pause

echo Add ffmpeg to the path variables
setx /m path "%path%;C:\Program Files\ffmpeg\bin\"

pause

echo Display success message
echo Dependencies installed successfully!

echo The system may restart to complete the installation. Restart now?



pause
