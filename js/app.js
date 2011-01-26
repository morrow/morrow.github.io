// Instantiating
  var indfm = new Project({ // attributes passed to the Donut constructor will override the defaults
    name : "Ind.fm",
    complete : false
  });

  // Saving
  indfm.save(); // this will now POST to the RESTful interface.