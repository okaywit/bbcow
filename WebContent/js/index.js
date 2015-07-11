Server.connect("ws://" + host + "/bb");
var i = 0;

function addMedia(obj) {
	var conditionType = obj.value;
	var mediaBox = (function() {
		if (conditionType == 4) {
			return document.getElementById("media_yesterday_box")
		}
		if (conditionType == 5) {
			return document.getElementById("media_top100_box")
		}
		return null;
	})();

	if (obj.checked) {
		if (mediaBox.childNodes.length > 1) {
			mediaBox.setAttribute("style", "display: block !important;")
		} else {

			var paper = '{"cId":5,"sId":"","data":{"type":"' + conditionType
					+ '"}}';
			Server.socket.send(paper);
		}
	} else {
		mediaBox.setAttribute("style", "display: none !important;")
	}

}

Server.socket.onmessage = function(message) {
	var data = eval('(' + message.data + ')');
	if (data["type"] == 0) {
		alert(data["error"]);

	} else {
		var pa = new Paper();
		pa.id = data["data"]["id"]["$numberLong"];
		if (pa.id == undefined || pa.id == Object) {
			pa.id = data["data"]["id"];
		}
		pa.title = data["data"]["title"];
		pa.content = data["data"]["content"];
		pa.contactName = data["data"]["contactName"];
		pa.contactTel = data["data"]["contactTel"];
		pa.tag = data["data"]["tag"];
		pa.goodCount = data["data"]["goodCount"]["$numberLong"];
		if (pa.goodCount === undefined) {
			pa.goodCount = 0;
		}
		pa.badCount = data["data"]["badCount"]["$numberLong"];
		if (pa.badCount === undefined) {
			pa.badCount = 0;
		}
		pa.imgUrl = data["data"]["imgUrl"];
		pa.linkUrl = data["data"]["linkUrl"];

		if (data["type"] == 1) {
			pa.packIndex();
		} else if (data["type"] == 4) {
			pa.packYesterday();
		} else if (data["type"] == 5) {
			pa.packTop100();
		} else {
			pa.packIndex();
		}
		i++;
	}

};
function goRelease() {
	var title = document.getElementById("title").value;
	var content = document.getElementById("content").value;
	var contactName = document.getElementById("contactName").value;
	var linkUrl = document.getElementById("linkUrl").value;
	var contactTel = "";
	var tag = "";
	var imgUrl = document.getElementById("imgUrl").value;
	if (title.replace(/^ +| +$/g, '') == '') {
		document.getElementById("title").focus();
		return;
	}
	if (content.replace(/^ +| +$/g, '') == '') {
		document.getElementById("content").focus();
		return;
	}
	if (contactName.replace(/^ +| +$/g, '') == '') {
		document.getElementById("contactName").focus();
		return;
	}

	var paper = '{"cId":1,"sId":"","data":{"title":"' + title + '","content":"'
			+ content + '","contactName":"' + contactName + '","contactTel":"'
			+ contactTel + '","tag":"' + tag + '","imgUrl":"' + imgUrl
			+ '","linkUrl":"' + linkUrl + '"}}';
	Server.socket.send(paper);

	document.getElementById("title").value = "";
	document.getElementById("content").value = "";
	document.getElementById("contactName").value = "";
	document.getElementById("imgUrl").value = "";

	$('#myModal').modal('hide')

	return false;
}

function Paper() {
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
Paper.prototype.packIndex = function() {
	var mediaBox = document.getElementById("media_box");

	demo(mediaBox, this);

};
Paper.prototype.packYesterday = function() {
	var mediaBox = document.getElementById("media_yesterday_box");

	demo(mediaBox, this);

};
Paper.prototype.packTop100 = function() {
	var mediaBox = document.getElementById("media_top100_box");

	demo(mediaBox, this);

};
function doLike(id) {
	if (localStorage == undefined || localStorage == "") {
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

	var likeCount = document.getElementById("u" + id + "").innerHTML;
	document.getElementById("u" + id + "").innerHTML = 1 + parseInt(likeCount);
	var paper = '{"cId":2,"sId":"","data":{"id":"' + id
			+ '","type":"1","ip":""}}';
	Server.socket.send(paper);
}
function doNotLike(id) {
	if (localStorage == undefined || localStorage == "") {
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

	var unlikeCount = document.getElementById("d" + id + "").innerHTML;
	document.getElementById("d" + id + "").innerHTML = 1 + parseInt(unlikeCount);
	var paper = '{"cId":2,"sId":"","data":{"id":"' + id
			+ '","type":"0","ip":""}}';
	Server.socket.send(paper);
}

function demo(mediaBox, pa) {
	var media = document.createElement("blockquote");
	media.setAttribute("class", "text-info");

	var mediaDiv = document.createElement("div");
	mediaDiv.setAttribute("class", "row");

	var imgDiv = document.createElement("div");

	imgDiv.setAttribute("class", "col-md-2 col-xs-12 text-center");
	if (this.imgUrl != undefined && pa.imgUrl.trim() != "") {
		var img = document.createElement("img");
		img.setAttribute("class", "col-md-12 col-xs-12");
		img.setAttribute("src", pa.imgUrl);
		imgDiv.appendChild(img);
	}

	var upLink = document.createElement("a");
	var upSpan = document.createElement("span");
	upSpan.setAttribute("class",
			"col-md-6 col-xs-6 glyphicon glyphicon-thumbs-up badge");
	upSpan.setAttribute("aria-hidden", "true");
	upSpan.setAttribute("id", "u" + pa.id);
	upSpan.setAttribute("onclick", "doLike(" + pa.id + ")");
	upSpan.appendChild(document.createTextNode(pa.goodCount));
	upLink.appendChild(upSpan);
	var downLink = document.createElement("a");
	var downSpan = document.createElement("span");
	downSpan.setAttribute("class",
			"col-md-6 col-xs-6 glyphicon glyphicon-thumbs-down badge");
	downSpan.setAttribute("aria-hidden", "true");
	downSpan.setAttribute("id", "d" + pa.id);
	downSpan.setAttribute("onclick", "doNotLike(" + pa.id + ")");
	downSpan.appendChild(document.createTextNode(pa.badCount));
	downLink.appendChild(downSpan);
	imgDiv.appendChild(upLink);
	imgDiv.appendChild(document.createTextNode("  "));
	imgDiv.appendChild(downLink);

	mediaDiv.appendChild(imgDiv);

	var conntentDiv = document.createElement("div");
	conntentDiv.setAttribute("class", "col-md-10 col-xs-12");
	var p = document.createElement("p");
	p.appendChild(document.createTextNode(pa.content));
	var footer = document.createElement("footer");
	footer.appendChild(document.createTextNode(pa.contactName + " 发表于 "));
	var link = document.createElement("a");
	link.setAttribute("href", pa.linkUrl);
	link.setAttribute("target", "_blank");
	var cite = document.createElement("cite");
	cite.setAttribute("title", pa.linkUrl);
	cite.appendChild(document.createTextNode(pa.title));
	link.appendChild(cite);
	footer.appendChild(link);
	conntentDiv.appendChild(p);
	conntentDiv.appendChild(footer);

	mediaDiv.appendChild(conntentDiv);

	media.appendChild(mediaDiv);

	mediaBox.appendChild(media);
}

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?f3a7b03e683b3dc0971832145b7fadfd";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();