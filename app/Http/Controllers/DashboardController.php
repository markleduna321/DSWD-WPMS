<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use App\Http\Requests\StoreDashboardRequest;
use App\Http\Requests\UpdateDashboardRequest;
use App\Models\Content;
use App\Models\Demographic;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    public function beneficiaries()
    {
        $beneficiaries = Demographic::all();
        $totalCount = Demographic::count();

        return response()->json([
            'response' => $beneficiaries,
            'total_count' => $totalCount
        ], 200);
    }

    public function countbrgy()
    {

        $demographics = Demographic::all();

        return response()->json([
            'response' => $demographics,
        ]);
    }

    public function dashboardContents()
    {
        $contents = Content::all();

        return response()->json([
            'response' => $contents,

        ], 200);
    }

    public function getByBarangay($barangay)
    {
        // Fetch beneficiaries from database where barangay matches
        $beneficiaries = Demographic::where('barangay', $barangay)->get();

        // Return JSON response
        return response()->json($beneficiaries);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDashboardRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Dashboard $dashboard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dashboard $dashboard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDashboardRequest $request, Dashboard $dashboard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dashboard $dashboard)
    {
        //
    }
}
