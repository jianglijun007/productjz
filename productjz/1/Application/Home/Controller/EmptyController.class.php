<?php
namespace Home\Controller;
use Home\Controller;
class EmptyController extends BaseController {
    public function index(){
    	$this->error('不存在该链接，请检查',__APP__.'/Home/Index');
    }
}