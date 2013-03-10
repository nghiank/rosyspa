define([
  // Application.
  "app",
  "jquery",
  "vendor/jquery.vion-1.0.min",
  "vendor/jquery.easing.1.3",
  "vendor/TimelineJS/compiled/js/storyjs-embed"
],

function(app, jQuery ) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
    },

    index: function() {
      // Create a View to be used with the Layout below.
      var aboutView = Backbone.View.extend({
        manage:true,
        template: "aboutTemplate",
        afterRender: function()
        {
          $(function() {
            $("#my-gallery").vion();
          });
        }
      });
      var serviceView = Backbone.View.extend({
        manage:true,
        template: "serviceTemplate"
      });
      var productView = Backbone.View.extend({
        manage:true,
        template: "productTemplate"
      });
      var promotionView= Backbone.View.extend({
        manage:true,
        template: "promotionTemplate",
        afterRender: function()
        {
          $(function(){
            createStoryJS({
              type:       'timeline',
              width:      '100%',
              height:     '100%',
              source: 'https://docs.google.com/spreadsheet/pub?key=0ApI-2uhbGvbbdFNCUnpWd2hnRlpWY3NoOTlMMUJDdGc&output=html',
              start_at_end:true,
              embed_id:   'timeline'
            });
          })
        }
      });

      // Create a new Layout.
      var layout = new Backbone.Layout({
        // Attach the Layout to the main container.
        el: ".main",

        // Use the previous defined template.
        template: "spaLayout",

        // Declaratively bind a nested View to the Layout.
        views: {
          "#aboutSection": new aboutView(),
          "#serviceSection": new serviceView(),
          "#productSection": new productView(),
          "#promotionSection": new promotionView(),
        },
        afterRender:function()
        {
          // Scroll to Function
          function scrollingTo(id){
            $('html,body').animate({scrollTop: ($(id).offset().top-115)},  1800, 'easeOutBack');
          }

          $('a[rel="slideto"]').click( function() {
            var target = $(this).attr('href');
            scrollingTo(target);
            return false;
          });		

          var aboutTop = $('#aboutSection').offset().top;
          var servicesTop = $('#serviceSection').offset().top;
          var productTop = $('#productSection').offset().top ;
          var therapiesTop = $('#therapiesSection').offset().top ;
          var promotionTop = $('#promotionSection').offset().top ;
          var careerTop = $('#careerSection').offset().top ;
          var contactTop = $('#contactSection').offset().top; 
          function selectSubNavItems() { 

            var winTop = $(window).scrollTop() + 50;
            var $about=  aboutTop -  winTop;
            var $services 	= servicesTop - winTop;
            var $product=  productTop - winTop;
            var $therapies= therapiesTop - winTop;
            var $promotion= promotionTop - winTop;
            var $career= careerTop - winTop;
            var $contact = contactTop - winTop;
            var $active = '#none';

            if($services < 100) $active = '#serviceSection';
            if($product < 100) $active = '#productSection';
            if($therapies< 100) $active = '#therapiesSection';
            if($promotion< 100) $active = '#promotionSection';
            if($career< 100) $active = '#careerSection';
            if($contact< 100) $active = '#contactSection';

            $('#main-menu li').removeClass('active');
            $('#main-menu a[href=' + $active + ']').parent().addClass('active');
          }

          selectSubNavItems();

          $(window).scroll(function() {
            selectSubNavItems();
          });
        }
      });

      // Render the Layout.
      layout.render();
    }
  });


  return Router;

});
