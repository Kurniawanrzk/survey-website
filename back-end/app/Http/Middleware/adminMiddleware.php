<?php

namespace App\Http\Middleware;

use Closure;

class adminMiddleware
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
        
        if(auth()->user()->role_id !== 4) {
            return response()->json([
                "message" => "Forbidden Access",
                "status" => false
            ], 400);
        }
        $response = $next($request);
        return $response;   
    }
}
