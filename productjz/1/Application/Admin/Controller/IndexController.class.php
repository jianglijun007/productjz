<?php
namespace Admin\Controller;
use Admin\Controller;
class IndexController extends BaseController {
    public function verify(){       //验证码
        $Verify = new \Think\Verify();
        $Verify -> useCurve = false;
        $Verify -> fontSize = 30;
        $Verify -> length = 4;
        $Verify->entry();
    }

    public function index(){
        $username=session('username');
        $this->assign('username',$username);


        $this->assign('info',$info);
        $this->display();
    }
    
    public function logout(){
    	session(null);
        $this->success('登出成功',__APP__.'/Home/Index/index');
    }

    public function admin_login(){
        $Verify = new \Think\Verify();
        if(!$Verify->check(I('post.check'))){
            $this->error('验证码错误!',__APP__.'/Admin/Index/login');
        }

    	session(null);

        if(!I('post.')){
            $this->error('请输入用户名和密码!');
        }

        $User=M('Admin');
		 
        $data['username']=I('post.account');              //获得用户名
        $data['password']=md5(I('post.password'));      //获得密码

        $list=$User->getByUsername($data['username']);    //读取用户数据

		 if($list){
            if($list['password']==$data['password']){
                session('username',$list['name']);
                session('user_id',$list['id']);
                session('group',$list['group']);
                redirect(__APP__.'/Admin/Index/index');
            }
            else{
                $this->error('用户名或密码错误',__APP__.'/Admin/Index/login');
            }
        }
        else{
            $this->error('用户名或密码错误',__APP__.'/Admin/Index/login');
        }

    }

}
