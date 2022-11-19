<?php

/** @var \Laravel\Lumen\Routing\Router $router */


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(["prefix" => "api"], function () use($router) {

    $router->group(["prefix" => "auth"], function () use($router) {
        $router->post("login", "API\AuthController@login");
        $router->group(["middleware" => "auth"], function () use($router) {
            $router->get("me", "API\AuthController@me");
            $router->get("logout", "API\AuthController@logout");

        });

    });

    $router->group(["prefix" => "users"], function () use($router) {
        $router->group(["middleware" => "auth"], function () use($router) {
            $router->group(["middleware" => "admin"], function () use($router) {
                $router->post("", "API\UsersController@create_user");
                $router->get("", "API\UsersController@get_all_users");
                $router->get("/{id}", "API\UsersController@get_users_id");
                $router->put("/{id}", "API\UsersController@update_user");
                $router->delete("/{id}", "API\UsersController@delete_user");
            });
        });
    });

    $router->group(["prefix" => "classes"], function () use($router) {
        $router->group(["middleware" => "auth"], function () use($router) {
            $router->get("", "API\ClassesController@get_all_classes");
            $router->group(["middleware" => "admin"], function () use($router) {
                $router->post("", "API\ClassesController@create_class");                
                $router->put("{id}", "API\ClassesController@update_class");
                $router->delete("{id}", "API\ClassesController@delete_class");
                 $router->get("{id}", "API\ClassesController@get_clasess_id");
            });
        });
    });

    $router->group(["prefix" => "surveys"], function () use($router) {
        $router->group(["middleware" => "auth"], function () use($router) {
                $router->get("", "API\SurveysController@get_all_surveys");
             $router->group(["middleware" => "surveys"], function () use($router) {
                 $router->post("", "API\SurveysController@create_surveys");
                 $router->put("{id}", "API\SurveysController@update_surveys");
                  $router->delete("{id}", "API\SurveysController@delete_surveys");
                  $router->get("{id}", "API\SurveysController@get_survey_id");
            });
        });
    });
}); 