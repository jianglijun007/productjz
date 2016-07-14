/*省份和市动态关联*/
$('#province1').click(function(){
                var objectModel = {};
                var value = $(this).val();
                objectModel['province_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                    domain+='/usvo/1';
                }
                var toUrl='http://'+domain+"/index.php/Home/Api/get_all_country";
                $.ajax({
                    cache:false,
                    type:"POST",
                    url :toUrl,
                    dataType:"json",
                    data:objectModel,
                    timeout:30000,
                    
                    
                    error:function(){
                        alert(toUrl);
                    },
                    success:function(data){
                        
                        console.log(data);
                        $("#country1").empty();
                        var count = data.length;
                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['region_id']+"'>"+data[i]['region_name']+"</option>";
                        }
                        $("#country1").append(b);
                    },
                });
          });
/*市和区动态关联*/
$('#country1').click(function(){
                var objectModel = {};
                var value = $(this).val();
                objectModel['country_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                    domain+='/usvo/1';
                }
                var toUrl='http://'+domain+"/index.php/Home/Api/get_all_part";
                $.ajax({
                    cache:false,
                    type:"POST",
                    url :toUrl,
                    dataType:"json",
                    data:objectModel,
                    timeout:30000,
                    
                    
                    error:function(){
                        alert(toUrl);
                    },
                    success:function(data){
                        
                        console.log(data);
                        $("#part1").empty();
                        var count = data.length;
                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['region_id']+"'>"+data[i]['region_name']+"</option>";
                        }
                        $("#part1").append(b);
                    },
                });
          });

/*省份和市动态关联*/
$('#province2').click(function(){
                var objectModel = {};
                var value = $(this).val();
                objectModel['province_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                    domain+='/usvo/1';
                }
                var toUrl='http://'+domain+"/index.php/Home/Api/get_all_country";
                $.ajax({
                    cache:false,
                    type:"POST",
                    url :toUrl,
                    dataType:"json",
                    data:objectModel,
                    timeout:30000,
                    
                    
                    error:function(){
                        alert(toUrl);
                    },
                    success:function(data){
                        
                        console.log(data);
                        $("#country2").empty();
                        var count = data.length;
                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['region_id']+"'>"+data[i]['region_name']+"</option>";
                        }
                        $("#country2").append(b);
                    },
                });
          });
/*市和区动态关联*/
$('#country2').click(function(){
                var objectModel = {};
                var value = $(this).val();
                objectModel['country_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                    domain+='/usvo/1';
                }
                var toUrl='http://'+domain+"/index.php/Home/Api/get_all_part";
                $.ajax({
                    cache:false,
                    type:"POST",
                    url :toUrl,
                    dataType:"json",
                    data:objectModel,
                    timeout:30000,
                    
                    
                    error:function(){
                        alert(toUrl);
                    },
                    success:function(data){
                        
                        console.log(data);
                        $("#part2").empty();
                        var count = data.length;
                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['region_id']+"'>"+data[i]['region_name']+"</option>";
                        }
                        $("#part2").append(b);
                    },
                });
          });

/*省份和市动态关联*/
$('#province3').click(function(){
                var objectModel = {};
                var value = $(this).val();
                objectModel['province_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                    domain+='/usvo/1';
                }
                var toUrl='http://'+domain+"/index.php/Home/Api/get_all_country";
                $.ajax({
                    cache:false,
                    type:"POST",
                    url :toUrl,
                    dataType:"json",
                    data:objectModel,
                    timeout:30000,
                    
                    
                    error:function(){
                        alert(toUrl);
                    },
                    success:function(data){
                        
                        console.log(data);
                        $("#country3").empty();
                        var count = data.length;
                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['region_id']+"'>"+data[i]['region_name']+"</option>";
                        }
                        $("#country3").append(b);
                    },
                });
          });
/*市和区动态关联*/
$('#country3').click(function(){
                var objectModel = {};
                var value = $(this).val();
                objectModel['country_id'] =value;
                var domain=document.domain;
                if(domain=='localhost'){
                    domain+='/usvo/1';
                }
                var toUrl='http://'+domain+"/index.php/Home/Api/get_all_part";
                $.ajax({
                    cache:false,
                    type:"POST",
                    url :toUrl,
                    dataType:"json",
                    data:objectModel,
                    timeout:30000,
                    
                    
                    error:function(){
                        alert(toUrl);
                    },
                    success:function(data){
                        
                        console.log(data);
                        $("#part3").empty();
                        var count = data.length;
                        var i = 0;
                        var b = "";
                        for(i=0;i<count;i++){
                             b+="<option value='"+data[i]['region_id']+"'>"+data[i]['region_name']+"</option>";
                        }
                        $("#part3").append(b);
                    },
                });
          });