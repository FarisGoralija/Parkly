<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetCode;
use Illuminate\Mail\Mailable;

class AuthController extends Controller
{
    public function register(Request $request)
    {


        $rules = [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|email|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/'
            ],
        ];

        $messages = [
            'name.required' => 'Name is required.',
            'username.required' => 'Username is required.',
            'username.unique' => 'This username is already taken.',
            'email.required' => 'Email is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email is already registered.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.regex' => 'Password must contain at least one uppercase letter, one number, and one special character.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

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

public function checkUsername(Request $request)
{
    $request->validate([
        "username" => "required|string",
    ]);

    $exists = User::where('username', $request->username)->exists();

    return response()->json([
        "exists" => $exists
    ]);
}

public function checkEmail(Request $request)
{
    $request->validate([
        "email" => "required|email",
    ]);

    $exists = User::where('email', $request->email)->exists();

    return response()->json([
        "exists" => $exists
    ]);
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
    $user->tokens()->delete();
    $user->delete();
    return response()->json([
        "message" => "User deleted successfully"
    ],200);
}

public function sendResetCode(Request $request)
{
    $request->validate(["email" => "required|email|exists:users,email"]);
    $code = random_int(10000,99999);

    DB::table('password_resets')->updateOrInsert(
        ['email' => $request->email],
        ['token' => $code, 'created_at' => now()]
    );

    Mail::to($request->email)->send(new PasswordResetCode($code));

    return response()->json(['message' => 'Verification code sent to your email.']);
}

public function verifyCode(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'code' => 'required|digits:5'
    ]);

    $reset = DB::table('password_resets')
        ->where('email', $request->email)
        ->where('token', $request->code)
        ->first();

    if (! $reset) {
        return response()->json(['error' => 'Invalid code'], 400);
    }

    return response()->json(['message' => 'Code verified.']);
}
public function resetPassword(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'code' => 'required|digits:5',
        'password' => [
            'required',
            'string',
            'min:8',
            'regex:/[A-Z]/',
            'regex:/[0-9]/',
            'regex:/[@$!%*?&#]/',
        ],
    ]);

    $reset = DB::table('password_resets')
        ->where('email', $request->email)
        ->where('token', $request->code)
        ->first();

    if (! $reset) {
        return response()->json(['error' => 'Invalid code'], 400);
    }

    $user = User::where('email', $request->email)->first();
    $user->password = Hash::make($request->password);
    $user->save();

    DB::table('password_resets')->where('email', $request->email)->delete();

    return response()->json(['message' => 'Password reset successfully']);
}
//getting the logged user
public function displayUser(Request $request){
    return response()->json([ "user" => $request->user()->makeHidden(['password'])], 200);
}

// auth finalized
 }
