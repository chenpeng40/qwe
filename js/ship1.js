// ajax封装函数
function ajax(parm){
    return new Promise(function(resolve,reject){
        let xhr= new XMLHttpRequest();
        xhr.open('get',parm.url);
        xhr.send();
        xhr.addEventListener('readystatechange',res);
        function res(){
            if(xhr.readyState == 4 && xhr.status == 200){
                resolve(xhr.response);
            }
        };
    });
  };




// 改变input的数量
class Changenum{
    constructor(){
        this.reduce=document.querySelector('#reduce');
        this.add=document.querySelector('#addnum');
        this.num=document.querySelector('.text');
        this.addEvent();
    };
    addEvent(){
        var that=this;
        this.add.onclick=function(){
            that.addnum();
        };
        this.reduce.onclick=function(){
            that.rednum();
        };
        this.num.oninput=function(){
            that.changeIpt();
        };
    };
    addnum(){
        let time="";
        clearTimeout(time);
        let that=this; 
        time=setTimeout(function(){
            if(that.num.value>99){
              that.num.value=99;
            }else{
              that.num.value++;
            };
        },500);
    };
    rednum(){
      let time="";
      clearTimeout(time);
      let that=this; 
      time=setTimeout(function(){
          if(that.num.value<1){
            that.num.value=1;
          }else{
            that.num.value--;
          };
      },500);
    };
    changeIpt(){
        let time="";
        let that=this; 
        clearTimeout(time);
        time=setTimeout(function(){
            that.num.value = that.num.value.replace(/\D/g, "");
            if (that.num.value < 1) that.num.value = 1;
            if (that.num.value > 99) that.num.value = 99;
        },100);
    };
};
new Changenum();


// 渲染页面
// console.log(location.search);
class Details{
    constructor(){
        this.url = "http://localhost/ship/php/goods.php?fn=get3&id=";
        this.id = location.search.slice(1).split("=")[1];
        // console.log(this.id)
        this.sImg=document.querySelector('.phleft .simg img');
        this.bImg=document.querySelector('.phleft .bimg img');
        this.lowImgs=document.querySelector('.items #picture');
        this.name=document.querySelector('.phright .goods-name h1');
        this.fPrice=document.querySelector('#FlashPrice');
        this.sPrice=document.querySelector('#salePrice');
        this.goodStyle=document.querySelector('#error-tip #ifHaveModel');
        this.btnGood=document.querySelector('#btnGood');
        // console.log(this.btnGood);
        this.load();
    };
    load(){
        ajax({
            url:this.url+this.id
        }).then((res)=>{
            this.res = JSON.parse(res);
            // console.log(this.res.data[0].Id)
            // console.log(this.res.state)
            if(this.res.state=="success"){
                this.display();
            }; 
        }); 
    };
    display(){
        // console.log(this.res.data[0])
        this.sImg.src=this.res.data[0].src;
        this.bImg.src=this.res.data[0].src;
        if(this.res.data[0].simgsrc1){
            this.lowImgs.innerHTML=`<li><img jqimg="images/b1.jpg" id="img_0" class="lazytag itemborder" src="${this.res.data[0].simgsrc1}" alt=""  style="display: inline;"></li>
            <li><img jqimg="images/b1.jpg" id="img_1" class="lazytag" src="${this.res.data[0].simgsrc2}" alt=""  style="display: inline;"></li>
            <li><img jqimg="images/b1.jpg" id="img_2" class="lazytag" src="${this.res.data[0].simgsrc3}" alt=""  style="display: inline;"></li>
            <li><img jqimg="images/b1.jpg" id="img_3" class="lazytag" src="${this.res.data[0].simgsrc4}" alt=""  style="display: inline;"></li>`;
            this.goodStyle.innerHTML=`
                <li name="prop_model" goodssid="4225302" class="" onclick="cactive(0,31)">WIFI 512G 银色</li>
                <li name="prop_model" goodssid="4225303" class="" onclick="cactive(1,32)">WIFI 512G 金色</li>
                <li name="prop_model" goodssid="4225305" class="" onclick="cactive(2,30)">WIFI 1T 青山熏色</li>
                <li name="prop_model" goodssid="4225310" class="" onclick="cactive(3,33)">WIFI 128G 青春版</li>
                <li name="prop_model" goodssid="4225311" class="" onclick="cactive(4,29)">WIFI 1T 深银色</li>
                <li name="prop_model" goodssid="4225322" class="" onclick="cactive(5,1)">WIFI 128G 深空灰</li>
                `;
                window.cactive=function(num,id){
                    window.location.href=`http://localhost/ship/ship1.html?id=${id}&num=${num}`;
                };
                
        }else{
            this.lowImgs.innerHTML='';
            this.goodStyle.innerHTML=`<li name="prop_model" goodssid="4225302" class="">无其他类型</li>
                        <li name="prop_model" goodssid="4225303" class="">无其他类型</li>`;
        }
        this.name.innerHTML=`<b class="late">自营百联</b>${this.res.data[0].name}`;
        this.fPrice.innerHTML=`<strong id="FlashPrice"><i>¥</i>&nbsp;${this.res.data[0].price}</strong>`;
        this.sPrice.innerHTML=`参考价 ￥${this.res.data[0].price-0+100}`;
        this.btnGood.innerHTML=`<button id='addCart' class='btn-buy' onclick="addCart(${this.res.data[0].Id},'${this.res.data[0].name}','${this.res.data[0].src}','${this.res.data[0].price}',1)">加入购物车</button>`;
        
    };
};
new Details();
// 给类型添加样式

