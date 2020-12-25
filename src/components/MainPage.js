import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'

class MainPage extends Component {

    constructor(props)
    {
        super(props)
        this.URLref = React.createRef()
        this.shortURLRef = React.createRef()
        this.state={
            shortenedURL:"",
            variant:"success",
            buttonName:"Copy"
        }
    }
    //s://sleepy-ravine-77519.herokuapp.com/shorten
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }
    shortenHandler=()=>
    {
       if(this.validURL(this.URLref.current.value))
       {
        fetch('http://localhost:3000/shorten',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({url:this.URLref.current.value})}).then((res)=>res.json()).then((data)=>{
            console.log(data)
            this.setState({
                shortenedURL:data.shortURL
            })
        }).catch((err)=>{
            console.log(err)
        })
       }
       else
       {
           this.setState({
              error:"Please type a valid URL"
           })
       }
    }
    copyClipboardHandler=()=>{
        var copyText = this.shortURLRef.current;
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        
       this.setState({
           buttonName:"Copied!",
           variant:"warning",
           error:""

       })
    }
    mouseOutHandler=()=>{
        this.setState({
            buttonName:"Copy",
            variant:"success"
        })
    }
    render() {
        return (
           
            <Container style={{marginTop:"13%"}} className="pl-2 pr-2">
             {this.state.error && <Row>
                  <Col xs="2">
                  </Col>
                  <Col xs="8">
                      <Alert variant="warning" >
                          <Row>
                              <Col xs="10">
                              <p style={{padding:"0px",margin:"0px"}}>
                          {this.state.error}
                          
                          </p>
                              </Col>
                              <Col xs="2">
                              <span onClick={() => this.setState({error:""})} style={{cursor:"pointer"}}>
                                x
                             </span>
                              </Col>

                          </Row>
                         
                          
                      </Alert>
                  </Col>
              </Row>}

            <Row className="mb-2">
           
                <Col   md="10" >

           
            
              
      <Form.Control  placeholder="URL" ref={this.URLref} className="mt-2" size="lg" style={{color:"blue"}}/>
               
<div data-WRID="WRID-160835542519485299" data-widgetType="staticBanner" data-responsive="yes" data-class="affiliateAdsByFlipkart" height="250" width="300"></div>
<div>
check!
</div>
             
               
    
     
    
   
    </Col>
   
    <Col md="2"  >
    <Button block size="lg" onClick={this.shortenHandler } className="mt-2">Shorten</Button>
    </Col>
    </Row>
        
          {this.state.shortenedURL && 
            <Row>
              
            <Col md="10">
            
          
            <Form.Control
      size="lg"
      value={this.state.shortenedURL}
      ref={this.shortURLRef}
      style={{color:"blue"}}
      className="mt-2"
    />
           
    
   
      
     
 
  
 
            </Col>
        
            <Col md="2" >
            <Button block className="mt-2"  size="lg" variant={this.state.variant} ref={this.copyButtonRef} onClick={this.copyClipboardHandler} 
      onMouseOut={this.mouseOutHandler}>{this.state.buttonName
      }</Button>
            </Col>
          
            </Row>} 

              
            </Container>
           
        );
    }
}

export default MainPage;

// // "heroku-postbuild": "npm run build:prod"