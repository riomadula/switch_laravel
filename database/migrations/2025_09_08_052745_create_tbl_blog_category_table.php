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
        Schema::create('tblBlogCategory', function (Blueprint $table) {
            $table->bigIncrements('fldBlogCategoryID'); // Primary Key
            $table->string('fldBlogCategoryTitle', 255);
            $table->dateTime('fldBlogCategoryDateCreated')->useCurrent();
            $table->dateTime('fldBlogCategoryModified')->nullable()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tblBlogCategory');
    }
};