function astyle(){
    
    let ul=document.querySelector('#error-tip #ifHaveModel');
    ul.onmousemove=function(eve){
        let e=eve||window.event;
        let target=e.target||e.srcElement;
        if(target.nodeName=="LI"){
            document.querySelectorAll('#error-tip #ifHaveModel li').forEach(ele=>{
                ele.className="";
            });
            if(location.search.slice(1).length>8){
                let num=location.search.slice(1).split("&")[1].split("=")[1];
                document.querySelectorAll('#error-tip #ifHaveModel li')[num].className="select";
                target.onmouseout=function(){
                    document.querySelectorAll('#error-tip #ifHaveModel li').forEach(ele=>{
                        ele.className="";
                    });
                };
            }

        }
    };
};
astyle();


// 给购物车添加样式
window.addCart=function(id,name,src,price,num){
    // console.log(id,name,src,price,num)
    let rednum=document.querySelector('#itemnumber').value;
    let cartGoods=JSON.parse(localStorage.getItem('carts'));
    let state=true;
    // console.log(cartGoods)
    if(cartGoods){
      cartGoods.forEach(ele=>{
        if(ele.gid==id){
          ele.gnum=(ele.gnum-0)+(rednum-0);
          state=false;
        };
      });
      if(state){
        let goodsObj = { gid: id, gname: name, gsrc: src, gprice: price, gnum: rednum };
        cartGoods.push(goodsObj);
      };
    localStorage.setItem('carts',JSON.stringify(cartGoods));
    }else{
      let msg={gid:id,gname:name,gsrc:src,gprice:price,gnum:num};
      let cartsArr = [];
      cartsArr.push(msg);
      localStorage.setItem('carts',JSON.stringify(cartsArr));
    };
    new Carnum();
}

