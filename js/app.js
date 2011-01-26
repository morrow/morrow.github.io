$("a").live("click", function(e){
  var _href = $(this).attr("href");
  if(_.interesect(window.location.host, _href))
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
    console.log(_href);
  }
});