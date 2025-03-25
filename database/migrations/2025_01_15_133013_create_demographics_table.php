<?php

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
        Schema::create('demographics', function (Blueprint $table) {
            $table->id();
            $table->string('region')->nullable();
            $table->string('province')->nullable();
            $table->string('district')->nullable();
            $table->string('city')->nullable();
            $table->string('barangay')->nullable();
            $table->string('evacuation_site')->nullable();
            $table->string('head_last_name')->nullable();
            $table->string('head_first_name')->nullable();
            $table->string('head_middle_name')->nullable();
            $table->string('age')->nullable();
            $table->string('extension_name')->nullable();
            $table->string('gender')->nullable();
            $table->date('birthday')->nullable();
            $table->string('birth_place')->nullable();
            $table->string('civil_status')->nullable();
            $table->string('mother_maiden_name')->nullable();
            $table->string('religion')->nullable();
            $table->string('occupation')->nullable();
            $table->decimal('income', 10, 2)->nullable();
            $table->string('id_card_presented')->nullable();
            $table->string('id_card_number')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('permanent_address')->nullable();
            $table->string('lng')->nullable();
            $table->string('lat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demographics');
    }
};
