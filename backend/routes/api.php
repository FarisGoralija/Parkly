<?php


use App\Http\Controllers\Api\ParkingController;
use App\Http\Controllers\Api\AuthController;
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
Route::apiResource('parkings', ParkingController::class)->only(['index', 'show', 'store', 'destroy']);

Route::apiResource('parkings.parking-spots', ParkingSpotController::class)
    ->scoped();

