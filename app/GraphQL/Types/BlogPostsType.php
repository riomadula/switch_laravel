<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

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
                'type' => Type::nonNull(Type::int()),
                'alias' => 'fldBlogPostID',
            ],
            'title' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostTitle',
            ],
            'caterory_id' => [
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
            'date_created' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostDateCreated',
            ],
            'date_modified' => [
                'type' => Type::string(),
                'alias' => 'fldBlogPostDateModified',
            ],
        ];
    }
}
