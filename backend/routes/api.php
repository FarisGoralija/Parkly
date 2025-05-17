<?php


use App\Http\Controllers\Api\ParkingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\CardController;
use App\Http\Controllers\Api\FavoriteParkingController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\GoogleLogInController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UpdateProfileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//kera
Route::post('register', [AuthController::class, 'register']);
Route::get('users', [AuthController::class, 'getUsers']);
//Route::middleware('auth:sanctum')->get('users', [AuthController::class, 'getUsers']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
Route::post('/forgot-password', [AuthController::class, 'sendResetCode']);
Route::post('/verify-reset-code', [AuthController::class, 'verifyCode']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'displayUser']);
Route::patch('/profile', [UpdateProfileController::class, 'updateProfile'])->middleware('auth:sanctum');
Route::post('/auth/google', [GoogleLogInController::class, 'handleGoogleLogin']);
Route::get('/check-username', [AuthController::class, 'checkUsername']);
Route::get('/check-email', [AuthController::class, 'checkEmail']);

//kera


//Parking routes
Route::apiResource('parkings', ParkingController::class)
    ->only(['index', 'show', 'store', 'destroy'])
    ->middleware('auth:sanctum');

//Car routes
Route::apiResource('users.cars', CarController::class)
    ->scoped()
    ->only(['index', 'store', 'show', 'destroy'])
    ->middleware('auth:sanctum');

//Reservation routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::post('/reservations', [ReservationController::class, 'store']);
});

//Card routes
Route::apiResource('users.cards', CardController::class)
    ->scoped()
    ->only(['index', 'store', 'destroy'])
    ->middleware('auth:sanctum');

//Favorite parking routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/favorites/toggle', [FavoriteParkingController::class, 'toggle']);
    Route::get('/favorites', [FavoriteParkingController::class, 'getFavorites']);
    Route::get('/favorites/{parkingId}', [FavoriteParkingController::class, 'isFavorited']);
});
