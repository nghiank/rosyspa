define([
  // Application.
  "app",
  "jquery",
  "vendor/jquery.vion-1.0.min",
  "vendor/jquery.easing.1.3",
  "vendor/jquery-ui",
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
      var contactView = Backbone.View.extend({
        manage: true,
        template: "contactTemplate",
        events: {
          "click #mapLink": "clickMapLink"
        },
        afterRender: function()
        {
          var self = this;
          $(document).ready(function(){
            var lat = 10.770371;
            var lng = 106.67049;
            var latlng = new google.maps.LatLng(lat, lng);
            self.initMap(latlng);
            $("#map_container" ).dialog({
                autoOpen:false,
                modal: true,
                width:910,
                height: 610,
                draggable: false,
                stack:true,
                resizeStop: function(event, ui) {
                  google.maps.event.trigger(self.map, 'resize');
                  self.map.panTo(latlng);
                },
                open: function(event, ui) {
                  google.maps.event.trigger(self.map, 'resize');
                  self.map.panTo(latlng);
                }
            });
          });
        },
        initMap: function(latlng)
        {
          var myOptions = {
            zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(document.getElementById("map_canvas"),  myOptions); 
          this.plotPoint(latlng,'BeRosySpa','<span class="gBubble"><b>Mall of America</b><br>60 East Brodway<br>Bloomington, MN 55425</span>');
        },
        plotPoint: function(myLatlng,title,popUpContent,markerIcon)
        {
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: this.map,
            title:title
          });
          var infowindow = new google.maps.InfoWindow({
            content: popUpContent
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });
        },
        clickMapLink: function()
        {
           $( "#map_container" ).dialog( "open" );
           return false;
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
          "#contactSection": new contactView(),
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
