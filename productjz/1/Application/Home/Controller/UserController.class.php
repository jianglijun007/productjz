<?php
namespace Home\Controller;
use Home\Controller;
class UserController extends BaseController {
    public function _initialize() {
        parent::_initialize();
        $username=session('username');
        $this->assign('username',$username);
    }

    public function index(){
        $id=session('user_id');
        $this->assign('id',$id);

        $limit1=M('Nation');        //民族
        $view1=$limit1->select();
        $this->assign('nation',$view1);

        $limit2=M('Provinces');        //省份
        $view2=$limit2->where('parent_id=1')->select();
        $this->assign('province',$view2);

        $table1=M('Users');         //基本信息
        $list1=$table1->find($id);
        $list1['nation']=$limit1->where('id='.$list1['nationality_id'])->getfield('name');
        $list1['birthprovince']=$limit2->where('region_id='.$list1['birthprovince_id'])->getfield('region_name');
        $list1['birthcity']=$limit2->where('region_id='.$list1['birthcity_id'])->getfield('region_name');
        $list1['birthcountry']=$limit2->where('region_id='.$list1['birthcountry_id'])->getfield('region_name');
        $list1['userprovince']=$limit2->where('region_id='.$list1['userprovince_id'])->getfield('region_name');
        $list1['usercity']=$limit2->where('region_id='.$list1['usercity_id'])->getfield('region_name');
        $list1['usercountry']=$limit2->where('region_id='.$list1['usercountry_id'])->getfield('region_name');
        $list1['workprovince']=$limit2->where('region_id='.$list1['workprovince_id'])->getfield('region_name');
        $list1['workcity']=$limit2->where('region_id='.$list1['workcity_id'])->getfield('region_name');
        $list1['workcountry']=$limit2->where('region_id='.$list1['workcountry_id'])->getfield('region_name');
        $this->assign('base',$list1);

        $table2=M('Users_edu'); //教育信息
        $list2=$table2->getByUser_id($id);
        $this->assign('edu',$list2);

        $table3=M('Users_exp'); //简历信息
        $list3=$table3->getByUser_id($id);
        $this->assign('exp',$list3);

        $table4=M('Users_state'); //考核情况
        $list4=$table4->getByUser_id($id);
        $this->assign('state',$list4);

        $table5=M('Users_rewardpunish'); //奖惩
        $list5=$table5->getByUser_id($id);
        $this->assign('rp',$list5);

        $table6=M('Users_treat'); //待遇
        $list6=$table6->getByUser_id($id);
        $this->assign('treat',$list6);

        $table7=M('Users_business'); //创业
        $list7=$table7->getByUser_id($id);
        $this->assign('bus',$list7);

        $table8=M('Users_train'); //培训
        $list8=$table8->getByUser_id($id);
        $this->assign('train',$list8);

        $table9=M('Users_helper'); //帮带
        $list9=$table9->getByUser_id($id);
        $this->assign('helper',$list9);

        $table10=M('Users_social'); //社会关系
        $list10=$table10->getByUser_id($id);
        $this->assign('social',$list10);

        $table11=M('Users_bargain'); //合同
        $list11=$table11->getByUser_id($id);
        $this->assign('bargain',$list11);

        $table12=M('Users_duty_country'); //村级职务
        $list12=$table12->getByUser_id($id);
        $this->assign('country',$list12);

        $table13=M('Users_duty_town'); //乡村级干部
        $list13=$table13->getByUser_id($id);
        $this->assign('town',$list13);

        $table14=M('Users_duty_backup'); //后备干部
        $list14=$table14->getByUser_id($id);
        $this->assign('backup',$list14);

        $table15=M('Users_duty_cmc'); //两党一委员
        $list15=$table15->getByUser_id($id);
        $this->assign('cmc',$list15);

        $this->display();
    }

    public function active(){
        $id=session('user_id');
        $User=M('Users');
        $info=$User->getById($id);

        if($info['state']==1){
            $this->success('账户已激活',__APP__.'/Home/User/index');
        }
        $this->assign('info',$info);
        $this->display();
    }

    public function doActive(){
        if(!I('post.')){
            $this->error('非法访问',__APP__.'Home/Index');
        }
        $psw1=md5(I('post.password'));
        $psw2=md5(I('post.passwordTwice'));

        if($psw1!=$psw2){
            $this->error('密码不一致');
        }
        else{
            $User=M('Users');
            $info=$User->getById(I('post.id'));
            $info['password']=$psw1;
            $info['state']=1;
            $res=$User->save($info);
            if($res!==0){
                $this->success('激活成功',__APP__.'/Home/User/index');
            }else{
                $this->error('激活失败');
            }
        }
    }

