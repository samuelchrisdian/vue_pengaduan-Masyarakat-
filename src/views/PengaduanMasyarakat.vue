<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Pengaduan Anda</b></p>
              <p class="card-description float-right">
                <b-button variant="success" v-b-modal.modalPengaduan v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Buat Pengaduan</b-button>
              </p>
              <div class="table-responsive">
                 
                <b-table striped hover :items="pengaduan" :fields="fields">
                  <template v-slot:cell(status)="data">
                    <b-badge variant="warning">{{ data.item.status }}</b-badge>
                  </template>
                  <template v-slot:cell(kategori)="data">
                    <b-badge variant="warning">{{ data.item.kategori.nama_kategori }}</b-badge>
                  </template>
                  <template v-slot:cell(nik)="data">
                    {{ data.item.user.nik }}  
                  </template>
                  <template v-slot:cell(tanggapan)="data">
                    {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan : null }}
                  </template>
                  <template v-slot:cell(foto)="data">
                    <img style="width:200px; height: 150px; border-radius:10%" :src="'http://localhost:8001/uploads/' + data.item.foto" />
                  </template>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination">
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="success"></b-spinner>
                  <strong class="text-success">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>
    <b-modal 
      id="modalPengaduan"
      @ok="Save"
    >
      <template v-slot:modal-title>
       Form Pengaduan
      </template>
        <form ref="form">
          <div class="form-group">
            <label for="tgl_pengaduan" class="col-form-label">Tanggal Pengaduan</label>
            <input type="date" name="tgl_pengaduan" class="form-control" id="tgl_pengaduan" placeholder="Tanggal Pengaduan" v-model="tgl_pengaduan">
          </div>
          <div class="form-group">
            <label for="isi_laporan" class="col-form-label">Isi Laporan</label>
            <input type="text" name="isi_laporan" class="form-control" id="isi_laporan" placeholder="Isi Laporan" v-model="isi_laporan">
          </div>
          <div class="form-group">
            <label for="id_kategori" class="col-form-label">Kategori</label>
            <select class="form-control" name="id_kategori" id="id_kategori" v-model="id_kategori">
              <option value="1">Administrasi</option>
              <option value="2" checked>Bencana</option>
            </select>
          </div>
          <div class="form-group">
            <label for="foto" class="col-form-label">Foto</label>
            <input type="file" name="foto" class="form-control" id="foto" placeholder="Foto" >
          </div>
        </form>
    </b-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id_pengaduan: "",
      id_user: "",
      id_kategori: "",
      id_tanggapan: "",
      id_petugas: "",
      tgl_pengaduan: "",
      tgl_tanggapan: "",
      isi_laporan: "",
      foto: "",
      status: "",
      tanggapan: "",
      kategori: "",
      nik:"",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      pengaduan: [],
      tanggapan: [],
      kategori: [],
      user: [],
      fields: ["id_pengaduan","nik", "kategori", "tgl_pengaduan", "isi_laporan", "foto", "status","tanggapan"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/masyarakat/pengaduan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.tanggapan = response.data.data.pengaduan.tanggapan;
          this.kategori = response.data.data.kategori;
          this.user = response.data.data.pengaduan.user;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
          // this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },
    Add : function(){
      this.action         = "insert";
      this.tgl_pengaduan  = "";
      this.isi_laporan    = "";
      this.id_kategori    = "";  
      this.foto           = ""; 
      document.getElementById("foto").value = null;
    },
    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("tgl_pengaduan", this.tgl_pengaduan);
        form.append("isi_laporan", this.isi_laporan);
        form.append("id_kategori", this.  id_kategori);
        form.append("foto", document.getElementById("foto").files[0]);
        
        this.axios.post("/masyarakat/pengaduan", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let form = new FormData();
        form.append("id", this.id);
        form.append("tgl_pengaduan", this.tgl_pengaduan);
        form.append("isi_laporan", this.isi_laporan);
        form.append("id_kategori", this.id_kategori);
        form.append("foto", document.getElementById("foto").files[0]);
      }
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>