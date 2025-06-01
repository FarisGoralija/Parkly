<?php

namespace Tests\Unit;

use App\Http\Controllers\Api\ReservationController;
use App\Models\Car;
use App\Models\Parking;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class ReservationControllerTest extends TestCase
{
    public function test_index_requires_authentication()
    {
        // Without login, manually call method and expect 401
        Auth::logout();

        $controller = new ReservationController();

        $response = $controller->index();

        $this->assertEquals(401, $response->getStatusCode());
    }

    public function test_index_returns_reservations_for_authenticated_user()
    {
        // Setup a user and login manually
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        Auth::login($user);

        $controller = new ReservationController();

        $response = $controller->index();

        $this->assertEquals(200, $response->getStatusCode());

        $data = $response->getData(true);

        $this->assertArrayHasKey('active_reservations', $data);
        $this->assertArrayHasKey('expired_reservations', $data);
    }

    public function test_store_creates_reservation_with_valid_data()
    {
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Test User',
                'email' => 'test2@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        Auth::login($user);

        // Use or create a car owned by this user
        $car = Car::where('user_id', $user->id)->first();
        if (!$car) {
            $car = Car::create([
                'user_id' => $user->id,
                'make' => 'TestMake',
                'model' => 'TestModel',
                'license_plate' => 'ABC1234',
            ]);
        }

        // Use or create parking with available spots
        $parking = Parking::first();
        if (!$parking) {
            $parking = Parking::create([
                'name' => 'Test Parking',
                'latitude' => 10,
                'longitude' => 10,
                'total_spots' => 10,
            ]);
        }

        $start = Carbon::now()->addMinutes(10)->toDateTimeString();
        $end = Carbon::now()->addHours(1)->toDateTimeString();

        $request = Request::create('/api/reservations', 'POST', [
            'car_id' => $car->id,
            'parking_id' => $parking->id,
            'start_time' => $start,
            'end_time' => $end,
        ]);

        $controller = new ReservationController();

        $response = $controller->store($request);

        $this->assertEquals(200, $response->getStatusCode());

        $data = $response->getData(true);

        $this->assertEquals('Reservation created successfully.', $data['message']);
        $this->assertEquals($car->id, $data['reservation']['car_id']);
        $this->assertEquals($parking->id, $data['reservation']['parking_id']);
    }
}
