<?php
    header('Access-Control-Allow-Origin: *');
    require_once "jssdk.php";

    $jssdk = new JSSDK("wx43d8e413ecccb057", "a777a98374db9d0b3bbdeb8bfd9b3f37");
//    $jssdk = new JSSDK("wxd96d66aa5aacbdf0", "daee99bbbceb08d2a53f7d8e1d847b57");
//    $jssdk = new JSSDK("wx70e46f46b57f1b51", "551ec8c0ccb1aec33139384fae7fa57a");
    $result = "";

    if ($_GET['do']=='getUserInfo') {
    	$result = $jssdk->getUserInfo($_GET["code"]);
    }
    else {
	    $result = $jssdk->getSignPackage();
    }

    echo json_encode($result);

/*
define("TOKEN", "token");  
$wechatObj = new wechatCallbackapiTest();  
$wechatObj->valid();  
$wechatObj->responseMsg();

class wechatCallbackapiTest  
{   
//事物处理函数  
    public function responseMsg()  
    {  
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];  
        if (!empty($postStr)){  
               libxml_disable_entity_loader(true);  
                $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);  
                $fromUsername = $postObj->FromUserName;  
                $toUsername = $postObj->ToUserName;  
                $keyword = trim($postObj->Content);  
                $time = time();  
                $textTpl = "<xml>  
                            <ToUserName><![CDATA[%s]]></ToUserName>  
                            <FromUserName><![CDATA[%s]]></FromUserName>  
                            <CreateTime>%s</CreateTime>  
                            <MsgType><![CDATA[%s]]></MsgType>  
                            <Content><![CDATA[%s]]></Content>  
                            <FuncFlag>0</FuncFlag>  
                            </xml>";               
switch($keyword){  
case "马云":  
$msgType = "text";  
$contentStr="您好，马云！我知道您创建了阿里巴巴！";  
break;  
case "马化腾":  
$msgType = "text";  
$contentStr="您好，马化腾！我知道创建了企鹅帝国！";  
break;  
case "史玉柱":  
$msgType = "text";  
$contentStr="您好，史玉柱！我知道您创建了巨人网络！";  
break;  
default :  
$msgType = "text";  
$contentStr="你是谁啊？！一边凉快去！";  
break;  
}  
if(!empty($contentStr)){  
//输出到微信终端  
$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);  
echo $resultStr;  
}                 
                  
                  
  
        }else {  
            echo "";  
            exit;  
        }  
    }  
  
//接口验证函数  
public function valid()  
    {  
        $echoStr = $_GET["echostr"];  
  
        //valid signature , option  
        if($this->checkSignature()){  
            echo $echoStr;  
            //exit;  
        }  
    }  
private function checkSignature()  
    {  
        // you must define TOKEN by yourself  
        if (!defined("TOKEN")) {  
            throw new Exception('TOKEN is not defined!');  
        }  
          
        $signature = $_GET["signature"];  
        $timestamp = $_GET["timestamp"];  
        $nonce = $_GET["nonce"];  
                  
        $token = TOKEN;  
        $tmpArr = array($token, $timestamp, $nonce);  
        // use SORT_STRING rule  
        sort($tmpArr, SORT_STRING);  
        $tmpStr = implode( $tmpArr );  
        $tmpStr = sha1( $tmpStr );  
          
        if( $tmpStr == $signature ){  
            return true;  
        }else{  
            return false;  
        }  
    }  
}*/
?>