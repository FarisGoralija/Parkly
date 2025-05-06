<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ParkingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('parkings', ParkingController::class);
Route::post('register', [AuthController::class, 'register']);
//Route::get('users', [AuthController::class, 'getUsers']);
Route::middleware('auth:sanctum')->get('users', [AuthController::class, 'getUsers']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
