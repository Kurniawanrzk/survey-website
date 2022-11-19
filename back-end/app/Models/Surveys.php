<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Surveys extends Model
{
    protected $table = "tb_surveys";
    protected $primaryKey = "id";
    protected $fillable = [
       "jadwal_pelajaran",
            "struktur_kelas",
            "inventaris_kelas",
            "buku_kelas",
            "jurnal_mengajar",
            "buku_penyerahaan_dan_penerimaan_rapot",
            "leger",
            "denah_kelas",
            "tata_tertib_sekolah",
            "buku_laporan_wali_kelas",
            "program_kerja",
            "class_id",            
    ];
}
