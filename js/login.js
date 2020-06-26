

var testa=testb=testc=testd=teste=false;
// 登录前的正则验证
class Login{
    that=this;
    constructor(){
        this.ouser=document.getElementById("user");
        this.oemail=document.getElementById("email");
        this.otel=document.getElementById("tel");
        this.opass=document.getElementById("pass");
        this.opasstwo=document.getElementById("passtwo");
        this.btn=document.querySelector('.btn');
        this.addEvent();
    };
    addEvent(){
        var that=this;
        this.ouser.addEventListener('blur',this.checkouser);
        this.opass.addEventListener('input',this.checkpass);
        this.opasstwo.addEventListener('blur',this.checkpasstwo);
        this.otel.addEventListener('blur',this.checktel);
        this.oemail.addEventListener('blur',this.checkemail);
    };
    checkouser(){
        var reg = /^[a-z][a-z\d]{5,17}$/;
        if(reg.test(this.value)){
            testa=true;
            this.nextElementSibling.style.display="block";
            this.nextElementSibling.nextElementSibling.style.display="none";
        }else{
            this.nextElementSibling.style.display="none";
            this.nextElementSibling.nextElementSibling.style.display="block"; 
        };
    };
    checkpass(){
        var a=0;
        var b=0;
        var c=0;
        var numReg = /\d/;
        if(numReg.test(this.value)){
            a=1;
        }
        var azReg = /[a-zA-Z]/;
        if(azReg.test(this.value)){
            b=1;
        }
        var tsReg = /[^\da-zA-Z]/;
        if(tsReg.test(this.value)){
            c=1;
        }
        var reg=/.{6,18}/;
        if(!reg.test(this.value)){
            this.nextElementSibling.style.display="none";
            this.nextElementSibling.nextElementSibling.style.display="block"; 
        }else{
            testb=true;
            switch(a+b+c){
            case 1:
                this.nextElementSibling.nextElementSibling.style.display="none";
                this.nextElementSibling.style.display="block";
                this.nextElementSibling.innerHTML = "<img src='https://res14.iblimg.com/respc-1/resources/v3.0/css/i/v-icon-3.png' width='16' height='16'>&nbsp;&nbsp;密码强度过低";break;
            case 2:
                this.nextElementSibling.nextElementSibling.style.display="none";
                this.nextElementSibling.style.display="block";
                this.nextElementSibling.innerHTML = "<img src='https://res14.iblimg.com/respc-1/resources/v3.0/css/i/v-icon-3.png' width='16' height='16'>&nbsp;&nbsp;密码强度中等";break;
            case 3:
                this.nextElementSibling.nextElementSibling.style.display="none";
                this.nextElementSibling.style.display="block";
                this.nextElementSibling.innerHTML = "<img src='https://res14.iblimg.com/respc-1/resources/v3.0/css/i/v-icon-3.png' width='16' height='16'>&nbsp;&nbsp;密码强度高级";break;
        } 
        };
    };
    
    checkpasstwo(){
        if(this.value===document.getElementById("pass").value){
            testc=true;
            this.nextElementSibling.style.display="block";
            this.nextElementSibling.nextElementSibling.style.display="none";
        }else{
            this.nextElementSibling.style.display="none";
            this.nextElementSibling.nextElementSibling.style.display="block"; 
        };
    };
    checktel(){
        var reg = /^1[3-9]\d{9}$/;
        if(reg.test(this.value)){
            testd=true;
            this.nextElementSibling.style.display="block";
            this.nextElementSibling.nextElementSibling.style.display="none";
        }else{
            this.nextElementSibling.style.display="none";
            this.nextElementSibling.nextElementSibling.style.display="block"; 
        };
    };
    checkemail(){
        var reg = /^\w{6,18}\@[a-z\d]{1,18}\.[a-z]{2,4}$/;
        if(reg.test(this.value)){
            teste=true;
            this.nextElementSibling.style.display="block";
            this.nextElementSibling.nextElementSibling.style.display="none";
        }else{
            this.nextElementSibling.style.display="none";
            this.nextElementSibling.nextElementSibling.style.display="block"; 
        };
    };
};
new Login();

// 点击注册事件
class Register{
    constructor(){
        this.user = document.getElementById("user");
        this.pass = document.getElementById("pass");
        this.tel = document.getElementById("tel");
        this.email = document.getElementById("email");
        this.submit = document.querySelector(".btn");
        this.msg = document.querySelector(".msg");
        this.url = "http://api.icodeilife.cn:81/user";
        this.addEvent()
    }
    addEvent(){
        var that = this;
        this.submit.onclick = function(){
            // console.log(testa&&testb&&testc&&testd&&teste)
            if(document.getElementById("remember").checked&&testa&&testb&&testc&&testd&&teste){
                that.u = that.user.value;
                that.p = that.pass.value;
                that.t = that.tel.value;
                that.e = that.email.value;
                that.load();
            }
        }
    }
    load(){
        ajax({
            url:this.url,
            data:{ 
                type: "register",
                user: this.u,
                pass: this.p,
                tel: this.t,
                email: this.e
            }
        }).then((res)=>{
            this.res = JSON.parse(res);
            this.display();
        })
    }
    display(){
        if(this.res.code == 1){
            alert('注册成功，点击确定跳转登录页面');
            location.href = "loginone.html";
        }else{
            alert(this.res.msg);
        }
    }
}

new Register;