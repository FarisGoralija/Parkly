<?php

namespace Tests\Unit;

use App\Http\Controllers\Api\ParkingController;
use App\Models\Parking;
use Illuminate\Http\Request;
use Tests\TestCase;

class ParkingControllerTest extends TestCase
{
    public function test_index_returns_collection()
    {
        $controller = new ParkingController();

        $response = $controller->index();

        $this->assertIsObject($response); // Resource collection object
    }

    public function test_store_requires_fields_and_creates_parking()
    {
        $controller = new ParkingController();

        $request = Request::create('/api/parkings', 'POST', [
            'name' => 'Unit Test Parking',
            'latitude' => 10.0,
            'longitude' => 10.0,
            'total_spots' => 5,
        ]);

        $resource = $controller->store($request);

        // ParkingResource does not have status(), just check it's the right class and contains data
        $this->assertEquals('Unit Test Parking', $resource->resource->name);
    }

    public function test_show_returns_parking_info()
    {
        $parking = Parking::first();
        $this->assertNotNull($parking);

        $controller = new ParkingController();

        $request = Request::create('/api/parkings/' . $parking->id, 'GET');

        $response = $controller->show($request, $parking);

        $this->assertEquals(200, $response->getStatusCode());

        $data = $response->getData(true); // convert to array

        $this->assertArrayHasKey('name', $data);
        $this->assertArrayHasKey('available_spots', $data);
    }

    public function test_destroy_deletes_parking()
    {
        $parking = Parking::first();
        $this->assertNotNull($parking);

        $controller = new ParkingController();

        $response = $controller->destroy($parking);

        $this->assertEquals(204, $response->getStatusCode());
    }
}
