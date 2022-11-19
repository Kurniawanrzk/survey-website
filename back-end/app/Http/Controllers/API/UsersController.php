<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Classes;
use App\Models\Surveys;
use App\Models\User;
use App\Models\ViewModel\ViewClass;
use App\Models\ViewModel\ViewSurveys;
use App\Models\ViewModel\ViewUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
     public function create_user(Request $req)
    {
        $validator = Validator::make($req->all(), [
            "username" => "required|min:5|max:40",
            "email" => "required|email|min:5|max:40",
            "password" => "required",
            "NIP" => "required_if:role_id,==,1,2,3",
            "role_id" => "required"
        ]);

        if($validator->fails()) {
            return response()->json([
                "message" => "Invalid Field",
                "status" => false
            ], 422);
        }
        $UserModel = new User;
        $req->merge([
            "password" => Hash::make($req->password)
        ]);
        $save = $UserModel->create($req->all());
        return response($save, 200);
    }

    public function get_all_users()
    {
        return ViewUsers::all();
    }

    public function get_users_id($id)
    {
        if(!$user = User::find($id)) {
            return response()->json([
                "message" => "not found"
            ], 400);
        }
        return response($user, 200);
    }

    public function update_user(Request $req,$id)
    {
        $validator = Validator::make($req->all(), [
            "username" => "required|min:5|max:40",
            "email" => "required|email|min:5|max:40",
            "NIP" => "required_if:role_id,==,1,2,3",
            "role_id" => "required"
        ]);

        if($validator->fails()) {
            return response()->json([
                "message" => "Invalid Field",
                "status" => false
            ], 422);
        }
        $UserModel = User::find($id);       
        $save = $UserModel->update($req->all());
        return response(User::find($id), 200);
    }

    public function delete_user($id)
    {
        User::destroy($id);
        return response("Sucess",200);
    }
}
