<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'car_id',
        'parking_id',
        'start_time',
        'end_time',
        'status',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function parking()
    {
        return $this->belongsTo(Parking::class);
    }
}
