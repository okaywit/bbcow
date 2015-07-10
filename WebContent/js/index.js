Server.connect("ws://"+host+"/bb");
var i=0;
Server.socket.onmessage=function(message){
var data = eval('('+message.data+')');
	if(data["type"]==0){
		alert(data["error"]);
		
	}
	if(data["type"]==1){
		var pa = new Paper();
	    pa.id=data["data"]["id"]["$numberLong"];
	    if(pa.id == undefined || pa.id == Object){
	    	 pa.id=data["data"]["id"];
	    }
	    pa.title=data["data"]["title"];
	    pa.content=data["data"]["content"];
	    pa.contactName=data["data"]["contactName"];
	    pa.contactTel=data["data"]["contactTel"];
	    pa.tag=data["data"]["tag"];
	    pa.goodCount=data["data"]["goodCount"]["$numberLong"];
	    if(pa.goodCount === undefined){
	    	pa.goodCount = 0;
	    }
	    pa.badCount=data["data"]["badCount"]["$numberLong"];
	    if(pa.badCount === undefined){
	    	pa.badCount = 0;
	    }
	    pa.imgUrl=data["data"]["imgUrl"];
	    pa.linkUrl=data["data"]["linkUrl"];
	        
	        pa.packToDemo();
	        pa.demoLink();
	        i++;
    }
    
    
};
function goRelease() {
    var title = document.getElementById("title").value;
	var content = document.getElementById("content").value;
	var contactName = document.getElementById("contactName").value;
	var linkUrl = document.getElementById("linkUrl").value;
	var contactTel = "";//document.getElementById("contactTel").value;
	var tag = "";//document.getElementById("tag").value;
	var imgUrl = document.getElementById("imgUrl").value;
	if(title.replace(/^ +| +$/g,'')==''){
	    document.getElementById("title").focus();
	    return;
	}
	if(content.replace(/^ +| +$/g,'')==''){
	    document.getElementById("content").focus();
	    return;
	}
	if(contactName.replace(/^ +| +$/g,'')==''){
	    document.getElementById("contactName").focus();
	    return;
	}
	
	var paper = '{"cId":1,"sId":"","data":{"title":"' + title + '","content":"' + content + '","contactName":"' + contactName + '","contactTel":"' + contactTel + '","tag":"' + tag + '","imgUrl":"' + imgUrl + '","linkUrl":"' + linkUrl + '"}}';
	Server.socket.send(paper);
	
	document.getElementById("title").value="";
	document.getElementById("content").value="";
	document.getElementById("contactName").value="";
	//document.getElementById("contactTel").value="";
	//document.getElementById("tag").value="";
	document.getElementById("imgUrl").value="";
	
	$('#myModal').modal('hide')
	
	return false;
}

