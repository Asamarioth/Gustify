import { Component, Fragment } from 'react';
import {
    Link,
    BrowserRouter,
    Route,
    Switch,
    StaticRouter,
    Redirect,
    MemoryRouter,
} from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/playlists">Playlisty</Link>
                </li>

            </ul>
        );
    }
}

class PlaylistsComponent extends Component {
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
                        <tr>
                            <td>
                                <img
                                    width="100px"
                                    height="100px"
                                    src={element.images[0].url}
                                ></img>
                            </td>
                            <td>{element.name}</td>
                            <td>{element.owner.displayName}</td>
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
                <table class="pure-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Popularity</th>
                        </tr>
                    </thead>
                    {this.props.topThingsData.map((element) => (
                        <tr>
                            <td>
                                <img
                                    width="100px"
                                    height="100px"
                                    src={element.album.images[0].url}
                                ></img>
                            </td>
                            <td>{element.name}</td>
                            <td>{element.popularity}</td>
                        </tr>
                    ))}
                </table></div>
		);
	}
}
export default class RootComponent extends Component {

    render() {
        const app = (
            <div className="container">
                <div className="jumbotron">
					<h1 className="display-4">Spotify App</h1>
					<Navbar />
					<hr className="my-4" />
					<Switch>
						<Route
							exact
							path="/"
                            component={() => (
                                <HomePage
                                    topThingsData={this.props.topThingsData}
                                />
                            )} />
                        <Route path="/playlists" component={() => (
                                <PlaylistsComponent
                                    playlistsData={this.props.playlistsData}
                                    />
                                    ) } />
						<Route
							path="*"
							component={({ staticContext }) => {
								if (staticContext) staticContext.status = 404;

								return <h1>Not Found :(</h1>;
							}}
						/>
					</Switch>
				</div>
            </div>
        );
        if (typeof window === 'undefined') {
            return (
                <StaticRouter
                    context={this.props.context}
                    location={this.props.location}
                >
                    {app}
                </StaticRouter>
            );
        }
        return <BrowserRouter>{app}</BrowserRouter>
    }
}