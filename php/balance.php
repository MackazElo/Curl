<?php
$ch = curl_init();
// curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization ));
curl_setopt($ch, CURLOPT_POST, TRUE);

$endpoint = 'https://api.orderry.com/token/new';
$params = array('api_key' => '3308ebede5444d1b9360cdca310a6470');
$url = $endpoint . '?' . http_build_query($params);
curl_setopt($ch, CURLOPT_URL, $url);


curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPGET, 1);

$retJ = curl_exec($ch);

$ret=json_decode($retJ);

$token= $ret->{'token'}; 
// echo var_dump($ret);




//curl -G https://api.remonline.ru/warehouse/categories/ \ -d "token=7bab555b5ed075353de2263dd50a394c84a4625a"

$categories = array('392843', '392844');
$endpoint = 'https://api.orderry.com/warehouse/goods/79538';
$params = array('token' => $token, 'exclude_zero_residue' => TRUE);
$url = $endpoint . '?' . http_build_query($params);
curl_setopt($ch, CURLOPT_URL, $url);


curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPGET, 1);

$retJ = curl_exec($ch);

$ret=json_decode($retJ, true);

echo var_dump($ret);
curl_close($ch);
?>