// 放大镜
class Larimg{
    constructor(){
        this.sBox = document.querySelector(".simg");
        this.sImg = document.querySelector(".simg img");
        this.sSpan = document.querySelector(".simg span");
        this.bBox = document.querySelector(".bimg");
        this.bImg = document.querySelector(".bimg img");
        this.ul = document.querySelector(".items ul");
        this.phleft=document.querySelector(".phimg");
        this.addEvent();
    };
    addEvent(){
        var that=this;
        this.sBox.onmouseover=function(){
            that.over();
        };
        this.sBox.onmousemove=function(eve){
            var e=eve||window.event;
            that.move(e);
        };
        this.sBox.onmouseout=function(){
            that.out();
        };
        this.ul.onclick=function(eve){
            let e=eve||window.event;
            let target=e.target||e.srcElement;
            if(target.nodeName=="IMG"){
                // console.log(target)
                that.changeScr(target)
            }
        }
    };
    changeScr(that){
        this.sImg.src=that.src;
        this.bImg.src=that.src;
    };
    over(){
        this.sSpan.style.display='block';
        this.bBox.style.display='block';
    };
    move(e){
        var l=e.pageX-this.sBox.offsetLeft-this.phleft.offsetLeft-this.sSpan.offsetWidth/2;
        var t = e.pageY - this.sBox.offsetTop-this.phleft.offsetTop- this.sSpan.offsetHeight/2;
        if(l<0) l=0;
        if(t<0) t=0;
        if(l > this.sBox.offsetWidth - this.sSpan.offsetWidth){
            l = this.sBox.offsetWidth - this.sSpan.offsetWidth;
        }
        if(t > this.sBox.offsetHeight - this.sSpan.offsetHeight){
            t = this.sBox.offsetHeight - this.sSpan.offsetHeight;
        }
        this.sSpan.style.left = l + "px";
        this.sSpan.style.top = t + "px";
        var x = l / (this.sBox.offsetWidth - this.sSpan.offsetWidth);
        var y = t / (this.sBox.offsetHeight - this.sSpan.offsetHeight);
        this.bImg.style.left = (this.bBox.offsetWidth - this.bImg.offsetWidth) * x + "px";
        this.bImg.style.top = (this.bBox.offsetHeight - this.bImg.offsetHeight) * y + "px";
    };
    out(){
        this.sSpan.style.display = "none";
        this.bBox.style.display = "none";
    };
};
new Larimg();

// 侧边购物车
class Carnum{
    constructor(){
      this.num=document.getElementById('cartNum');
        this.changenum();
      };
      changenum(){
        let cartGoods=JSON.parse(localStorage.getItem('carts'));
        let nn=0;
        cartGoods.forEach(ele=>{
          // console.log(ele.gnum)
          nn+= ele.gnum-0;
        });
        // console.log(nn)
        if(cartGoods){
          this.num.innerHTML=nn;
        }else{
          this.num.innerHTML=0;
        };
      };
  };
  console.log()
  if(localStorage.getItem('carts')!=null){new Carnum();};
  if(localStorage.getItem('carts')==null){document.getElementById('cartNum').innerHTML=0;};

// 倒计时
function dateDiff(d1, d2) {
    var date1 = new Date(d1);

    var date2 = d2 ? new Date(d2) : new Date();

    var t = Math.abs(date1.getTime() - date2.getTime());

    var day = parseInt(t / 1000 / 60 / 60 / 24);
    var h = parseInt((t - day * 24 * 60 * 60 * 1000) / 1000 / 60 / 60);
    var m = parseInt((t - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000) / 1000 / 60);
    var s = parseInt((t - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000)
    var ms = t - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000 - s * 1000;

    return {
        day: day,
        h: h,
        m: m,
        s: s,
        ms: ms
    }
}
// console.log(dateDiff("2020,7,8 20:8:8"))

 
setInterval(function(){
    let time='';
    let ptime=dateDiff("2020,7,8 20:8:8");
    let dd=document.querySelector('.j-dd');
    let hh=document.querySelector('.j-hh');
    let mm=document.querySelector('.j-mm');
    let ss=document.querySelector('.j-ss');
    dd.innerHTML=ptime.day;
    hh.innerHTML=ptime.h;
    mm.innerHTML=ptime.m;
    ss.innerHTML=ptime.s;
},1000);










