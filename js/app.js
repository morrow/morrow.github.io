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
    if(!(_href.find(".htm")))
    {
      _href += ".html";
    }
    $.get(_href, function(r)
    {
      $("body").html(r);
    })
  }
});