$(function () {
    // luobo banner s
    $('#home_banner3').flexslider({
        animation: "slide",
        direction: "horizontal",
        easing: "swing"
    });
    // luobo banner e

    //底部加入收藏按钮函数
    // var addFavorite2 = $(".addFavorite2");
    // function addFavorite2() {
    //     var url = window.location;
    //     var title = document.title;
    //     var ua = navigator.userAgent.toLowerCase();
    //     if (ua.indexOf("360se") > -1) {
    //         alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    //     } else if (ua.indexOf("msie 8") > -1) {
    //         window.external.AddToFavoritesBar(url, title); //IE8
    //     } else if (document.all) {
    //         try {
    //             window.external.addFavorite(url, title);
    //         } catch (e) {
    //             alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    //         }
    //     } else if (window.sidebar) {
    //         window.sidebar.addPanel(title, url, "");
    //     } else {
    //         alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    //     }
    // }

    //询问收藏 end


    //  页面在线咨询/右侧添加微信轻松购 弹窗导图 

    // (function () {
    //     var _53code = document.createElement("script");
    //     _53code.src = "https://tb.53kf.com/code/code/10038684/1";
    //     var s = document.getElementsByTagName("script")[0];
    //     s.parentNode.insertBefore(_53code, s);
    // })();


    // 欢迎进入诗柔丽官网弹窗 
    // (function () {
    //     var _53code = document.createElement("script");
    //     _53code.src = "//tb.53kf.com/code/code/10038684/7";
    //     var s = document.getElementsByTagName("script")[0];
    //     s.parentNode.insertBefore(_53code, s);
    // })();
})