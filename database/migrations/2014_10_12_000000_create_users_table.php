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
        Schema::create('tblUsers', function (Blueprint $table) {
            $table->id('fldUsersID');
            $table->string('fldUsersName')->nullable();
            $table->string('fldUsersEmail')->unique();
            $table->string('fldUsersPassword');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tblUsers');
    }
};
