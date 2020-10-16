<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\User;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories= Category::all()->count();
        $users= Category::all()->count();
        for ($i=0; $i<50; $i++)
		{
			Book::create(
				[
				 'name'=>'Libro '.$i,
				 'author'=>'Autor '.$i,
				 'published'=> date('Y-m-d', strtotime( '-'.mt_rand(0,10950).' days')),
                 'user_id'=>rand(1, $users),
                 'available'=>rand(0,1), // true or false
				 'category_id'=> rand(1, $categories)
				]
			);
		}
    }
}
