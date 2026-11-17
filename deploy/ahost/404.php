<?php
// Страница 404 на языке адреса: для /ru/… русская, для остальных узбекская.
// Сами страницы собирает Next.js в error-404/index.html и ru/error-404/index.html.
http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
readfile(__DIR__ . (preg_match('#^/ru(/|$)#', $path) ? '/ru/error-404/index.html' : '/error-404/index.html'));
