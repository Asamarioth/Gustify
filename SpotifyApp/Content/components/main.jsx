import { Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

class Navbar extends Component {
    render() {
        return (
            <ul>
                <li>
                    <button onClick={this.props.onClick.bind(this, "home")}>Home</button>
                </li>
                <li>
                    <button onClick={this.props.onClick.bind(this, "playlist")}>Playlisty</button>
                </li>

            </ul>
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
            timeout={500 * (index +1)}
            classNames = {"example" + (index + 1)}>
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
        this.state = {page: "notLogged"};
    }

    setPage = (pageName) =>  {
        this.setState({page: pageName});
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
                <Navbar onClick={this.setPage} />
                    {currentPage}
				</div>
            </div>
        );
       
    }
}



