import { Component} from 'react';

export class LoginPage extends Component{
    render() {
        return (
            <>
                <h1>Tytuł aplikacji czy coś</h1>
                <button className="btn btn-success" onClick={this.props.onClick.bind(this, "home")}>Zaloguj</button>
            </>
        )
    }
}