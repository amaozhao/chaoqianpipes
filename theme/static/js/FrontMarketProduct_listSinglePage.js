var FrontMarketProduct_listSinglePage = {
	//分页GO按钮验证响应事件  参数1：组件ID  参数2：总页数  参数3：输入框名称  参数4：跳转连接
	checkpage:function(compId,totalPages,pageNoName,actionURL){
		var formId=compId+"_Form";
		var hitProductForm = document.getElementById(formId);
		var frm ;
		if(pageNoName=='textnum1'){
			frm = hitProductForm.textnum1;
		}else if(pageNoName=='textnum'){
			frm = hitProductForm.textnum;
		}
		var pageNoValue = trim(frm.value);
		var checknumber=/^[1-9][0-9]*$/;

		if( pageNoValue!=null && trim(pageNoValue)!=""){
			if(!checknumber.test(trim(pageNoValue))){
				
				alert(i18n_product_error_001);
				frm.focus();
				return false;
			}else {
				var maxpage=eval(totalPages);
				var inputNum=eval(pageNoValue);
				if(inputNum.length>5){
					
					alert(i18n_product_error_001);
					frm.focus();
					return false;
				}
				if(inputNum>maxpage){
				
					alert(i18n_product_error_001);
					frm.focus();
					return false;
				}else{
					hitProductForm.action = actionURL.replace("parameter_ec_p",pageNoValue);
					hitProductForm.submit();
				}
			}
		}else{
			
			alert(i18n_product_error_001);
			frm.focus();
			return false;
		}
	},
			//tablelist加alt样式
		    striptr:function(){
	        $(".tablelist tr:even").addClass("alt");
        },
        //校验购买按钮响应事件  参数1：组件Id  参数2：转向连接
		checkbuy:function(compId,actionURL){
			var formId=compId+"_Form";
			var productFrom = document.getElementById(formId);
			var checkboxes = document.getElementsByName(compId+"compareCheckbox");
			var ids="";
		   for(var i=0;i<checkboxes.length;i++)
             {
                 if(checkboxes[i].checked==true)
				 {					
				 ids=ids+checkboxes[i].value+",";
				 }
             }
			 if(ids==null||ids=="")
			{
				 alert(i18n_product_error_110);
				 return false;
			}
			 productFrom.action=actionURL.replace("abcde",ids);			 
			 productFrom.submit();	
	        
        },			//checkbox全选  参数1：cookie名称  参数2：组件Id  
			        onCheckall:function(cookieName,compId){
        var checkboxFlag = document.getElementById(compId+"checkbox");
        if(checkboxFlag!=null){
            var checkboxes = document.getElementsByName(compId+"compareCheckbox");
            for(var i=0;i<checkboxes.length;i++){
                if(checkboxFlag.checked==true){
                    checkboxes[i].checked=true;
                }else{
                    checkboxes[i].checked=false;
                }
                FrontMarketProduct_listSinglePage.doWriteCookie(cookieName,checkboxes[i].value,checkboxes[i].id,compId);
            }
        }
    },
    //写入cookie  参数1：cookie名称  参数2：待对比id  参数3：checkbox id  参数4：组件Id
doWriteCookie:function (cookieName,idToCompare,idCheckbox,compId){
	    var cookieValue = idToCompare;
	    var cookieString = document.cookie;
        var start = cookieString.indexOf(cookieName + '=');
        if (start == -1){ 
             document.cookie = cookieName+'=' + escape(cookieValue)+';path=/';
        }else{
            start += cookieName.length + 1;
            var end = cookieString.indexOf(';', start);
            var cookieContentWrited = '';
            if (end == -1){  
                cookieContentWrited = unescape(cookieString.substring(start));
            }else{   
                cookieContentWrited = unescape(cookieString.substring(start, end));
            }

            if(cookieContentWrited.indexOf(cookieValue)==-1 && _getElementById(compId,"input",idCheckbox).checked==true){
               
                  	if(cookieContentWrited=="")
				{
                document.cookie = cookieName+'=' + escape(cookieValue)+';path=/';
				}else
				{   
					document.cookie = cookieName+'=' + escape(cookieContentWrited+':'+cookieValue)+';path=/';
				}
            }
            if(cookieContentWrited.indexOf(cookieValue)!=-1 && _getElementById(compId,"input",idCheckbox).checked==false){
                
                if(cookieContentWrited==cookieValue){
                    cookieContentWrited='';
                }else if(cookieContentWrited.indexOf(cookieValue)!=0){
                    cookieContentWrited = cookieContentWrited.replace(':'+cookieValue,'');
                }else{
                     cookieContentWrited = cookieContentWrited.replace(cookieValue+':','');
                }
                document.cookie = cookieName+'=' + escape(cookieContentWrited)+';path=/';
            }

        }

	},		//提交对比  参数1：cookie名称  参数2：连接地址
			toCompareAction:function(cookieName,href){
	    var cookieString = document.cookie;

        var start = cookieString.indexOf(cookieName + '=');
        if (start == -1){
             alert(i18n_product_productsToCa);
        }else{
            start += cookieName.length + 1;
            var end = cookieString.indexOf(';', start);
            if(start==end){
                alert(i18n_product_productsToCa);
                return;
            }
            var cookieContentWrited = '';
            if (end == -1){
                cookieContentWrited = unescape(cookieString.substring(start));
            }else{
                cookieContentWrited = unescape(cookieString.substring(start, end));
            }
			href=href.replace("this.cookieContentWrited",cookieContentWrited);
            window.open(href);
        }
	},			//加载组件状态  参数1：是否进行商品对比  参数2：组件Id
				laodComp:function (show_compare,compId){
        if(show_compare!='1'){
            return;
        }
        var cookieString = document.cookie;

        var starIndex = cookieString.indexOf('showCompare=');
        if(starIndex ==-1){
            return ;
        }

        var endIndex = cookieString.indexOf(';',starIndex);
		if(endIndex == -1)
		{
            endIndex=cookieString.length;

		}
        starIndex = 'showCompare'.length+1+starIndex;
        var cookieContent = unescape(cookieString.substring(starIndex,endIndex));
        var cookieArray = cookieContent.split(':');
        for(var i=0;i<cookieArray.length;i++){
            var checkID = cookieArray[i];

            if(_getElementById(compId,'input','checkbox'+checkID)!=null){
                _getElementById(compId,'input','checkbox'+checkID).checked=true;
            }
        }
    }
}