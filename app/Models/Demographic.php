<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demographic extends Model
{
    use HasFactory;

    protected $fillable = [
        'serial_id',
        'status',
        'region',
        'province',
        'district',
        'city',
        'barangay',
        'evacuation_site',
        'head_last_name',
        'head_first_name',
        'head_middle_name',
        'extension_name',
        'age',
        'gender',
        'birthday',
        'birth_place',
        'civil_status',
        'mother_maiden_name',
        'religion',
        'occupation',
        'income',
        'id_card_presented',
        'id_card_number',
        'contact_number',
        'permanent_address',
        'program',
        'lng',
        'lat'
    ];

    /**
     * Define the relationship between DemographicData and FamilyMember.
     * One DemographicData has many FamilyMembers.
     */
    public function familyMembers()
    {
        return $this->hasMany(FamilyMember::class, 'demographics_id', 'id');
    }
    public function family_members()
    {
        return $this->hasMany(FamilyMember::class, 'demographics_id', 'id');
    }
}
