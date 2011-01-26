$("a").live("click", function(e){
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
  console.log($(this).attr("href"));
});