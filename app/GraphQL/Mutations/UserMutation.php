<?php
namespace App\GraphQL\Mutations;

use Closure;
use App\Models\User;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;


use function Psy\debug;

class UserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'UserMutation'
    ];

    public function type(): Type
    {
        // return Type::nonNull(GraphQL::type('User'));
        return GraphQL::type('response_type');
    }

    protected function rules(array $args = []): array
    {
        //log::debug($args);

        $user = $args['user'];
        $rules = [];

        if ($user['action_type'] == "register" || $user['action_type'] == "add_new_user") {

            // Fields validations
            $rules['user.name'] = ['required', 'string', 'max:255'];
            $rules['user.email'] = ['required', 'string', 'email', 'max:255', 'unique:tblUsers,fldUsersEmail'];
            $rules['user.address'] = ['required', 'string', 'max:255'];
            $rules['user.password'] = ['required', 'string', 'min:8', 'max:16'];
            $rules['user.password_confirm'] = ['required', 'same:user.password'];

        } else if ($user['action_type'] == "update_user_account") {
            // Fields validations
            $rules['user.name'] = ['required', 'string', 'max:255'];
            $rules['user.email'] = ['required', 'string', 'email', 'max:255', 'unique:tblUsers,fldUsersEmail,'.$user['id'].',fldUsersID'];
            //$rules['provider.email'] = ['required', 'email', 'unique:tblProvider,fldProviderEmail,' . $id . ',fldProviderID'];
            //$rules['user.email'] = ['required','string','email','max:255',Rule::unique('tblUsers', 'fldUsersEmail')->ignore($user['id'], 'fldUsersID'),];

            $rules['user.address'] = ['required', 'string', 'max:255'];

        } else if ($user['action_type'] == "login") {

            $rules['user.email'] = ['required', 'email'];
            $rules['user.password'] = ['required'];

        }


        return $rules;
    }


    public function validationErrorMessages(array $args = []): array
    {
        return [
            'user.name.required' => 'Please enter your Name',
            'user.email.required' => 'Please enter your Email',
            'user.email.unique' => 'Email already exists',
            'user.address.required' => 'Please enter your Address',
            'user.password.required' => 'Please enter your Password',
            'user.password_confirm.required' => 'Please confirm your Password',
            'user.password.min' => 'Password must be at least 8 characters',
            'user.password.max' => 'Password must be at most 16 characters',
            'user.password_confirm.same' => 'Passwords must match',
        ];
    }

    public function args(): array
    {

        return [
            'user' => ['type' => GraphQL::type('user_input')],
        ];
    }

    // Model
    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $user_model = new User();
        $user = $args['user'];
        $response_obj = new \stdClass();
        log::debug($user);

        if ($user['action_type'] == "register") {
            $response_obj = $user_model->registerAccount($user);
        }

        if ($user['action_type'] == "add_new_user") {
            $response_obj = $user_model->addNewUserAccount($user);
        }

        if ($user['action_type'] == "update_user_account") {
            $response_obj = $user_model->updateUserAccount($user);
        }

        if ($user['action_type'] == 'delete_user_account') {
            $response_obj = $user_model->deleteUserAccount($user['id']);
        }

        if ($user['action_type'] == "login") {
            $response_obj = $user_model->loginAccount($user);
        }

        if ($user['action_type'] == "display_user") {
            $response_obj = $user_model->displayUser();
        }

        return $response_obj;

    }
}
