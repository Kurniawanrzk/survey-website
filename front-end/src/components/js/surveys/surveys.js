import { 
    Card,Table,
    Button,
    Form,
    Alert } from "react-bootstrap";
import {
    useState,
    useEffect
} from 'react'
import axios from 'axios'
import Sidebar from "../sidebar.js"
import "../../css/surveys.css"
const Surveys = ({role}) => {
    // For Getting All Users Data API
    const [surveys, setSurveys] = useState({data:[], loading:true})
    const [classes, setClasses] = useState([])
    const [isErr, setIsErr] = useState(false)
    // Body For Post and Put Users
    const [jadwalPelajaran, setJadwalPelajaran] = useState();
    const [strukturKelas, setStrukturKelas] = useState()
    const [inventarisKelas, setInventarisKelas] = useState()
    const [bukuKelas, setBukuKelas] = useState()
    const [jurnalMengajar, setJurnalMengajar] = useState()
    const [bukuRapot, setBukuRapot] = useState()
    const [leger, setLeger] = useState()
    const [denahKelas, setDenahKelas] = useState()
    const [tataTertibsekolah, setTataTertibSekolah] = useState()
    const [bukuLaporanWaliKelas, setBukuLaporanWaliKelas] = useState()
    const [programKerja, setProgramKerja] = useState()
    const [classId, setClassId] = useState()
    // Status, Is users want to update or create new data
    const [put, setPut] = useState(false)
    const [post, setPost] = useState(false)

    useEffect(() => {
        document.title = "Surveys Page | App Survey Kelas"
        getSurveys()
        getClasses()
    },[])
    const getSurveys = async() => {
        var config = {
          method: 'get',
          url: 'http://localhost:8000/api/surveys',
          headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
          }
        };

        await axios(config)
        .then(function (response) {
            setSurveys({data:response.data, loading:false})
        })
        .catch(function (error) {
          console.log(error);
        });

        }

     const getClasses= async() => {
        var config = {
          method: 'get',
          url: 'http://localhost:8000/api/classes',
          headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
          }
        };

        await axios(config)
        .then(function (response) {
            setClasses(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });

        }

    const deleteData  = async(id) => {
    var config = {
      method: 'delete',
      url: `http://localhost:8000/api/surveys/${id}`,
      headers: { 
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
      }
    };

    axios(config)
    .then(function (response) {
      getSurveys()
    })
    .catch(function (error) {
      console.log(error);
    });      
    }

    const updateData = async(e) => {
        e.preventDefault()
        var data = JSON.stringify({
          "jadwal_pelajaran": jadwalPelajaran ? 1 : 0,
          "struktur_kelas": strukturKelas ? 1 : 0,
          "inventaris_kelas": inventarisKelas ? 1 : 0,
          "buku_kelas": bukuKelas ? 1 : 0,
          "jurnal_mengajar": jurnalMengajar ? 1 : 0,
          "buku_penyerahaan_dan_penerimaan_rapot": bukuRapot ? 1 : 0,
          "leger": leger ? 1 : 0,
          "denah_kelas": denahKelas ? 1 : 0,
          "tata_tertib_sekolah": tataTertibsekolah ? 1 : 0,
          "buku_laporan_wali_kelas": bukuLaporanWaliKelas ? 1 : 0,
          "program_kerja": programKerja ? 1 : 0,
          "class_id": classId
        });

        var config = {
          method: 'put',
          url: 'http://localhost:8000/api/surveys/6',
          headers: { 
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2Njg3NjU1ODcsImV4cCI6MTY2ODg1MTk4NywibmJmIjoxNjY4NzY1NTg3LCJqdGkiOiJMSWp6cUlkcnMwUFNQYVFNIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.iHUgWQepDrFLYEkq7XNq9QpzQoU6dxKr_t5c7kr0fvM', 
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });



    }
    const updateHandler = async(id) => {
        var config = {
          method: 'get',
          url: `http://localhost:8000/api/surveys/${id}`,
          headers: { 
           'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
          }
        };

        axios(config)
        .then(function (response) {           
            setJadwalPelajaran(response.data.jadwal_pelajaran)
            setStrukturKelas(response.data.struktur_kelas)
            setInventarisKelas(response.data.inventaris_kelas)
            setBukuKelas(response.data.buku_kelas)
            setJurnalMengajar(response.data.jurnal_mengajar)
            setBukuRapot(response.data.buku_penyerahaan_dan_penerimaan_rapot)
            setLeger(response.data.leger)
            setDenahKelas(response.data.denah_kelas)
            setTataTertibSekolah(response.data.tata_tertib_sekolah)
            setBukuLaporanWaliKelas(response.data.buku_laporan_wali_kelas)
            setProgramKerja(response.data.program_kerja)
            setClassId(response.data.class_id)      
            setPut(true)


        })
        .catch(function (error) {
          console.log(error);
        });

        }
    const cancelIpt = (e) => {
        e.preventDefault()
        setPut(false)
        setPost(false)
        setIsErr(false)
         setJadwalPelajaran(null)
            setStrukturKelas(null)
            setInventarisKelas(null)
            setBukuKelas(null)
            setJurnalMengajar(null)
            setBukuRapot(null)
            setLeger(null)
            setDenahKelas(null)
            setTataTertibSekolah(null)
            setBukuLaporanWaliKelas(null)
            setProgramKerja(null)
            setClassId(null)
    }

    const postData = async(e) => {
        e.preventDefault()        
        var data = JSON.stringify({
          "jadwal_pelajaran": jadwalPelajaran ? 1 : 0,
          "struktur_kelas": strukturKelas ? 1 : 0,
          "inventaris_kelas": inventarisKelas ? 1 : 0,
          "buku_kelas": bukuKelas ? 1 : 0,
          "jurnal_mengajar": jurnalMengajar ? 1 : 0,
          "buku_penyerahaan_dan_penerimaan_rapot": bukuRapot ? 1 : 0,
          "leger": leger ? 1 : 0,
          "denah_kelas": denahKelas ? 1 : 0,
          "tata_tertib_sekolah": tataTertibsekolah ? 1 : 0,
          "buku_laporan_wali_kelas": bukuLaporanWaliKelas ? 1 : 0,
          "program_kerja": programKerja ? 1 : 0,
          "class_id": classId
        });

        var config = {
          method: 'post',
          url: 'http://localhost:8000/api/surveys',
          headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`,
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          setPut(false)
          setPost(false)
          getSurveys()
        })
        .catch(function (error) {
          if(error.status !== 200) {
            setIsErr("Survey Untuk Kelas Ini Sudah Ada")
          }
        });

    }

    
    return(
        <>
        <div className="d-flex">
            <div className="">
                <Sidebar />
            </div>
            { post || put && role === "Wakil Kepala Sekolah Bagian Manajemen Internal" ? <div style={{ 
                            backgroundColor:"#0E2945"
                            ,color:"white",
                            width:"100%",
                            height:"100vh",
                            display:"flex", 
                            flexDirection:"column",
                            gap:"20px" }}>
                             <div style={{ display:"flex",justifyContent:"center", marginTop:"30px" }}>
            
    
                                <Card className="rounded-4" style={{ width: '49rem',height:"fit-content" }}>
                                <Card.Header className="text-dark">
                                    <Card.Title>
                                    {post ? <>Create New Data</> : <>Update Data</> }
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className="shadow">
                                     <Form>
                                     {isErr === false ? <></> : 
                                        <Alert variant="danger">
                                            {isErr}
                                        </Alert>}
                            <fieldset>
                                <Form.Group className="text-dark mb-4">
                                 <Form.Label 
                                className="text-dark"
                                htmlFor="waliKelasInput">Silahkan Pilih Kelas</Form.Label>
                                   <Form.Select
                                   value={classId ? classId : ""}
                                    onChange={e => setClassId(e.target.value)}>           
                                    <option value="">Choose Classes</option> 
                                    {classes.map((data) => (
                                        <option value={data.id}>{data.class_name}</option>
                                        ))}


                                </Form.Select>                                  
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Jadwal Pelajaran"
                                    onChange={e => setJadwalPelajaran(e.target.value)}
                                    defaultChecked={put && jadwalPelajaran ? true : false}
                                     />                                 
                                    
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Struktur Kelas"
                                    onChange={e => setStrukturKelas(e.target.value)}
                                    defaultChecked={put && strukturKelas ? true : false}
                                     />                                                                     
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Inventaris Kelas"
                                    onChange={e => setInventarisKelas(e.target.value)}
                                    defaultChecked={put && inventarisKelas ? true : false}
                                     />                                   
                                </Form.Group>
                                 <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Buku Kelas"
                                    onChange={e => setBukuKelas(e.target.value)}
                                    defaultChecked={put && bukuKelas ? true : false}
                                     />                                   
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Jurnal Mengajar"
                                    onChange={e => setJurnalMengajar(e.target.value)}
                                    defaultChecked={put && jurnalMengajar ? true : false}
                                     />                                  
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Buku Penyerahaan Dan Penerimaan Rapot"
                                    onChange={e => setBukuRapot(e.target.value)}
                                    defaultChecked={put && bukuRapot ? true : false}
                                     />                                    
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Leger"
                                     onChange={e => setLeger(e.target.value)}
                                    defaultChecked={put && leger ? true : false}
                                     />                                    
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Denah Kelas"
                                    onChange={e => setDenahKelas(e.target.value)}
                                    defaultChecked={put && denahKelas ? true : false}
                                     />                                    
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Tata Tertib Sekolah"
                                     onChange={e => setTataTertibSekolah(e.target.value)}
                                     defaultChecked={put && tataTertibsekolah ? true : false}
                                     />                                    
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Buku Laporan Wali Kelas"
                                    onChange={e => setBukuLaporanWaliKelas(e.target.value)}
                                    defaultChecked={put && bukuLaporanWaliKelas ? true : false}
                                     />                                    
                                </Form.Group>
                                <Form.Group className="text-dark">
                                    <Form.Check 
                                    type="checkbox"
                                    label="Program Kerja"
                                    onChange={e => setProgramKerja(e.target.value)}
                                    defaultChecked={put && programKerja ? true : false}
                                     />                                    
                                </Form.Group>                                                                 

                                <div
                                className="d-flex justify-content-center"
                                >
                                <Button 
                                variant="primary"
                                onClick={put ? updateData : postData}
                                className="mt-3"
                                 >Submit</Button>

                                 <Button 
                                 variant="danger"                           
                                className="mt-3 ms-3"
                                onClick={cancelIpt}
                                 >Cancel</Button>
                                }
                                </div>
                            </fieldset>
                            </Form>
                                </Card.Body>
                                </Card>                 
                                   
                                </div>
                                </div>
                                 : <div style={{ 
                            backgroundColor:"#0E2945"
                            ,color:"white",
                            width:"100%",
                            height:"100vh",
                            display:"flex", 
                            flexDirection:"column",
                            gap:"20px" }}>
                             <div 
                             style={{ display:"flex",justifyContent:"center", marginTop:"30px", marginRight:"18%" }}>
            
                                <Card className=" rounded-4" 
                                style={{ height:"fit-content", maxWidth:"70%"}}>
                                <Card.Header className="text-dark">
                                    <Card.Title>
                                    Survey Lists
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className="shadow">
                                <div className="tables">
                                     <Table striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nama_Kelas</th>
                                                <th>Wali_Kelas</th>
                                                <th>Jadwal_Pelajaran</th>
                                                <th>Struktur_Kelas</th>
                                                <th>Inventari_Kelas</th>
                                                <th>Bk_Kelas</th>
                                                <th>Jurnal_Mengajar</th>
                                                <th>Bk_pnrm/pngmblan_rpt</th>
                                                <th>Leger</th>
                                                <th>Denah_Kelas</th>
                                                <th>Tata_Tertib_Sekolah</th>
                                                <th>Bk_Lprn_Wli_Kls</th>
                                                <th>Program_Kerja</th>
                                                {role === "Wakil Kepala Sekolah Bagian Manajemen Internal" ? <th>Aksi<font className="text-white">____________________</font></th> : <></>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {surveys.loading ? <>Load</> : surveys.data.map((data, idx) => (
                                                <tr>
                                                <td>{idx + 1}</td>
                                                <td  >{data.class_name}</td>
                                                <td  >{data.homeroom_teacher}</td>
                                                <td>{data.surveys.jadwal_pelajaran == 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                 :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                <td>{data.surveys.struktur_kelas== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                <td>{data.surveys.inventaris_kelas== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                <td>{data.surveys.buku_kelas== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                <td>{data.surveys.jurnal_mengajar== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                <td>{data.surveys.buku_penyerahaan_dan_penerimaan_rapot== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                 <td>{data.surveys.leger== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                  <td>{data.surveys.denah_kelas== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                  <td>{data.surveys.tata_tertib_sekolah== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                  <td>{data.surveys.buku_laporan_wali_kelas== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                  <td>{data.surveys.program_kerja== 1
                                                 ? <i class="fa fa-check" aria-hidden="true"></i> 
                                                  :<i class="fa fa-times" aria-hidden="true"></i>}</td>
                                                {role === "Wakil Kepala Sekolah Bagian Manajemen Internal" ? <td><Button onClick={e => deleteData(data.id)} variant="danger">Delete  <i class="fa fa-trash"></i></Button> <Button variant="success" onClick={e => updateHandler(data.id)}>Edit   <i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button></td> : <></>}
                                            </tr>     
                                                )) 
                                        }                                     
            
                                        </tbody>
                                    </Table>
                                    </div>
                                   { role === "Wakil Kepala Sekolah Bagian Manajemen Internal" ? <Button variant="primary" onClick={e => setPost(true)}>Add User +</Button> : <></>  }
                                   <p className="d-inline text-dark ms-4">Data length : {surveys.data.length}</p>
                                </Card.Body>
                                </Card>                 
                                   
                                </div>
                        </div> }
        </div>
        </>
    )
}
export default Surveys;