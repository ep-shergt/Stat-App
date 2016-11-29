<?php
// Routes

$app->post('/allorders', function ($request, $response, $args) {
    return  handleLoadShopData();
});

$app->post('/shopname', function ($request, $response, $args) {
    return  getShopName();
});

$app->post('/weeklysales', function ($request, $response, $args) {
    return  getWeeklySales();
});

$app->post('/ordercount', function ($request, $response, $args) {
    return  getOrderCount();
});

$app->post('/toptencustomers', function ($request, $response, $args) {
    return  getTopTenCustomers();
});

$app->post('/statesales', function ($request, $response, $args) {
    return  getStateSales();
});

$app->post('/logout', function ($request, $response, $args) {
    return  handleLogout();
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
