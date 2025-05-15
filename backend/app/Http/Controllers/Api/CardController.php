<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use App\Models\User;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index(User $user)
    {
        return $user->cards;
    }

    public function store(Request $request, User $user)
    {
        $validated = $request->validate([
            'card_number' => 'required|string',
            'cardholder_name' => 'required|string',
            'expiration_date' => 'required|string',
            'cvv_code' => 'required|string',
        ]);

        $card = $user->cards()->create($validated);

        return response()->json($card, 201);
    }

    public function destroy(User $user, Card $card)
    {
        // Ensure the card belongs to the user
        if ($card->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $card->delete();
        return response()->json(null, 204);
    }
}
