<?php

declare(strict_types=1);

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

     public function type(): Type
    {
        // return Type::nonNull(GraphQL::type('User'));
        return GraphQL::type('response_type');
    }

    protected function rules(array $args = []): array
    {
        //log::debug($args);

        $blog_posts = $args['blog_posts'];
        $rules = [];

        if ($blog_posts['action_type'] == "create_new_blog_post") {
            // Fields validations
            $rules['blog_posts.postTitle'] = ['required', 'string', 'max:255'];
            $rules['blog_posts.postCategoryId'] = ['required', 'integer'];
            $rules['blog_posts.postContent'] = ['required', 'string', 'max:255'];
            $rules['blog_posts.postAuthor'] = ['required', 'string', 'max:255'];
        }

        return $rules;
    }

    public function validationErrorMessages(array $args = []): array
    {
        return [
            'blog_posts.postTitle.required' => 'Please enter Blog Post Title',
            'blog_posts.postTitle.unique' => 'Blog Post Title already exists',
        ];
    }

    public function args(): array
    {
        return [
            'blog_posts' => ['type' => GraphQL::type('blog_posts_input')],
        ];
    }

    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $blog_posts_model = new BlogPosts();
        $blog_posts = $args['blog_posts'];
        $response_obj = new \stdClass();

        if ($blog_posts['action_type'] == "create_new_blog_post") {

            $response_obj = $blog_posts_model->createNewBlogPost($blog_posts);

        }

        if ($blog_posts['action_type'] == 'update_blog_post') {

            //return BlogPosts::updateBlogPost($input['id'], $input);
            $response_obj = $blog_posts_model->updateBlogPost($blog_posts);
        }

        if ($blog_posts['action_type'] == 'delete_blog_post') {

            $response_obj = $blog_posts_model->deleteBlogPost($blog_posts);

        }

        return $response_obj;
    }
}
