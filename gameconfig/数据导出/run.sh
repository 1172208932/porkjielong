#客户端, 这里注意一下回车不能是0D 0A，只能是0A
Output_Path_Json="../../bin/gameconfig/"
rm ${Output_Path_Json}/*.json
java -jar ./Excel2Json.jar