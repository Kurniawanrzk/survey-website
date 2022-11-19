<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Classes;
use App\Models\Surveys;
use App\Models\User;
use App\Models\ViewModel\ViewClass;
use App\Models\ViewModel\ViewSurveys;
use App\Models\ViewModel\ViewUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ClassesController extends Controller
{
    public function create_class(Request $req)
    {
        $validator = Validator::make($req->all(), [
            "class_name" => "required",
            "homeroom_teacher_id" => "required",
        ]);

        if($validator->fails()) {
            return response()->json([
                "message" => "Invalid Field",
                "status" => false
            ], 422);
        }

        $ClassModel = new Classes;
        $save = $ClassModel->create($req->all());
        return response($save, 200);
    }

    public function get_all_classes()
    {
        return response(ViewClass::all(), 200);
    }

     public function get_clasess_id($id)
    {
        if(!$class = Classes::find($id)) {
            return response()->json([
                "message" => "not found"
            ], 400);
        }
        return response($class, 200);
    }

    public function update_class(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            "class_name" => "required",
            "homeroom_teacher_id" => "required",
        ]);

        if($validator->fails()) {
            return response()->json([
                "message" => "Invalid Field",
                "status" => false
            ], 422);
        }

        $ClassModel = Classes::find($id);
        $save = $ClassModel->update($req->all());
        return response($ClassModel, 200);
    }

    public function delete_class($id)
    {
        Classes::destroy($id);
        return response("Sucess",200);
    }
}
