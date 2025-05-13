<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ParkingSpotResource;
use App\Models\Parking;
use App\Models\ParkingSpot;
use Illuminate\Http\Request;

class ParkingSpotController extends Controller
{
    public function index(Parking $parking)
    {
        return $parking->parkingSpots; // or wrap in a resource
    }

    public function store(Request $request, Parking $parking)
    {
        $validated = $request->validate([
            'spot_number' => 'required|integer|min:1',
            'is_available' => 'required|boolean',
        ]);

        $spot = $parking->parkingSpots()->create($validated);

        return response()->json([
            'message' => 'Parking spot created.',
            'data' => $spot,
        ], 201);
    }

    public function show(Parking $parking, ParkingSpot $parkingSpot)
    {
        return $parkingSpot;
    }

    public function update(Request $request, Parking $parking, ParkingSpot $parkingSpot)
    {
        //$validated = $request->validate([
        //    'spot_number' => 'sometimes|integer|min:1',
        //    'is_available' => 'sometimes|boolean',
        //]);

        //$parkingSpot->update($validated);

        //return response()->json([
        //    'message' => 'Parking spot updated.',
        //    'data' => $parkingSpot
        //]);
    }

    public function destroy(Parking $parking, ParkingSpot $parkingSpot)
    {
        $parkingSpot->delete();

        return response()->json(['message' => 'Parking spot deleted.']);
    }
}
