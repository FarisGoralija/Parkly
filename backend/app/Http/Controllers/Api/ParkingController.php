<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ParkingResource;
use App\Http\Traits\CanLoadRelationships;
use App\Models\Parking;
use Illuminate\Http\Request;

class ParkingController extends Controller
{
    use CanLoadRelationships;

    public function index()
    {

        $parkings = Parking::all();

        return ParkingResource::collection($parkings);
    }

    public function store(Request $request)
    {
        $parking = Parking::create($request->validate([
            'name' => 'required|string|max:125',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'total_spots' => 'required|integer|min:1',
            'website_url' => 'nullable|url|max:255',
            'phone_number' => 'nullable|string|max:20',
            'price' => 'nullable|numeric|min:0'
            ]));

        return new ParkingResource($this->loadRelationships($parking));
    }

    public function show(Parking $parking)
    {
        $occupied = $parking->parkingSpots()->where('is_available', false)->count();
        $available = $parking->total_spots - $occupied;

        return response()->json([
            'name' => $parking->name,
            'price' => $parking->price,
            'website_url' => $parking->website_url,
            'phone_number' => $parking->phone_number,
            'total_spots' => $parking->total_spots,
            'available_spots' => $available
            ]);
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(Parking $parking)
    {
        $parking->delete();

        return response(status: 204);
    }
}
