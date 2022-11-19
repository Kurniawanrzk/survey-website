import { 
    Card,Table,
    Button,
    Form } from "react-bootstrap";
import {
    useState,
    useEffect
} from 'react'
import axios from 'axios'
import Sidebar from "../sidebar.js"
const Classes = () => {
   
    // For Getting All Users Data API
    const [classes, setClasses] = useState({data:[], loading:true})
    const [users, setUsers] = useState({data:[], loading:true})
    // Body For Post and Put Users
    const [namaKelas, setNamaKelas] = useState()
    const [waliKelasId, setWaliKelasId] = useState()
    // Status, Is users want to update or create new data
    const [put, setPut] = useState(false)
    const [putId, setPutId] = useState()
    const [post, setPost] = useState(false)

    useEffect(() => {
        document.title = "Classes Page | App Survey Kelas"
        getClasses()
        getUsers()
    },[])
    const getUsers = async() => {
        var config = {
          method: 'get',
          url: 'http://localhost:8000/api/users',
          headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
          }
        };

        await axios(config)
        .then(function (response) {
        	const a = response.data.find(x => x.role === "Guru Wali Kelas")
         	setUsers({data:response.data, loading:false})
        })
        .catch(function (error) {
          console.log(error);
        });

        }
        console.log(users)

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
            setClasses({data:response.data, loading:false})
        })
        .catch(function (error) {
          console.log(error);
        });

        }

    const deleteData  = async(id) => {
    var config = {
      method: 'delete',
      url: `http://localhost:8000/api/classes/${id}`,
      headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
      }
    };

    await axios(config)
    .then(function (response) {
        getClasses()
    })
    .catch(function (error) {
      console.log(error);
    });

    
    }

    const updateData = async(e) => {
        e.preventDefault()        
        var data = JSON.stringify({
		  "class_name": namaKelas,
		  "homeroom_teacher_id": waliKelasId
		});

        var config = {
          method: 'put',
          url: `http://localhost:8000/api/classes/${putId}`,
          headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`,
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
           getClasses()
           setPut(false)
           setPost(false)
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    const updateHandler = async(id) => {
        var config = {
          method: 'get',
          url: `http://localhost:8000/api/classes/${id}`,
          headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
          }
        };

        await axios(config)
        .then(function (response) {
            setNamaKelas(response.data.class_name)
             setWaliKelasId(response.data.homeroom_teacher_id)
            setPutId(id)
        })
        .catch(function (error) {
          console.log(error);
        });
        setPut(true)    
        }
    const cancelIpt = (e) => {
        e.preventDefault()
        setPut(false)
        setPost(false)

    }

    const postData = async(e) => {
        e.preventDefault()        
        var data = JSON.stringify({
		  "class_name": namaKelas,
		  "homeroom_teacher_id": waliKelasId
		});

        var config = {
          method: 'post',
          url: 'http://localhost:8000/api/classes',
          headers: { 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`,
            'Content-Type': 'application/json'
          },
          data : data
        };       

        axios(config)
		.then(function (response) {
		   getClasses()
           setPut(false)
           setPost(false)
		})
		.catch(function (error) {
		  console.log(error);
		});

    }



    
    return(
        <>
        <div className="d-flex">
            <div className="">
                <Sidebar />
            </div>
            {put || post ?  <div style={{ 
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
                            <fieldset>

                                {/* INPUT NAMA_KELAS */}
                                <Form.Group 
                                className="mb-3">
                                <Form.Label 
                                className="text-dark"
                                htmlFor="namaKelasTextInput"
                                >Nama Kelas</Form.Label>
                                
                                {put ? <Form.Control 
                                autoComplete="nope"
                                className="bg-muted"
                                id="namaKelasTextInput" 
                                placeholder="min : 5 character" 
                                defaultValue={namaKelas}
                                onChange={e => setNamaKelas(e.target.value)}
                                type="text" /> :
                                <Form.Control 
                                autoComplete="nope"
                                className="bg-muted"
                                id="usnTextInput" 
                                placeholder="min : 5 character" 
                                onChange={e => setNamaKelas(e.target.value)}
                                type="text" />}
                                </Form.Group>
                                {/* INPUT NAMA_KELAS */}
  

                                 <Form.Group className="mb-3">
                                <Form.Label 
                                className="text-dark"
                                htmlFor="waliKelasInput">Wali Kelas</Form.Label>
                                <Form.Select onChange={e => setWaliKelasId(e.target.value)} >           
                                	<option>Choose Wali Kelas</option>
                                     {users.data.filter(x => x.role == "Guru Wali Kelas").map((data) => (
                                     	<option value={data.id} >{data.username}</option>
                                     	))}                               
                                </Form.Select>   	                             
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
                                </div> :<div style={{ 
                            backgroundColor:"#0E2945"
                            ,color:"white",
                            width:"100%",
                            height:"100vh",
                            display:"flex", 
                            flexDirection:"column",
                            gap:"20px" }}>
                             <div style={{ display:"flex",justifyContent:"center", marginTop:"30px" }}>
            
                                <Card className="rounded-4" style={{ height:"fit-content" }}>
                                <Card.Header className="text-dark">
                                    <Card.Title>
                                    Class List 
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className="shadow">
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Kelas</th>
                                                <th>Wali Kelas</th> 
                                                <th>Action</th>                                           
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classes.loading ? <>Load</> : classes.data.map((data, idx) => (
                                                <tr>
                                                <td>{idx + 1}</td>
                                                <td >{data.class_name}</td>
                                                <td>{data.homeroom_teacher}</td>                                              
                                                <td><Button onClick={e => deleteData(data.id)} variant="danger">Delete  <i class="fa fa-trash"></i></Button> <Button variant="success" onClick={e => updateHandler(data.id)}>Edit   <i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button></td>
                                            </tr>     
                                                ))
                                        }                        
            
                                        </tbody>
                                    </Table>
                                    <Button variant="primary" onClick={e => setPost(true)}>Add User +</Button> 
                                    <p className="d-inline text-dark ms-4">Data length : {classes.data.length}</p>
                                </Card.Body>
                                </Card>                 
                                   
                                </div>
                        </div>}
        </div>
        </>
    )
}
export default Classes;