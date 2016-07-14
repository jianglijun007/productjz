<?php
namespace Admin\Controller;
use Admin\Controller;
class ArticleController extends BaseController {
	public function banner(){
		$username=session('username');
		$this->assign('username',$username);

        $banner = M('banner');
        $result = $banner->select();

        $this->assign('result',$result);

		$this->display();
	}

    public function modify_banner(){
        $banner = M('banner');   //实例化数据库
        $data['name']     = I('get.type');
        $data['title']    = I('post.title');
        $data['subtitle'] = I('post.subtitle');
        $data['describe'] = I('post.describe');
        $data['time']     = time();

        $where['name']=$data['name'];

        $flag = $banner->where($where)->find();

        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     3145728 ;// 设置附件上传大小
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath  =      './Public/uploads/banner/'; // 设置附件上传根目录
        $upload->savePath  =      ''; // 设置附件上传（子）目录
        $upload->autoSub   =     false;    //不使用子目录
        $upload->replace   =     true;      //允许替换

        if(!file_exists($upload->rootPath))
            $test1=mkdir('Public/uploads/banner', 0777 ,1);

        foreach($_FILES as $key =>$file){
             if(!empty($file['name'])) {
                 $upload->saveName=$key;
                 sae_unlink('./Public/uploads/banner/'.$flag['url']);
                 //unlink('./Public/uploads/banner/'.$flag['url']);  //删除原文件
                 $banner->where($where)->setField('url','');
                 // 上传单个文件 
                 $info   =   $upload->uploadOne($file);
                 if(!$info) {// 上传错误提示错误信息
                    $this->error($upload->getError());
                 }else{// 上传成功 获取上传文件信息
                    $data['url']=$info['savename'];
                    $this->success($info['savepath'].$info['savename']);
                 }
             }
        }

        if(!empty($flag)){
            if($data!=$flag){
                $result = $banner->where($where)->save($data);
                if($result){
                    $this->success("更新成功!");
                }else{
                    $this->error("更新失败！");
                }
            }else {
                if(!$info)
                    $this->error("请勿进行空修改！");
            }
        }
        else{
            $result = $banner->add($data);
            if($result){
                $this->success("添加成功!");
            }else{
                $this->error("添加失败！");
            }
        }
    }

    public function product(){
        $username=session('username');
        $this->assign('username',$username);

        $product = M('product');
        $result = $product->select();

        $this->assign('result',$result);

        $this->display();
    }

    public function modify_product(){
        $product = M('product');   //实例化数据库
        $data['name']     = I('get.type');
        $data['title']    = I('post.title');
        $data['subtitle'] = I('post.subtitle');
        $data['describe'] = I('post.describe');
        $data['time']     = time();

        $where['name']=$data['name'];

        $flag = $product->where($where)->find();

        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     3145728 ;// 设置附件上传大小
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath  =      './Public/uploads/product/'; // 设置附件上传根目录
        $upload->savePath  =      ''; // 设置附件上传（子）目录
        $upload->autoSub   =     false;    //不使用子目录
        $upload->replace   =     true;      //允许替换

        if(!file_exists($upload->rootPath))
            $test1=mkdir('Public/uploads/product', 0777 ,1);

        foreach($_FILES as $key =>$file){
             if(!empty($file['name'])) {
                 $upload->saveName=$key;
                 //unlink('./Public/uploads/product/'.$flag['url']);  //删除原文件
                 sae_unlink('./Public/uploads/product/'.$flag['url']);
                 $banner->where($where)->setField('url','');
                 // 上传单个文件 
                 $info   =   $upload->uploadOne($file);
                 if(!$info) {// 上传错误提示错误信息
                    $this->error($upload->getError());
                 }else{// 上传成功 获取上传文件信息
                    $data['url']=$info['savename'];
                    $this->success($info['savepath'].$info['savename']);
                 }
             }
        }

        if(!empty($flag)){
            if($data!=$flag){
                $result = $product->where($where)->save($data);
                if($result){
                    $this->success("更新成功!");
                }else{
                    $this->error("更新失败！");
                }
            }else {
                if(!$info)
                    $this->error("请勿进行空修改！");
            }
        }
        else{
            $result = $product->add($data);
            if($result){
                $this->success("添加成功!");
            }else{
                $this->error("添加失败！");
            }
        }
    }

    public function connect(){
        $username=session('username');
        $this->assign('username',$username);

        $connect = M('Connect');
        $result = $connect->select();

        $this->assign('result',$result);

        $this->display();
    }

    public function modify_connect(){
        $connect = M('connect');   //实例化数据库
        $data['name']     = I('get.type');
        $data['title']    = I('post.title');
        $data['subtitle'] = I('post.subtitle');
        $data['describe'] = I('post.describe');
        $data['time']     = time();

        $where['name']=$data['name'];

        $flag = $connect->where($where)->find();

        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     3145728 ;// 设置附件上传大小
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath  =      './Public/uploads/connect/'; // 设置附件上传根目录
        $upload->savePath  =      ''; // 设置附件上传（子）目录
        $upload->autoSub   =     false;    //不使用子目录
        $upload->replace   =     true;      //允许替换

        if(!file_exists($upload->rootPath))
            $test1=mkdir('Public/uploads/connect', 0777 ,1);

        foreach($_FILES as $key =>$file){
             if(!empty($file['name'])) {
                 $upload->saveName=$key;
                 //unlink('./Public/uploads/connect/'.$flag['url']);  //删除原文件
                 //sae_unlink('./Public/uploads/connect/'.$flag['url']);
                 $connect->where($where)->setField('url','');
                 // 上传单个文件 
                 $info   =   $upload->uploadOne($file);
                 if(!$info) {// 上传错误提示错误信息
                    $this->error($upload->getError());
                 }else{// 上传成功 获取上传文件信息
                    $data['url']=$info['savename'];
                    $this->success($info['savepath'].$info['savename']);
                 }
             }
        }

        if(!empty($flag)){
            if($data!=$flag){
                $result = $connect->where($where)->save($data);
                if($result){
                    $this->success("更新成功!");
                }else{
                    $this->error("更新失败！");
                }
            }else {
                if(!$info)
                    $this->error("请勿进行空修改！");
            }
        }
        else{
            $result = $connect->add($data);
            if($result){
                $this->success("添加成功!");
            }else{
                $this->error("添加失败！");
            }
        }
    }

}