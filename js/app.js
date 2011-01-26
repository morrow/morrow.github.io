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
    $.get(_href, function(r)
    {
      $("body").html(r);
    })
  }
});


// update href
if(window.location.hash && window.location.hash[0] == "!")
{
  $.get(window.location.hash.split("!")[1], function(r)
  {
    $("body").html(r);
    window.location.a
  });
}