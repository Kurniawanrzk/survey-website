<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Classes;
use App\Models\Surveys;
use App\Models\User;
use App\Models\ViewModel\ViewClass;
use App\Models\ViewModel\ViewSurveys;
use App\Models\ViewModel\ViewUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SurveysController extends Controller
{
    public function get_all_surveys(Request $req)
    {
        if(!empty($req->search)) {
            foreach(ViewSurveys::where("homeroom_teacher","LIKE","%{$req->search}%")
                ->orWhere("class_name","LIKE","%{$req->search}%")
                ->get() as $data){
                $viewSurvey[] = [
                "id" => $data->id,                
                "class_name" => $data->class_name,
                "homeroom_teacher" => $data->homeroom_teacher,
                "surveys" => [
                    "jadwal_pelajaran" => $data->jadwal_pelajaran ,
                    "struktur_kelas" => $data->struktur_kelas,
                    "inventaris_kelas" => $data->inventaris_kelas,
                    "buku_kelas" => $data->buku_kelas ,
                    "jurnal_mengajar" => $data->jurnal_mengajar ,
                    "buku_penyerahaan_dan_penerimaan_rapot" => $data->buku_penyerahaan_dan_penerimaan_rapot ,
                    "leger" => $data->leger,
                    "denah_kelas" => $data->denah_kelas ,
                    "tata_tertib_sekolah" => $data->tata_tertib_sekolah,
                    "buku_laporan_wali_kelas" => $data->buku_laporan_wali_kelas,
                    "program_kerja" => $data->program_kerja ,
                ]
            ];
            }
            return response($viewSurvey, 200);
        }

        if(auth()->user()->role_id === 3) {
            foreach(ViewSurveys::where("homeroom_teacher",auth()->user()->username )->get() as $data) {
            $viewSurvey[] = [
                "id" => $data->id,                
                "class_name" => $data->class_name,
                "homeroom_teacher" => $data->homeroom_teacher,
                "surveys" => [
                    "jadwal_pelajaran" => $data->jadwal_pelajaran ,
                    "struktur_kelas" => $data->struktur_kelas,
                    "inventaris_kelas" => $data->inventaris_kelas,
                    "buku_kelas" => $data->buku_kelas ,
                    "jurnal_mengajar" => $data->jurnal_mengajar ,
                    "buku_penyerahaan_dan_penerimaan_rapot" => $data->buku_penyerahaan_dan_penerimaan_rapot ,
                    "leger" => $data->leger,
                    "denah_kelas" => $data->denah_kelas ,
                    "tata_tertib_sekolah" => $data->tata_tertib_sekolah,
                    "buku_laporan_wali_kelas" => $data->buku_laporan_wali_kelas,
                    "program_kerja" => $data->program_kerja ,
                ]
            ];

        }
                return response($viewSurvey, 200);

        }
        
        foreach(ViewSurveys::all() as $data) {
            $viewSurvey[] = [
                "id" => $data->id,                
                "class_name" => $data->class_name,
                "homeroom_teacher" => $data->homeroom_teacher,
                "surveys" => [
                    "jadwal_pelajaran" => $data->jadwal_pelajaran ,
                    "struktur_kelas" => $data->struktur_kelas,
                    "inventaris_kelas" => $data->inventaris_kelas,
                    "buku_kelas" => $data->buku_kelas ,
                    "jurnal_mengajar" => $data->jurnal_mengajar ,
                    "buku_penyerahaan_dan_penerimaan_rapot" => $data->buku_penyerahaan_dan_penerimaan_rapot ,
                    "leger" => $data->leger,
                    "denah_kelas" => $data->denah_kelas ,
                    "tata_tertib_sekolah" => $data->tata_tertib_sekolah,
                    "buku_laporan_wali_kelas" => $data->buku_laporan_wali_kelas,
                    "program_kerja" => $data->program_kerja ,
                ]
            ];



        } 
        if(empty($viewSurvey)) {
            return response()->json([
                "message" => "data is not avalible",
                "status" => false
            ], 400);
        }
        return response($viewSurvey, 200);

    }

    public function create_surveys(Request $req)
    {
        $validator = Validator::make($req->all(), [
            "jadwal_pelajaran" => "required",
            "struktur_kelas" => "required",
            "inventaris_kelas" => "required",
            "buku_kelas" => "required",
            "jurnal_mengajar" => "required",
            "buku_penyerahaan_dan_penerimaan_rapot" => "required",
            "leger" => "required",
            "denah_kelas" => "required",
            "tata_tertib_sekolah" => "required",
            "buku_laporan_wali_kelas" => "required",
            "program_kerja" => "required",
            "class_id" => "required"
        ]);

        if($validator->fails())
        {
            return response()->json([
                "message" => "invalid field",
                "status" => false
            ], 422);
        }

        if(!empty(Surveys::where("class_id", $req->class_id)->first())) {
            return response()->json([
                "message" => "this class already exist",
                "status" => false
            ], 422);
        }

        $surveys = New Surveys;
        $save = $surveys->create($req->all());
        return response($save, 200);


    }

    public function update_surveys(Request $req, $id)
    {        
        $surveys = Surveys::find($id);
        $save = $surveys->update($req->all());
        return response($surveys, 200);
    }

    public function delete_surveys(Request $req, $id)
    {
        Surveys::destroy($id);
        return response("success", 200);
    }

    public function get_survey_id($id)
    {
        if(!$surveys = Surveys::find($id))
        {
            return response()->json([
                "message" => "survey not founded",
                "status" => false
            ], 400);
        }

        return response($surveys, 200);
    }
}
