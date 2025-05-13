<?php


use App\Http\Controllers\Api\ParkingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\ParkingSpotController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('register', [AuthController::class, 'register']);
Route::get('users', [AuthController::class, 'getUsers']);
//Route::middleware('auth:sanctum')->get('users', [AuthController::class, 'getUsers']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);


//Parking routes
Route::apiResource('parkings', ParkingController::class)
    ->only(['index', 'show', 'store', 'destroy']);

//Parking spots routes
Route::apiResource('parkings.parking-spots', ParkingSpotController::class)
    ->scoped();

//Car routes
Route::apiResource('users.cars', CarController::class)
    ->scoped()
    ->only(['index', 'store', 'show', 'destroy'])
    ->middleware('auth:sanctum');

