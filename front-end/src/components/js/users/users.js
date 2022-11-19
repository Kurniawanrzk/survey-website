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

const Users = () => {
   
    // For Getting All Users Data API
    const [users, setUsers] = useState({data:[], loading:true})
    const [user, setUser] = useState({})

    // Body For Post and Put Users
    const [usn, setUsn] = useState()
    const [eml, setEml] = useState()
    const [pass, setPass] = useState()
    const [nip, setNip] = useState()
    const [rlId, setRlid] = useState()
    // Status, Is users want to update or create new data
    const [put, setPut] = useState(false)
    const [post, setPost] = useState(false)

    useEffect(() => {
            document.title = "Users Page | App Survey Kelas"
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
            setUsers({data:response.data, loading:false})
        })
        .catch(function (error) {
          console.log(error);
        });

        }

    const deleteData  = async(id) => {
    var config = {
      method: 'delete',
      url: `http://localhost:8000/api/users/${id}`,
      headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
      }
    };

    await axios(config)
    .then(function (response) {
        getUsers()
    })
    .catch(function (error) {
      console.log(error);
    });

    
    }

    const updateData = async(e) => {
        e.preventDefault()
        var data = JSON.stringify({
          "username": usn,
          "email": eml,
          "NIP": nip,
          "role_id": rlId
        });

        var config = {
          method: 'put',
          url: `http://localhost:8000/api/users/${user.id}`,
          headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`,
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
           getUsers()
           setPut(false)
           setPost(false)
        })
        .catch(function (error) {
          console.log(error);
          console.log(data)
        });

    }

    const updateHandler = async(id) => {
        var config = {
          method: 'get',
          url: `http://localhost:8000/api/users/${id}`,
          headers: { 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
          }
        };

        await axios(config)
        .then(function (response) {
            setUser(response.data)
            setUsn(response.data.username)
            setEml(response.data.email)
            setNip(response.data.NIP)
            setRlid(response.data.role_id)

        })
        .catch(function (error) {
          console.log(error);
        });
        setPut(true)    
        console.log(user.username)
        }
    const cancelIpt = (e) => {
        e.preventDefault()
        setPut(false)
        setPost(false)

    }

    const postData = async(e) => {
        e.preventDefault()        
        var data = JSON.stringify({
          "username": usn,
          "email": eml,
          "password": pass,
          "NIP": nip,
          "role_id": rlId
        });

        var config = {
          method: 'post',
          url: 'http://localhost:8000/api/users/',
          headers: { 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`,
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
           getUsers()
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
            { post || put ? <div style={{ 
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

                                {/* INPUT USERNAME */}
                                <Form.Group 
                                className="mb-3">
                                <Form.Label 
                                className="text-dark"
                                htmlFor="usnTextInput"
                                >Username</Form.Label>
                                
                                {put ? <Form.Control 
                                autoComplete="nope"
                                className="bg-muted"
                                id="usnTextInput" 
                                placeholder="min : 5 character" 
                                defaultValue={usn}
                                onChange={e => setUsn(e.target.value)}
                                type="text" /> :
                                <Form.Control 
                                autoComplete="nope"
                                className="bg-muted"
                                id="usnTextInput" 
                                placeholder="min : 5 character" 
                                onChange={e => setUsn(e.target.value)}
                                type="text" />}
                                </Form.Group>
                                {/* INPUT USERNAME */}

                                {/* INPUT EMAIL */}
                                <Form.Group className="mb-3">
                                <Form.Label 
                                className="text-dark"
                                htmlFor="emailTextInput">Email</Form.Label>
                                {put ? <Form.Control 
                                autoComplete="nope" 
                                id="emailTextInput" 
                                placeholder="e.g example@mail.com" 
                                defaultValue={eml}
                                onChange={e => setEml(e.target.value)}
                                type="email" /> : 

                                <Form.Control 
                                autoComplete="nope" 
                                id="emailTextInput" 
                                placeholder="e.g example@mail.com" 
                                onChange={e => setEml(e.target.value)}
                                type="email" />}
                                </Form.Group>  
                                {/* INPUT EMAIL */}

                                {/* INPUT PASSWORD */}
                                {post ? <Form.Group className="mb-3">   
                                <Form.Label 
                                className="text-dark"
                                htmlFor="passwordTextInput">Password</Form.Label>                            
                                <Form.Control 
                                autoComplete="nope" 
                                id="passwordTextInput" 
                                placeholder="min : 5 character"   
                                onChange={e => setPass(e.target.value)}                           
                                type="text" /> 
                                </Form.Group> : <></>} 
                                {/* INPUT PASSWORD */}

                                 {/* INPUT NIP */}
                                <Form.Group className="mb-3">
                                <Form.Label 
                                className="text-dark"
                                htmlFor="emailTextInput">NIP</Form.Label>
                                {put ? <Form.Control 
                                autoComplete="nope" 
                                id="nipTextInput" 
                                placeholder="min : 18 number" 
                                defaultValue={nip}
                                onChange={e => setNip(e.target.value)}
                                type="text" />: 

                                <Form.Control 
                                autoComplete="nope" 
                                id="nipTextInput" 
                                placeholder="min : 18 number" 
                                onChange={e => setNip(e.target.value)}
                                type="text" />}
                                </Form.Group>  
                                {/* INPUT NIP */}   

                                 <Form.Group className="mb-3">
                                <Form.Label 
                                className="text-dark"
                                htmlFor="roleTextInput">Role</Form.Label>
                                <Form.Select onChange={e => setRlid(e.target.value)} >           
                                    <option style={{color:"gray"}}>Choose Role</option>                      
                                   {rlId === 1 ? <option value="1" selected>Kepala Sekolah</option>
                                  : <option value="1">Kepala Sekolah</option>}
                                  {rlId === 2 ? <option value="2" selected>Wakil Kepala Sekolah Bagian Manajemen Internal</option>
                                  : <option value="2">Wakil Kepala Sekolah Bagian Manajemen Internal</option>}
                                  {rlId === 3 ? <option value="3" selected>Guru Wali Kelas</option>
                                  : <option value="3">Guru Wali Kelas</option>}
                                   {rlId === 4 ? <option value="4" selected>Administrator</option>
                                  : <option value="4">Administrator</option>}
                                  
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
                                </div>
                                 : <div style={{ 
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
                                    User List 
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className="shadow">
                                   <div className="tables">
                                        <Table striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>NIP</th>
                                                <th>Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users.loading ?  <></> : users.data.map((data, idx) => (
                                                <tr>
                                                <td>{idx + 1}</td>
                                                <td  style={{ maxWidth:"100px" }}>{data.username}</td>
                                                <td  style={{ maxWidth:"100px" }}>{data.email}</td>
                                                <td>{data.NIP}</td>
                                                <td style={{ maxWidth:"200px" }}>{data.role}</td>
                                                <td><Button onClick={e => deleteData(data.id)} variant="danger">Delete  <i class="fa fa-trash"></i></Button> <Button variant="success" onClick={e => updateHandler(data.id)}>Edit   <i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button></td>
                                            </tr>     
                                                ))   
                                        }                        
            
                                        </tbody>
                                        </Table>
                                   </div>
                                    <Button variant="primary" onClick={e => setPost(true)}>Add User +</Button> 
                                    <p className="d-inline text-dark ms-4">Data length : {users.data.length}</p>
                                </Card.Body>
                                </Card>                 
                                   
                                </div>
                        </div> }
        </div>
        </>
    )
}
export default Users;