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
        $contents = Content::orderBy('id', 'desc')->paginate($perPage);

        return response()->json([
            'contents' => $contents->items(), // The actual data
            'currentPage' => $contents->currentPage(), // Current page number
            'totalPages' => $contents->lastPage(), // Total number of pages
        ]);
    }

    public function get_latest_content(Request $request)
    {
        // Get the latest 3 content with selected columns (example: 'id', 'title', 'description')
        $latest_content = Content::orderBy('id', 'desc')->take(7)->get();


        // Return the data as JSON
        return response()->json([
            'latest_content' => $latest_content, // Return the collection with limited fields
        ]);
    }


    public function get_content_by_id()
    {

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
    public function show($id)
    {
        $content =  Content::where('id', $id)->first();
        return response()->json([
            'response' => $content
        ], 200);
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
    public function update(Request $request, $id)
{
    $content = Content::findOrFail($id);
    $content->title = $request->title;
    $content->content = $request->content;
    $content->save();

    return response()->json([
        'response' => $content,
    ], 200);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        //
    }
}
