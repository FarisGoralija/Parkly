<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Parking;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class FavoriteParkingController extends Controller
{
    public function toggle(Request $request)
    {
        $user = Auth::user(); 
        $parkingId = $request->parking_id;

        if ($user->favoriteParkings()->where('parking_id', $parkingId)->exists()) {
            $user->favoriteParkings()->detach($parkingId);
            return response()->json(['message' => 'Unfavorited']);
        } else {
            $user->favoriteParkings()->attach($parkingId);
            return response()->json(['message' => 'Favorited']);
        }
    }

    public function getFavorites()
    {
        $user = Auth::user();
        $favorites = $user->favoriteParkings()->get();
        return response()->json($favorites);
    }

    public function isFavorited(Request $request, $parkingId)
    {
        $user = Auth::user();
        $isFavorited = $user->favoriteParkings()->where('parking_id', $parkingId)->exists();
        return response()->json(['is_favorited' => $isFavorited]);
    }
}
