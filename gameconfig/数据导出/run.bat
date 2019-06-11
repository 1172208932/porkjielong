@rem 配置文件为conf.txt

set Output_Path=..\..\bin\gameconfig\
del "%Output_Path%\*.json"
/q 
/f
java -jar -Dfile.encoding=utf-8 Excel2Json.jar
ren %Output_Path%\*.txt *.json
pause