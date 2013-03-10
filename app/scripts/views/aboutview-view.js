define([
  // Libraries.
  "backbone",
  // Plugins.
  "plugins/backbone.layoutmanager"
],function(Backbone){
  var AboutView = Backbone.View.extend({
    template: "aboutview"
  });
  return AboutView;
});
