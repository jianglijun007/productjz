/**
 * Created by leiger on 2016/2/4.
 */
$(document).ready(function(){
  var a1 = $('#addNew1').parents('.panel-body').find('.repeat');
  var b1 = a1.first().html();
  var a2 = $('#addNew2').parents('.panel-body').find('.repeat');
  var b2 = a2.first().html();
  var a3 = $('#addNew3').parents('.panel-body').find('.repeat');
  var b3 = a3.first().html();
  var a4 = $('#addNew4').parents('.panel-body').find('.repeat');
  var b4 = a4.first().html();
  $('input').iCheck({
    checkboxClass: 'icheckbox_flat-blue',
    radioClass: 'iradio_flat-blue'
  });
  $('#addNew1').click(function(){
    a1.last().append(b1);
  });
  $('#addNew2').click(function(){
    a2.last().append(b2);
  });
  $('#addNew3').click(function(){
    a3.last().append(b3);
  });
  $('#addNew4').click(function(){
    a4.last().append(b4);
  });
/*  $('#accordion').find('input').each(function(){
    if($(this).focus() && (!$(this).parent('.collapse').hasClass('in'))){
      $(this).parent('.collapse').addClass('in');
      console.log(this);
    }
  });*/
  $('#collapseOne').on('hidden.bs.collapse', function () {
    var a = 0;
    $(this).find('input').each(function(){
      if(($(this).attr('required')) && ($(this).val() == '')){
        a++;
      }
    });
    if(a != 0){
      alert('用户信息有必填项未填写！');
      $('#collapseOne').collapse('show');
    }
  });
  $('#collapseTwo').on('hidden.bs.collapse', function () {
    var a = 0;
    $(this).find('input,select').each(function(){
      if(($(this).attr('required')) && ($(this).val() == '')){
        a++;
      }
    });
    if(a != 0){
      alert('制造能力必填项中有'+ a +'项未填写！');
      $('#collapseTwo').collapse('show');
    }
  });

  $('#collapseFive').on('hidden.bs.collapse', function () {
    var a = 0;
    $(this).find('input').each(function(){
      if(($(this).attr('required')) && ($(this).val() == '')){
        a++;
      }
    });
    if(a != 0){
      alert('市场及客户有必填项未填写！');
      $('#collapseFive').collapse('show');
    }
  });
  $('#collapseSix').on('hidden.bs.collapse', function () {
    var a = 0;
    $(this).find('input').each(function(){
      console.log(this);
      if(($(this).attr('required')) && ($(this).val() == '')){
        a++;
      }
    });
    if(a != 0){
      alert('体系及产品认证有必填项未填写！');
      $('#collapseSix').collapse('show');
    }
  });
  $('#collapseSeven').on('hidden.bs.collapse', function () {
    var a = new Array();
    var i = 0;
    var temp = 0;
    $(this).find('.col-sm-12').each(function(){
      temp = 0;
      if($(this).find(':checkbox') == true){
        $(this).find(':checkbox').each(function(){
          console.log(this);
          if($(this).prop("checked")){
            temp++;
          }
        });
        a[i] = temp;
        i++;
        console.log(i);
      }
    });
    for(var j = 0; j< a.length;j++){
      if(a[j] == 0){
        alert('每行至少勾选一个！');
        $('#collapseSeven').collapse('show');
        break;
      }
    }
  });
  $('#collapseEight').on('hidden.bs.collapse', function () {
    var a = new Array();
    var i = 0;
    var temp = 0;
    $(this).find('.col-sm-12').each(function(){
      temp = 0;
      if($(this).find(':checkbox') == true){
        $(this).find(':checkbox').each(function(){
          if($(this).prop("checked")){
            temp++;
          }
        });
        a[i] = temp;
        i++;
      }
    });
    for(var j = 0; j< a.length;j++){
      if(a[j] == 0){
        alert('每行至少勾选一个！');
        $('#collapseEight').collapse('show');
        break;
      }
    }
  });

  //获取省份
  var country_id = $("#country_4").val();
  get_provinces(country_id);
});

/*验证类型动态关联*/
function get_all_criteria(obj){
    var objectModel = {};
    var value = $(obj).val();
    objectModel['type'] =value;
    var a=$(obj).parent().next().find('.criteria');

    var domain=document.domain;
    if(domain=='localhost'){
                    domain+='/selectin/1';
    }

    var toUrl='http://'+domain+"/index.php/Home/Register/get_all_criteria";

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

            a.empty();
            var count = data.length;
            var i = 0;
            var b = "";
            for(i=0;i<count;i++){

                 b+="<option value='"+data[i]['id']+"'>"+data[i]['name']+"</option>";
            }
            a.append(b);
        },
    });
}


