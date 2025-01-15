<?php

namespace App\Http\Controllers;

use App\Models\Demographic;
use App\Http\Requests\StoreDemographicRequest;
use App\Http\Requests\UpdateDemographicRequest;

class DemographicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $demographics = Demographic::all();
        return response()->json([
            'response' => $demographics
        ], 200);
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
    public function store(StoreDemographicRequest $request)
    {
        $validateData = $request->validate([
            'title' => 'required|string|max:225',
            'content' => 'required',
            'file_path' => 'required|file|mimes:jpg,png,pdf,mp4|max:2048',
        ]);
        $demographic = Demographic::create($validateData);
        return response()->json(['message' => 'Demographic created successfully', 'product' => $demographic], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Demographic $demographic)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Demographic $demographic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDemographicRequest $request, Demographic $demographic)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Demographic $demographic)
    {
        //
    }
}
