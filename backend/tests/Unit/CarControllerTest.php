<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Car;
use Illuminate\Support\Str;

class CarControllerTest extends TestCase
{
    public function test_can_list_user_cars()
    {
        $user = User::first() ?? User::factory()->create();
        $this->actingAs($user, 'sanctum');

        // Ensure at least one car exists
        $user->cars()->firstOrCreate([
            'license_plate' => 'LIST' . Str::random(5),
        ], [
            'brand' => 'TestBrand',
            'model' => 'TestModel',
        ]);

        $response = $this->getJson("/api/users/{$user->id}/cars");

        $response->assertStatus(200)->assertJsonIsArray();
    }

    public function test_can_add_car_to_user()
    {
        $user = User::first() ?? User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->postJson("/api/users/{$user->id}/cars", [
            'license_plate' => 'PLATE' . Str::random(5),
            'brand' => 'Toyota',
            'model' => 'Corolla',
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['brand' => 'Toyota']);
    }

    public function test_can_view_specific_user_car()
    {
        $user = User::first() ?? User::factory()->create();

        $car = $user->cars()->firstOrCreate([
            'license_plate' => 'VIEW' . Str::random(5),
        ], [
            'brand' => 'Honda',
            'model' => 'Civic',
        ]);

        $this->actingAs($user, 'sanctum');

        $response = $this->getJson("/api/users/{$user->id}/cars/{$car->id}");

        $response->assertStatus(200)->assertJsonFragment(['id' => $car->id]);
    }

    public function test_can_delete_user_car()
    {
        $user = User::first() ?? User::factory()->create();

        $car = $user->cars()->create([
            'license_plate' => 'DEL' . Str::random(5),
            'brand' => 'Ford',
            'model' => 'Focus',
        ]);

        $this->actingAs($user, 'sanctum');

        $response = $this->deleteJson("/api/users/{$user->id}/cars/{$car->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Car deleted.']);
    }
}
