// 获取localStorage数据渲染页面
(function(){
    let carts=localStorage.getItem('carts');
    if(carts){
        carts=JSON.parse(carts);
        let str='';
        carts.forEach(ele=> {
            let {gid, gname, gprice, gsrc, gnum }=ele;
            str += `<tr>
                        <td class="checkbox"><input class="check-one check" type="checkbox"/ onclick="goodsCheck(this)"></td>
                        <td class="goods"><img src="${gsrc}" alt=""/><span>${gname}</span></td>
                        <td class="price">${gprice}</td>
                        <td class="count">
                            <span class="reduce" onclick="delGoodsNum(this,${gid})"></span>
                            <input class="count-input" type="text" value="${gnum}" oninput="addIpt(this,${gid})"/>
                            <span class="add" onclick="addGoodsNum(this,${gid})">+</span></td>
                        <td class="subtotal">${(gprice * gnum).toFixed(2)}</td>
                        <td class="operation"><span class="delete" onclick='delGoods(this,${gid})'>删除</span></td>
                    </tr>`;
        });
        $$('tbody').innerHTML = str;
    }else{
        $$('tbody').innerHTML ='<h2>亲，请先去&nbsp;&nbsp;<a href="http://localhost/ship/goods.html">首页</a>&nbsp;&nbsp;购买商品奥</h2>';
    };
    let num=document.querySelectorAll('tbody tr .count-input');
    num.forEach(ele=>{
        if(ele.value>1){
            ele.previousElementSibling.innerHTML='-';
        };
    });
    cpCount () ;
})();


function  zznb(){
    if(localStorage.getItem('carts')=="[]"){$$('tbody').innerHTML ='<h2>亲，请先去&nbsp;&nbsp;<a href="http://localhost/ship/goods.html">首页</a>&nbsp;&nbsp;购买商品奥</h2>';}
};

zznb();
    let checkAllObj=all('.check-all');
    // console.log(checkAllObj)
    checkAllObj[0].addEventListener('click',function(){
        checkAllGoods(1,this.checked);
    });
    checkAllObj[1].addEventListener('click',function(){
        checkAllGoods(0,this.checked);
    });
    function checkAllGoods(key,state){
        checkAllObj[key].checked=state;
        var checkOnes = all('.check-one');
        checkOnes.forEach(ele => {
            ele.checked = state;
        });
        cpCount () ;
    };
    function goodsCheck(eleObj) {
        // console.log(eleObj);
        let checkAllObj = all('.check-all');
        if(!eleObj.checked){
            checkAllObj.forEach(ele=>{
                ele.checked=false;
            });
        }else{
            var checkOnes = all('.check-one');
            // console.log(checkOnes);
            let len=checkOnes.length;
            // console.log(len);
            let num=0;
            //every都不能用
            checkOnes.forEach(ele=>{
                // console.log(ele)
                if(ele.checked==true){
                    num++;
                }
            });
            if(num==len){
                checkAllObj.forEach(ele=>{
                    ele.checked=true;
                });
            };
        };
        cpCount () ;
    }; 
    function cpCount () {
        let checkOnes = all('.check-one');
        let counum=0;
        let pri=0;
        checkOnes.forEach(ele=>{
            if(ele.checked){
                var parnetObj=ele.parentNode.parentNode;               
                let price=parnetObj.querySelector('.price').innerHTML;
                let num=parnetObj.querySelector('.count-input').value;
                counum=num - 0 + counum;
                pri+=num*price;
            };
        });
        $$('#selectedTotal').innerHTML = counum;
        $$('#priceTotal').innerHTML = pri.toFixed(2);
    };
    var time='';
    function addGoodsNum(eleObj, gid) {
        clearTimeout(time);
        time=setTimeout(function(){
            // console.log(eleObj);
            let inputObj=eleObj.previousElementSibling;
            // console.log(inputObj);
            let count=inputObj.value;
            count=count-0+1;
            if(count>1){
                inputObj.previousElementSibling.innerHTML='-';
            };
            if(count>99){
                count=99;
            };
            
            inputObj.value=count;
            pp(count,eleObj, gid);
        },500);
    };

    function delGoodsNum(eleObj,gid){
        clearTimeout(time);
        time=setTimeout(function(){
            let inputObj=eleObj.nextElementSibling;
            let count=inputObj.value;
            if(count>1){
                count=count-1;
            };
            if(count<=1){
                count=1;
                inputObj.previousElementSibling.innerHTML='';
            };
            inputObj.value=count;
            pp(count,eleObj, gid);
        },500);

    };

    function delGoods (eleObj, gid) {
        let trObj = eleObj.parentNode.parentNode; 
        let checkOne = trObj.querySelector('.check-one');
        trObj.remove();
        
        let cartGoods = localStorage.getItem('carts');
        cartGoods = JSON.parse(cartGoods);
        cartGoods.forEach((ele, key) => {

            if (ele.gid == gid){
                cartGoods.splice(key, 1);
                return;
            };
        });
        localStorage.setItem('carts', JSON.stringify(cartGoods))
        if(checkOne.checked){
            cpCount();
        };
        zznb();
    };

    function addIpt(eleObj, gid){
        clearTimeout(time);
        time=setTimeout(function(){
            eleObj.value = eleObj.value.replace(/\D/g, "");
            console.log(eleObj.value)
            if (eleObj.value < 1) eleObj.value = 1;
            if (eleObj.value > 99) eleObj.value = 99;
            let count=eleObj.value;
            pp(count,eleObj, gid);
        },100);

    }

    function pp(count,eleObj, gid){
        let price=eleObj.parentNode.previousElementSibling.innerHTML;
        let xjObj=eleObj.parentNode.nextElementSibling;
        xjObj.innerHTML=(price*count).toFixed(2);

        let cartGoods = localStorage.getItem('carts');
        cartGoods = JSON.parse(cartGoods);
        cartGoods.forEach((ele, key) => {

        if (ele.gid == gid){
                ele.gprice=price;
                ele.gnum=count;
            };
        });
        localStorage.setItem('carts', JSON.stringify(cartGoods))
        cpCount();
    };

  






    










