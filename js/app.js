var uri = {
  "current":"",
  "display":"",
};

// load
var load = function(url)
{
  window.location.hash = "!" + url.split(".html")[0];
  uri.current = url.split("#!")[1];
  uri.display = uri.current;
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
        $("#logo").after('<a href="/'+uri.current+'">'+uri.display+'</a>')
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