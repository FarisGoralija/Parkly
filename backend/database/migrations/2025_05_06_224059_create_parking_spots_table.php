<?php

use App\Models\Parking;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
            Schema::create('parking_spots', function (Blueprint $table) {
                $table->id();
                $table->foreignIdFor(Parking::class)->constrained()->onDelete('cascade');
                $table->integer('spot_number');
                $table->boolean('is_available')->default(true);
                $table->timestamps();
            });
            
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parking_spots');
    }
};
