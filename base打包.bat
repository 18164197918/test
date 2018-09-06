@echo off
if exist bjcs.zip (del bjcs.zip)



"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r css/x.css
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r img/comm/zTreeStandard.png
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r img/comm/adv-close.gif
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r js/comm/*

"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r js/x.js


cd js
copy api.js ..\api.js.bk /y

powershell -Command "(gc api.js) -replace '172.16.12.95:8080', 'www.baijiekj.com' | Out-File -Encoding utf8 api2.js"
del api.js
ren api2.js api.js

cd ..

"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r js/api.js
copy api.js.bk js\api.js /y
del api.js.bk


"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r js/common.js
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r js/modelCom.js
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r js/cwspopup.js
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r js/validation.js

"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r ctrl/*
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r cs/*

rem ******************** old CWS project3 version BEGIN*****************
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r css/base.css
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r css/zTreeStyle.css
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r css/user.css
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r css/index.css
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r css/table.css
"C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r css/top.css
rem "C:\Program Files\WinRAR\WinRAR" a -afzip  bjcs -r css/footer.css
rem ******************** old CWS project3 version END *****************

@echo on