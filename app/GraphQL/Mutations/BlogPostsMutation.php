<?php

namespace App\GraphQL\Mutations;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Illuminate\Support\Facades\Log;
use App\Models\BlogPosts;

class BlogPostsMutation extends Mutation
{
    protected $attributes = [
        'name' => 'BlogPostsMutation',
        'description' => 'A Blog Posts Mutation'
    ];

    public function args(): array
    {
        return [
            'blog_posts' => ['type' => GraphQL::type('blog_posts_input')],
            'file' => ['type' => GraphQL::type('Upload')],
        ];

    }

     public function type(): Type
    {
        // return Type::nonNull(GraphQL::type('User'));
        return GraphQL::type('response_type');
    }

    protected function rules(array $args = []): array
    {
        log::debug($args);

        $blog_posts = $args['blog_posts'];
        $rules = [];

        if ($blog_posts['action_type'] == "create_new_blog_post") {
            // Fields validations
            $rules['blog_posts.title'] = ['required', 'string', 'max:255'];
            $rules['blog_posts.category_id'] = ['required', 'integer'];
            $rules['blog_posts.content'] = ['required', 'string'];
            $rules['blog_posts.author'] = ['required', 'string', 'max:255'];
            $rules['file'] = ['required', 'image', 'max:5000'];
        }

        return $rules;
    }

    public function validationErrorMessages(array $args = []): array
    {
        return [
            'blog_posts.title.required' => 'Please enter Blog Post Title',
            'blog_posts.category_id.required' => 'Please select Blog Post Category',
            'blog_posts.content.required' => 'Please write Blog Post Content',
            'blog_posts.title.unique' => 'Blog Post Title already exists',
            'file.image' => 'Please upload an image',
            'file.max' => 'File size must be less than 5MB',
            'file.required' => 'Please upload an image',
        ];
    }



    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $blog_posts_model = new BlogPosts();
        $blog_posts = $args['blog_posts'];
        $response_obj = new \stdClass();

        if ($blog_posts['action_type'] == "create_new_blog_post") {
            $response_obj = $blog_posts_model->createNewBlogPost($blog_posts, $args['file']);
        }

        if ($blog_posts['action_type'] == 'update_blog_post') {
            //return BlogPosts::updateBlogPost($input['id'], $input);
            $response_obj = $blog_posts_model->updateBlogPost($blog_posts, $args['file']);
        }

        if ($blog_posts['action_type'] == 'delete_blog_post') {
            $response_obj = $blog_posts_model->deleteBlogPost($blog_posts);
        }

        if ($blog_posts['action_type'] == 'get_single_blog_post') {
            $response_obj = $blog_posts_model->getBlogPostDetails($blog_posts['id']);
            $response_obj->blog_posts = $response_obj; // blog single
        }

        return $response_obj;
    }
}
