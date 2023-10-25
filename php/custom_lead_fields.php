<?php
$ch = curl_init();

setcookie("csrftoken", "kcWCfhqobRIck5TPnu5uvIt9jMFmKdzDdbg6ShYhw7AVPmo8cY8mYBAhBKn6pceg");

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



// $data = array(
//     'token' => $token,
//     'client_id' => '13864366',
//     'contact_phone' => '123456789',
//     'contact_name' => 'Szymon Krych',
//     'leadtype_id' => '18137',
//     'IMEI' => '69420'
// );


// $endpoint = 'https://api.orderry.com/lead/';
// $params = $data;
// $url = $endpoint . '?' . http_build_query($params);
// curl_setopt($ch, CURLOPT_URL, $url);


// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($ch, CURLOPT_HTTPGET, 1);

// $retJ = curl_exec($ch);

// $ret=json_decode($retJ, true);

// echo var_dump($ret);
// curl_close($ch);


// Dane do wysłania
$data = array(
    'token' => $token,
    'leadtype_id' => '18137',
    'DEBUG' => TRUE
);
$data_string = json_encode($data);

// Inicjalizacja sesji curl
$ch = curl_init();

// Ustawienie opcji curl, w tym adresu URL i danych do wysłania
curl_setopt($ch, CURLOPT_URL, "https://api.orderry.com/lead/custom-fields/");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string)
));

// Wykonanie zapytania i zwrócenie wyniku
$result = curl_exec($ch);

// Sprawdzenie, czy wystąpił błąd curl
if(curl_errno($ch)) {
    echo 'Błąd curl: ' . curl_error($ch);
}

// Zamknięcie sesji curl
curl_close($ch);
?>