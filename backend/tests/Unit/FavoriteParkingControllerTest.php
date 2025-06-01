<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class FavoriteParkingControllerTest extends TestCase
{
    public function test_toggle_favorite_and_check_status()
    {
        $user = User::factory()->create(['username' => 'user_' . uniqid()]);

        $parkingId = DB::table('parkings')->insertGetId([
            'name' => 'Sample Parking',
            'latitude' => 40.7128,
            'longitude' => -74.0060,
            'total_spots' => 100,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($user, 'sanctum');

        // Toggle ON
        $this->postJson('/api/favorites/toggle', ['parking_id' => $parkingId])
            ->assertStatus(200)->assertJson(['message' => 'Favorited']);

        // Check ON
        $this->getJson("/api/favorites/{$parkingId}")
            ->assertStatus(200)->assertJson(['is_favorited' => true]);

        // Toggle OFF
        $this->postJson('/api/favorites/toggle', ['parking_id' => $parkingId])
            ->assertStatus(200)->assertJson(['message' => 'Unfavorited']);

        // Check OFF
        $this->getJson("/api/favorites/{$parkingId}")
            ->assertStatus(200)->assertJson(['is_favorited' => false]);
    }

    public function test_get_favorites_returns_data()
    {
        $user = User::factory()->create(['username' => 'user_' . uniqid()]);

        $parkingId = DB::table('parkings')->insertGetId([
            'name' => 'Favorite Parking',
            'latitude' => 34.0522,
            'longitude' => -118.2437,
            'total_spots' => 50,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('favorite_parkings')->insert([
            'user_id' => $user->id,
            'parking_id' => $parkingId,
        ]);

        $this->actingAs($user, 'sanctum');

        $this->getJson('/api/favorites')
            ->assertStatus(200)
            ->assertJsonFragment(['id' => $parkingId]);
    }
}
