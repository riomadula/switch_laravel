<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

//use Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'tblUsers';
    protected $primaryKey = 'fldUsersID';
    //public $timestamps = false;

    protected $hidden = [
        'fldUsersPassword'
    ];

    public function findForPassport($email) {
        return $this->where('fldUsersEmail', $email)->first();
    }

    public function validateForPassportPasswordGrant($password) {
        return Hash::check($password, $this->fldUsersPassword);
    }

    // Register Account
    public function registerAccount($data) {

        try {

            $user = new self;
            $response_obj = new \stdClass();

            $user->fldUsersName = $data['name'];
            $user->fldUsersEmail = $data['email'];
            $user->fldUsersAddress = $data['address'];
            $user->fldUsersPassword = Hash::make($data['password']);

            $user->save();
            $response_obj->error = false;
            $response_obj->message = "Account created successfully";

        } catch (\Exception $e) {
            $response_obj->error = true;
            $response_obj->message = $e->getMessage();
        }

        return $response_obj;
    }

    // Login Account
    public function loginAccount($data) {

        try {

            $response_obj = new \stdClass();
            $user = self::where('fldUsersEmail', $data['email'])->first();

            if(!$user) {
                $response_obj->error = true;
                $response_obj->message = "User not found";

            } else {
                if(Hash::check($data['password'], $user->fldUsersPassword)) {
                    // Success Login
                    $oauth_helper = new OAuthHelper();  //Model

                    $response = $oauth_helper->GenerateUserToken($data['email'], $data['password']);
                    $response = json_decode($response);
                    // log::debug(print_r($user, true));
                    // log::debug(print_r($response, true));
                    // log::debug(($response->access_token));

                    $response_obj->access_token = $response->access_token;
                    $response_obj->refresh_token = $response->refresh_token;
                    $response_obj->error = false;
                    $response_obj->message = "Login successful";

                } else {
                    $response_obj->error = true;
                    $response_obj->message = "Invalid password";
                }
            }

        } catch (\Exception $e) {
            $response_obj->error = true;
            $response_obj->message = $e->getMessage();
        }

        return $response_obj;
    }


    public function displayUser() {

        return Auth::user();
    }


}
