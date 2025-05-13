<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ParkingResource;
use App\Http\Traits\CanLoadRelationships;
use App\Models\Parking;
use App\Models\Reservation;
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

    public function show(Request $request, Parking $parking)
    {
        $now = now();
        $start = $request->query('start_time', $now);
        $end = $request->query('end_time', $now->copy()->addHour());

        // Count reservations that overlap with the given time period for this parking
        $overlappingReservationsCount = Reservation::where('parking_id', $parking->id)
            ->where(function ($q) use ($start, $end) {
                $q->whereBetween('start_time', [$start, $end])
                  ->orWhereBetween('end_time', [$start, $end])
                  ->orWhere(function ($q) use ($start, $end) {
                      $q->where('start_time', '<', $start)
                        ->where('end_time', '>', $end);
                  });
            })->count();

        $availableSpots = $parking->total_spots - $overlappingReservationsCount;

        return response()->json([
            'name' => $parking->name,
            'price' => $parking->price,
            'website_url' => $parking->website_url,
            'phone_number' => $parking->phone_number,
            'total_spots' => $parking->total_spots,
            'available_spots' => max($availableSpots, 0),
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
