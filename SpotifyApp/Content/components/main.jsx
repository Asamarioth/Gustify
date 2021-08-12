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
class HomePage extends Component {
	render() {
		return (
            <div><h1 className="text-danger">Main Page</h1>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Popularity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.topThingsData.map((element) => (
                            <tr //key={element.name}
                            >
                            <td>
                                <img
                                    width="100px"
                                    height="100px"
                                    //src={element.album.images[0].url}
                                    src={element.image}
                                ></img>
                            </td>
                            <td>{element.name}</td>
                            <td>{element.popularity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table></div>
		);
	}
}
export default class RootComponent extends Component {
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
            <div className="container">
                <div className="jumbotron">
					<h1 className="display-4">Spotify App</h1>
                    <Navbar onClick={this.setPage} />
                    <hr className="my-4" />
                    {currentPage}
				</div>
            </div>
        );
       
    }
}