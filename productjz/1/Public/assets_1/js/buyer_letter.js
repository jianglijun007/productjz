//根据消息id得到普通消息内容
function get_normalletter(obj){
    var objectModel = {};
    var id=$(obj).attr('name'); //得到消息id
    var type=$(obj).attr('id'); //得到当前页面类型
    objectModel['id'] =id;  

    var domain=document.domain;
    if(domain=='localhost'){
        domain+='/selectin/1';
    }
    var toUrl='http://'+domain+"/index.php/Home/Buyer/get_letter_by_id";

    var lang=getLangCookie('think_language');
    var html=lang=='en'?'Normal message':'普通用户邮件';
    var title=lang=='en'?'Title: ':'主题：';
    var content=lang=='en'?'Content: ':'内容：';
    var reply=lang=='en'?'Reply':'回复';
    var read=lang=='en'?'Read':'已读';

    $.ajax({
        cache:false,
        type:"POST",
        url :toUrl,
        dataType:"json",
        data:objectModel,
        timeout:30000,
        
        
        error:function(){
            alert(url);
        },
        success:function(data){
            console.log(data);  
            $("#ordinary_letter").empty();  //清空
            var b = "";         //构造
            b+="<div class='modal-header'>";
            b+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
            b+="<h5 class='modal-title'>"+html+"</h5>";
            b+="<h5>"+data['letter']['title']+"</h5>";
            b+="</div>";
            b+="<div class='modal-body'>";
            b+="<p>"+title+data['letter']['title']+"</p>";
            b+="<p>"+content+"</p>";
            b+="<p>"+data['letter']['content']+"</p>";
            if(data['letter']['state']==0 && type!=2){  //未读
                b+="<button type='button' class='fa fa-envelope-o ' data-toggle='modal' data-target='#ReplyMessage' name='"+data['letter']['id']+"' onclick='replyletter(this);'>"+reply+"</button>";
                b+="<a href='http://"+domain+"/index.php/Home/Buyer/setRead/id/"+data['letter']['id']+"'><button type='button' class='fa fa-envelope-o'>"+read+"</button></a>";
                b+="</div>";
            }
            $("#ordinary_letter").append(b);    //追加
        },
    });
}

//回复消息
function replyletter(obj){
    var objectModel = {};
    var id=$(obj).attr('name'); //得到消息id

    objectModel['id'] =id;  

    var domain=document.domain;
    if(domain=='localhost'){
        domain+='/selectin/1';
    }
    var toUrl='http://'+domain+"/index.php/Home/Buyer/get_letter_by_id";

    var lang=getLangCookie('think_language');
    var html=lang=='en'?'Reply:':'回复：';
    var reciver=lang=='en'?'Reciver: ':'收件人：';
    var title=lang=='en'?'Title: ':'主题：';
    var content=lang=='en'?'Content: ':'内容：';
    var send=lang=='en'?'Send':'发送';
    var close=lang=='en'?'Close':'关闭';

    $.ajax({
        cache:false,
        type:"POST",
        url :toUrl,
        dataType:"json",
        data:objectModel,
        timeout:30000,
        
        
        error:function(){
            alert(url);
        },
        success:function(data){
            console.log(data);  
            $("#reply_letter").empty();  //清空
            var b = "";         //构造
            b+="<div class='modal-header'>";
            b+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
            b+="<h5 class='modal-title'>"+html+data['letter']['title']+"</h5>";
            b+="</div>";
            b+="<div class='modal-body'>";
            b+="<form action='http://"+domain+"/index.php/Home/Buyer/replyletter' method='post'>";
            b+="<div class='form-group'>";
            b+="<input type='hidden' name='letterid' class='form-control' value="+data['letter']['id']+">";
            b+="<label for='recipient-name' class='control-label'>"+reciver+data['letter']['reciver']+"</label>";
            b+="<input type='hidden' name='recipient_id' class='form-control' value="+data['letter']['sender_id']+">";
            b+="</div>";
            b+="<div class='form-group'>";
            b+="<label for='message-title' class='control-label'>"+title+"</label>";
            b+="<textarea name='title' class='form-control' id='message-title'></textarea>";
            b+="</div>";
            b+="<div class='form-group'>";
            b+="<label for='message-text' class='control-label'>"+content+"</label>";
            b+="<textarea name='content' class='form-control' id='message-text'></textarea>";
            b+="</div>";
            b+="<div class='modal-footer'>";
            b+="<button type='submit' class='btn btn-primary'>"+send+"</button>";
            b+="<button type='button' class='btn btn-default' data-dismiss='modal'>"+close+"</button>";
            b+="</div>";
            b+="</form>";
            b+="</div>";
            $("#reply_letter").append(b);    //追加
        },
    });
}

