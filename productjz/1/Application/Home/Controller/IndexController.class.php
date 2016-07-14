<?php
namespace Home\Controller;
use Home\Controller;
class IndexController extends BaseController {
    //首页
    public function verify(){
        $Verify = new \Think\Verify();
        $Verify -> useCurve = false;
        $Verify -> fontSize = 30;
        $Verify -> length = 4;
        $Verify->entry();
    }

    public function index(){
        $banner=M('banner');
        $list=$banner->select();
        $this->assign('list',$list);

        $product=M('product');
        $list2=$product->select();
        $this->assign('product',$list2);

        $connect=M('connect');
        $list3=$connect->select();
        $this->assign('connect',$list3);

        $this->display();

    }

    public function login(){
        $this->display();
    }

    //登陆
    public function dologin(){
        $Verify = new \Think\Verify();
        if(!$Verify->check(I('post.check'))){
            $this->error('验证码错误!',__APP__.'/Home/Index/login');
        }

        session(null);

        if(!I('post.')){
            $this->error('请输入用户名和密码!');
        }
        
        $data['account']=I('post.account');              //获得用户名
        $data['password']=md5(I('post.password'));      //获得密码

        $User=M('Users');
        $list=$User->getByAccount($data['account']);    //读取用户数据

        if($list){
            if($list['password']==$data['password']){
            	session('username',$list['name']?$list['name']:$list['account']);
                session('user_id',$list['id']);
                session('group','user');
                if($list['state']!=1){
                    $this->error('请先激活账户',__APP__.'/Home/User/active');
                }
                redirect(__APP__.'/Home/user/index');
            }
            else{
                $this->error('用户名或密码错误',__APP__.'/Home/Index/login');
            }
        }
        else{
            $this->error('用户名或密码错误',__APP__.'/Home/Index/login');
        }
    }

    //登出
    public function logout(){
    	session(null);
    	$this->success('退出成功',__APP__.'/Home/Index');
    }

}