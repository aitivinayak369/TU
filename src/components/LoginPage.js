import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


class LoginPage extends Component {

  constructor(props)
  {
    super(props)
    this.state={
      error:""
    }
  }
  loginHandler()
  {
    console.log("you clicked login button!")
  }
  render() {
    return (
      <Container>
        <Row style={{marginTop:"15%"}}>
      
        <Col xs="4">
        </Col>
        <Col xs="4">
        <Card >
          <Card.Header>
            Login
          </Card.Header>
          <Card.Body>
          <Form>
            <Form.Control placeholder="user name" >

            </Form.Control >
            <br/>
            <br/>
            <Form.Control placeholder="password"  type="password">

            </Form.Control>
            <br/>
            <br/>
            <Row>
              <Col xs="4">
              </Col>
              <Col xs="6">
              <Button onClick={this.loginHandler} variant="warning">
              Login
            </Button>
              </Col>
            </Row>
           
          </Form>
          </Card.Body>
        </Card>
        </Col>
           
        </Row>
      </Container>
    );
  }
}

export default LoginPage;
