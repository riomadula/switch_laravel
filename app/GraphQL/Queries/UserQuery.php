<?php
namespace App\GraphQL\Queries;

use Closure;
use App\Models\User;
use Rebing\GraphQL\Support\Facades\GraphQL;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;
use Illuminate\Support\Facades\Log;

class UserQuery extends Query
{
    protected $attributes = [
        'name' => 'UserQuery',
    ];

    public function type(): Type
    {
        //return Type::nonNull(Type::listOf(Type::nonNull(GraphQL::type('User'))));
        return Type::listOf(GraphQL::type('user_type'));

    }

    public function args(): array
    {
        return [
            'action_type' => [
                'type' => Type::string(),
            ],
        ];
    }

    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $user_model = new User();
        // if (isset($args['id'])) {
        //     return user::where('id' , $args['id'])->get();
        // }

        // if (isset($args['email'])) {
        //     return User::where('email', $args['email'])->get();
        // }

        // return User::all();
       // log::debug($args);
        if($args['action_type'] == "display_user") {
            //return User::where('fldUsersID', session()->get('user_id'))->first();
            $user[] = $user_model->displayUser();

            //log::debug(print_r($user, true));
        }

        return $user;
    }
}

?>
