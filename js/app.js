var uri = {
  "current":"",
  "display":"",
};

// load
var load = function(url)
{
  uri.current = url;
  uri.display = uri.current.split("#!")[1] || uri.current;
  uri.display = uri.display.split("/")[1];
  window.location.hash = "!" + url.split(".html")[0];
  if(!(url.match(".html")))
    {
      url += ".html";
    }
  $.ajax(
    {
      type:"GET",
      dataType:"html",
      "url":url,
      success: function(r) {
        $("#content").html(r);
        $("#navigation-current").html('<li><a href="'+uri.current+'">'+uri.display+'</a></li>')
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


$(document).ready(function(){
  if(window.location.hash && window.location.hash[1] == "!")
  {
    load(window.location.hash.split("#!")[1]);
  }
  else
  {
    load("/home")  ;
  }
});