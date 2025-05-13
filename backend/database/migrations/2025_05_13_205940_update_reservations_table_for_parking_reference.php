<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateReservationsTableForParkingReference extends Migration
{
    public function up()
    {
        Schema::table('reservations', function (Blueprint $table) {
            // Drop the old foreign key and column
            $table->dropForeign(['spot_id']);
            $table->dropColumn('spot_id');

            // Add the new foreign key to parkings
            $table->foreignId('parking_id')->after('car_id')->constrained()->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign(['parking_id']);
            $table->dropColumn('parking_id');

            $table->foreignId('spot_id')->constrained('parking_spots')->onDelete('cascade');
        });
    }
}

