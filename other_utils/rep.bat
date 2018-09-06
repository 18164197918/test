@echo off
if ""%2"" == """" goto err

setlocal enabledelayedexpansion
for /f "delims=" %%i in (%1) do (
set ii=%%i
set ii=!ii:%2=%3!
echo !ii!>>%1.tmp
)
del %1
ren %1.tmp %1

goto exit

:err
@echo Rep[.BAT] file old-string new-string
@echo Usage: rep.bat demo.txt old-str new-str

goto exit

:exit
