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
        Schema::create('family_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('demographics_id')->constrained()->onDelete('cascade'); // Foreign key to DemographicData model
            $table->string('full_name');
            $table->string('relation');
            $table->date('birth_date');
            $table->integer('age');
            $table->string('gender');
            $table->string('highest_education');
            $table->string('occupation');
            $table->string('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_members');
    }
};
