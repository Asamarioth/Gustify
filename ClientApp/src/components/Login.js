import React,{ Component} from 'react';
import { Button, NavLink} from 'reactstrap'
import { Link } from 'react-router-dom';

export class Login extends Component{
    render() {
        return (
            <div className="my-auto  login-container">
                <h1 className='app-title'>GUSTIFY</h1>
                <Button className='login-button'>
                    <NavLink tag={Link} className='login-button-link' to="/signin">Zaloguj</NavLink>
                    </Button>

            </div>
        )
    }
}