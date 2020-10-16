<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $table='books';

	protected $fillable = array('name','author', 'category_id', 'user_id', 'published','available');

    protected $hidden = ['created_at','updated_at'];

    public function user()
	{
		return $this->belongsTo('App\User');
    }

    public function category()
	{
		return $this->belongsTo('App\Category');
	}
}
