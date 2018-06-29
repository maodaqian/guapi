  require(["config"], function(){

    require(["jquery", "template","load","cookie"], function($,template){

         $(".open").on("mouseenter",function() {
        $(".server-bar").css({
          marginRight : 122 
      });
         $(".server-bar").on("mouseleave",function(){
        $(".server-bar").css({
          marginRight: 0 
      });

        });

        });
         $(function(){
      // 点击热卖商品图片，加入购物车，事件委派
      // $(".grid_2").delegate("a", "click", function(){});
      $(".grid_2").on("click", "a", function(){
        // 获取当前选购商品信息
        const currProd = {
          id : $(this).find(".id").text(),
          title : $(this).find("p").text(),
          price : $(this).find(".btn5").text().slice(1),
          img : $(this).find("img").attr("src"),
          amount : 1
        };
        // cookie插件配置
        $.cookie.json = true;
        // 先从 cookie 中读取已有保存的购物车数组
        const products = $.cookie("products") || [];
        // 判断当前选购商品是否在购物车中已存在
        const index = exist(currProd.id, products);
        if (index === -1) { // 不存在
          products.push(currProd);
        } else { // 存在
          products[index].amount++;
        }
        $(".bottom").css({
          display:"block"
        });
        setInterval(function(){
          $(".bottom").css({
          display:"none"
        });
        },2000)
                   
        /* 将当前选购的商品信息保存到 cookie 中：即将数组存回cookie */
        $.cookie("products", products, {expires:7, path:"/"});
        console.log("success");

        return false; // 阻止超级链接跳转
      });

      // 判断某 id 商品在数组中是否存在，
      // 存在则返回其在数组中的下标，-1表示不存在
      function exist(id, array) {
        for (let i = 0, len = array.length; i < len; i++) {
          if (array[i].id == id)
            return i;
        }
        return -1;
      }
    });
        
         $(function(){
      // 加载显示热卖商品信息
      $.getJSON("/mock/list(1).json", function(data){
        // 渲染模板
        const html = template("hot_sale_temp", {list : data.res_body.list});
        // 显示
        $(".grid_2").prepend(html);
      });
    });
   });
 });
