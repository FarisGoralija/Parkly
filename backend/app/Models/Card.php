<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{

    protected $fillable = [
        'card_number',
        'cardholder_name',
        'expiration_date',
        'cvv_code',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
