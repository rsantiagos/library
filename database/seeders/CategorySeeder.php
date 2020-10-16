<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i<5; $i++)
		{
			Category::create(
				[
                    'name'=>'categoria '. $i,
                    'description'=>'descripcion categoria '. $i
				]
			);
		}
    }
}