    public function update(){
        $info=I('post.');
        foreach ($info as $key => $value) {
            $$key=$value;
        }

        $table1=M('Users');         //基本信息
        $base['id']=$user_id;
        $res1=$table1->save($base);

        $table2=M('Users_edu'); //教育信息
        $edu['user_id']=$user_id;
        $find2=$table2->where('user_id='.$user_id)->find();
        if($find2){
            $res2=$table2->where('user_id='.$user_id)->save($edu);
        }else{
            $res2=$table2->add($edu);
        }

        $table3=M('Users_exp'); //简历信息
        $exp['user_id']=$user_id;
        $find3=$table3->where('user_id='.$user_id)->find();
        if($find3){
            $res3=$table3->where('user_id='.$user_id)->save($exp);
        }else{
            $res3=$table3->add($exp);
        }

        $table4=M('Users_state'); //考核情况
        $state['user_id']=$user_id;
        $find4=$table4->where('user_id='.$user_id)->find();
        if($find4){
            $res4=$table4->where('user_id='.$user_id)->save($state);
        }else{
            $res4=$table4->add($state);
        }

        $table5=M('Users_rewardpunish'); //奖惩
        $rp['user_id']=$user_id;
        $find5=$table5->where('user_id='.$user_id)->find();
        if($find5){
            $res5=$table5->where('user_id='.$user_id)->save($rp);
        }else{
            $res5=$table5->add($rp);
        }

        $table6=M('Users_treat'); //待遇
        $treat['user_id']=$user_id;
        $find6=$table6->where('user_id='.$user_id)->find();
        if($find6){
            $res6=$table6->where('user_id='.$user_id)->save($treat);
        }else{
            $res6=$table6->add($treat);
        }

        $table7=M('Users_business'); //创业
        $bus['user_id']=$user_id;
        $find7=$table7->where('user_id='.$user_id)->find();
        if($find7){
            $res7=$table7->where('user_id='.$user_id)->save($bus);
        }else{
            $res7=$table7->add($bus);
        }

        $table8=M('Users_train'); //培训
        $train['user_id']=$user_id;
        $find8=$table8->where('user_id='.$user_id)->find();
        if($find8){
            $res8=$table8->where('user_id='.$user_id)->save($train);
        }else{
            $res8=$table8->add($train);
        }

        $table9=M('Users_helper'); //帮带
        $helper['user_id']=$user_id;
        $find9=$table9->where('user_id='.$user_id)->find();
        if($find9){
            $res9=$table9->where('user_id='.$user_id)->save($helper);
        }else{
            $res9=$table9->add($helper);
        }

        $table10=M('Users_social'); //教育信息
        $social['user_id']=$user_id;
        $find10=$table10->where('user_id='.$user_id)->find();
        if($find10){
            $res10=$table10->where('user_id='.$user_id)->save($social);
        }else{
            $res10=$table10->add($social);
        }

        $table11=M('Users_bargain'); //合同
        $bargain['user_id']=$user_id;
        $find11=$table11->where('user_id='.$user_id)->find();
        if($find11){
            $res11=$table11->where('user_id='.$user_id)->save($bargain);
        }else{
            $res11=$table11->add($bargain);
        }

        $table12=M('Users_duty_country'); //村级职务
        $country['user_id']=$user_id;
        $find12=$table12->where('user_id='.$user_id)->find();
        if($find12){
            $res12=$table12->where('user_id='.$user_id)->save($country);
        }else{
            $res12=$table12->add($country);
        }

        $table13=M('Users_duty_town'); //乡村级干部
        $town['user_id']=$user_id;
        $find13=$table13->where('user_id='.$user_id)->find();
        if($find13){
            $res13=$table13->where('user_id='.$user_id)->save($town);
        }else{
            $res13=$table13->add($town);
        }

        $table14=M('Users_duty_backup'); //后备干部
        $backup['user_id']=$user_id;
        $find14=$table14->where('user_id='.$user_id)->find();
        if($find14){
            $res14=$table14->where('user_id='.$user_id)->save($backup);
        }else{
            $res14=$table14->add($backup);
        }

        $table15=M('Users_duty_cmc'); //教育信息
        $cmc['user_id']=$user_id;
        $find15=$table15->where('user_id='.$user_id)->find();
        if($find15){
            $res15=$table15->where('user_id='.$user_id)->save($cmc);
        }else{
            $res15=$table15->add($cmc);
        }

        $this->success('更新成功',__APP__.'/Home/User/index');
    }
}