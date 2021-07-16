import React from 'react';

import axios from 'axios';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }

    }
    handleChangeUserName(e) {
        this.setState({ username: e.target.value })
    }
    handleChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    addUser() {
        axios.post('/api/cv', { username: this.state.username, password: this.state.password }).then((data) => {
            console.log('data in client', data)
            this.props.changeView('create');

        })
    }


    render() {

        return (
            <div>
                <form >
                    <div>
                        <label for="username">Username:</label>
                        <input id="username" type="text" name="username" onChange={this.handleChangeUserName.bind(this)} />
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input id="password" type="password" name="password" onChange={this.handleChangePassword.bind(this)} />
                    </div>
                    <div>
                        <input type="submit" value="Login" onClick={() => { this.addUser() }} />
                    </div>
                </form>
                <p>
                    <a onClick={()=>this.props.changeView('login')
                    }>Login to your account </a>
                </p>

            </div>


        )
    }

}

export default Signup;
