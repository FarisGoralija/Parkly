<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParkingSpot extends Model
{

    protected $fillable = [
        'parking_id',
        'spot_number',
        'is_available',
    ];

    public function parking()
{
    return $this->belongsTo(Parking::class);
}

}
