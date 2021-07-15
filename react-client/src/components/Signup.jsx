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
    handleChangeUserName() {
        this.setState({ username: e.target.value })
    }
    handleChangePassword() {
        this.setState({ password: e.target.value })
    }
    addUser() {
        // axios.post('/api/cv', { username: this.state.username, password: this.state.password }).then((data) => {
        //     console.log('data in client', data)

        // })
    }


    render() {

        return (
            <div>
                <form action="/signup" method="post">
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
                    <a href="/login">Login to your account &rarr;</a>
                </p>

            </div>


        )
    }

}

export default Signup;
