var flag=true;
var music = document.getElementById('music');
var audio = document.getElementById('audio-source');

if (!browserRedirect()) {
  alert("请在微信中打开");
  var dom = document.getElementById("content").style.display = "none"
  audio.pause();
}else{
  var dom = document.getElementById("content").style.display = "block"
  audio.play();
}

music.onclick=function (event) {
  if (flag) {
    event.target.style.backgroundPosition='right';
    flag=false;
    audio.pause();
  }else{
    event.target.style.backgroundPosition='left';
    flag=true;
    audio.play();
  }
}
window.HOST='http://api.51xy8.com'
window.shareData = {
  title:"",
  link:"",
  imgUrl:"",
  desc:"",
}
console.log(isWeiXin());
if (isWeiXin()) {
  weixinShare()
}
function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}
function weixinShare(data){
  var url=HOST+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split('#')[0]);
  $.ajax({
    type: 'GET',
    url: url,
    data: {},
    dataType: 'json',
    success: function(res){
      console.log(res);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名，见附录1
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    },
    error: function(xhr, type){
      alert('Ajax error!')
    }
  })
	wx.ready(function(){
    // 分享到到朋友圈
		// if (data) shareData=data
    var title=shareData.title;
    var link=shareData.link;
    var imgUrl=shareData.imgUrl;
    var desc=shareData.desc;
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl:imgUrl , // 分享图标
      success: function () {
        // alert("分享成功")
          // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // alert("取消分享")
          // 用户取消分享后执行的回调函数
      }
    });
    // 分享到给微信好友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc:desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // alert("分享成功")
          // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // alert("取消分享")
          // 用户取消分享后执行的回调函数
      }
    });
    //分享到QQ空间
    wx.onMenuShareQZone({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });

    //分享到QQ
    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
         // 用户确认分享后执行的回调函数
      },
      cancel: function () {
         // 用户取消分享后执行的回调函数
      }
    });
	});
}




// window.onload=function () {
//   setTimeout(function () {
//     music.click();
//     music.click();
//   },12);
// }
// setTimeout(function(){
//   $(window).scrollTop(1);
// },0);
// document.addEventListener("WeixinJSBridgeReady", function () {
//  WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
//    audio.play();
//  });
// }, false);
// wx.onMenuShareTimeline({
//     title: '分享标题', // 分享标题
//     link: 'http://www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//     imgUrl: 'http://m.kofuf.com/static/img/weblogo.png', // 分享图标
//     success: function () {
//         // 用户确认分享后执行的回调函数
//     },
//     cancel: function () {
//         // 用户取消分享后执行的回调函数
//     }
// });
