<?php
namespace App\GraphQL\Inputs;

use GraphQL\Type\Definition\Type;
use \Rebing\GraphQL\Support\InputType;


class UserInput extends InputType
{
    protected $attributes = [
        'name' => 'user_input',
        'description' => 'A user input',
    ];

    public function fields(): array
    {
        return [
            'name' => [
                'type' => Type::string(),
            ],
            'email' => [
                'type' => Type::string(),
            ],
            'address' => [
                'type' => Type::string(),
            ],
            'password' => [
                'type' => Type::string(),
            ],
            'password_confirm' => [
                'type' => Type::string(),
            ],
            'action_type' => [
                'type' => Type::string(),
            ],
        ];
    }
}
