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

    /**
     * Store a newly created resource in storage.
     */
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
        return new ParkingResource($parking);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
