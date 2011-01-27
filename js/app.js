// uri
var uri = {
	"current":"",
	"display":"",
	"history":[],
};

// load
var load = function(url)
{
	uri.display = url.split("#!")[1] || url;
	uri.display = uri.display.split("/")[1];
	if("pushState" in window.history)
	{
		if(uri.history.indexOf(url) == uri.history.indexOf(uri.current) - 1 || uri.history.indexOf(url) == uri.history.indexOf(uri.current) + 1 || window.location.hash)
		{
			window.history.replaceState({id:uri.display}, uri.display, uri.display);

		}
		else
		{
			window.history.pushState({id:uri.display}, uri.display, uri.display);	
			uri.history.push(url);
		}
	}
	else
	{
		window.location.hash = "!" + url.split(".html")[0];
	}
	if(!(url.match(".html")))
	{
		url += ".html";
	}
	uri.current = url;
	console.log("/static" + url)
	$.ajax(
	{
		type:"GET",
		dataType:"html",
		"url":"/static" + url,
		success: function(r) {
			$("#content").html(r);
			$("#navigation-current").html('<li> / </li><li><a href="'+uri.current+'">'+uri.display+'</a></li>')
		},
		error: function(r)
		{
			$("#content").html('Error, page not found.');
		}
	});
}

// bind Links
$("a").live("click", function(e){
	var _href = $(this).attr("href");
	if(_href.match(window.location.host) || _href[0] == "/")
	{
	if(e["stopPropagation"] && e["preventDefault"])
	{
		e.stopPropagation();
		e.preventDefault();
	}
	else
	{
		e.cancelBubble = true;
		e.returnValue = false;
	}
	load(_href);
	}
});

window.onhashchange = function()
{
	if(uri.current != window.location.hash.split("#!")[1])
	{
	load(window.location.hash.split("#!")[1]);
	}
}

if("pushState" in window.history)
{
	window.onpopstate = function(e){
		load(window.location.href.split(window.location.host)[1]);
	};
}

$(document).ready(function(){
	if(window.location.hash && window.location.hash[1] == "!")
	{
	load(window.location.hash.split("#!")[1]);
	}
	else
	{
	load("/home");
	}
});