    require(["config"], function(){

    require(["jquery", "template","load"], function($){

         
     $(".open").on("mouseenter",function() {
        $(".server-bar").css({
          marginRight : 122 
      });

        });
         $(".server-bar").on("mouseleave",function(){
        $(".server-bar").css({
          marginRight: 0 
      });

        });

            });
   });

