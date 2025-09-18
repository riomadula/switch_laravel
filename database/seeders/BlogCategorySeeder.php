<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogCategory;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'fldBlogCategoryTitle' => 'Artificial Intelligence',
                'fldBlogCategoryDateCreated' => '2025-01-18 22:01:24',
                'fldBlogCategoryModified' => '2025-01-01 05:37:03',
            ],
            [
                'fldBlogCategoryTitle' => 'Web Development',
                'fldBlogCategoryDateCreated' => '2025-07-04 03:11:46',
                'fldBlogCategoryModified' => '2025-03-15 18:04:18',
            ],
            [
                'fldBlogCategoryTitle' => 'Cybersecurity',
                'fldBlogCategoryDateCreated' => '2025-02-06 22:15:03',
                'fldBlogCategoryModified' => '2025-03-01 01:59:48',
            ],
            [
                'fldBlogCategoryTitle' => 'Cloud Computing',
                'fldBlogCategoryDateCreated' => '2025-03-27 08:52:10',
                'fldBlogCategoryModified' => '2025-08-01 06:39:42',
            ],
            [
                'fldBlogCategoryTitle' => 'Machine Learning',
                'fldBlogCategoryDateCreated' => '2025-08-03 02:15:56',
                'fldBlogCategoryModified' => '2025-03-16 01:11:07',
            ],
            [
                'fldBlogCategoryTitle' => 'Blockchain Technology',
                'fldBlogCategoryDateCreated' => '2025-08-16 20:49:00',
                'fldBlogCategoryModified' => '2025-01-17 19:19:53',
            ],
            [
                'fldBlogCategoryTitle' => 'Mobile Development',
                'fldBlogCategoryDateCreated' => '2025-04-22 04:59:58',
                'fldBlogCategoryModified' => '2025-06-26 17:00:03',
            ],
            [
                'fldBlogCategoryTitle' => 'Data Science',
                'fldBlogCategoryDateCreated' => '2025-03-16 22:52:44',
                'fldBlogCategoryModified' => '2025-01-24 06:55:52',
            ],
            [
                'fldBlogCategoryTitle' => 'Internet of Things',
                'fldBlogCategoryDateCreated' => '2025-01-06 05:35:41',
                'fldBlogCategoryModified' => '2025-01-23 10:43:04',
            ],
            [
                'fldBlogCategoryTitle' => 'Software Engineering',
                'fldBlogCategoryDateCreated' => '2025-01-06 05:35:41',
                'fldBlogCategoryModified' => '2025-01-23 10:43:04',
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::create($category);
        }
    }
}
