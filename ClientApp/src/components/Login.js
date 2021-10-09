import React,{ Component} from 'react';
import { Button, NavLink} from 'reactstrap'
import { Link } from 'react-router-dom';

export class Login extends Component{
    render() {
        return (
            <div className="my-auto bg-danger login-container">
                <h1>Tytuł aplikacji czy coś</h1>
                <Button color="success"><NavLink tag={Link} className="text-dark" to="/signin">Zaloguj</NavLink></Button>

            </div>
        )
    }
}