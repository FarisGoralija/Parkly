<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'user_id',
        'license_plate',
        'brand',
        'model',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservations() {
        return $this->hasMany(Reservation::class);
    }


}
