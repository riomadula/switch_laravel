<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use stdClass;

class BlogCategory extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'tblBlogCategory';
    protected $primaryKey = 'fldBlogCategoryID';
    public $timestamps = false;  // Disable default timestamps since using custom fields


    // Create New Blog Category
    public static function createNewBlogCategory($data) {

        try {
            $category = new self;
            // $category = new BlogCategory();
            $response_obj = new \stdClass();

            $category->fldBlogCategoryTitle = $data['title'];
            $category->fldBlogCategoryDateCreated = $data['date_created'];
            $category->fldBlogCategoryDateModified = $data['date_modified'];

            $category->save();

            $response_obj->error = false;
            $response_obj->message = "New Blog Category created successfully";

        } catch (\Exception $e) {
            // Optional: Log the error
            // \Illuminate\Support\Facades\Log::error('BlogCategory creation failed: ' . $e->getMessage());

            $response_obj->error = true;
            $response_obj->message = $e->getMessage();
        }

        return $response_obj;
    }

    // Add for listing all categories
    public static function getAllBlogCategoriesByDate()
    {
        return self::orderBy('fldBlogCategoryDateCreated', 'desc')->get();
    }

    // Add for listing all categories
    public static function getAllBlogCategoriesByTitle()
    {
        return self::orderBy('fldBlogCategoryTitle', 'asc')->get();
    }

    // Add for listing all categories
    public static function getAllBlogCategories()
    {
        return self::get();
    }

    // Update a blog category
    public static function updateBlogCategory($data)
    {
        $response_obj  = new \stdClass();

        $blog_category = self::find($data['id']);
        $blog_category->fldBlogCategoryTitle = $data['title'];
        $blog_category->fldBlogCategoryDateModified = date('Y-m-d H:i:s');
        $blog_category->save();

        $response_obj->error = false;
        $response_obj->message = "Category updated successfully";

        return $response_obj;
    }

    // Delete a blog category
    public static function deleteBlogCategory($data)
    {
        $response_obj = new \stdClass();

        $category = self::find($data['id']);
        $category->delete();

        $response_obj->error = false;
        $response_obj->message = "Category deleted successfully";

        return $response_obj;
    }

    // Relationship with Blog Posts
    // public function blogPosts()
    // {
    //     return $this->belongsTo(BlogPosts::class);
    // }

}
?>