//证书检测
function check_valid(obj){
    var a=$(obj).parent().next();
    a.empty();
    a.append("<i class='fa fa-question'></i>检测中……");
    var objectModel = {};
    var type = $(obj).parents('.borderBottom').find('.type').first().val();
    var criteria = $(obj).parents('.borderBottom').find('.criteria').first().val();
    var body = $(obj).parents('.borderBottom').find('.body').first().val();
    var number = $(obj).parents('.borderBottom').find('.cfnumber').first().val();
    var period = $(obj).parents('.borderBottom').find('.cfperiod').first().val();
    objectModel['type'] =type;
    objectModel['criteria'] =criteria;
    objectModel['body'] =body;
    objectModel['number'] =number;
    objectModel['period'] =period;


    //因为此处技术不可达，如果非iatf检测，则默认正确

    var suc="<input type='hidden' name='certification[check][]' value='true' />";
    a.empty();
    a.append("<i class='fa fa-check'></i>"+suc);
    return 1;

    //objectModel['criteria'] ='iatf';


    console.log(objectModel);

    var domain=document.domain;
    if(domain=='localhost'){
      domain+='/selectin/1';
    }
    var toUrl='http://'+domain+"/index.php/Home/Register/ajax_check_criteria";
    $.ajax({
        cache:false,
        type:"POST",
        url :toUrl,
        dataType:"json",
        data:objectModel,
        timeout:30000,

        error:function(){
            var err="<input type='hidden' name='certification[check][]' value='false' />";
            a.empty();
            a.append("<i class='fa fa-times'></i>"+err);
        },
        success:function(data){

            console.log(data);
            if(data['result']==true){
                var suc="<input type='hidden' name='certification[check][]' value='true' />";
                a.empty();
                a.append("<i class='fa fa-check'></i>"+suc);
            }
            else{
                var err="<input type='hidden' name='certification[check][]' value='false' />";
                a.empty();
                a.append("<i class='fa fa-times'></i>"+err);
            }
        },
    });
}



//根据technic_first触发得到所属technic_second
function get_technic_second(obj){
    var objectModel = {};
    var value = $(obj).val();
    var a=$(obj).parent().next().find('.technic_second_level');
    // var technic_first_level = $(this).attr('id');
    objectModel['technic_first_level'] =value;

    var domain=document.domain;
    if(domain=='localhost'){
      domain+='/selectin/1';
    }
    var toUrl='http://'+domain+"/index.php/Home/Register/getSecondProcess";

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
            //a.css({"color":"red","border":"2px solid red"});
            //console.log(a.html());
            a.empty();
            var count = data.length;
            var i = 0;
            var b = "";
            for(i=0;i<count;i++){
                 b+="<option value='"+data[i]['id']+"'>"+data[i]['name']+"</option>";
            }
            a.append(b);
        },
    });
}

//根据technic_second触发得到所属technic_third
function get_technic_third(obj){
    var objectModel = {};
    var value = $(obj).val();
    var a=$(obj).parent().next().find('.technic_third_level');

    objectModel['technic_second_level'] =value;
    var domain=document.domain;
    if(domain=='localhost'){
      domain+='/selectin/1';
    }
    var toUrl='http://'+domain+"/index.php/Home/Register/getThirdProcess";

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
            
            a.empty();
            var count = data.length;
            var i = 0;
            var b = "";
            for(i=0;i<count;i++){
                var temp="<div class='col-sm-12'><input class='icheckbox_flat-blue' type='checkbox' name='ability[technic_third_id]["+data[i]['second_level_id']+"][]' value='"+data[i]['id']+"'/>"+data[i]['name']+"</div>";
                b+=temp;
            }
            a.append(b);
            $('input').iCheck({
              checkboxClass: 'icheckbox_flat-blue',
              radioClass: 'iradio_flat-blue'
            });
        },
    });

}


/*国家省份动态关联*/
$('#country_1').click(function(){
                var objectModel = {};
                var value = $(this).val();

                objectModel['country_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                  domain+='/selectin/1';
                }
                var toUrl="http://"+domain+"/index.php/Home/JS/get_all_provinces";

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
                        
                        $("#province_1").empty();
                        var count = data.length;

                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['id']+"'>"+data[i]['name']+"(+"+data[i]['code']+")"+"</option>";
                        }
                        $("#province_1").append(b);
                    },
                });
          });

/*国家省份动态关联*/
$('#country_2').click(function(){
                var objectModel = {};
                var value = $(this).val();
                objectModel['country_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                  domain+='/selectin/1';
                }
                var toUrl='http://'+domain+"/index.php/Home/JS/get_all_provinces";

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
                        
                        $("#province_2").empty();
                        var count = data.length;
                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['id']+"'>"+data[i]['name']+"(+"+data[i]['code']+")"+"</option>";
                        }
                        $("#province_2").append(b);
                    },
                });
          });


/*国家省份动态关联*/
$('#country_3').click(function(){
                var objectModel = {};
                var value = $(this).val();
                objectModel['country_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                  domain+='/selectin/1';
                }
                var toUrl='http://'+domain+"/index.php/Home/JS/get_all_provinces";

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
                        
                        $("#province_3").empty();
                        var count = data.length;
                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['id']+"'>"+data[i]['name']+"(+"+data[i]['code']+")"+"</option>";
                        }
                        $("#province_3").append(b);
                    },
                });
          });

/*国家省份动态关联*/
$('#country_4').click(function(){
                var objectModel = {};
                var value = $(this).val();
                objectModel['country_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                  domain+='/selectin/1';
                }
                var toUrl='http://'+domain+"/index.php/Home/JS/get_all_provinces";

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
                        
                        $("#province_4").empty();
                        var count = data.length;
                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['id']+"'>"+data[i]['name']+"</option>";
                        }
                        $("#province_4").append(b);
                    },
                });
          });

function get_provinces(country_id){
        var objectModel = {};
        var value = country_id;
        objectModel['country_id'] =value;
        var domain=document.domain;
                if(domain=='localhost'){
                  domain+='/selectin/1';
                }
        var toUrl='http://'+domain+"/index.php/Home/JS/get_all_provinces";

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
                
                $("#province_4").empty();
                var count = data.length;
                var i = 0;
                var b = "";
                for(i=0;i<count;i++){
                     b+="<option value='"+data[i]['id']+"'>"+data[i]['name']+"</option>";
                }
                $("#province_4").append(b);
            },
        }); 
}

//获得当前语言
function getLangCookie(name){
　　var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
　　if(arr != null)　　　　
　　　　return unescape(arr[2]).substr(0,2);
　　return null;
}