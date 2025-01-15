<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Http\Requests\StoreContentRequest;
use App\Http\Requests\UpdateContentRequest;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
{
    $validateData = $request->validate([
        'title' => 'required|string|max:225',
        'content' => 'required',
        'file_path' => 'required|file|mimes:jpg,png,pdf,mp4|max:2048',
    ]);

    // Handle file upload
    if ($request->hasFile('file_path')) {
        $file = $request->file('file_path');
        $filePath = $file->store('uploads', 'public'); // Save in 'storage/app/public/uploads'
        $validateData['file_path'] = $filePath; // Update the path in validated data
    }

    // Save content to the database
    $content = Content::create($validateData);

    return response()->json([
        'message' => 'Content created successfully',
        'content' => $content,
    ], 201); // Use 201 status code for successful resource creation
}


    /**
     * Display the specified resource.
     */
    public function show(Content $content)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Content $content)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContentRequest $request, Content $content)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        //
    }
}
