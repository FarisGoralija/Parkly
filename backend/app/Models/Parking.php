<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parking extends Model
{
    protected $fillable = [
        'name',
        'latitude',
        'longitude',
        'total_spots',
        'website_url',
        'phone_number',
        'price',
    ];


    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

}
