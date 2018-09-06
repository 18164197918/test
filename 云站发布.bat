@echo off
if exist baijiekj.com.zip (del baijiekj.com.zip)


"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project css/*.*
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project cs/*
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project ctrl/*.*
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project goods/*.*
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project img/*.*

cd js
copy api.js ..\api.js.bk /y

powershell -Command "(gc api.js) -replace '172.16.12.95:8080', 'www.baijiekj.com' | Out-File -Encoding utf8 api2.js"
del api.js
ren api2.js api.js

cd ..
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project js/*.*
copy api.js.bk js\api.js /y
del api.js.bk



"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project tpl/*.*
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project dist/*.*
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project news/*.*
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project page/*.*
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project prod/*.*

"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r -x*.bak -x.project user/*.*

rem *** root
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip index.html
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip mapLink.html
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip baiduMap2.html
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip siteMap.html
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip payFailure.html
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip paySucce.html


"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip robots.txt
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip favicon.ico

rem *** models/*
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip  models/basepath.js
rem "C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip  models/api.js
"C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip  models/showmodel.html

rem "C:\Program Files\WinRAR\WinRAR" a -afzip  baijiekj.com.zip -r models/*.js

rem ***miniful
rd /s /q gulpCS\cwsproject4
md gulpCS\cwsproject4
copy baijiekj.com.zip  gulpCS\cwsproject4\baijiekj.com.zip /y
cd  gulpCS\cwsproject4
"C:\Program Files\WinRAR\WinRAR" x -t -o-p  baijiekj.com.zip  
cd ..
gulp build

@echo on