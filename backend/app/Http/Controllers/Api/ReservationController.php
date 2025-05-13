<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Parking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Reservation;
use Illuminate\Support\Carbon;

class ReservationController extends Controller
{
    // Get all reservations for the authenticated user
    public function index()
{
    if (!Auth::check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $user = Auth::user();
    $reservations = $user->reservations()->with(['car', 'parking'])->get();
    $now = Carbon::now(); // Ensures a Carbon instance

    $activeReservations = $reservations->filter(function ($reservation) use ($now) {
        return Carbon::parse($reservation->end_time)->greaterThanOrEqualTo($now);
    });

    $expiredReservations = $reservations->filter(function ($reservation) use ($now) {
        return Carbon::parse($reservation->end_time)->lessThan($now);
    });

    return response()->json([
        'active_reservations' => $activeReservations->values(),
        'expired_reservations' => $expiredReservations->values(),
    ]);
}







    // Create a new reservation
    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'parking_id' => 'required|exists:parkings,id',
            'start_time' => 'required|date|after_or_equal:now',
            'end_time' => 'required|date|after:start_time',
        ]);

        $user = Auth::user();

        // Check if the car belongs to the authenticated user
        $car = Car::findOrFail($request->car_id);
        if ($car->user_id !== $user->id) {
            return response()->json(['message' => 'You can only reserve with your own car.'], 403);
        }

        // Check for parking capacity logic
        $existingReservations = Reservation::where('parking_id', $request->parking_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                    ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                    ->orWhere(function ($query) use ($request) {
                        $query->where('start_time', '<', $request->start_time)
                            ->where('end_time', '>', $request->end_time);
                    });
            })->count();

        $parking = Parking::findOrFail($request->parking_id);

        if ($existingReservations >= $parking->total_spots) {
            return response()->json(['message' => 'No available spots at this time.'], 400);
        }

        $reservation = Reservation::create([
            'user_id' => $user->id,
            'car_id' => $request->car_id,
            'parking_id' => $request->parking_id,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Reservation created successfully.',
            'reservation' => $reservation->load(['car', 'parking']),
        ]);
    }
}
