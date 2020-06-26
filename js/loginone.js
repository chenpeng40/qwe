// 登录验证
class Login{
    constructor(){
        this.user = document.getElementById("user");
        this.pass = document.getElementById("pass");
        this.submit = document.querySelector(".btn");
        this.msg = document.querySelector(".msg");
        this.rember=document.querySelector("#remember");
        this.url = "http://api.icodeilife.cn:81/user";
        this.addEvent();
    }
    addEvent(){
        var that = this;
        
        this.submit.onclick = function(){
            that.u = that.user.value;
            that.p = that.pass.value;
            let reg = /^.{6,20}$/;
            // console.log(reg.test(that.user.value));
            if(reg.test(that.user.value)&&reg.test(that.pass.value)){
                that.load();
            }else{
                alert('用户或密码必须大于六位')
            }
        }
    }
    load(){
        ajax({
            url:this.url,
            data:{ 
                type: "login",
                user: this.u,
                pass: this.p
            }
        }).then((res)=>{
            this.res = JSON.parse(res);
            this.display();
        })
    }
    display(){
        
        switch(this.res.code){
            case 0:
                alert(this.res.msg + "，点击确定后到注册");
                location.href = "login.html";
                break;
            case 1:
                alert("登录成功，点击确定后到首页");
                location.href = "goods.html";
                if(this.rember.checked){
                    setCookie("user",JSON.stringify(this.res.msg),{
                        expires:7
                    });
                }else{
                    removeCookie('user');
                };
                sessionStorage.setItem("userMsg",JSON.stringify(this.res.msg));
                break;
            case 2:
                alert(this.res.msg + "，请重新输入");
                this.user.value = this.pass.value = "";
                this.user.focus();
        }
    }
}

new Login();



(function(){
if(getCookie('user')!=''){
    let msg=JSON.parse(getCookie('user'));
    document.getElementById("user").value=msg.user;
    document.getElementById("pass").value=msg.pass;
    document.querySelector("#remember").checked=true;
};
})();


