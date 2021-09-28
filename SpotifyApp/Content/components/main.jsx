import { Component} from 'react';
import {Navbar} from "./navbar.jsx";
import {HomePage} from "./homePage.jsx";
import {LoginPage} from './loginPage.jsx';




export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {page: "notLogged",
                      appState: -1  };
    }
    cards = []


    setPage = (pageName) =>  {
        this.setState({page: pageName});
    }
    setAppState = (newAppState) => {
        this.setState({appState: newAppState})
    }
    incrementAppState =() => {
        this.manageAppState()
        this.setState({appState: this.state.appState + 1})

    }
    manageAppState = () => {
        if(this.state.appState >= -1 && this.state.appState < 9) {
            this.cards.push({
                id:this.state.appState + 1, cardContent:this.props.topTracks[this.state.appState + 1]
         })
        }
    }
    


    render() {
        let currentPage
        if (this.state.page == "home") {
            currentPage = <HomePage topTracks={this.cards} appState={this.state.appState} />;
        }
        else if(this.state.page == "notLogged") {
            currentPage = <LoginPage onClick={this.setPage}/>;
            return (
                <div className="d-flex justify-content-center bg-secondary" style={{height: "100vh"}}>
                    <div className="my-auto bg-danger login-container">
                        {currentPage}
                    </div>
                    </div>
            )
        }
        return (
            <div className="container-fluid bg-secondary" style={{height: "100vh"}}>
                <div className="jumbotron-fluid mx-auto bg-primary" >
                <Navbar onClick={this.setPage} incrementAppState={this.incrementAppState} appState={this.state.appState} />
                <h1 onClick={this.incrementAppState}>{this.state.appState}</h1>
                    {currentPage}
				</div>
            </div>
        );
       
    }
}
