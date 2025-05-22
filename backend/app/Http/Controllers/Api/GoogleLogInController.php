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
    public function handleGoogleLogin(Request $request)
    {
        try {
            // ✅ Use the access token sent from frontend
            $googleUser = Socialite::driver('google')->userFromToken($request->bearerToken());

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