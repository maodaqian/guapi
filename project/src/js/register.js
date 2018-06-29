require(["config"],function(){
    require(["jquery","load","cookie"],function($){
        $(function(){
            //表单校验
            $("#mobile").on("blur",function(){
                //获取值
                var val = $(this).val();
                // 手机号码规则
                var reg = /^1(3[0-9]|5[0-9]|8[0-9]|7[0-9])[0-9]{8}$/;
                if(reg.test(val)){
                     $("#text").hide();
                }else{
                    $("#text").show();
                }
            });
          
        //
    })
})
});
