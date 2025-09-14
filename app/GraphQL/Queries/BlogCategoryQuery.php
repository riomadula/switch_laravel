<?php
namespace App\GraphQL\Queries;

use Closure;
use App\Models\BlogCategory;
use Rebing\GraphQL\Support\Facades\GraphQL;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;
use Illuminate\Support\Facades\Log;

class BlogCategoryQuery extends Query
{
    protected $attributes = [
        'name' => 'BlogCategoryQuery',
    ];

    public function type(): Type
    {

        return Type::listOf(GraphQL::type('blog_category_type'));

    }

    public function args(): array
    {
        return [
            'action_type' => [
                'type' => Type::string(),
            ],
        ];
    }

   public function resolve($root, array $args, $context, ResolveInfo $info, Closure $getSelectFields)
    {
        $blog_category_model = new BlogCategory();

        if ($args['action_type'] === 'list_all_blog_categories') {

            $blog_category = $blog_category_model->getAllBlogCategories();

            return $blog_category;
        }

        if ($args['action_type'] === 'list_all_blog_categories') {

            $blogs_category = $blog_category_model->getAllBlogCategories();

            return $blogs_category;
        }

    }
}

?>
