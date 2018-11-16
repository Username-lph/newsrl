function copyUrl2() {
	document.getElementById('copysuccess').style.display = 'block';

	const range = document.createRange();
	range.selectNode(document.getElementById('content'));
	const selection = window.getSelection();
	if(selection.rangeCount > 0) selection.removeAllRanges();
	selection.addRange(range);
	document.execCommand('copy');
}

function openWWW() {
	if(!/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && / baiduboxapp/i.test(navigator.userAgent)) {
		window.location.href = "bdbox://utils?action=sendIntent&minver=7.4&params=%7b%22intent%22%3a%22weixin%3a%2f%2f%23Intent%3bend%22%7d";
	} else {
		window.location.href = "weixin://";
	}
	document.getElementById('copysuccess').style.display = 'none';
} 

	
	
	$('#mydel').click(function(event) {
		/* Act on the event */
		$("#myModal").hide();
	});


	// function setRem() {
	// 	var html = document.documentElement;
	// 	var hWidth = html.getBoundingClientRect().width;
	// 	html.style.fontSize = hWidth / 10 + 'px';
	// }
	// setRem();