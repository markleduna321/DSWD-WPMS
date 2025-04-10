<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DemographicSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $data = [];

        $barangays = [
            "Agpangi", "Ani-e", "Bagacay", "Bantayanon", "Buenavista", "Cabungahan", "Calampisawan", 
            "Cambayobo", "Castellano", "Cruz", "Dolis", "Hilub-Ang", "Hinab-Ongan", "Ilaya", "Laga-an", 
            "Lalong", "Lemery", "Lipat-on", "Lo-ok (Poblacion)", "Ma-aslob", "Macasilao", "Malanog", 
            "Malatas", "Marcelo", "Mina-utok", "Menchaca", "Minapasuk", "Mahilum", "Paghumayan", 
            "Pantao", "Patun-an", "Pinocutan", "Refugio", "San Benito", "San Isidro", "Suba (Poblacion)", 
            "Telim", "Tigbao", "Tigbon", "Winaswasan"
        ];
        foreach ($barangays as $barangay) {
            for ($i = 0; $i < 2; $i++) {
                $data[] = [
                    'region' => 'Region 6',
                    'province' => 'Negros Occidental',
                    'district' => 'District 1',
                    'city' => 'San Nicolas',
                    'barangay' => $barangay,
                    'evacuation_site' => 'Site A',
                    'head_last_name' => $faker->lastName,
                    'head_first_name' => $faker->firstName,
                    'head_middle_name' => $faker->randomElement(['A.', 'B.', 'C.', 'D.']),
                    'extension_name' => null,
                    'age' => rand(20, 80),
                    'gender' => $faker->randomElement(['Male', 'Female']),
                    'birthday' => $faker->date('Y-m-d', '-20 years'),
                    'birth_place' => 'Ilocos Norte',
                    'civil_status' => $faker->randomElement(['Single', 'Married', 'Widowed']),
                    'mother_maiden_name' => $faker->name('female'),
                    'religion' => 'Roman Catholic',
                    'occupation' => $faker->jobTitle,
                    'income' => rand(10000, 50000),
                    'id_card_presented' => 'Driver\'s License',
                    'id_card_number' => 'DL-' . rand(100000, 999999),
                    'contact_number' => '09' . rand(100000000, 999999999),
                    'permanent_address' => $faker->address,
                    'created_at' => Carbon::now()->subYears(rand(1, 5))->toDateTimeString(),
                    'updated_at' => Carbon::now(),
                    'lng' => 123.482. + ($i *1),
                    'lat' => 10.59. + ($i *1),
                    'status' => $faker->randomElement(['approved', 'disapproved', 'pending', 'released']),
                ];
            }
        }
        
        // Batch insert all records
        DB::table('demographics')->insert($data);
    }
}
