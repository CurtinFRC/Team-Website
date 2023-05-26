@echo off
echo Git Add, Commit and Push.
set /p input= Commit message? 
set /p branch= Branch? 
@REM echo Input is: %input%
git add .
git commit -m "%input%"
git push origin %branch%