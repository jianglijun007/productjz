<?php
return array(
	//'配置项'=>'配置值'
	// 添加数据库配置信息
	'DB_TYPE'=>'mysql',// 数据库类型
	
	//在云服务器时
	 //'DB_HOST'=>SAE_MYSQL_HOST_M,// 服务器地址
	 //'DB_NAME'=> SAE_MYSQL_DB,// 数据库名
	 //'DB_USER'=>SAE_MYSQL_USER,// 用户名
	 //'DB_PWD'=> SAE_MYSQL_PASS,// 密码
    
    //在本地测试时
    
	'DB_HOST'=>'127.0.0.1',// 服务器地址
	'DB_NAME'=>'jlj_db',// 数据库名
	'DB_USER'=>'root',// 用户名
	'DB_PWD'=>'',// 密码
	
	'DB_PORT'=>3306,// 端口
	'DB_PREFIX'=>'jlj_',// 数据库表前缀
	'DB_CHARSET'=>'utf8',// 数据库字符集
	'SESSION_AUTO_START' => true, //是否开启session
);