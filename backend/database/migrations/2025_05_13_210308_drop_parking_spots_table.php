<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class DropParkingSpotsTable extends Migration
{
    public function up()
    {
        Schema::dropIfExists('parking_spots');
    }

    public function down()
    {
        // Optional: You can recreate the table here if needed
        Schema::create('parking_spots', function ($table) {
            $table->id();
            $table->foreignId('parking_id')->constrained()->onDelete('cascade');
            $table->string('spot_number')->nullable();
            $table->timestamps();
        });
    }
}

