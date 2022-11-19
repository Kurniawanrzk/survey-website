<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    protected $table = "tb_classes";
    protected $primaryKey = "id";
    protected $fillable = [
        "class_name","homeroom_teacher_id"
    ];
}
