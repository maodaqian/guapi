require(["config"],function(){
    require(["jquery","load","cookie"],function($){
        //输入账号密码 
        $(function(){
            //点击登录的事件
            $(".longinbtn").on("click",function(e){
                $.cookie.json = true;
                //暂时阻止表单的默认提交事件
                e.preventDefault();
                //获取输入的手机号和密码
                var username = $("#mobile").val(),
                    _password =$("#savepassword").val();
                //读取cookie，检查用户名密码是否正确
                var yonghu = $.cookie("yonghu");
                //遍历数组,比对账号和密码
                var html =`<div style="color: red; font-size: 30px; ">登录成功</div>`;
                yonghu.forEach(function(pro){
                    if(pro.username == username && pro._password ==_password){
                        $(".login_right").html(html);
                        return;
                    }else{
                        $(".zhanghaotest").show();
                        return;
                    }
                    
                });
                
            })
        });
        
        
    })
})


