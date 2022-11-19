import {
     Card,
     Container,
     Col,
     Row,
     Form,
     Button,
     Alert

    } from "react-bootstrap"
import bglogin from "../../../assets/img/login-bg.svg"
import "../../css/login.css"
import axios from "axios"
import { useState } from "react"


const Login = () => {
    const [em, setEm] = useState()
    const [pas, setPas] = useState()
    const [err, setErr] = useState(false)
    const login = async(e) => {
        e.preventDefault()
        var data = JSON.stringify({
            "email": em,
            "password": pas
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:8000/api/auth/login',
            headers: { 
              'Content-Type': 'application/json',
            },
            data : data
          };

          axios(config)
          .then(function (response) {
            localStorage.setItem("acess_token", JSON.stringify(response.data))
			localStorage.setItem("isLoggedIn", 1);
            window.location.reload();
          })
          .catch(function (error) {
            if(error.response.status !== 200) {
                setErr(true)
            }
          });
          
        }
        
    return(
            <>
            <Container fluid 
            style={{ backgroundImage:`url(${bglogin})` }}    
            className="container-fluid d-flex vh-100">
                <Row
                id="row"
                 className="col m-auto align-self-center"    
                 >
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                Login            

                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {err === false ? <></> : 
                            <Alert variant="danger">
                                Masukkan password dan username dengan benar
                            </Alert>}
                        <Form>
                            <fieldset>
                                <Form.Group 
                                className="mb-3">
                                <Form.Label 
                                htmlFor="emailTextInput"
                                >Email</Form.Label>
                                <Form.Control 
                                autoComplete="nope"
                                className="bg-muted" onChange={e => setEm(e.target.value)} id="emailTextInput" placeholder="e.g example@mail.com" type="email" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                <Form.Label htmlFor="passwordTextInput">Password</Form.Label>
                                <Form.Control autoComplete="nope" onChange={e => setPas(e.target.value)} id="passwordTextInput" placeholder="min : 5 character" type="password" />
                                </Form.Group>                                
                                <div
                                className="d-flex justify-content-center"
                                >
                                <Button 
                                style={{ backgroundColor:"#123860" }}
                                size="lg"
                                className="mt-3"
                                onClick={login}
                                 >Login</Button>
                                </div>
                            </fieldset>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
            </>
          );
        }

export default Login
