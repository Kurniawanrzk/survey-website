<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_surveys', function (Blueprint $table) {
            $table->id();
            $table->boolean("jadwal_pelajaran");
            $table->boolean("struktur_kelas");
            $table->boolean("inventaris_kelas");
            $table->boolean("buku_kelas");
            $table->boolean("jurnal_mengajar");
            $table->boolean("buku_penyerahaan_dan_penerimaan_rapot");
            $table->boolean("leger");
            $table->boolean("denah_kelas");
            $table->boolean("tata_tertib_sekolah");
            $table->boolean("buku_laporan_wali_kelas");
            $table->boolean("program_kerja");
            $table->foreignId("class_id")
            ->references("id")
            ->on(tb_classes::class)
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_surveys');
    }
};
