<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UpdateProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $rules = [
            'name' => 'sometimes|string|max:255',
            'username' => 'sometimes|string|max:255|unique:users,username,' . $user->id,
            'password' => [
                'sometimes',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&#]/',
            ],
        ];

        $messages = [
            'password.regex' => 'Password must contain at least one uppercase letter, one number, and one special character.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        if ($request->has('name')) {
            $user->name = $request->name;
        }

        if ($request->has('username')) {
            $user->username = $request->username;
        }

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user->makeHidden(['password']),
        ]);
    }
}
