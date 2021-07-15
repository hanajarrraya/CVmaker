import React from 'react';
import axios from 'axios';
class Login extends React.Component {
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
    getUser() {
        // axios.get('/api/cv', { username: this.state.username, password: this.state.password }).then((data) => {
        //     console.log('data in client', data)
        //     //redirect to create

        // })
    }

    render() {
        return (
            <div>
                <form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input id="username" type="text" name="username" onChange={this.handleChangeUserName.bind(this)}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input id="password" type="password" name="password" onChange={this.handleChangePassword.bind(this)} />
                    </div>
                    <div>
                        <input type="submit" value="Login" onClick={()=>this.getUser()}/>
                    </div>
                </form>
                <p>
                    <a href="/signup">Create an Account &rarr;</a>

                    </p>
            </div>)
    }

}

export default Login;
