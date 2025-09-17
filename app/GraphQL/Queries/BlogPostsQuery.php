<?php
namespace App\GraphQL\Queries;

use Closure;
use App\Models\BlogPosts;
use Rebing\GraphQL\Support\Facades\GraphQL;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;
use Illuminate\Support\Facades\Log;

class BlogPostsQuery extends Query {

    protected $attributes = [
        'name' => 'BlogPostsQuery',
        'description' => 'Query to fetch blog posts list or single blog post',
    ];

    public function type(): Type
    {

        return Type::listOf(GraphQL::type('blog_posts_type'));
        // return GraphQL::type('blog_posts_type');

    }
    public function args(): array
    {
        return [
            'action_type' => [
                'type' => Type::string(),
            ],
            'id' => [
                'type' => Type::string(),
            ],
        ];
    }

    public function resolve($root, array $args, $context, ResolveInfo $info, Closure $getSelectFields)
    {
        $blog_posts_model = new BlogPosts();

        // Fetch all blog posts
        if ($args['action_type'] === 'list_all_blog_posts') {
            //$blog_posts = $blog_posts_model->getAllBlogPosts();
            $blog_posts = $blog_posts_model->getAllBlogPostsByDate();

        }

        // Fetch single post by ID
        if ($args['action_type'] === 'get_single_blog_post') {
            $blog_posts[] = $blog_posts_model->getBlogPostDetails($args['id']);
        }

        return $blog_posts;
    }

}
?>