function Paper(){
    this.id;
    this.title;
    this.content;
    this.contactName;
    this.contactTel;
    this.tag;
    this.imgUrl
    this.goodCount;
    this.badCount;
    this.linkUrl;
}
Paper.prototype.demoLink=function(){
    var ul = document.getElementById("l");
	var li = document.createElement("li");
	
	var a = document.createElement("a");
	a.setAttribute("href","#"+this.title);
	    a.appendChild(document.createTextNode(this.title));
	    li.appendChild(a);
	    ul.appendChild(li);
};
Paper.prototype.packToDemo=function(){
	var ul = document.getElementById("media");
	var li = document.createElement("li");
	li.setAttribute("class","media well")
	li.setAttribute("name","media_box")
	
	var left = document.createElement("div");
	left.setAttribute("class", "media-left");
	left.setAttribute("id", this.title);
	if(this.imgUrl!=undefined && this.imgUrl.trim()!=""){
		var a = document.createElement("a");
		a.setAttribute("href", this.imgUrl);
		a.setAttribute("target", "_blank");
		var img = document.createElement("img");
		img.setAttribute("class", "media-object");
		img.setAttribute("data-src", "holder.js/64x64");
		img.setAttribute("data-holder-rendered", "true");
		img.setAttribute("style", "width: 64px; height: 64px;");
		img.setAttribute("src",this.imgUrl);
		a.appendChild(img);
		left.appendChild(a);
	}else{
		left.appendChild(document.createTextNode(this.contactName));
	}
	var body = document.createElement("div");
	body.setAttribute("class", "media-body");
	
	var head = document.createElement("h4");
	head.setAttribute("class", "media-heading");
	
	if(this.linkUrl != undefined && this.linkUrl.trim() !=""){
		var headLink = document.createElement("a");
		headLink.setAttribute("target", "_blank");
		headLink.setAttribute("href", this.linkUrl);
		headLink.appendChild(document.createTextNode(this.title));
		head.appendChild(headLink);
	}else{
		head.appendChild(document.createTextNode(this.title));
	}
	
	var id = document.createElement("small");
	id.appendChild(document.createTextNode("  ##"+this.id));
	head.appendChild(id);
	
	var content = document.createElement("p");
	content.appendChild(document.createTextNode(this.content));
	var bul = document.createElement("ul");
	bul.setAttribute("class","nav nav-pills")
	bul.setAttribute("role","tablist")
	
	var bli1 = document.createElement("li");
	bli1.setAttribute("role","presentation");
	var a1 = document.createElement("a");
	a1.setAttribute("href","#");
	a1.setAttribute("onclick","doLike("+this.id+")");
	a1.appendChild(document.createTextNode("Good"));
	var span1 = document.createElement("span");
	span1.setAttribute("class","badge");
	span1.setAttribute("id","s1"+this.id);
	span1.appendChild(document.createTextNode(this.goodCount));
	a1.appendChild(span1);
	bli1.appendChild(a1);
	
	var bli2 = document.createElement("li");
	bli2.setAttribute("role","presentation");
	var a2 = document.createElement("a");
	a2.setAttribute("href","#");
	a2.setAttribute("onclick","doNotLike("+this.id+")");
	a2.appendChild(document.createTextNode("Bad"));
	var span2 = document.createElement("span");
	span2.setAttribute("class","badge");
	span2.setAttribute("id","s2"+this.id);
	span2.appendChild(document.createTextNode(this.badCount));
	a2.appendChild(span2);
	bli2.appendChild(a2);
	
	bul.appendChild(bli1);
	bul.appendChild(bli2);
	body.appendChild(head);
	body.appendChild(content);
	body.appendChild(bul);
	
	li.appendChild(left);
	li.appendChild(body);
	
	
	var m = document.getElementsByName("media_box")[0];
	if(m == undefined){
		ul.appendChild(li);
	}else{
		ul.insertBefore(li, m);
	}
	
   
};
function doLike(id) {
	if(localStorage==undefined || localStorage==""){
		return;
	}
	if (localStorage.paperIds) {
		var ids = localStorage.paperIds.split(",");
		for (i in ids) {
			if (id == ids[i]) {
				alert("已投票");
				return;
			}
		}
		ids.push(id);
		localStorage.paperIds = ids;
	} else {
		var ids = new Array();
		ids.push(id);
		localStorage.paperIds = ids;
	}

	var likeCount = document.getElementById("s1" + id + "").innerHTML;
	document.getElementById("s1" + id + "").innerHTML = 1 + parseInt(likeCount);
	var paper = '{"cId":2,"sId":"","data":{"id":"' + id
			+ '","type":"1","ip":""}}';
	Server.socket.send(paper);
}
function doNotLike(id) {
	if(localStorage==undefined || localStorage==""){
		return;
	}
	if (localStorage.paperIds) {
		var ids = localStorage.paperIds.split(",");
		for (i in ids) {
			if (id == ids[i]) {
				alert("已投票");
				return;
			}
		}
		ids.push(id);
		localStorage.paperIds = ids;
	} else {
		var ids = new Array();
		ids.push(id);
		localStorage.paperIds = ids;
	}

	var unlikeCount = document.getElementById("s2" + id + "").innerHTML;
	document.getElementById("s2" + id + "").innerHTML = 1 + parseInt(unlikeCount);
	var paper = '{"cId":2,"sId":"","data":{"id":"' + id
			+ '","type":"0","ip":""}}';
	Server.socket.send(paper);
}