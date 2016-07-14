<?php
namespace Admin\Controller;
use Admin\Controller;
class ManagerController extends BaseController {
	public function _initialize() {
		parent::_initialize();

		if (in_array(ACTION_NAME, array('modify_manager'))) {
             return true;
         }

		if(session('group')!=1){
			$this->error('没有权限');
		}
	}
	public function modify_manager(){
		$User = M('Admin');
		$list = $User->select();

		$this->assign('list',$list);

		$username=session('username');
		$this->assign('username',$username);
		
		$this->display();
	}

	public function new_manager(){
		$username=session('username');
        $this->assign('username',$username);

		$this->assign('list',$list);
    	$this->display();
	}

	//添加管理员
	public function add_new_manager(){
		$User = M('Admin');
		$data=I('post.');

		if($User->getbyUsername($data['username'])){
			$this->error('管理员已存在');
		}
        /*写入数据*/
        if($User->create()) {
        	if(!$data['password']||!$data['repassword'])
        		$this->error('表单不完整！');
        	else{
	        	$data['password']=md5($data['password']);
	        	$data['repassword']=md5($data['repassword']);

	        	if($data['password']==$data['repassword']){
	        		
		            $result =   $User->add($data);
		            if($result) {
		                $this->success('数据添加成功！',"modify_manager");
		            }else{
		                $this->error('数据添加错误！');
		            }
		        }
		     	else{
		     		$this->error('两次密码不同！');
		     	}
	    	}
        }
        else{
            $this->error($User->getError());
        }
	}

	//删除管理员
    public function delete_manager(){      
        $User=M('Admin');
        if($User->delete(I('get.id'))){
            $this->success('删除成功');
        }else{
            $this->error($User->getError());
        }
    }

    //编辑
    public function edit_manager(){
        $User=M('Admin');

        $id=I('get.id');
        $list=$User->where("id=$id ")->find();
        $this->assign('data',$list);

        $username=session('username');
        $this->assign('username',$username);
        $this->display();   
    }

    //提交编辑
    public function update_manager(){
        $User=M('Admin');
        $data=I('post.');

        if($User->create()){
      		if(!$data['password']){	$User->field('password',ture);	}//如未输入密码保持不变
		    else if(md5($data['password'])==md5($data['repassword'])){
			    $User->password=md5($data['password']);		        		
			}
			else $this->error('两次密码不一致！');

			if($insertid=$User->save()){
				if($insertid==session('user_id') && $data['password']!=NULL){
					session(null);
					$this->success('密码更新成功，请重新登陆',__APP__.'/Admin/Index/login');
				}
				session('username',$data['name']);
			    $this->success('更新成功','modify_manager');
			}else{
			    $this->error($User->getError());
			}
        }
        else{
            $this->error($User->getError());
        }
    }

    /*区域设置*/
    public function modify_area(){
		$User = M('Area');
		$list = $User->select();

		$this->assign('list',$list);

		$username=session('username');
		$this->assign('username',$username);
		
		$this->display();
	}

	public function new_area(){
		$username=session('username');
        $this->assign('username',$username);

		$this->assign('list',$list);
    	$this->display();
	}

	//添加
	public function add_new_area(){
		$User = M('Area');
		$data=I('post.');

		if($User->getbyArea($data['area'])){
			$this->error('区域已存在');
		}
        /*写入数据*/
        if($User->create()) {
		            $result =   $User->add($data);
		            if($result) {
		                $this->success('数据添加成功！',"modify_area");
		            }else{
		                $this->error('数据添加错误！');
		            }
        }
        else{
            $this->error($User->getError());
        }
	}

	//删除
    public function delete_area(){      
        $User=M('Area');
        if($User->delete(I('get.id'))){
            $this->success('删除成功');
        }else{
            $this->error($User->getError());
        }
    }

    //编辑
    public function edit_area(){
        $User=M('Area');

        $id=I('get.id');
        $list=$User->where("id=$id ")->find();
        $this->assign('data',$list);

        $username=session('username');
        $this->assign('username',$username);
        $this->display();   
    }

    //提交编辑
    public function update_area(){
        $User=M('Area');
        $data=I('post.');

        if($User->create()){

			if($insertid=$User->save()){
			    $this->success('更新成功','modify_area');
			}else{
			    $this->error($User->getError());
			}
        }
        else{
            $this->error($User->getError());
        }
    }
}