<?php

namespace App\Http\Controllers;

use App\Models\Demographic;
use App\Http\Requests\StoreDemographicRequest;
use App\Http\Requests\UpdateDemographicRequest;
use App\Models\FamilyMember;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        $data = $request->validate([
            'region' => 'required|string',
            'province' => 'required|string',
            'district' => 'required|string',
            'city' => 'required|string',
            'barangay' => 'required|string',
            'evacuation_site' => 'nullable|string',
            
            'head_last_name' => 'required|string',
            'head_first_name' => 'required|string',
            'head_middle_name' => 'required|string',
            'extension_name' => 'nullable|string',
            'gender' => 'required|string|in:Male,Female', // Adjust options as necessary
            'birthday' => 'required|date',
            'birth_place' => 'required|string',

            'civil_status' => 'required|string|in:Single,Merried,Widowed,Seperated', // Adjust based on allowed statuses
            'mother_maiden_name' => 'required|string',
            'religion' => 'required|string',
            'occupation' => 'required|string',
            'income' => 'nullable|string',
            'id_card_presented' => 'nullable|string',
            'id_card_number' => 'nullable|string',
            'contact_number' => 'nullable|string', // This is nullable if it can be empty
            
            'permanent_address' => 'required|string',
            // 'role_id' => 'nullable|string',
            // 'familyMembers' => 'nullable|array',
            // 'familyMembers.*.firstName' => 'required|string',
            // 'familyMembers.*.lastName' => 'required|string',
            // 'familyMembers.*.middleName' => 'nullable|string',
            // 'familyMembers.*.extName' => 'nullable|string',
            // 'familyMembers.*.gender' => 'required|string|in:Male,Female',
            // 'familyMembers.*.dob' => 'required|date',
            // 'familyMembers.*.relation' => 'required|string',
        ]);

        // Process the data after validation...


        $demographic = Demographic::create($data);

        if ($request->has('familyMembers')) {
            foreach ($request->familyMembers as $family) {
                FamilyMember::create([
                    'demographics_id' => $demographic->id,
                    'full_name' => $family['fullname'],
                    'relation' => $family['relation'],
                    'birth_date' => $family['birth_date'],
                    'gender' => $family['gender'],
                    'highest_education' => $family['highest_educational_attainment'],
                    'occupation' => $family['occupation'],
                    'remarks' => $family['remarks']
                ]);
            }
        }

        return response()->json($demographic, 201);
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
