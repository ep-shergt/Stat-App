<?php
// Routes

$app->post('/allorders', function ($request, $response, $args) {
    return  getAllOrders();
});

$app->get('/shopdata', function ($request, $response, $args) {
    return 'Shopdaten: ' . getShopData();
});

$app->post('/registration', function ($request, $response, $args) {
    return  handleUserRegistration();
});

$app->post('/login', function ($request, $response, $args) {
    return  handleUserLogin();
});
