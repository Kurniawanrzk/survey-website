import { Card,Table } from "react-bootstrap";
import Sidebar from "./sidebar";
import { 
    useEffect ,
    useState
} from "react"
import axios from "axios"

const Home = () => {
const [profile, setProfile] = useState({})
useEffect(() => {
    document.title = "Home Page | App Survey Kelas"
  const me = async() => {
    var config = {
    method: 'get',
    url: 'http://localhost:8000/api/auth/me',
    headers: { 
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("acess_token")).access_token}`
    }
  };

  await axios(config)
  .then(function (response) {
    localStorage.setItem("profil", JSON.stringify(response.data));
    setProfile(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  me()

  }, [])
    return(
    <div>
        <div className="d-flex">
            <div className="">
                <Sidebar />
            </div>
            <div style={{ 
                backgroundColor:"#0E2945"
                ,color:"white",
                width:"100%",
                height:"100vh",
                display:"flex", 
                flexDirection:"column",
                gap:"20px" }}>
                    <div style={{ display:"flex",justifyContent:"center",marginTop:"20px",gap:"20px"}}>
                    <Card className="rounded-4" style={{ width: '30rem',height:"250px" }}>
                    <Card.Body className="shadow">
                        <Card.Title className="text-dark">Your Profile</Card.Title>
                        <Card.Text className="text-dark">
                        Username : {profile.username}
                        </Card.Text>
                        <Card.Text className="text-dark">
                        NIP : {!isNaN(profile.NIP) ? <>None</> : profile.NIP}
                        </Card.Text>
                        <Card.Text className="text-dark">
                        Role : {profile.role}
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                    </Card>                 
                    <Card className="rounded-4" style={{ width: '18rem',height:"250px" }}>
                    <Card.Body>
                        <Card.Title className="text-dark">Quote of the day</Card.Title>
                        <Card.Text className="text-dark">
                            "Happiness is not something ready made. It comes from your own actions"
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                    </Card>    
                    </div>
                    
                    <div style={{ display:"flex",justifyContent:"center" }}>
                    <Card className="rounded-4" style={{ width: '49rem',height:"fit-content" }}>
                    <Card.Header className="text-dark">
                        <Card.Title>
                        User Log
                        </Card.Title>
                    </Card.Header>
                    <Card.Body className="shadow">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Name</th>
                                    <th>Name</th>
                                    <th>Name</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>Name</td>
                                    <td>Name</td>
                                    <td>Name</td>
                                    <td>Name</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>Name</td>
                                    <td>Name</td>
                                    <td>Name</td>
                                    <td>Name</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>Name</td>
                                    <td>Name</td>
                                    <td>Name</td>
                                    <td>Name</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                    </Card>                 
                       
                    </div>
            </div>
        </div>
    </div>
    );
}
export default Home;
