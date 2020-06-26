$(document).ready(function(){
  // 回到顶部
  $(window).scroll(function(){
    var scrollTop = $(window).scrollTop();
  
    if(scrollTop > 800){
        $(".actGotop").fadeIn(1000);
    }else{
        $(".actGotop").fadeOut(1000);
    }
  })
  $(".actGotop").click(function(){
    $("html,body").animate({
        scrollTop: 0
    }, 1000)
  })
  
  // 轮播图1
  $(".banner1").banner({
  img:$(".banner1").children(".imgbox").find("a"),
  autoPlay:true,
  list:true,
  delayTime:3000,
  moveTime:300
  })
  // 轮播图2
  $(".banner2").banner({
  img:$(".banner2").children(".images").find("a"),
  left:$(".banner2").find("#left"),
  right:$(".banner2").find("#right"),
  list:true,
  autoPlay:true,
  delayTime:3000,
  moveTime:300
  })
});




// 渲染页面
function getGoods(data){
    let str2=""
    let divs=document.querySelector('.divs');

    if(data){
      // console.log(data)
      data.forEach(ele=>{
        let {Id,src,price,name,sale}=ele;
        // console.log(Id)
        str2+=`<div class="goodsCon">
                <a target = "_blank" href="http://localhost/ship/ship1.html?id=${Id}">
                  <img src="${src}" class="icon">
                  <h4 class="title">${name}</h4>
                  <div class="info">限时抢购200条</div>
                </a>
                <div class="priceCon">
                  <span class="price">￥${price}</span>
                  <span class="oldPrice">￥${(price * 1.2).toFixed(2)}</span>
                  <div><span class="soldText">已售${sale}%</span>
                  <span class="soldSpan"><span style="width: 87.12px;">
                  </span></span>
                </div>
                <a class="button" target="_blank" onclick="addCart(${Id},'${name}','${src}','${price}',1)">立即抢购</a></div>
              </div >`;
      })
      divs.innerHTML=str2;
    };
};
getGoods();

//侧边购物车购买数量
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




// 点击立即抢购，将数据储存到cookie
function addCart(id,name,src,price,num){
  console.log(id)
  let cartGoods=JSON.parse(localStorage.getItem('carts'));
  let state=true;
  // console.log(cartGoods)
  if(cartGoods){
    cartGoods.forEach(ele=>{
      if(ele.gid==id){
        ele.gnum=ele.gnum-0+1;
        state=false;
      };
    });
    if(state){
      let goodsObj = { gid: id, gname: name, gsrc: src, gprice: price, gnum: 1 };
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
};


// 可视区高度,宽度
function getClient () {
  return {
    h: window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight,
    w: window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,
  }
}
// 滚动条高度
function getScTop () {
  return window.pageYOffset || document.body.scrollTop;
}

function get (url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      cb && cb(xhr.response)
    }
  }
}
// 鼠标滑动超过高度请求mysql数据
window.onload=function(){
  localStorage.setItem("size",1);
};
if(0<localStorage.getItem('size')<4){
  window.onscroll=function(){
    // console.log(loaclStorage.getItem('size'))
    let size=localStorage.getItem('size');
        if(document.body.scrollHeight-300<document.body.scrollTop+document.body.clientWidth){
          // console.log(1)

              ajax({url: 'http://localhost/ship/php/goods.php?fn=get2&psize=' + size }).then(function(res){
                // console.log(JSON.parse(res).data)
                // console.log(JSON.parse(res).data.pageData)
                // console.log(JSON.parse(res).data.pcount)
                // hnum=JSON.parse(res).data.pcount;
                getGoods(JSON.parse(res).data.pageData)
                size=size-0+1;
                // console.log(size)
                localStorage.setItem("size",size)
              })
         
        };
      
  };
};






// 会员登陆后显示会员信息
(function(){
  if(sessionStorage.getItem("userMsg")!=null){
    let msg=JSON.parse(sessionStorage.getItem("userMsg"));
    let logname=document.querySelector('.loginname');
    let blogin_a=document.querySelector('.blogin_a');
    let img=document.getElementById('personAvatar');
    logname.innerHTML=`<a class="login-button" href="">
                          <span>尊贵的会员 ${msg.user}</span>
                        </a>
                        <a href="" onclick="cancellation()">注销</a>`;
    blogin_a.innerHTML=`<a href=""> ${msg.user}</a>`;
    img.src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256100974,305075936&fm=26&gp=0.jpg";
  };
})();

