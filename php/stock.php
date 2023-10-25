<?php

$ch = curl_init();
// curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization ));
curl_setopt($ch, CURLOPT_POST, TRUE);

$endpoint = 'https://api.orderry.com/warehouse/goods/79538/13336614';
$params = array('token' => '505cd12f83a0c684f818c4a50309997c84d28e80');
$url = $endpoint . '?' . http_build_query($params);
curl_setopt($ch, CURLOPT_URL, $url);


curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPGET, 1);

$retJ = curl_exec($ch);

$ret=json_decode($retJ, true);

echo var_dump($ret);
curl_close($ch);
?>