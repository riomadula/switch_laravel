<?php
namespace App\GraphQL\Types;

use App\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class UserType extends GraphQLType
{
    protected $attributes = [
        'name'          => 'user_type',
        'description'   => 'A User Type',
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::string(),
                'alias' => 'fldUsersID',
            ],
            'name' => [
                'type' => Type::string(),
                'alias' => 'fldUsersName',
            ],
            'email' => [
                'type' => Type::string(),
                'alias' => 'fldUsersEmail',
            ],
            'address' => [
                'type' => Type::string(),
                'alias' => 'fldUsersAddress',
            ],
            'date_created' => [
                'type' => Type::string(),
                'alias' => 'created_at',
            ],
        ];
    }

}
