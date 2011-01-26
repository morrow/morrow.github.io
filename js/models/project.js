 // We extend the Backbone.Model prototype to build our own
  var Project = Backbone.Model.extend({

    // We can pass it default values.
    defaults : {
      name : null,
      complete:false
    },

    url : "/projects" // Important! It's got to know where to send its REST calls.
  });