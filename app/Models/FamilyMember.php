<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'demographics_id',
        'full_name',
        'relation',
        'birth_date',
        'age',
        'gender',
        'highest_education',
        'occupation',
        'remarks'
    ];

    /**
     * Define the inverse relationship between FamilyMember and DemographicData.
     * One FamilyMember belongs to one DemographicData.
     */
    public function demographicData()
    {
        return $this->belongsTo(Demographic::class);
    }
}
