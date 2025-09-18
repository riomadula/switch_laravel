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
                'type' => Type::string(),
            ],
            'title' => [
                'type' => Type::string(),
            ],
            'category_id' => [
                'type' => Type::string(),
            ],
            'content' => [
                'type' => Type::string(),
            ],
            'author' => [
                'type' => Type::string(),
            ],
            'photo' => [
                'type' => Type::string(),
            ],
            'action_type' => [
                'type' => Type::string(),
            ],
        ];
    }
}
