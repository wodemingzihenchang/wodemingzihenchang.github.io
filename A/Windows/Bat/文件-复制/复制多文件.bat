@echo off
for /f %%i in (
nameList.txt
) do copy 02-��ͼ.md %%i.md
 
::ѭ��nameList.txt������ַ�
:: do mkdir %%i && copy test.docx %%i\%%i.docx && start %%i\%%i.docx
:: do copy ���Ƶ��ļ� ������
::pause
