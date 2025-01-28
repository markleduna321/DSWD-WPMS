<?php

use App\Http\Controllers\ContentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DemographicController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'getUsers']);
Route::resource('usermanagement', UserController::class);
Route::resource('demographics', DemographicController::class);
Route::resource('contents', ContentController::class);
Route::get('/get_latest_content', [ContentController::class, 'get_latest_content']);
Route::get('/beneficiaries', [DashboardController::class, 'beneficiaries']);
