<?php
namespace Home\Controller;
use Think\Controller;
class JSController extends Controller {
    //根据国家id得到所有其省份
    public function get_all_provinces(){
    	if(I('country_id')){
    		$id=I('country_id');
	        $Province=M('Province_code');   //省份
	        $Pro_list=$Province->where('country_id='.$id)->select();
	        if(session('lang')=='en') $Pro_list=zh_to_en($Pro_list);
	        $this->ajaxReturn($Pro_list);
    	}
    	else{
    		$data['result']=false;
    		$this->ajaxReturn($data);
    	}
    }

}