<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Google\Client as Google_Client;


class GoogleLogInController extends Controller
{

    public function handleGoogleLogin(Request $request)
    {
        $request->validate([
            'id_token' => 'required|string',
        ]);

        $idToken = $request->input('id_token');

        $response = Http::get('https://oauth2.googleapis.com/tokeninfo', [
            'id_token' => $idToken,
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Invalid ID token.'], 401);
        }

        $payload = $response->json();

        // Optional audience check
        if ($payload['aud'] !== env('GOOGLE_CLIENT_ID')) {
            return response()->json(['error' => 'Invalid audience.'], 401);
        }

        $email = $payload['email'];
        $name = $payload['name'];

        $user = User::where('email', $email)->first();

        if (!$user) {
            $usernameBase = explode('@', $email)[0];
            $username = $usernameBase;
            $i = 1;

            while (User::where('username', $username)->exists()) {
                $username = $usernameBase . $i;
                $i++;
            }

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'username' => $username,
                'password' => Hash::make(uniqid()), // Placeholder password
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user->makeHidden(['password']),
            'token' => $token,
        ]);
    }

}
