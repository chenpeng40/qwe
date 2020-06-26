<?php
include('./mysql.php');

$fn=$_REQUEST['fn'];
$fn();
function get(){
    $pageSize = $_GET['psize'];
    $num = 6;
    $sql1 = 'select count(*) cou from shipdata';
    $res = select($sql1);
    $cout = $res[0]['cou'];
    $pageCount =  ceil($cout/ $num);
    $start =($pageSize-1)*$num;

    $sql = "select * from shipdata order by id limit $start,$num";
    $res = select($sql);
    $res = ['pageData'=>$res,'pcount'=>$pageCount];
    // echo json_encode($res);
    echo json_encode([
        'stateCode'=>200,
        'state'=>'success',
        'data'=>$res
    ]);
};

function get2(){
    $pageSize = $_GET['psize'];
    $num = 8;
    $start =$pageSize*$num;

    $sql = "select * from shipdata2 order by id limit 0,$start";
    $res = select($sql);
    $res = ['pageData'=>$res,'pcount'=>$pageCount];
    // echo json_encode($res);
    echo json_encode([
        'stateCode'=>200,
        'state'=>'success',
        'data'=>$res
    ]);
};

function get3(){
    $id = $_GET['id'];
    $sql = "select * from shipdata3 where ID =".$id;
    $res = select($sql);
    echo json_encode([
        'stateCode'=>200,
        'state'=>'success',
        'data'=>$res
    ]);
};




?>