//收件箱,根据消息id得到Rfi内容
function get_rfiletter(obj){
    var objectModel = {};
    var id=$(obj).attr('name'); //得到消息id
    objectModel['id'] =id;  

    var domain=document.domain;
    if(domain=='localhost'){
        domain+='/selectin/1';
    }
    var toUrl='http://'+domain+"/index.php/Home/Buyer/get_rfiletter_by_id";

    var lang=getLangCookie('think_language');
    var ahtml=lang=='en'?'RFI Accepted':'供应商确认信息邀请邮件';
    var ahtml2=lang=='en'?'RFI Accepted':'接受信息邀请';
    var atitle=lang=='en'?'Title: RFI Accepted':'主题：接受信息邀请';
    var rhtml=lang=='en'?'RFI Declined':'供应商拒绝信息邀请邮件';
    var rhtml2=lang=='en'?'RFI Declined':'拒绝信息邀请';
    var rtitle=lang=='en'?'Title: RFI Declined':'主题：拒绝信息邀请';

    $.ajax({
        cache:false,
        type:"POST",
        url :toUrl,
        dataType:"json",
        data:objectModel,
        timeout:30000,
        
        
        error:function(){
            alert(url);
        },
        success:function(data){
            console.log(data);
            if(data['letter']['state']==1){
                $("#rfi_letter").empty();  //清空
                var b = "";         //构造
                b+="<div class='modal-header'>";
                b+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
                b+="<h5 class='modal-title'>"+ahtml+"</h5>";
                b+="<h5>"+ahtml2+"</h5>";
                b+="</div>";
                b+="<div class='modal-body'>";
                b+="<p>"+atitle+"</p>";
                if(lang=='en'){
                    b+="<p>Dear <span>"+data['letter']['username']+"</span></p>";
                    b+="<p>Your RFI have been accepted by <span>"+data['letter']['companyname']+"</span>, your account manager <span>"+data['letter']['servicer']+"</span> is dedicated to serve you.</p>";
                    b+="<a class='btn btn-primary' href='http://"+domain+"/index.php/Home/Buyer/CheckRifState/id/"+data['letter']['recipient_id']+"' role='button'>Supplier's Detailed Profile</a>";
                    b+="</div>";
                    b+="<div class='modal-footer'>";
                    b+="<p>In case of any questions, do not hesitate to contact us at <a href='Mailto:support@seletedin.com'>support@seletedin.com</a></p>";
                    b+="<p>Your Selectedin Team.</p>";
                    b+="</div>";
                }
                else{
                    b+="<p>尊敬的<span>"+data['letter']['username']+"</span>，您好</p>";
                    b+="<p>您的信息邀请已被<span>"+data['letter']['companyname']+"</span>接受，您的客户经理&nbsp<span>"+data['letter']['servicer']+"</span>&nbsp将竭诚为您服务</p>";
                    b+="<a class='btn btn-primary' href='http://"+domain+"/index.php/Home/Buyer/CheckRifState/id/"+data['letter']['recipient_id']+"' role='button'>查看供应商详细信息</a>";
                    b+="</div>";
                    b+="<div class='modal-footer'>";
                    b+="<p>如有任何问题，请与<a href='Mailto:support@seletedin.com'>support@seletedin.com</a>联系。</p>";
                    b+="<p>您的selectedin团队。</p>";
                    b+="</div>";
                }
                
                $("#rfi_letter").append(b);    //追加
            }  
            if(data['letter']['state']==2){
                $("#rfi_letter").empty();  //清空
                var b = "";         //构造
                b+="<div class='modal-header'>";
                b+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
                b+="<h5 class='modal-title'>"+rhtml+"</h5>";
                b+="<h5>"+rhtml2+"</h5>";
                b+="</div>";
                b+="<div class='modal-body'>";
                b+="<p>"+rtitle+"</p>";
                if(lang=='en'){
                    b+="<p>Dear <span>"+data['letter']['username']+"</span></p>";
                    b+="<p>Your RFI has been declined by <span>"+data['letter']['companyname']+"</span>, and you could send RFI to other suppliers or search new suppliers.</p>";
                    b+="<a class='btn btn-primary' href='http://"+domain+"/index.php/Home/Buyer/supplier' role='button'>Send RFI to Other Suppliers</a>";
                    b+="<a class='btn btn-primary' href='http://"+domain+"/index.php/Home/Search/search' role='button'>Search New Suppliers</a>";
                    b+="</div>";
                    b+="<div class='modal-footer'>";
                    b+="<p>In case of any questions, do not hesitate to contact us at <a href='Mailto:support@seletedin.com'>support@seletedin.com</a></p>";
                    b+="<p>Your Selectedin Team.</p>";
                    b+="</div>";
                }
                else{
                   b+="<p>尊敬的<span>"+data['letter']['username']+"</span>，您好</p>";
                    b+="<p>您的信息邀请已被<span>"+data['letter']['companyname']+"</span>拒绝，您可以选择向其他供应商发送邀请或重新选择供应商</p>";
                    b+="<a class='btn btn-primary' href='http://"+domain+"/index.php/Home/Buyer/supplier' role='button'>向其他供应商发送</a>";
                    b+="<a class='btn btn-primary' href='http://"+domain+"/index.php/Home/Search/search' role='button'>寻找供应商</a>";
                    b+="</div>";
                    b+="<div class='modal-footer'>";
                    b+="<p>如有任何问题，请与<a href='Mailto:support@seletedin.com'>support@seletedin.com</a>联系。</p>";
                    b+="<p>您的selectedin团队。</p>";
                    b+="</div>"; 
                }
                
                $("#rfi_letter").append(b);    //追加
            }
        },
    });
}

