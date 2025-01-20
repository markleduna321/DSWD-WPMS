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
    public function index(Request $request)
    {
        $perPage = 9; // Number of items per page
        $contents = Content::paginate($perPage);

        return response()->json([
            'contents' => $contents->items(), // The actual data
            'currentPage' => $contents->currentPage(), // Current page number
            'totalPages' => $contents->lastPage(), // Total number of pages
        ]);
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
            'is_highlight' => 'boolean',
        ]);

        // Handle file upload
        if ($request->hasFile('file_path')) {
            $file = $request->file('file_path');
            $filePath = $file->store('uploads', 'public'); // Save in 'storage/app/public/uploads'
            $path = $filePath; // Update the path in validated data

            $content = Content::create([
                'title' => $request->title,
                'content' => $request->content,
                'is_highlight' => $request->is_highlight,
                'file_path' => $path,
            ]);
        }

        // Save content to the database

        return response()->json([
            'message' => 'Content created successfully',
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
