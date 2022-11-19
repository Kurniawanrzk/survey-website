<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ViewModel\ViewUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $req)
    {
     $validator = Validator::make($req->all(), [
        "email" => "required | email | min:5 | max:50",
        "password" => "required"
     ]);

     if($validator->fails())
     {
        return response()->json([
            "message" => "invalid field",
            "status" => false
        ], 422);
     }

     if(!$token =
      auth()->setTTL(1440)->attempt(
        ["email" => $req->email, 
        "password" => $req->password]
        )) {
            return response()->json([
                "message" => "password or email invalid",
                "status" => false
            ], 400);
     }

     return response()->json([
        "access_token" => $token,
        "token_type" => "Bearer",
        "expires_at" => 1440
     ], 200);
    }

    public function me()
    {
        return ViewUsers::find(auth()->user()->id);
    }

    public function logout()
    {
        auth()
        ->logout();
        return response("sucess", 200);
    }
}
