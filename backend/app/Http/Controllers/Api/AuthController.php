<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {


    // Validation
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'username' => 'required|string|max:255|unique:users',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:8',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    // Create the user
    $user = User::create([
        'name' => $request->name,
        'username' => $request->username,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'user' => $user->makeHidden(['password']),
        'token' => $token,
    ], 201);
}

public function getUsers(Request $request){
    $users = User::all();

    return response()->json([
        'users' => $users,

    ],200)->header('Content-Type', 'application/json');
}

public function login(Request $request)
{
    $credentials = $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

    $user = User::where('username', $credentials['username'])->first();

    if (! $user || ! Hash::check($credentials['password'], $user->password)) {
        return response()->json([
            'error' => 'Invalid credentials'
        ], 401);
    }

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'user' => $user->makeHidden(['password']),
        'token' => $token,
    ], 200);
}
public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        "message" => "Logged out!"
    ],200);
}

public function deleteUser($id)
{
    $user = User::find($id);

    if(!$user){
        return response()->json([
            "message" => "User not found"
        ],404);
    }

    $user->delete();
    return response()->json([
        "message" => "User deleted successfully"
    ],200);
}



 }
