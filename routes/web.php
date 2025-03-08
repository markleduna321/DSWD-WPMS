<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Models\Demographic;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route for rendering the Inertia page
Route::get('/beneficiaries/barangay/{barangay}', function ($barangay) {
    return Inertia::render('landing/beneficiaries-by-barangay', ['barangay' => $barangay]);
});

// API Route to fetch beneficiaries by barangay
Route::get('/api/beneficiaries/barangay/{barangay}', [DashboardController::class, 'getByBarangay']);

Route::middleware('redirectBasedOnRole')->get('/', function () {
    return Inertia::render('landing/page');
})->name('landing');

Route::middleware('redirectBasedOnRole')->get('/about-us', function () {
    return Inertia::render('about_us/page');
})->name('about_us');

Route::middleware('redirectBasedOnRole')->get('/contact-us', function () {
    return Inertia::render('contact/page');
})->name('contact');

Route::middleware('redirectBasedOnRole')->get('/news', function () {
    return Inertia::render('news/page');
})->name('news');

Route::middleware('redirectBasedOnRole')->get('/log-in', function () {
    return Inertia::render('login/page');
})->name('log-in');

Route::middleware('auth:sanctum', 'role:1')->prefix('admin')->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard/page');
    });

    Route::prefix('user_management')->group(function () {
        Route::get('/', function () {
        return Inertia::render('admin/user_management/page');
        });

        /* Route::get('/{id}', function ($id) {
            $user = Profiling::find($id);
    
            if (!$user) {
                return redirect()->route('user.index')->withErrors('Product not found');
            }
    
            return Inertia::render('admin/user_management/id/page', [
                'user' => $user
            ]);
        }); */
    });

    Route::prefix('products')->group(function () {
        Route::get('/', function () {
        return Inertia::render('admin/products/page');
        });

        
    });

    
    Route::get('reports', function () {
        return Inertia::render('admin/reports/page');
    });

    Route::get('contents', function () {
        return Inertia::render('admin/contents/page');
    });

    Route::prefix('demographic_data')->group(function () {
        Route::get('/', function () {
            return Inertia::render('admin/demographic_data/page');
        });
        
        Route::get('/{id}', function ($id) {
            $purchaseOrder = Demographic::find($id);
    
            if (!$purchaseOrder) {
                return redirect()->route('demographic_data.index')->withErrors('Account not found');
            }
    
            return Inertia::render('admin/demographic_data/id/page', [
                'purchaseOrder' => $purchaseOrder
            ]);
        });
    });

});

Route::middleware('auth:sanctum', 'role:2')->get('/user/dashboard', function () {
    return Inertia::render('user/dashboard/page');
});


/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

/* Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
}); */

require __DIR__.'/auth.php';
