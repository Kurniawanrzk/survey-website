<?php

namespace App\Http\Middleware;

use Closure;

class SurveysMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Pre-Middleware Action

        $response = $next($request);
        if(auth()->user()->role_id !== 2) 
        {
            return response()->json([
                "message" => "forbidden access",
                "status" => false
            ], 400);
        }

        // Post-Middleware Action
        // Middleware berfungsi agar hanya role tertentu yang bisa mengupdate, delete dan create surveys data
        return $response;
    }
}
