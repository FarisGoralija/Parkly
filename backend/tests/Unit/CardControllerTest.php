<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Card;
use Illuminate\Support\Str;

class CardControllerTest extends TestCase
{
    public function test_can_list_user_cards()
    {
        $user = User::first() ?? User::factory()->create();
        $this->actingAs($user, 'sanctum');

        // Ensure at least one card exists for the user
        $user->cards()->firstOrCreate([
            'card_number' => '411111111111' . rand(1000, 9999),
        ], [
            'cardholder_name' => 'Test User',
            'expiration_date' => '12/30',
            'cvv_code' => '123',
        ]);

        $response = $this->getJson("/api/users/{$user->id}/cards");

        $response->assertStatus(200)->assertJsonIsArray();
    }

    public function test_can_add_card_to_user()
    {
        $user = User::first() ?? User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->postJson("/api/users/{$user->id}/cards", [
            'card_number' => '424242424242' . rand(1000, 9999),
            'cardholder_name' => 'Test User',
            'expiration_date' => '01/30',
            'cvv_code' => '456',
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['cardholder_name' => 'Test User']);
    }

    public function test_can_delete_own_card()
    {
        $user = User::first() ?? User::factory()->create();

        $card = $user->cards()->create([
            'card_number' => '401288888888' . rand(1000, 9999),
            'cardholder_name' => 'To Delete',
            'expiration_date' => '11/29',
            'cvv_code' => '789',
        ]);

        $this->actingAs($user, 'sanctum');

        $response = $this->deleteJson("/api/users/{$user->id}/cards/{$card->id}");

        $response->assertStatus(204);
    }

  public function test_cannot_delete_other_users_card()
{
    $user1 = User::factory()->create(['username' => 'user1_' . uniqid()]);
    $user2 = User::factory()->create(['username' => 'user2_' . uniqid()]);

    $card = $user2->cards()->create([
        'card_number' => '1234123412341234',
        'cardholder_name' => 'Other User',
        'expiration_date' => '12/29',
        'cvv_code' => '456',
    ]);

    $this->actingAs($user1, 'sanctum');

    $response = $this->deleteJson("/api/users/{$user1->id}/cards/{$card->id}");

    $response->assertStatus(404); // because the card doesn't belong to this user
}


}
