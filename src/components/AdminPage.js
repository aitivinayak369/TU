import React, { Component } from 'react';
import DashboardPage from './DashboardPage';
// import LoginPage from './LoginPage';
import ReactDOM from 'react-dom'
import  Container  from 'react-bootstrap/Container';
class AdminPage extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            loading:true
        }
    }
    componentDidMount()
    {
        this
    }
    render() {
        return (
            <Container>
               <DashboardPage/>
            </Container>
        );
    }
}

ReactDOM.render(<AdminPage/>,document.getElementById("app"))