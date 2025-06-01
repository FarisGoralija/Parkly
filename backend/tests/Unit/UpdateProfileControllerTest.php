<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdateProfileControllerTest extends TestCase
{
    public function test_update_name_and_username()
    {
        $user = User::where('email', 'janedoe@example.com')->first();

        if (! $user) {
            $user = User::create([
                'name' => 'Jane Doe',
                'username' => 'janedoe_test',
                'email' => 'janedoe@example.com',
                'password' => Hash::make('OldPass123!'),
            ]);
        }

        $this->actingAs($user);

        $response = $this->patchJson('/api/profile', [
            'name' => 'Updated Name',
            'username' => 'updated_username_' . uniqid(),
        ]);

        $response->assertStatus(200);
        $response->assertJsonFragment(['message' => 'Profile updated successfully.']);
    }



    public function test_update_password_with_wrong_current_password()
    {
        $user = User::where('email', 'janedoe@example.com')->first();
        $this->actingAs($user);

        $response = $this->patchJson('/api/profile', [
            'current_password' => 'WrongPass!',
            'password' => 'AnotherNew1!',
        ]);

        $response->assertStatus(422);
        $response->assertJsonFragment(['current_password' => ['Current password is incorrect.']]);
    }
}
