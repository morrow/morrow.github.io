// load
var load = function(url)
{
  $.ajax(
    {
      type:"GET",
      dataType:"html",
      "url":url,
      success: function(r) {
        $("#content").html(r);
      },
      error: function(r)
      {
        console.log(r);
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
    if(!(_href.match(".htm")))
    {
      _href += ".html";
    }
    load(_href);
  }
});

// update href
if(window.location.hash && window.location.hash[1] == "!")
{
  load(window.location.hash.split("#!")[1]);
}

window.onhashchange = function()
{
  load(window.location.hash.split("#!")[1])  ;
}