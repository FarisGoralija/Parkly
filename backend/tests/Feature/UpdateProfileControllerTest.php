<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdateProfileControllerTest extends TestCase
{

public function test_update_profile_successfully()
{
    $user = User::factory()->create([
        'password' => Hash::make('OldPass123!'),
        'username' => 'oldusername_' . uniqid(),
    ]);

    $this->actingAs($user, 'sanctum');

    $newUsername = 'updatedusername_' . uniqid();

    $response = $this->patchJson('/api/profile', [
        'name' => 'Updated Name',
        'username' => $newUsername,
        'password' => 'NewPass123!',
        'current_password' => 'OldPass123!',
    ]);

    $response->assertStatus(200);
    $response->assertJsonFragment([
        'name' => 'Updated Name',
        'username' => $newUsername,
    ]);
}


    public function test_update_profile_fails_with_wrong_current_password()
    {
        $user = User::first() ?? User::factory()->create([
            'password' => Hash::make('OldPass123!'),
        ]);

        $this->actingAs($user, 'sanctum');

        $response = $this->patchJson('/api/profile', [
            'password' => 'NewPass123!',
            'current_password' => 'WrongPassword',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('current_password');
    }

    public function test_update_profile_validation_errors()
    {
        $user = User::first() ?? User::factory()->create();

        $this->actingAs($user, 'sanctum');

        $response = $this->patchJson('/api/profile', [
            'password' => 'nopass',
            'current_password' => 'anything',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }
}
