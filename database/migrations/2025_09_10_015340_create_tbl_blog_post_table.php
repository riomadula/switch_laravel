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
        Schema::create('tblBlogPost', function (Blueprint $table) {
            $table->bigIncrements('fldBlogPostID'); // Primary Key
            $table->string('fldBlogPostTitle', 255);
            $table->string('fldBlogPostContent', 255);
            $table->string('fldBlogPostCategoryID', 255);
            $table->string('fldBlogPostAuthor', 255);
            $table->string('fldBlogPostImage', 255);
            $table->dateTime('fldBlogPostDateCreated')->useCurrent();
            $table->dateTime('fldBlogPostModified')->nullable()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tblBlogPost');
    }
};
