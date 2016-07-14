<?php
namespace Admin\Model;
use Think\Model;
class UserModel extends Model {
    // 定义自动验证
    protected $_validate = array(
     array('count','require','工号必须！'), // 工号必须
     array('count','','工号已经存在！',1,'unique',1), // 验证用工号是否已经存在
     array('username','require','用户名必须！'), // 用户名必须
     array('phone','require','联系电话必须！'),
     array('email','email','Email格式错误！',2), // 如果输入则验证Email格式是否正确
     array('password','6,30','密码长度不正确',0,'length'), // 验证密码是否在指定长度范围
     array('repassword','password','确认密码不一致',0,'confirm'), // 验证确认密码是否和密码一致     
   );
    // 定义自动完成
    protected $_auto    =   array(
        array('regTime','time',1,'function'),
        );
 }