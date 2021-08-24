import { Component} from 'react';

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
    constructor(props) {
        super(props)
    }


	render() {
		return (
            <div className="container-fluid bg-danger"><h1 className="text-danger">Main Page</h1>
            <div className="card-columns bg-success">
                    {this.props.topThingsData.map((element, index) => (
                        <Card content={element} />
                    )
                    )}
                </div>
            </div>
        );
}
}

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {page: "home"};
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

        return (
            <div className="container-fluid bg-secondary">
                <div className="jumbotron-fluid mx-auto bg-primary" >
					<h1 className="display-4">Spotify App</h1>
                    <Navbar onClick={this.setPage} />
                    <hr className="my-4" />
                    {currentPage}
				</div>
            </div>
        );
       
    }
}



