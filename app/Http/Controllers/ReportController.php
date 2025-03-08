<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Models\Demographic;
use Carbon\Carbon;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Validate the request parameters
        $request->validate([
            'start' => 'nullable|date_format:m-d-Y',
            'end' => 'nullable|date_format:m-d-Y|after_or_equal:start',
            'category' => 'nullable|string|in:beneficiaries,barangay,evacuation',
            'where' => 'nullable|string',
        ]);

        // Get the query parameters
        $startDate = $request->input('start');
        $endDate = $request->input('end');
        $category = $request->input('category');
        $where = $request->input('where');

        // Convert the start and end dates to the Y-m-d format
        if ($startDate) {
            $startDate = Carbon::createFromFormat('m-d-Y', $startDate)->format('Y-m-d');
        }

        if ($endDate) {
            $endDate = Carbon::createFromFormat('m-d-Y', $endDate)->format('Y-m-d');
        }

        // Query the Demographic model
        $query = Demographic::query();

        // Filter by date range (assuming you have a `created_at` column)
        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [
                Carbon::parse($startDate)->startOfDay(),
                Carbon::parse($endDate)->endOfDay(),
            ]);
        }

        // Filter by category and where
        if (!empty($where)) {
            if ($category === 'barangay') {
                $query->where('barangay', $where);
            } elseif ($category === 'evacuation') {
                $query->where('evacuation_site', $where);
            }
        }

        // Fetch results
        $demographics = $query->get();

        // If no results, return an empty array instead of a blank response
        if ($demographics->isEmpty()) {
            return response()->json([]);
        }

        return response()->json($demographics);
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
    public function store(StoreReportRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportRequest $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        //
    }
}
