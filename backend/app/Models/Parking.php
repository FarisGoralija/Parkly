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

    public function parkingSpots()
{
    return $this->hasMany(ParkingSpot::class);
}

//public function availableParkingSpots()
//{
//    return $this->hasMany(ParkingSpot::class)->where('is_available', true);
//}

}
