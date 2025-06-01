<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\Api\AuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetCode;
use Illuminate\Support\Facades\DB;
use Mockery;

class AuthControllerTest extends TestCase
{

    public function test_register_validation_failure()
    {
        // Create request with invalid data
        $request = Request::create('/api/register', 'POST', [
            'name' => '',
            'username' => '',
            'email' => 'bademail',
            'password' => '123',
        ]);

        // Create controller and invoke method
        $controller = new AuthController();
        $response = $controller->register($request);

        // Assertions
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(422, $response->getStatusCode());

        $data = $response->getData(true);
        $this->assertArrayHasKey('errors', $data);
        $this->assertArrayHasKey('name', $data['errors']);
        $this->assertArrayHasKey('username', $data['errors']);
        $this->assertArrayHasKey('email', $data['errors']);
        $this->assertArrayHasKey('password', $data['errors']);
    }


    public function test_getUsers_returns_all_users()
    {
        $controller = new AuthController();
        $request = Request::create('/api/users', 'GET');

        $response = $controller->getUsers($request);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());

        $data = $response->getData(true);
        $this->assertArrayHasKey('users', $data);
        $this->assertIsArray($data['users'] ?? null); // should be array or collection converted to array
    }
     public function test_login_successful()
    {
        // Use a unique user to avoid conflicts
        $user = User::create([
            'name' => 'Jane Doe',
            'username' => 'test_janedoe_' . uniqid(),
            'email' => 'janedoe_' . uniqid() . '@example.com',
            'password' => Hash::make('Password@123'),
        ]);

        $request = Request::create('/api/login', 'POST', [
            'username' => $user->username,
            'password' => 'Password@123',
        ]);

        $controller = new AuthController();
        $response = $controller->login($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('token', $response->getData(true));
        $this->assertEquals($user->username, $response->getData(true)['user']['username']);

        // Cleanup (optional and safe)
        $user->tokens()->delete();
        $user->delete();
    }

     public function test_check_username_returns_true_if_exists()
    {
        // Use a username you know exists in your database
        $existingUsername = 'kerim';

        $request = Request::create('/api/check-username', 'POST', [
            'username' => $existingUsername,
        ]);

        $controller = new \App\Http\Controllers\Api\AuthController();

        $response = $controller->checkUsername($request);

        $data = $response->getData(true);

        $this->assertTrue($data['exists']);
    }

    public function test_check_username_returns_false_if_not_exists()
    {
        // Use a username you are sure does NOT exist
        $nonExistingUsername = 'non_existing_username_'.uniqid();

        $request = Request::create('/api/check-username', 'POST', [
            'username' => $nonExistingUsername,
        ]);

        $controller = new \App\Http\Controllers\Api\AuthController();

        $response = $controller->checkUsername($request);

        $data = $response->getData(true);

        $this->assertFalse($data['exists']);
    }

    public function test_check_email_returns_true_if_exists()
    {
        // Replace with an email that you know exists in your database
        $existingEmail = 'kerimomerovic33@gmail.com';

        $request = Request::create('/api/check-email', 'POST', [
            'email' => $existingEmail,
        ]);

        $controller = new \App\Http\Controllers\Api\AuthController();

        $response = $controller->checkEmail($request);

        $data = $response->getData(true);

        $this->assertTrue($data['exists']);
    }

    public function test_check_email_returns_false_if_not_exists()
    {
        // Use a unique email to avoid collisions
        $nonExistingEmail = 'nonexisting_' . uniqid() . '@example.com';

        $request = Request::create('/api/check-email', 'POST', [
            'email' => $nonExistingEmail,
        ]);

        $controller = new \App\Http\Controllers\Api\AuthController();

        $response = $controller->checkEmail($request);

        $data = $response->getData(true);

        $this->assertFalse($data['exists']);
    }
    public function test_send_reset_code_sends_email_and_stores_code()
    {
        // Fake mail to prevent real sending
        Mail::fake();

        // Use a real user that exists in the DB
        $user = User::first();
        $this->assertNotNull($user, 'No user found in database');

        // Make a request with the user's email
        $request = Request::create('/api/send-reset-code', 'POST', [
            'email' => $user->email,
        ]);

        $controller = new AuthController();
        $response = $controller->sendResetCode($request);

        // Assert response
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(
            'Verification code sent to your email.',
            $response->getData(true)['message']
        );

        // Assert that a reset code was stored in the DB
        $this->assertDatabaseHas('password_resets', [
            'email' => $user->email,
        ]);

        // Assert that mail was sent
        Mail::assertSent(PasswordResetCode::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email);
        });
    }
     public function test_verify_code_success()
    {
        // Use an existing user
        $user = User::first();
        $this->assertNotNull($user, 'No user found in database');

        // Insert a test code into password_resets
        $code = '12345';
        DB::table('password_resets')->updateOrInsert(
            ['email' => $user->email],
            ['token' => $code, 'created_at' => now()]
        );

        // Create request
        $request = Request::create('/api/verify-code', 'POST', [
            'email' => $user->email,
            'code' => $code,
        ]);

        // Run controller
        $controller = new AuthController();
        $response = $controller->verifyCode($request);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Code verified.', $response->getData(true)['message']);
    }

    public function test_verify_code_invalid()
    {
        $user = User::first();
        $this->assertNotNull($user, 'No user found in database');

        // Create request with wrong code
        $request = Request::create('/api/verify-code', 'POST', [
            'email' => $user->email,
            'code' => '00000',
        ]);

        $controller = new AuthController();
        $response = $controller->verifyCode($request);

        // Assert
        $this->assertEquals(400, $response->getStatusCode());
        $this->assertEquals('Invalid code', $response->getData(true)['error']);
    }

    public function test_reset_password_successfully()
{
    // Create a test user
    $user = User::create([
        'name' => 'Test User',
        'username' => 'reset_test_' . uniqid(),
        'email' => 'reset_test_' . uniqid() . '@example.com',
        'password' => bcrypt('OldPassword@123'),
    ]);

    // Insert test reset code into password_resets
    $code = '12345';
    DB::table('password_resets')->updateOrInsert(
        ['email' => $user->email],
        ['token' => $code, 'created_at' => now()]
    );

    // Simulate the request
    $request = Request::create('/api/reset-password', 'POST', [
        'email' => $user->email,
        'code' => $code,
        'password' => 'NewPass1!',
    ]);

    $controller = new AuthController();
    $response = $controller->resetPassword($request);

    // Assert response
    $this->assertEquals(200, $response->getStatusCode());
    $this->assertEquals('Password reset successfully', $response->getData(true)['message']);

    // Cleanup
    $user->delete();
}

public function test_display_user_returns_authenticated_user()
{
    // Step 1: Create a test user
    $user = User::create([
        'name' => 'Display User',
        'username' => 'display_' . uniqid(),
        'email' => 'display_' . uniqid() . '@example.com',
        'password' => bcrypt('TestPass1!'),
    ]);

    // Step 2: Simulate an authenticated request
    $request = Request::create('/api/display-user', 'GET');
    $request->setUserResolver(function () use ($user) {
        return $user;
    });

    // Step 3: Call controller method
    $controller = new AuthController();
    $response = $controller->displayUser($request);

    // Step 4: Assert response
    $this->assertEquals(200, $response->getStatusCode());

    $data = $response->getData(true);
    $this->assertArrayHasKey('user', $data);
    $this->assertEquals($user->email, $data['user']['email']);
    $this->assertArrayNotHasKey('password', $data['user']);

    // Step 5: Cleanup
    $user->delete();
}

}

