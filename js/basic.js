
//显示灰色 jQuery 遮罩层
function showBg(e) { 
    var bh = $("body").height(); 
    var bw = $("body").width(); 
    var bg = document.getElementsByClassName("bg");
    bg[0].setAttribute("class","bg_blur");
    $("#fullbg").css({ 
        height:bh, 
        width:bw, 
        display:"block" 
    }); 
    $("."+e).show(); 
} 
//关闭灰色 jQuery 遮罩 
function closeBg() { 
    var bg = document.getElementsByClassName("bg_blur");
    bg[0].setAttribute("class","bg");
    $("#fullbg,.dialog").hide(); 
} 

function mousedown_follow() {
	var follow = document.getElementById("follow");
	if(!follow) return;
	follow.onmousedown = function() {
		follow.innerHTML = "已关注";
		follow.style.background = "#99CCFF";
		follow.style.border = "none";
		follow.style.color = "#FFFFFF";
	};
}

function mousedown_like() {
	var like = document.getElementById("icon-like");
	if(!like) return;
	like.onmousedown = function() {
		like.setAttribute("src", "img/icon-like-down.png");
		like.style.background = "#A3A3A3";
	};
}
function mousedown_go(){
	var go = document.getElementById("go");
	if(!go) return;
	go.onmousedown = function(){
		go.innerHTML = "要去：51";
		go.style.background = "#99CC99";
		go.style.border = "#99CC99";
		go.style.color = "#FFFFFF";
	};
}
function mousedown_wait(){
	var wait = document.getElementById("wait");
	if(!wait) return;
	wait.onmousedown = function(){
		wait.innerHTML = "待定：51";
		wait.style.background = "#99CCFF";
		wait.style.border = "#99CCFF";
		wait.style.color = "#FFFFFF";
	};
}
function mousedown_login(){
	var login = document.getElementById("login-button");
	var person = document.getElementById("header_right_person");
	if(!login || !person) return;
	login.onmousedown = function(){
		person.innerHTML = "<a class='db' href='javascript:showBg(\"d-homepage\");'><img src='img/portrait.png' class='login-portrait' /><div class='clear'></div></a>";
	};
}
function mousedown_img_like(){
	var img_like = document.getElementsByClassName("img-icon-like");
	 for(var i = 0; i< img_like.length; i++){
		img_like[i].onclick = function(){
			this.setAttribute("src","img/icon-like-down.png");
		};
	}
}
var mousedown = function(){
	mousedown_follow();
	mousedown_like();
	mousedown_img_like();
	mousedown_go();
	mousedown_wait();
	mousedown_login();
};
window.onload = mousedown;