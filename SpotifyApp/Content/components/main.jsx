import { Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

class Navbar extends Component {

textArray = ["Tekst 1", "Tekst 2", "Tekst 3", "Tekst 4", "Tekst 5"]
constructor(props) {
    super(props)
    this.state={inProp:true}
}
    swapInProp = (timeout) => {
        const timer = setTimeout(() => {         
            this.setState({inProp:!this.state.inProp})
        }, timeout);
        return () => clearTimeout(timer);
      };
    render() {
        return (
            <CSSTransition
            in={this.state.inProp}
            appear={true}
            timeout={1000}
            classNames="text"
            //coś mi tu umyka ale te timery poniżej muszą być z jakiegoś powodu odwrotnie
            //ten w onExited odpowiada za to ile czasu tekst pozostaje na ekranie,
            //a ten w onEntered ile trwa przerwa między wymianą zawartości
            //timery nmuszą być co najmniej 1100 bo komponent wariuje i natychmiastowo pojawia się i znika
            onEntered={this.swapInProp(1100)}
            onExited={this.swapInProp(5000)}
            >
                <h1 className="text">{this.textArray[this.props.appState]}</h1>
            </CSSTransition>
            
        );
    }
}

class PlaylistsPage extends Component {
    render() {
        return (
            <div><h1 className="font-weight-italic">Playlisty</h1>
                    <table class="pure-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    {this.props.playlistsData.map((element) => (
                        <tr //key={element.name}
                        >
                            <td>
                                <img
                                    width="100px"
                                    height="100px"
                                    //src={element.images[0].url}
                                    src={element.image}
                                ></img>
                            </td>
                            <td>{element.name}</td>
                            <td>{element.displayName}</td>
                        </tr>
                    ))}
                </table></div>
        );
    }
}

class Card extends Component {
    render() {
    return(
        <div className="card" style={{ width: "200px" }}>
            <img className="card-img-top" src={this.props.content.image} style={{ width: "200px", height:"200px" }} />
            <div className="card-body text-center">
            <p className="card-text">{this.props.content.name} </p>  
            <p className="card-text">{this.props.content.artist} </p>  
            <p className="card-text">{this.props.content.album} </p>  
            </div>
        </div>
    );
    }
}


class HomePage extends Component {

	render() {
         
		return (
            <div className="container-fluid bg-danger"><h1 className="text-danger">Main Page</h1>
            <div className="card-columns bg-success">
            <TransitionGroup
            component={null}
            appear={true}>
            {this.props.topThingsData.map((element, index) => (
            <CSSTransition
            key={index}
            timeout={2000}
            classNames = "card">
                        <Card content={element} key={index} />
                        </CSSTransition>
                    )
                    )}
               </TransitionGroup>     
                </div>
            </div>
        );
}
}
class LoginPage extends Component{
    render() {
        return (
            <>
                <h1>Tytuł aplikacji czy coś</h1>
                <button className="btn btn-success" onClick={this.props.onClick.bind(this, "home")}>Zaloguj</button>
            </>
        )
    }
}


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {page: "notLogged",
                      appState: 0  };
    }
    
    setPage = (pageName) =>  {
        this.setState({page: pageName});
    }
    setAppState = (newAppState) => {
        this.setState({appState: newAppState})
    }
    incrementAppState =() => {
        this.setState({appState: this.state.appState + 1})
    }




    render() {
        let currentPage
        if (this.state.page == "home") {
            currentPage = <HomePage topThingsData={this.props.topThingsData} />;
        }
        else if (this.state.page == "playlist") {
            currentPage = <PlaylistsPage playlistsData={this.props.playlistsData} />;
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
                <h1>{this.state.appState}</h1>
                    {currentPage}
				</div>
            </div>
        );
       
    }
}


//<ul>
//<li>
//    <button onClick={this.props.onClick.bind(this, "home")}>Home</button>
//</li>
//<li>
//    <button onClick={this.props.onClick.bind(this, "playlist")}>Playlisty</button>
//</li>
//</ul>