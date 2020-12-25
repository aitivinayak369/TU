import LoginPage from './LoginPage'
import Table from 'react-bootstrap/Table'

import React, { Component } from 'react';
import  Button  from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class DashboardPage extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      data:[],
      page:1,
      loadMoreButton:"Load More",
      sortby:"desc",
      loadMoreButtonVisible:true
    }
  }
  componentDidMount()
  {
    // let data = JSON.parse(localStorage.getItem('data'))
    // if(data)
    // {
    //   console.log("localStorage data")
    //   this.setState({
    //     data:data,

    //   })
    // }
    // else{
      fetch(`http://localhost:3000/URLsData/${this.state.page}`).then((result)=>{

        return result.json()
      }).then((data)=>{
      //  localStorage.setItem("data",JSON.stringify(data))
    //  console.log(data)
      
        this.setState({
          data:this.state.data.concat(data)
        })
     
    
       
      }).catch(err=>{
        console.log(err)
      }
    )
  
}
componentDidUpdate()
{
  //localStorage.setItem("data",JSON.stringify(this.state.data)) 
}

loadMoreHandler=()=>
{
  this.setState({loadMoreButton:"Loading..."})
  fetch(`http://localhost:3000/URLsData/${this.state.page+1}`).then((result)=>{

    return result.json()
  }).then((data)=>{
  //  localStorage.setItem("data",JSON.stringify(data))
  if(data.length)
  {
    this.setState({
      data:this.state.data.concat(data),
      page:this.state.page+1,
      loadMoreButton:"Load More"
    })
  }
  else{
this.setState({
  loadMoreButtonVisible:false
})
  }
    
   // console.log(data)
  }).catch(err=>{
    console.log(err)
  }
)
}
sortByClicks=()=>{
  this.setState({
    sortby:(this.state.sortby=="asc"?"desc":"asc")
  })
}
  render() {
    return (
      <div>
         <Table responsive>
  <thead>
    <tr>
    <th>#</th>
    
    
    <th>Clicks<img src="/images/sortupdown.png" onClick={this.sortByClicks} style={{cursor:"pointer", marginLeft:"3px", width:"9px",height:"9px"}}/></th>
    
  
  
    <th>Original Url</th>
    
 
 
    <th>Short Url</th>
    </tr>
    
      
   
  </thead>
  <tbody>
  
  {this.state.data.sort((a,b)=>{  
    if(this.state.sortby=="asc")
    return a.count-b.count;
    else
     return b.count-a.count;
  }
  
  ).map((item,index)=>{
    return (
      <tr key={index}>
    <td>{index+1}</td>
    
    <td>{item.count}</td>
    
    <td><a href= {item.URL} >{item.URL}</a></td>
 
    <td><a href={"http://localhost:3000/"+item.code}>{"http://localhost:3000/"+item.code}</a></td>
    </tr>
    )
  }) }
  </tbody>
 
</Table>
{this.state.loadMoreButtonVisible&&<Row>
  <Col xs="4">
  </Col>
  <Col xs="6">
<Button onClick={this.loadMoreHandler} variant="success">{this.state.loadMoreButton}</Button>
  </Col>
</Row>}

      </div>
    );
  }
}

export default DashboardPage;

