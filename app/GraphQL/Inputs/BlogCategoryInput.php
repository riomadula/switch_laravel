<?php
namespace App\GraphQL\Inputs;

use GraphQL\Type\Definition\Type;
use \Rebing\GraphQL\Support\InputType;


class BlogCategoryInput extends InputType
{
    protected $attributes = [
        'name' => 'blog_category_input',
        'description' => 'A blog category input',
    ];

    public function fields(): array
    {
        return [
            'title' => [
                'type' => Type::string(),
            ],
            'date_created' => [
                'type' => Type::string(),
            ],
            'date_modified' => [
                'type' => Type::string(),
            ],
            'action_type' => [
                'type' => Type::string(),
            ],
        ];
    }
}
