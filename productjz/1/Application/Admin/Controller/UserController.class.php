<?php
namespace Admin\Controller;
use Admin\Controller;
class UserController extends BaseController {

	public function modify_user(){
		$User = M('User');
		$list = $User->select();

		$this->assign('list',$list);

		$username=session('username');
		$this->assign('username',$username);
		
		$this->display();
	}

    //封号
    public function ban(){
        $User=M('User');

        $id=I('get.id');
        $list=$User->where("id=$id ")->find();
        $this->assign('data',$list);

        if($list['state']=='-1'){
        	$this->error('该账户已被禁用',__APP__.'/Admin/User/modify_user');
        }
        $username=session('username');
        $this->assign('username',$username);
        $this->display();   
    }

    //提交编辑
    public function doBan(){
        $User=M('User');
        $data=I('post.');
        if($User->create()){
			if($insertid=$User->save()){
			    $this->success('操作成功','modify_user');
			}else{
			    $this->error($User->getError());
			}
        }
        else{
            $this->error($User->getError());
        }
    }

}