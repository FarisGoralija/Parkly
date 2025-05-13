<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\User;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index(User $user)
    {
        return $user->cars;
    }

    public function store(Request $request, User $user)
    {
        $validated = $request->validate([
            'license_plate' => 'required|string',
            'brand' => 'required|string',
            'model' => 'required|string',
        ]);

        $car = $user->cars()->create($validated);

        return response()->json($car, 201);
    }


    public function show(User $user, Car $car)
    {
        return response()->json($car);
    }


    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(User $user, Car $car)
    {
        $car->delete();

        return response()->json(['message' => 'Car deleted.']);
    }
    
}
