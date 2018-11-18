<?php
/*
 * 获取客户端真实地址
 */
class IpLocation{
	//获取客户端真实ip地址
	public function get_real_ip(){
		static $realip;
		if(isset($_SERVER)){
			if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])){
				$realip=$_SERVER['HTTP_X_FORWARDED_FOR'];
			}else if(isset($_SERVER['HTTP_CLIENT_IP'])){
				$realip=$_SERVER['HTTP_CLIENT_IP'];
			}else{
				$realip=$_SERVER['REMOTE_ADDR'];
			}
		}else{
			if(getenv('HTTP_X_FORWARDED_FOR')){
				$realip=getenv('HTTP_X_FORWARDED_FOR');
			}else if(getenv('HTTP_CLIENT_IP')){
				$realip=getenv('HTTP_CLIENT_IP');
			}else{
				$realip=getenv('REMOTE_ADDR');
			}
		}
		return $realip;
	}	
	
	/**
	 *  获取访客语言：简体中文、繁體中文、English。
	 */
	function GetLang() {
		$Lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 4);
		//使用substr()截取字符串，从 0 位开始，截取4个字符
		if (preg_match('/zh-c/i',$Lang)) {
			//preg_match()正则表达式匹配函数
			$Lang = '简体中文';
		}
		elseif (preg_match('/zh/i',$Lang)) {
			$Lang = '繁體中文';
		}
		else {
			$Lang = 'English';
		}
		return $Lang;
	}
	/**
	 * 获取访客浏览器：MSIE、Firefox、Chrome、Safari、Opera、Other。
	 */
	function GetBrowser() {
		$Browser = $_SERVER['HTTP_USER_AGENT'];
		if (preg_match('/MSIE/i',$Browser)) {
			$Browser = 'MSIE';
		}
		elseif (preg_match('/Firefox/i',$Browser)) {
			$Browser = 'Firefox';
		}
		elseif (preg_match('/Chrome/i',$Browser)) {
			$Browser = 'Chrome';
		}
		elseif (preg_match('/Safari/i',$Browser)) {
			$Browser = 'Safari';
		}
		elseif (preg_match('/Opera/i',$Browser)) {
			$Browser = 'Opera';
		}
		else {
			$Browser = 'Other';
		}
		return $Browser;
	}
	/**
	 *  获取访客操作系统：Windows、MAC、Linux、Unix、BSD、Other。
	 */
	function GetOS() {
		$OS = $_SERVER['HTTP_USER_AGENT'];
		if (preg_match('/win/i',$OS)) {
			$OS = 'Windows';
		}
		elseif (preg_match('/mac/i',$OS)) {
			$OS = 'MAC';
		}
		elseif (preg_match('/linux/i',$OS)) {
			$OS = 'Linux';
		}
		elseif (preg_match('/unix/i',$OS)) {
			$OS = 'Unix';
		}
		elseif (preg_match('/bsd/i',$OS)) {
			$OS = 'BSD';
		}
		else {
			$OS = 'Other';
		}
		return $OS;
	}
	/**
	 * 获取访客IP地址。
	 */
	function GetIP() {
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			//如果变量是非空或非零的值，则 empty()返回 FALSE。
			$IP = explode(',',$_SERVER['HTTP_CLIENT_IP']);
		}
		elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$IP = explode(',',$_SERVER['HTTP_X_FORWARDED_FOR']);
		}
		elseif (!empty($_SERVER['REMOTE_ADDR'])) {
			$IP = explode(',',$_SERVER['REMOTE_ADDR']);
		}
		else {
			$IP[0] = 'None';
		}
		return $IP[0];
	}
	/**
	 * 获取访客地理位置，QQ接口。（紫田双线服务器获取有问题）
	 */
	private function GetAddIsp() {
		$IP = $this->GetIP();
		$result = mb_convert_encoding(file_get_contents('http://ip.qq.com/cgi-bin/searchip?searchip1='.$IP),'UTF-8','gb2312');
		//mb_convert_encoding() 转换字符编码。
		if (preg_match('@<span>(.*)</span></p>@iU',$result,$ipArray)) {
			$AddIsp =  $ipArray;
		}
		return $AddIsp;
	}
	/**
	 * 获取访客地理位置。
	 */
	function GetAddress() {
		$Add = $this->GetAddIsp();
		return $Add[1];
	}
	
	//判断请求来自 移动手机端，还是来自电脑 PC 端
	function checkmobile() {
		global $_G;
		$mobile = array();
		static $mobilebrowser_list =array('iphone', 'android', 'phone', 'mobile', 'wap', 'netfront', 'java', 'opera mobi', 'opera mini',
				'ucweb', 'windows ce', 'symbian', 'series', 'webos', 'sony', 'blackberry', 'dopod', 'nokia', 'samsung',
				'palmsource', 'xda', 'pieplus', 'meizu', 'midp', 'cldc', 'motorola', 'foma', 'docomo', 'up.browser',
				'up.link', 'blazer', 'helio', 'hosin', 'huawei', 'novarra', 'coolpad', 'webos', 'techfaith', 'palmsource',
				'alcatel', 'amoi', 'ktouch', 'nexian', 'ericsson', 'philips', 'sagem', 'wellcom', 'bunjalloo', 'maui', 'smartphone',
				'iemobile', 'spice', 'bird', 'zte-', 'longcos', 'pantech', 'gionee', 'portalmmm', 'jig browser', 'hiptop',
				'benq', 'haier', '^lct', '320x320', '240x320', '176x220');
		$useragent = strtolower($_SERVER['HTTP_USER_AGENT']);
		if(($v = $this->dstrpos($useragent, $mobilebrowser_list, true))) {
			$_G['mobile'] = $v;
			return true;
		}
		$brower = array('mozilla', 'chrome', 'safari', 'opera', 'm3gate', 'winwap', 'openwave', 'myop');
		if($this->dstrpos($useragent, $brower)) return false;
		 
		$_G['mobile'] = 'unknown';
		if($_GET['mobile'] === 'yes') {
			return true;
		} else {
			return false;
		}
	}
	 
	function dstrpos($string, &$arr, $returnvalue = false) {
		if(empty($string)) return false;
		foreach((array)$arr as $v) {
			if(strpos($string, $v) !== false) {
				$return = $returnvalue ? $v : true;
				return $return;
			}
		}
		return false;
	}
}
?>