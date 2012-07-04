/*

	字符串操作
	 1、是否是整数				isInt(str,bEmpty)		bEmpty是否为空
	 2、是否是浮点数			isFloat(str,bEmpty)
	 3、是否所有字符为数字类型	isNumber(str,bEmpty)		bEmpty是否为空
	 4、是否为空				isNull(str)
	 5、是否是日期 xxxx-xx-xx	xxxx/xx/xx     年月日
	 							isDate(str,bEmpty)
	 6、是否是EMAIL				isEmail(str,bEmpty)
	 7、是否是电话号码			isTelNo(str,bEmpty)
	 8、是否包含特殊字符		isASCII(str,bEmpty)
	 9、裁减字符串				trim(str,flag)
	 10、计算字符串长度			strlen(str)
	11、将三个字符串连日期格式	concatDate(year,month,day)
	12、比较两个字符串是否相等	equals(str1,str2,length)
	13、比较两个数值的大小,str1大于str2返回-1， 等于返回0， 小于返回1
								compareFloat(str1,str2)
	14、是否包含特殊字符(~`!@#$%^&*()-+=|{}[]:";'<>,./?)
	        					hasSpecSymbol(str,startstr)
	15、FullSpace(str) 是否包含全角空格，包含全角空格返回false,不包含返回true
	16、IsChineseCharacters(str) 校验字符串是否为中文字,不包含中文特殊符号
	17、IsChinese(str) 校验字符串是否为中文及中文特殊符号。
	18、isCnAndEnAndNumber(str) 校验字符串是否为中文,英文字符，数字


	控件操作
	 1、是否是回车键			isEnterKey()
	 2、聚焦到下一个控件		keyEnter(keyCode,nextControl)
	 3、取得textarea控件的高度  getTextareaHigh(textarea)
	4、covertDate(strDate) 将日期格式为"2003-08-21"的字符串变为日期对象Date
	5、compareDate(strStartDate, strEndDate) 判断是否起始日期小于等于结束日期
	6、getLocation(lc) 在给定连接上面加入时间戳参数
	7、是否包含特殊字符(~`!@#$%^&*()-+=|{}[]:";'<>,./?)
								hasSpecSymbolCtrl(ctrl,bEmpty)
	8、人民币金额除小数外不能以0开头  IsZeroStart(num)
	9、"subStr" 开头的字符串与str字符串相匹配 (^http)
	                     compare(str,subStr)
	*/
	function isInt(str,bEmpty)
	{
		str = trim(str);
		if(str==null||trim(str)=="")
		{
			return bEmpty;
		}

	  if(trim(str) == "0")
	  {
	    return false;
	  }

		var ch = str.substring(0,1);

		if (ch == "0" && trim(str) != "0")
		{
			return false;
		}

		for (var i=0; i<str.length ; i++)
		{
			var s = str.substring(i, i+1);
			if (!(s >= "0" && s <="9"))
			{
				return false;
			}
		}
		return true;
	}

	function isFloat(checkstr, bEmpty, tcount)
	{
		if(checkstr==null||trim(checkstr)=="")
		{
			return bEmpty;
		}

		var str	= trim(checkstr);
		if(str.substring(0,1)==".")
		{
			return false;
		}
		var temp=0;
		for(var i=0;i<str.length;i++)
		{
			var ch=str.substring(i,i+1);
			if(!((ch>="0" && ch<="9") || ch=="."))
			{
				return false;
			}
			if(ch==".")
				temp++;
			if(temp>1)
			{
				return false;
			}
		}

		if(tcount != null && tcount > 0)
		{
			if(str.indexOf(".") != -1 && str.length - (str.indexOf(".")+1) > tcount)
			{
				return false;
			}
		}

		var start1 = checkstr.substring(0,1);
		var start2 = checkstr.substring(1,2);
		if(start1 == 0 && start2!=".")
		{
		    for(var i=0;i<str.length;i++)
		    {
		     var ch=str.substring(i,i+1);
		     if (ch==0)
		     temp++;
		     }
		   if (temp == str.length)
		    {
		      return true;
		    }
		    return false;
		  }


		return true;
	}

	function isNumber(str,bEmpty)
	{
		if(str==null||trim(str)=="")
		{
			return bEmpty;
		}

		for (var i=0; i<str.length ; i++)
		{
			var s = str.substring(i, i+1);
			if (!(s >= "0" && s <="9"))
			{
				return false;
			}
		}
		return true;
	}

	function isNull(str)
	{
		if (str == null || trim(str) == "")
		{
			return true;
		}
		return false;
	}

	function isDate(str,bEmpty)
	{
		if (str == null)
		{
			return bEmpty;
		}
		if (trim(str).length != 10 )
		{
			return false;
		}
		var yearStr = str.substring(0,4);
		if(parseInt(yearStr)<1900)
		{
			return false;
			}

		tempStr = str;
		var i = tempStr.indexOf("-");
		if(i > -1)
			var strYear = tempStr.substring(0, i);
		tempStr = tempStr.substring(i+1, tempStr.length);
		i = tempStr.indexOf("-");
		if(i > -1)
			var strMonth = tempStr.substring(0, i);
		strDay = tempStr.substring(i+1, tempStr.length);
		if(parseInt(strMonth)>12 && parseInt(strMonth)< 1)
			return false;

		  if   ((parseInt(strMonth)==4   ||   parseInt(strMonth)==6   ||   parseInt(strMonth)==9   ||   parseInt(strMonth)==11)   &&   parseInt(strDay)==31)
			  {
			return   false;
			 }
		if   (parseInt(strMonth)   ==   2)   {
		 var   isleap   =   (parseInt(strYear)   %   4   ==   0   &&   (parseInt(strYear)   %   100   !=   0   ||   parseInt(strYear)   %   400   ==   0));
			if   (strDay>29   ||   (strDay==29   &&   !isleap))   {
			return   false;
			}
        }

		var reg =  /^[0-9]{4}\-(([0][1-9])||([1][012]))\-(([0][1-9])||([12][0-9])||([3][01]))$/;
		if(!str.match(reg))
		{
			return false;
			}
		return true;
	}

	function isEmail(str,bEmpty){
		if (str == null || trim(str) == "")
		{
			return bEmpty;
		}

	    //校验邮件的正则表达式，包括aa@bb.cc.dd 和 aa@bb.cc的形式

	    var pattern1 = /^[-a-zA-Z0-9_\.]+\@([0-9A-Za-z_-]+)+(\.[0-9A-Za-z_-]{1,})+$/;

	    if(str.match(pattern1) )
			return true;

        return false;
	}

	function isTelNo(str,bEmpty)
	{
		if(str==null||trim(str)=="")
			return bEmpty;

    var str	= trim(str);

  	var myphone = /^[\-0-9+()\/]{1,32}$/;
  	if(myphone.test(str)) return true;

  	return false;
  }

	function isASCII(str, bEmpty)
	{
		if(str==null||trim(str)=="")
			return bEmpty;		//alert(name+"项：您尚未填写。");

		var str	= trim(str);

		for (var i = 0; i < str.length; i++) {
			var ch = str.charAt(i);
			if (!((ch >= "A" && ch <= "z" ) || (ch >="0" && ch <="9"))) {
				return false;
			}
		}

	    return true;
	}


	function hasSpecSymbol(v) {
		return !/^[a-zA-Z0-9０-９\u4E00-\u9FA5#\/\-&@\(\)\.$\*· ]*$/.test(v);
	}
	function specialCharactersCheck(v) {
		return  !/^[^\\&*^%<>/]*$/.test(v);
		//return  !/^[^\"\'\\&*^%<>/]*$/.test(v);
	}
   function validateObject(object){ 
		var forbidChar = new Array("&","/","*","^","'","%","<",">","\\","\\\\","\"" );
		for (var i = 0;i < forbidChar.length ; i++){ 
		  if(object.indexOf(forbidChar[i]) >= 0){ 
		      return false; 
		  } 
		} 
		return true; 
 	}
 
 
/* 	  function hasSpecSymbol(str){
        var num = /^[a-zA-Z0-9\u4E00-\u9FA5]+$/ ;
		for (var i = 0; i < str.length; i++){
			var ch = str.charAt(i);
			//校验 输入的特殊的字符
			if ((ch != "/" )&& (ch != "#" )&&(ch != "-" )&&(ch != "?" )&&
				(ch != "&" )&&(ch != "@" )&&(ch != "(" )&&(ch != ")" )&&
				(ch != "." )&&(ch != "$" )&&(ch != "*" )) {
		         if(!num.test(ch)){
		         //校验 空格和全角空格
		         	var emply1 = /\u3000/g ;
		         	var emply2 = /[\s ]/g;
		         	if(!emply1.test(ch)&&!emply2.test(ch)){
		         		return true;
		         	}

		         }
			}
		}
		   return false;
	}
*/

//	function hasSpecSymbol(str,bEmpty){
//		if(str==null||trim(str)=="")
//			return bEmpty;		//alert(name+"项：您尚未填写。");

//		var str	= trim(str);

//		for (var i = 0; i < str.length; i++) {
//			var ch = str.charAt(i);
//			if ((ch == "`" )|| (ch == "~" )||(ch == "!" )||(ch == "@" )||
//				(ch == "#" )||(ch == "%" )||(ch == "^" )||(ch == "&" )||
//				(ch == "*" )||(ch == "(" )||(ch == ")" )||(ch == "+" )||
//                                (ch == "=" )||(ch == "|" )||(ch == "{" )||(ch == "}" )||
//                                (ch == "[" )||(ch == "]" )||(ch == ":" )||(ch == ";" )||
//                                (ch == "'" )||(ch == '"' )||(ch == "<" )||(ch == ">" )||
//                                (ch == "," )||(ch == "." )||(ch == "\\" )||(ch == "?" )||
//				(ch == "/" )) {
//				return false;
//			}
//		}

//	    return true;
//	}

	function FullSpace(str){
		var Reg = /\　/;
		var booleanT = Reg.test(str);
		if (booleanT == true) {
		    return false;
		}
		return true;
        }

	//Function trim a string
	function trim(Str , Flag)
	{

		Str	= ""+Str;
		if( Flag == "l" || Flag == "L" )/*trim left side only*/
		{
			RegularExp	= /^\s+/gi;
			return Str.replace( RegularExp,"" );
		}
		else if( Flag == "r" || Flag == "R" )/*trim right side only*/
		{
			RegularExp	= /\s+$/gi;
			return Str.replace( RegularExp,"" );
		}
		else/*defautly, trim both left and right side*/
		{
			RegularExp	= /^\s+|\s+$/gi;
			return Str.replace( RegularExp,"" );
		}
	}

	function strlen(str)
	{
		str = trim(str);
		var reg = /\r\n/g;
		var str1 = str.replace(reg,"");
		return str1.length;
	}


	function concatDate(year,month,day)
	{
		if (year == null||trim(year == ""))
			return false;//alert
		if (month == null||trim(month == ""))
			return false;//alert
		if (day == null||trim(day == ""))
			return false;//alert

		var y = trim(year);
		var m = trim(month);
		var d = trim(day);

		var str = "";
		var yearNum = parseInt(y);
		var monthNum = parseInt(m);
		var dayNum = parseInt(d);

		if (monthNum < 10)
			var yS = "0" + yearNum;
		else
			var yS = "" + yearNum;
		if (dayNum < 10)
			var yS = "0" + yearNum;
		else
			var yS = "" + yearNum;

		str+=yearNum;
		str+=month1;
		str+=day1;

		return str;
	}


	function equals(str1,str2,length)
	{
		if (str1 == null && str2 ==null)
		{
			return true;
		}

		if (str1 == str2)
		{
			return true;
		}

		return false;
	}

	function equals(str1,str2,minlength,maxlength)
	{
		if (str1.length < minlength ||str1.length > maxlength  )
		{
			return false
		}

		if (str1 == str2)
		{
			return true;
		}

		return false;
	}



	/**
	 *比较两个数值的大小,str1大于str2返回-1， 等于返回0， 小于返回1
	 */
	function compareFloat(str1, str2)
	{
		str1 = trim(str1);
		str2 = trim(str2);
		var float1 = parseFloat(str1);
		var float2 = parseFloat(str2);
		if(float1 < float2) return 1;
		else if(float1 > float2) return -1;
		else if(float1 == float1)
		return 0;
	}


	//Move Control's Focus Through Put Down One Key
	function keyEnter(keyCode,nextControl)
	{
		var srcElement=window.event.srcElement;
		var iKeyCode = window.event.keyCode;

		if(iKeyCode != keyCode)
		{
			return true;
		}

		if(nextControl == null)
		{
			var i = 0;
			while (srcElement!=srcElement.form.elements[i])
			{
				i++;
			}
			if(!srcElement.form.elements[i+1].disabled)
				srcElement.form.elements[i+1].focus();
				if(srcElement.form.elements[i+1].type == "text"||srcElement.form.elements[i+1].type == "textarea"||srcElement.form.elements[i+1].type == "checkbox")
				      srcElement.form.elements[i+1].select();
			else
			{
			    do
			    {
			      	i++;
			    }while(srcElement.form.elements[i+1].disabled)
				srcElement.form.elements[i+1].focus();
				if(srcElement.form.elements[i+1].type == "text"||srcElement.form.elements[i+1].type == "textarea"||srcElement.form.elements[i+1].type == "checkbox")
				  srcElement.form.elements[i+1].select();
		       }
		}
		else
		{
			nextControl.focus();
			if(nextControl.type == "text"||nextControl.type == "textarea"||nextControl.type == "checkbox")
		           nextControl.select();
		}
		return false;
	}

	function test_name(str) {
		var pattern = /^[_\-a-zA-Z0-9]{6,20}$/;
		if(pattern.test(str)) return true;
		return false;
 	}

	function getStrLen(str)
	{
		if(str==null) return 0;
		str = trim(str);
		var reg = /\r\n/g;
		var str1 = str.replace(reg,"");

	  	var size = 0;
	  	for (var i = 0; i < str1.length; i++) {
	  		var ch = str1.charAt(i);
	  		if ( ch <= "\x7f" ){
	  			size = size + 1;
	  		}
	  		if ("\x80"< ch){
	  			size = size + 2;
	  		}
	  	}

	  	return size;
	}

	function getTextareaHigh(textarea)
	 {
	  var textareaWidth = textarea.cols;
	  var str = textarea.value;
	  var totalHigh = 0;
	  var rnLoc = str.indexOf("\r\n");
	  var tempString =str ;

		if(rnLoc!= -1){
		   while (rnLoc != -1)
		   {
			   var s = tempString.substring(0, rnLoc);
			   totalHigh = totalHigh  + getLineNum(s, textareaWidth);
			   tempString = tempString.substring(rnLoc+2, tempString.length);
			   rnLoc = tempString.indexOf("\r\n");
		   }
		}

		if (rnLoc== -1 && tempString.length > 0)
		{
			totalHigh = totalHigh + getLineNum(tempString, textareaWidth);
		}

	  	if (totalHigh == 0)
	   		totalHigh = 1;
		return totalHigh;
 	}

 function getLineNum(str, lineLen)
 {
 	  if(str==null) return 0;

  	var cols = 1;
    var size = 0;
  	var deltaSize = 1;
    for (var i = 0; i < str.length; i++) {
   		var ch = str.charAt(i);
     	if ( ch <= "\x7f" ){
   			deltaSize = 1;
     	}
     	if ("\x80"< ch){
    		deltaSize = 2;
     	}
   		size = size + deltaSize;

      	if(size > lineLen*cols){
	    	//如果上个双字节字符使字符串换行，则使size多加一，以补充textarea自动换行多出的空位
	    	if(deltaSize == 2) size++;
   		}

   		if(size == lineLen*cols && str.charAt(i+1)<= "\x7f" && str.charAt(i+1)!= ""){
   		   var needPatch = "false";
           for(var k = lineLen*(cols-1);k < (lineLen*cols -1); k++) {
	           if(str.charAt(k) > "\x80") {
			     needPatch = "true";
	             break;
	           }
   	       }

   		   if(needPatch == "true"){
   		   	 var pos = size;
   		     for(var j = i;str.charAt(j-1)<= "\x7f" && pos>(lineLen*(cols-1)) ;j--) {
   		   	    pos--;
   		     }
 		     size = size + (lineLen*cols - pos) + 1;
 		   }

   		}
   		cols = Math.ceil(size/lineLen);


    }

    return cols;
 }


	//将日期格式为"2003-08-21"的字符串变为日期对象Date
	function covertDate(strDate)
	{
		tempStr = strDate;
		var i = tempStr.indexOf("-");
		if(i > -1)
			var strYear = tempStr.substring(0, i);
		tempStr = tempStr.substring(i+1, tempStr.length);
		i = tempStr.indexOf("-");
		if(i > -1)
			var strMonth = tempStr.substring(0, i);
		strDay = tempStr.substring(i+1, tempStr.length);
		tempStr = tempStr.substring(i+1, tempStr.length);
		var date = new Date(strYear, strMonth, strDay);
		return date;
	}

	//判断是否起始日期小于等于结束日期
	function compareDate(strStartDate, strEndDate)
	{
		if(trim(strStartDate) == "" || trim(strEndDate) == "" )
			return true;
		var startDate = covertDate(strStartDate);
		var endDate = covertDate(strEndDate);
		if(startDate.getTime() > endDate.getTime())
			return false;
		else
			return true;
	}


	function getLocation(lc)
	{
		var date = new Date();
		var s = lc + "";
		var i = s.indexOf("?");
		if(i > -1)
		{
			lc = lc + "&amp;time=" + date.getTime();
		}
		else
		{
			lc = lc + "?time=" + date.getTime();
		}
		return lc;
	}

	//打开HTML编辑器
  var formID;
  function openscriphtml(textareaname){
    formID = textareaname;
    if (navigator.appName!="Microsoft Internet Explorer"){
		alert("此功能仅支持IE用户");
	}
    else {
      newwin=window.open('../htmleditor/html/editor.html','','width=640,height=450,status=1');
      newwin.focus();
     }
  }

	//页面输出指定input对象中的长文本中的指定长度的字符
	//input - 指定input对象
	//showCharNumber - 指定长度
	function printPartTextInLongText(input, showCharNumber){
    var str = input.value;
    var reg = /<[a-z]*[A-Z]*(\s[a-z]*[A-Z]*\=((\"{0,1}([a-zA-Z\-\=\:\;\{\}\/\.\!\@\_\^\%\&\*\$\#\?\'\"\,\[\]]|[0-9]|[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[\uFF0C\u3002])\"{0,1})*|(\"{0,1}\#\w{6}\"{0,1})*))*\/?>|<\/[a-z]*[A-Z]*>/g;
    var regSpace = /\s/g;
    var regSpace1 = /&nbsp;/g;
    var str1 = str.replace(reg,"");
    var moveSpace = str1.replace(regSpace,"");
    var laststr = moveSpace.replace(regSpace1,"");
    if(laststr.length>showCharNumber){
    	var str_Description = laststr.substr(0,showCharNumber) + "...";
    	document.write(str_Description);
    }else{
    	document.write(laststr);
    }

	}

	//页面输出指定text文本中的指定长度的字符文本
	//text - 指定text文本
	//showCharNumber - 指定长度
	function printPartText(text, showCharNumber){
    var str = text;
    var reg = /<[a-z]*[A-Z]*(\s[a-z]*[A-Z]*\=((\"{0,1}([a-zA-Z]|[0-9]|[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[\uFF0C\u3002])\"{0,1})*|(\"{0,1}\#\w{6}\"{0,1})*))*\/?>|<\/[a-z]*[A-Z]*>/g;
    var regSpace = /\s/g;
    var regSpace1 = /&nbsp;/g;
    var str1 = str.replace(reg,"");
    var moveSpace = str1.replace(regSpace,"");
    var laststr = moveSpace.replace(regSpace1,"");
    if(laststr.length > showCharNumber){
	    var str_Description = laststr.substr(0,showCharNumber) + "...";
	    document.write(str_Description);
    }else{
    	document.write(laststr);
    }
	}

function SetHome(){
  var LocationStr = new String(window.location);
  var NumStr = LocationStr.indexOf("\?");
  //alert(NumStr);
  var SetHomeStr;
  if(NumStr == -1)
    {SetHomeStr = LocationStr;}
  else{
    SetHomeStr = LocationStr.substring(0,NumStr)}
  document.all.SetHomeA.style.behavior="url(#default#homepage)";
  document.all.SetHomeA.setHomePage(SetHomeStr);
  return false;
}


//打开图片库的方法
  var Num;
  var ObjReceiveImgPath;
  var ObjReceiveImgName;
  var ObjReceiveTextName;
	function openscripupload(ImagesUsed,obj,ImgName,TextName){
	  Num = ImagesUsed;
	  ObjReceiveImgName = ImgName ;
	  ObjReceiveImgPath = obj;
	  ObjReceiveTextName=TextName;

		if (navigator.appName!="Microsoft Internet Explorer"){
				alert("此功能仅支持IE用户");
		}
	  else
   		{
   		  newwin=window.open('/newEbiz1/EbizPortalFG/portal/html/ImageRepositoryMaint.html','','width=550,height=450,status=1,scrollbars=yes');
    	  newwin.focus();
		   }
	}
//打开flash库的方法
  var Num;
  var ObjReceiveImgPath;
  var ObjReceiveTextName;
	function openscripuploadflash(ImagesUsed,obj,TextName){
	  Num = ImagesUsed;
	  ObjReceiveTextName = TextName ;
	  ObjReceiveImgPath = obj;
		if (navigator.appName!="Microsoft Internet Explorer"){
				alert("此功能仅支持IE用户");

		}
	  else
   		{
   		  newwin=window.open('/newEbiz1/EbizPortalFG/portal/html/FlashRepositoryMaint.html','','width=550,height=450,status=1,scrollbars=yes');
    	  newwin.focus();
		   }
	}
	//以变量subStr开头的字符串相匹配
   /*function compare(str,startstr) {
   var pattern="^http";
    if(str==null||trim(str)=="") return false;
    var str	= trim(str);
    if(str.match(pattern)) return true;
    return false;
    }
    */
    function compare(str,subStr){
    var pattern="^"+subStr;
    if(str.match(pattern)) return true;
    return false;
   }
	/*
	*校验字符串是否为中文,不包含中文特殊符号
	*返回值：
	*如果为空，定义校验通过，           返回true
	*如果字串为中文，校验通过，         返回true
	*如果字串为非中文，             返回false
	*/
   function IsChineseCharacters(str){
	 var pattern_cn = /^([\u4E00-\u9FA5])*$/;

		 if(pattern_cn.test(str)){
			 return true;
		 }else{
			 return false;
		 }
   }

	/*
	*校验字符串是否为中文,包含中文特殊符号
	*返回值：
	*如果为空，定义校验通过，           返回true
	*如果字串为中文，校验通过，         返回true
	*如果字串为非中文，             返回false
	*/
   function IsChinese(str){

   var pattern_cn = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/;

	 		if(pattern_cn.test(str)){
				return true;
			}else{
				return false;
			}
   }


	/*
	*校验字符串是否为中文,英文字符，数字
	*返回值：
	*如果为空，定义校验通过，           返回true
	*如果字串为中文，校验通过，         返回true
	*如果字串为非中文，             返回false
	*/
   function isCnAndEnAndNumber(str){
    var pattern_cn = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[_\-a-zA-Z0-9])*$/;

	 		if(pattern_cn.test(str)){
				return true;
			}else{
				return false;
			}
   }
   
  //由数字、“+”、中横杠“-”组成
  function isMobileNumber(mobile){
	  var pattern_cn = /^([0-9]|[-]|[+])*$/;
	 	if(pattern_cn.test(mobile)){
			return true;
		}else{
			return false;
		}
	}

	function isMobile(str) {
    var filter=/^1[0-9]{2}[0-9]{8}$/;
    if (!filter.test(str)){
       return false;
    }else{
       return true;
    }
  }

function hasSpecialChar(v) {
	return !/^[\u4E00-\u9FA5a-zA-Z\d\(\)\/#\-\.&%\*、 ]+$/.test(v);
}


function isfloat_8_2(str,bEmpty) {
	str = trim(str);
	if(str==null||trim(str)=="")
	{
		return bEmpty;
	}
	return /^(0|[1-9]\d{0,7})(\.\d{1,2})?$/.test(str);
}

function exactdiv(arg1,arg2){
	var t1=0,t2=0,r1,r2;
	try{t1=arg1.toString().split(".")[1].length;}catch(e){}
	try{t2=arg2.toString().split(".")[1].length;}catch(e){}
	with(Math){
		r1=Number(arg1.toString().replace(".",""));
		r2=Number(arg2.toString().replace(".",""));
		return (r1/r2)*pow(10,t2-t1);
	}
}

function exactmul(n1, n2) {
	var m=0, s1=n1.toString(), s2=n2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch(e) {}
	try {
		m += s2.split(".")[1].length;
	} catch(e){}
	return Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10, m);
}

function exactAdd(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2));
	return (arg1*m+arg2*m)/m;
}

function getRound(x,y){
	var p = Math.pow(10,y);
	x*=p;
	x=Math.round(x);
	var result = x/p;
	var resultStr = ""+result;
	for(var len=0;len<resultStr.length;len++){
		if(resultStr.charAt(len)=="."){
			if((resultStr.length-len)==3){
				return result;
			}else if((resultStr.length-len)==2){
				result = result+"0";
				return result;
			}
		}
	}
	result = result+".00";
	return result;
}