//发送消息
function sendmessage(obj){
    var id=$(obj).attr('id'); //得到消息id
    var name=$(obj).attr('name');  

    var domain=document.domain;
    if(domain=='localhost'){
        domain+='/selectin/1';
    }

    var lang=getLangCookie('think_language');
    var html=lang=='en'?'New message':'新邮件';
    var reciver=lang=='en'?'Reciver: ':'收件人：';
    var title=lang=='en'?'Title: ':'主题：';
    var content=lang=='en'?'Content: ':'内容：';
    var send=lang=='en'?'Send':'发送';
    var close=lang=='en'?'Close':'关闭';

    $("#sendletter").empty();  //清空
    var b = "";         //构造
    b+="<div class='modal-header'>";
    b+="<h5 class='modal-title'>"+html+"</h5>";
    b+="</div>";
    b+="<div class='modal-body'>";
    b+="<form action='http://"+domain+"/index.php/Home/Buyer/sendmessage' method='post'>";
    b+="<div class='form-group'>";
    b+="<label for='recipient-name' class='control-label'>"+reciver+name+"</label>";
    b+="<input type='hidden' name='recipient_id' class='form-control' value='"+id+"'>";
    b+="</div>";
    b+="<div class='form-group'>";
    b+="<label for='message-title' class='control-label'>"+title+"</label>";
    b+="<textarea name='title' class='form-control' id='message-title'></textarea>";
    b+="</div>";
    b+="<div class='form-group'>";
    b+="<label for='message-text' class='control-label'>"+content+"</label>";
    b+="<textarea name='content' class='form-control' id='message-text'></textarea>";
    b+="</div>";
    b+="<div class='modal-footer'>";
    b+="<button type='submit' class='btn btn-primary'>"+send+"</button>";
    b+="<button type='button' class='btn btn-default' data-dismiss='modal'>"+close+"</button>";
    b+="</div>";
    b+="</form>";
    b+="</div>";
    $("#sendletter").append(b);    //追加
} 
        

        
        
