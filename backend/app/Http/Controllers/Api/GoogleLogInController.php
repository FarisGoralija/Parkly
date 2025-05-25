<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleLogInController extends Controller
{

    public function redirectToGoogle()
{
    return Socialite::driver('google')->stateless()->redirect();
}

    public function handleGoogleLogin(Request $request)
    {
        try {
            $code = $request->input('code'); // ← you send this from frontend

            if (! $code) {
                return response()->json([
                    'error' => 'Invalid request',
                    'message' => 'Authorization code is missing.',
                ], 400);
            }

            // Exchange code for access token manually
            $accessTokenResponse = Socialite::driver('google')->stateless()->getAccessTokenResponse($code);
            $accessToken = $accessTokenResponse['access_token'];

            // Get user info from token
            $googleUser = Socialite::driver('google')->stateless()->userFromToken($accessToken);

            $user = User::where('email', $googleUser->getEmail())->first();

            if (! $user) {
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'username' => $this->generateUsername($googleUser->getName()),
                    'password' => Hash::make(Str::random(16)),
                ]);
            }

            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                'user' => $user->makeHidden(['password']),
                'token' => $token,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unable to login with Google',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function googleCallback(Request $request)
{
    try {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'username' => $this->generateUsername($googleUser->getName()),
                'password' => Hash::make(Str::random(16)),
            ]
        );

        $token = $user->createToken('api-token')->plainTextToken;

        // Redirect back to mobile app
        return response()->json([
    'token' => $token,
    'user' => $user,
    'message' => 'Redirect successful'
]);


    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Google login failed',
            'message' => $e->getMessage(),
        ], 500);
    }
}


      private function generateUsername($name)
    {
        $base = Str::slug($name, '_');
        $username = $base;
        $counter = 1;

        while (User::where('username', $username)->exists()) {
            $username = $base . '_' . $counter++;
        }

        return $username;
    }
}