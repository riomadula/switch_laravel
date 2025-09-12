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
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use stdClass;

class BlogPosts extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'tblBlogPost';
    protected $primaryKey = 'fldBlogPostID';
    public $timestamps = false;  // Disable default timestamps since using custom

    // Relationship with Blog Category
    public function blog_category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'fldBlogPostCategoryID', 'fldBlogCategoryID');
    }

    // Create New Blog Post
    public static function createNewBlogPost($data) {

        try {
            // $post = new BlogPosts();
            $blog_posts = new self;
            $response_obj = new \stdClass();

            $blog_posts->fldBlogPostTitle = $data['title'];
            $blog_posts->fldBlogPostCategoryID = $data['category_id'];
            $blog_posts->fldBlogPostContent = $data['content'];
            $blog_posts->fldBlogPostAuthor = $data['author'];
            $blog_posts->fldBlogPostDateCreated = date('Y-m-d H:i:s');
            $blog_posts->fldBlogPostDateModified = date('Y-m-d H:i:s');

            $blog_posts->save();

            $response_obj->error = false;
            $response_obj->message = "New Blog Post created successfully";

        } catch (\Exception $e) {
            // Optional: Log the error
            // \Illuminate\Support\Facades\Log::error('BlogPosts creation failed: ' . $e->getMessage());

            $response_obj->error = true;
            $response_obj->message = $e->getMessage();
        }

        return $response_obj;
    }

    // Add for listing all posts
    public static function getAllBlogPostsByDate()
    {
        return self::orderBy('fldBlogPostDateCreated', 'desc')->get();
    }

    // Add for listing all posts
    public static function getAllBlogPostsByTitle()
    {
        return self::orderBy('fldBlogPostTitle', 'asc')->get();
    }

    // Add for listing all posts
    public static function getAllBlogPosts()
    {
        return self::with('blog_category')->get();
        //return self::get();
    }

    // Update a blog post
    public static function updateBlogPost($data)
    {
        $response_obj  = new \stdClass();

        $blog_posts = self::find($data['id']);

        $blog_posts->fldBlogPostTitle = $data['title'];
        $blog_posts->fldBlogPostCategoryID = $data['category_id'];
        $blog_posts->fldBlogPostContent = $data['content'];
        $blog_posts->fldBlogPostAuthor = $data['author'];
        $blog_posts->fldBlogPostDateModified = date('Y-m-d H:i:s');
        $blog_posts->save();

        $response_obj->error = false;
        $response_obj->message = "Blog Post updated successfully";

        return $response_obj;
    }

    // Delete a blog post
    public static function deleteBlogPost($data)
    {
        // try {
            $response_obj = new \stdClass();

            $blog_posts = self::find($data['id']);
            if (!$blog_posts) {
                $response_obj->error = true;
                $response_obj->message = "Post not found";
            } else {
                $blog_posts->delete();

                $response_obj->error = false;
                $response_obj->message = "Post deleted successfully";
            }
        // } catch (\Exception $e) {
        //     $response_obj->error = true;
        //     $response_obj->message = $e->getMessage();
        // }
        return $response_obj;
    }

    // Get a single blog post by ID
    public static function getBlogPostDetails($id)
    {
        return self::with('blog_category')->find($id);
        // return self::where('fldBlogPostID', $id)->first();
    }


}
?>
