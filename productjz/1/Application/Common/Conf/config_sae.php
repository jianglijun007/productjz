<?php
$st= Think\Think::instance('SaeStorage'); 
return array(
    'TMPL_PARSE_STRING'=>array(
        '/productjz/1/uploads/connect' => $url=$st->getUrl('Public','uploads/connect') ,
        '/productjz/1/uploads/banner' => $url=$st->getUrl('Public','uploads/banner') ,
        '/productjz/1/uploads/product' => $url=$st->getUrl('Public','uploads/product') ,
    )
 );