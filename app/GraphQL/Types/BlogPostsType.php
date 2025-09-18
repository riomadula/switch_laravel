<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL;


class BlogPostsType extends GraphQLType
{
    protected $attributes = [
        'name' => 'blog_posts_type',
        'description' => 'A Blog Posts Type',
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostID',
            ],
            'title' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostTitle',
            ],
            'category_id' => [
                'type' => Type::int(),
                'alias' => 'fldBlogPostCategoryID',
            ],
            'content' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostContent',
            ],
            'author' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostAuthor',
            ],
            'photo' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostImage',
            ],
            'date_created' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostDateCreated',
            ],
            'date_modified' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostDateModified',
            ],
            'blog_post_image' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostImage',
            ],
            'blog_category' => [
                'type' => GraphQL::type('blog_category_type')
            ],
            'blog_post' => [
                'type' => Type::string(),
            ],
        ];
    }
}
