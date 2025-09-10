<?php

declare(strict_types=1);

namespace App\GraphQL\Inputs;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\InputType;

class BlogPostsInput extends InputType
{
    protected $attributes = [
        'name' => 'blog_posts_input',
        'description' => 'An blog posts input',
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::int(),
            ],
            'postTitle' => [
                'type' => Type::string(),
            ],
            'postCategoryId' => [
                'type' => Type::int(),
            ],
            'postContent' => [
                'type' => Type::string(),
            ],
            'postAuthor' => [
                'type' => Type::string(),
            ],
            'action_type' => [
                'type' => Type::string(),
            ],
        ];
    }
}
