<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthControllerTest extends TestCase
{
    public function test_user_can_register_successfully()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'username' => 'user_' . uniqid(),
            'email' => 'test_' . uniqid() . '@example.com',
            'password' => 'Test1234@'
        ]);

        $response->dump();
        $response->assertStatus(201);
    }

    public function test_user_can_login_successfully()
{

    $user = \App\Models\User::factory()->create([
        'username' => 'user_' . uniqid(),
        'password' => bcrypt('Test1234@'),
    ]);

    $response = $this->postJson('/api/login', [
        'username' => $user->username,
        'password' => 'Test1234@',
    ]);

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'user' => ['id', 'name', 'email', 'username', 'created_at', 'updated_at'],
        'token',
    ]);
}
public function test_check_username_returns_correct_existence_status()
{
    $username = 'user_' . uniqid();

    $this->postJson('/api/register', [
        'name' => 'Test User',
        'username' => $username,
        'email' => 'test_' . uniqid() . '@example.com',
        'password' => 'Test1234@'
    ])->assertStatus(201);


    $responseExists = $this->getJson('/api/check-username?username=' . $username);
    $responseExists->assertStatus(200);
    $responseExists->assertJson(['exists' => true]);


    $responseNotExists = $this->getJson('/api/check-username?username=nonexistentuser');
    $responseNotExists->assertStatus(200);
    $responseNotExists->assertJson(['exists' => false]);
}

public function test_check_email_returns_correct_existence_status()
{
    $email = 'test_' . uniqid() . '@example.com';


    $this->postJson('/api/register', [
        'name' => 'Test User',
        'username' => 'user_' . uniqid(),
        'email' => $email,
        'password' => 'Test1234@'
    ])->assertStatus(201);


    $responseExists = $this->getJson('/api/check-email?email=' . $email);
    $responseExists->assertStatus(200);
    $responseExists->assertJson(['exists' => true]);


    $responseNotExists = $this->getJson('/api/check-email?email=nonexistent@example.com');
    $responseNotExists->assertStatus(200);
    $responseNotExists->assertJson(['exists' => false]);
}

public function test_user_can_logout_successfully()
{

    $user = \App\Models\User::factory()->create([
        'username' => 'user_' . uniqid(),
        'password' => bcrypt('Test1234@'),
    ]);


    $token = $user->createToken('api-token')->plainTextToken;


    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->postJson('/api/logout');


    $response->assertStatus(200);
    $response->assertJson([
        'message' => 'Logged out!'
    ]);
}

public function test_get_users_returns_users_list()
{

    $user = \App\Models\User::factory()->create([
        'username' => 'user_' . uniqid(),
    ]);


    $this->actingAs($user, 'sanctum');


    $response = $this->getJson('/api/users');


    $response->assertStatus(200);


    $response->assertJsonStructure([
        'users' => []
    ]);


    $responseData = $response->json();
    $this->assertIsArray($responseData['users']);
    $this->assertNotEmpty($responseData['users']);
}

public function test_display_user_returns_authenticated_user_data()
{
    $user = \App\Models\User::factory()->create(['username' => 'user_' . uniqid()]);
    $this->actingAs($user, 'sanctum');

    $response = $this->getJson('/api/user');

    $response->assertStatus(200)
             ->assertJson([
                 'user' => [
                     'id' => $user->id,
                     'name' => $user->name,
                     'email' => $user->email,
                     'username' => $user->username,
                 ]
             ]);
}

public function test_send_reset_code_sends_email_and_stores_code()
{
    Mail::fake();

    $email = 'user_' . Str::random(10) . '@example.com';

    $user = \App\Models\User::factory()->create([
        'email' => $email,
        'username' => 'user_' . uniqid(),
    ]);

    $response = $this->postJson('/api/forgot-password', [
        'email' => $email,
    ]);

    $response->assertStatus(200)
             ->assertJson(['message' => 'Verification code sent to your email.']);

    Mail::assertSent(\App\Mail\PasswordResetCode::class);

    $this->assertDatabaseHas('password_resets', [
        'email' => $email,
    ]);
}



public function test_verify_reset_code_returns_success_for_valid_code()
{
    $email = 'user_' . Str::random(10) . '@example.com';

    $user = \App\Models\User::factory()->create([
        'email' => $email,
        'username' => 'user_' . uniqid(),
    ]);

    $code = 12345;

    DB::table('password_resets')->insert([
        'email' => $email,
        'token' => $code,
        'created_at' => now(),
    ]);

    $response = $this->postJson('/api/verify-reset-code', [
        'email' => $email,
        'code' => $code,
    ]);

    $response->assertStatus(200)
             ->assertJson(['message' => 'Code verified.']);
}

public function test_verify_reset_code_returns_error_for_invalid_code()
{
    $email = 'user_' . Str::random(10) . '@example.com';

    $user = \App\Models\User::factory()->create([
        'email' => $email,
        'username' => 'user_' . uniqid(),
    ]);

    $response = $this->postJson('/api/verify-reset-code', [
        'email' => $email,
        'code' => 99999,
    ]);

    $response->assertStatus(400)
             ->assertJson(['error' => 'Invalid code']);
}



}
