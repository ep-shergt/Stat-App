<?php
// Routes

$app->post('/allorders', function ($request, $response, $args) {
    return  handleLoadShopData();
});

$app->post('/weeklysales', function ($request, $response, $args) {
    return  getWeeklySales();
});

$app->post('/shopdata', function ($request, $response, $args) {
    return handleLoadShopData();
});

$app->post('/registration', function ($request, $response, $args) {
    return  handleUserRegistration();
});

$app->post('/login', function ($request, $response, $args) {
    return  handleUserLogin();
});
