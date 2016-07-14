//根据消息id得到普通消息内容
function supget_normalletter(obj){
    var objectModel = {};
    var id=$(obj).attr('name'); //得到消息id
    var type=$(obj).attr('id'); //得到当前页面类型
    objectModel['id'] =id;  

    var domain=document.domain;
    if(domain=='localhost'){
        domain+='/selectin/1';
    }
    var toUrl='http://'+domain+"/index.php/Home/Supplier/get_letter_by_id";

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
                b+="<button type='button' class='fa fa-envelope-o ' data-toggle='modal' data-target='#ReplyMessage' name='"+data['letter']['id']+"' onclick='supreplyletter(this);'>"+reply+"</button>";
                b+="<a href='http://"+domain+"/index.php/Home/Supplier/setRead/id/"+data['letter']['id']+"'><button type='button' class='fa fa-envelope-o'>"+read+"</button></a>";
                b+="</div>";
            }
            $("#ordinary_letter").append(b);    //追加
        },
    });
}

//回复消息
function supreplyletter(obj){
    var objectModel = {};
    var id=$(obj).attr('name'); //得到消息id

    objectModel['id'] =id;  

    var domain=document.domain;
    if(domain=='localhost'){
        domain+='/selectin/1';
    }
    var toUrl='http://'+domain+"/index.php/Home/Supplier/get_letter_by_id";

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
            b+="<form action='http://"+domain+"/index.php/Home/Supplier/replyletter' method='post'>";
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
            b+="<button type='button' class='btn btn-primary' data-dismiss='modal'>"+close+"</button>";
            b+="</div>";
            b+="</form>";
            b+="</div>";
            $("#reply_letter").append(b);    //追加
        },
    });
}

//收件箱,根据消息id得到Rfi内容
function supget_rfiletter(obj){
    var objectModel = {};
    var id=$(obj).attr('name'); //得到消息id
    objectModel['id'] =id;  

    var domain=document.domain;
    if(domain=='localhost'){
        domain+='/selectin/1';
    }
    var toUrl='http://'+domain+"/index.php/Home/Supplier/get_rfiletter_by_id";

    var lang=getLangCookie('think_language');
    var html=lang=='en'?'RFI(Request for Information)':'采购商信息邀请邮件';
    var html2=lang=='en'?'RFI':'信息邀请';
    var title=lang=='en'?'Title: RFI(Request for Information)':'主题：信息邀请书';

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
            if(data['letter']['state']==0){
                $("#rfi_letter").empty();  //清空
                var b = "";         //构造
                b+="<div class='modal-header'>";
                b+="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
                b+="<h5 class='modal-title'>"+html+"</h5>";
                b+="<h5>"+html2+"</h5>";
                b+="</div>";
                b+="<div class='modal-body'>";
                b+="<span><i class='fa fa-circle fa-fw'></i>"+title+"</span>";
                if(lang=='en'){
                    b+="<p>Dear <span>"+data['letter']['username']+"</span></p>";
                    b+="<p><span>"+data['letter']['sender']+"</span> from <span>"+data['letter']['companyname']+"</span>, is interested in your company, and send this RFI to review the detailed profile of your company.</p>";
                    b+="<a href='http://"+domain+"/index.php/Home/Supplier/acceptInvite/id/"+data['letter']['id']+"'><button type='form' class='btn btn-primary'>Accepte</button></a>";
                    b+="<a href='http://"+domain+"/index.php/Home/Supplier/rejectInvite/id/"+data['letter']['id']+"'><button type='form' class='btn btn-primary'>Decline</button></a>";
                    b+="</div>";
                    b+="<div class='modal-footer'>";
                    b+="<p>In case of any questions, do not hesitate to contact us at <a href='Mailto:support@seletedin.com'>support@seletedin.com</a></p>";
                    b+="<p>Your Selectedin Team.</p>";
                    b+="</div>"; 
                }
                else{
                   b+="<p>尊敬的<span>"+data['letter']['username']+"</span>，您好</p>";
                    b+="<p>来自<span>"+data['letter']['companyname']+"</span>的<span>"+data['letter']['sender']+"</span>，对贵公司感兴趣，希望进一步了解贵公司，特发出此信息邀请书以查看公司详细信息。</p>";
                    b+="<a href='http://"+domain+"/index.php/Home/Supplier/acceptInvite/id/"+data['letter']['id']+"'><button type='form' class='btn btn-primary'>接受</button></a>";
                    b+="<a href='http://"+domain+"/index.php/Home/Supplier/rejectInvite/id/"+data['letter']['id']+"'><button type='form' class='btn btn-primary'>拒绝</button></a>";
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
function supsendmessage(obj){
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
    b+="<form action='http://"+domain+"/index.php/Home/Supplier/sendmessage' method='post'>";
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
    b+="<button type='button' class='btn btn-primary' data-dismiss='modal'>"+close+"</button>";
    b+="</div>";
    b+="</form>";
    b+="</div>";
    $("#sendletter").append(b);    //追加
} 
        

        
        
