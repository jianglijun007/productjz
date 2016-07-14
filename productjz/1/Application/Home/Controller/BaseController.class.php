<?php
namespace Home\Controller;
use Think\Controller;
class BaseController extends Controller{
    public function _empty(){
        $this->error('不存在该链接，请检查',__APP__.'/Home/Index');
    }
    
	public function _initialize() {

        //$this->checklogin();
    }

    public function checklogin() {

        //不设权限项
        if (in_array(MODULE_NAME, array('Home')) && in_array(CONTROLLER_NAME,array('Index')) && in_array(ACTION_NAME, array('index','login','dologin','logout'))) {
            return true;
        }

        //不设权限项
        if (in_array(MODULE_NAME, array('Home')) && in_array(CONTROLLER_NAME,array('Password'))) {
            return true;
        }

        if ((!isset($_SESSION['username']) || !$_SESSION['username']) || (!isset($_SESSION['user_id']) || !$_SESSION['user_id']) ||(!isset($_SESSION['group']) || $_SESSION['group_id']!='user')) {
            $this->error("没有登录", __APP__.'/Home/Index');
        }
        
        

    }
}