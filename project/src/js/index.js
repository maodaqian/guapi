require(["config"], function(){
require(["load"], function(){
    require(["jquery", "template", "cookie", "xm_carousel", "load"], function($,template){
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
        $(function(){
            // banner轮播图
            $("#bd").carousel({
                    duration:2000, 
                    imgs: [
                        {href:"/html/detail.html", src:"../img/banner_03.jpg"},
                        {href:"/html/detail.html", src:"../img/banner_01.jpg"},
                       ],
                    height:393,
                    showBtn:true
                });
            $.getJSON('/mock/list.json',function(data){
              const html = template("list_template",{list:data.res_body.list});
              $("#birck").prepend(html);
            });
        });
    });
});
});
