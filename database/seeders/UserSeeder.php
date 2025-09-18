<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            User::create([
                'fldUsersName' => $faker->name,
                'fldUsersEmail' => $faker->unique()->safeEmail,
                'fldUsersAddress' => $faker->address,
                'fldUsersPassword' => Hash::make('password123'), // Default password for testing
                'remember_token' => $faker->optional()->uuid,
                'created_at' => $faker->dateTimeThisYear,
                'updated_at' => $faker->dateTimeThisYear,
            ]);
        }
    }
}
