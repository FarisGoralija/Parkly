<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('favorite_parkings', function (Blueprint $table) {
        $table->unsignedBigInteger('user_id');
        $table->unsignedBigInteger('parking_id');
        $table->timestamps();

        $table->primary(['user_id', 'parking_id']);

        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('parking_id')->references('id')->on('parkings')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorite_parkings');
    }
};
