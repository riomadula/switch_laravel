<?php
namespace App\GraphQL\Types;

use App\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class BlogCategoryType extends GraphQLType
{
    protected $attributes = [
        'name'          => 'blog_category_type',
        'description'   => 'A Blog Category Type',
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'alias' => 'fldBlogCategoryID',
            ],
            'title' => [
                'type' => Type::string(),
                'alias' => 'fldBlogCategoryTitle',
            ],
            'date_created' => [
                'type' => Type::string(),
                'alias' => 'fldBlogCategoryDateCreated',
            ],
            'date_modified' => [
                'type' => Type::string(),
                'alias' => 'fldBlogCategoryDateModified',
            ],
        ];
    }

}
