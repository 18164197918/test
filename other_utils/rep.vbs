Option Explicit

If WScript.Arguments.Count = 0 Then
	MsgBox "把要处理的文件拖到我身上就行了...", vbOKOnly, "友情提示..."
	WScript.Quit
End If

Dim strFile, objFso, objFile, objReg, ojbMtchs, objMtch, objFl, strRead, strSrc, strDst

strSrc = WScript.Arguments(1)
strDst = WScript.Arguments(2)

strFile = WScript.Arguments(0)

Set objFso = CreateObject("Scripting.FileSystemObject")
With objFso
	Set objFile = .OpenTextFile(strFile, 1, False)
	Set objFl = .OpenTextFile(.GetSpecialFolder(2) & "\" & _
		.GetBaseName(strFile) & ".txt", 2, True)
End With

Set objReg = New RegExp
With objReg
	.Global = True
	.IgnoreCase = False
	.Pattern = strSrc
End With

Do Until objFile.AtEndOfStream = True
	strRead = objFile.readline
	If objReg.Test(strRead) = True Then
		strRead = objReg.Replace(strRead, strDst)
	End If
	objFl.writeline strRead
Loop

objFile.close
objFl.close

With objFso
	.CopyFile .GetSpecialFolder(2) & "\" & .GetBaseName(strFile) & ".txt", strFile, True
End With

Set objReg = Nothing
Set objFso = Nothing
Set objFile = Nothing
Set objFl = Nothing

CreateObject("Wscript.Shell").Run "notepad " & strFile, 1