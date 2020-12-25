import React, { Component } from 'react';
import ReactDOM from 'react-dom'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
//  import Col from 'react-bootstrap/Col'
  import Row from 'react-bootstrap/Row'
import { Col } from 'react-bootstrap';
//import { Col } from 'react-bootstrap';

//import { Button } from 'react-bootstrap';


class Timer extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            timer:15
        }
    }
    componentDidMount()
    {
        let count=0;
        let setinterval= setInterval(() => {
            count++;
            if(count>4)
            {
               
               
                clearInterval(setinterval);
                window.location.href=document.getElementById("url").value;
               // console.log(document.getElementById("url.value"))
            }
            else{
                this.setState({
                    timer:16-count
                })
            }
        }, 1000);
    }
    render() {
        return (
            <Container >
                <Row  style={{marginTop:"20%"}}> 
                 <Col xs="3">
                 </Col>
                 <Col xs="auto">
                 <h1>Hold on...</h1>
                <h2>You will be redirected within {this.state.timer} seconds.</h2>
                 </Col>
                 
                   
                </Row>
            </Container>
        );
    }
}

ReactDOM.render(<Timer/>,document.getElementById('app'))