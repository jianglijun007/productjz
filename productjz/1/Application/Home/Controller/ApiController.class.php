<?php
namespace Home\Controller;
use Think\Controller;
class ApiController extends Controller {
	    //根据省id获得其下的所有市
    public function get_all_country(){
        if(I('province_id')){
            $Region=M('Provinces');
            $where['PARENT_ID']=I('province_id');
            $countrys=$Region->where($where)->select();
            $this->ajaxReturn($countrys);
        }else{
            $data['state']=0;
            $this->ajaxReturn($data['state']);
        }
    }

    //根据市id获得其下的所有区
    public function get_all_part(){
        if(I('country_id')){
            $Region=M('Provinces');
            $where['PARENT_ID']=I('country_id');
            $parts=$Region->where($where)->select();
            $this->ajaxReturn($parts);
        }
        $data['state']=0;
        $this->ajaxReturn($data['state']);
    }

}