<?php
namespace App\GraphQL\Mutations;

use Closure;
use App\Models\BlogCategory;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Illuminate\Support\Facades\Log;

use function Psy\debug;

class BlogCategoryMutation extends Mutation
{
    protected $attributes = [
        'name' => 'BlogCategoryMutation'
    ];

    public function type(): Type
    {
        // return Type::nonNull(GraphQL::type('User'));
        return GraphQL::type('response_type');
    }

    protected function rules(array $args = []): array
    {
        //log::debug($args);

        $blog_category = $args['blog_category'];
        $rules = [];

        if ($blog_category['action_type'] == "create_new_blog_category") {
            // Fields validations
            $rules['blog_category.title'] = ['required', 'string', 'max:255'];

        }


        return $rules;
    }
    public function validationErrorMessages(array $args = []): array
    {
        return [
            'blog_category.title.required' => 'Please enter Blog Category Title',
            'blog_category.title.unique' => 'Blog Category Title already exists',
        ];
    }

    public function args(): array
    {
        return [
            'blog_category' => ['type' => GraphQL::type('blog_category_input')],
        ];
    }

    // Model
    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $blog_category_model = new BlogCategory();
        $blog_category = $args['blog_category'];
        $response_obj = new \stdClass();

        log::debug($blog_category);

        if ($blog_category['action_type'] == "create_new_blog_category") {

            $response_obj = $blog_category_model->createNewBlogCategory($blog_category);

        }

        if ($blog_category['action_type'] == 'update_blog_category') {

            //return BlogCategory::updateBlogCategory($input['id'], $input);
            $response_obj = $blog_category_model->updateBlogCategory($blog_category);
        }

        if ($blog_category['action_type'] == 'delete_blog_category') {

            $response_obj = $blog_category_model->deleteBlogCategory($blog_category);

        }

        return $response_obj;

    }
}
?>