function cancellation(){
  sessionStorage.removeItem("userMsg");
};

// 划过图片改变图片效果
(function(){
  let imgs=document.querySelector('.tright');
  // console.log(imgs);
  imgs.onmouseover=function(eve){
    let e=eve||window.event;
    let tar=e.target || e.srcElement;
    // console.log(tar.nodeName)
    if(tar.nodeName=="IMG"){
      tar.style.border="1px solid blue"
    };
  };
  imgs.onmouseout=function(eve){
    let e=eve||window.event;
    let tar=e.target || e.srcElement;
    // console.log(tar.nodeName)
    if(tar.nodeName=="IMG"){
      tar.style.border="1px solid white"
    };
  };

})();

//请求mysql数据的分两页左右按钮版
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

function Lst(size = 1){
  ajax({url: 'http://localhost/ship/php/goods.php?fn=get&psize=' + size }).then(function(res){
      res = JSON.parse(res);
      // console.log(res)
      let str='';
      // console.log(res.data);
      if (res.stateCode == 200) {
          let { pageData, pcount } = res.data;
          // console.log(pageData)
          pageData.forEach(ele => {
              str+=`<li>
                        <a target = "_blank" href="http://localhost/ship/ship1.html?id=${ele.Id}">
                          <div class="tu"><img src="${ele.src}" height="140" width="140"></div>
                          <h4 class="title">${ele.name}</h4>
                        </a>
                        <div class="priceCon">
                            <span class="price">${ele.price}</span>
                            <span class="oldPrice">￥${(ele.price * 1.2).toFixed(2)}</span><br/>
                            <span class="soldText">已售${ele.sale}%</span>
                            <a class="button" onclick="addCart(${ele.Id},'${ele.name}','${ele.src}','${ele.price}',1)">立即抢购</a>
                        </div>
                    </li>`;
          });
          document.querySelector('.cright ul').innerHTML=str;
      };
  });
};

Lst();
var btnleft1=document.getElementById('left1');
var btnright1=document.getElementById('right1');
btnleft1.onclick=function(){
  Lst(1);
};
btnright1.onclick=function(){
  Lst(2);
};

// 搜索框
function jsonp(url,success,data){
  data = data || {};
  let str = "";
  for(var key in data){
      str += `${key}=${data[key]}&`;
  }
  let t = new Date().getTime();
  str = str + "__qft="+t;
  var script = document.createElement("script");
  script.src = url + "?" + str;
  document.body.appendChild(script);
  
  window[data[data.fieldName]] = function(res){
      success(res);
  }
}


class Search{
  constructor(){
      this.txt = document.querySelector(".text");
      this.list = document.getElementById("list");
      this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";

      this.addEvent();
  }
  addEvent(){
      var that = this;
      this.txt.oninput = function(){
          // this.value
          that.val = this.value;
          that.load();
      }
  }
  load(){
      var that = this;
      jsonp(this.url,function(res){
          // console.log(res.s);
          that.data = res.s;
          that.display();
      },{
          wd:this.val,
          cb:"asjhdgasj",
          fieldName:"cb"
      })
  }
  display(){
      // console.log(this.data);
      let str = "";
      for(var i=0;i<this.data.length;i++){
          str += `<li>${this.data[i]}</li>`;
      }
      this.list.innerHTML = str;
  }
}

new Search();

// 选项框
class changeIndex{
  constructor(){
    this.dd=document.querySelectorAll('#list .sl-all dd');
    this.li=document.querySelectorAll('#list .change li');
    // console.log(this.dd)
    // console.log(this.li)
    this.addEvent();
  };
  addEvent(){
    var that=this;
    for(let i=0;i<this.dd.length;i++){
      this.dd[i].onmouseover=function(){
        that.divblock(i);
      };
    };
    for(let i=0;i<this.dd.length;i++){
      this.dd[i].onmouseout=function(){
        that.divnone(i);
      };
    };
  };
  divblock(i){
    // console.log(i)
    this.li[i].style.display='block';

  };
  divnone(i){
    this.li[i].style.display='none';
  };
};

new changeIndex();
