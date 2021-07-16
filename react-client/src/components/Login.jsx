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
    handleChangeUserName(e) {
        this.setState({ username: e.target.value })
    }
    handleChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    getUser() {
        axios.post('/api/cv/login',{ username: this.state.username, password: this.state.password }).then(({data}) => {

            // console.log('data in client', data)
                if(data.length===1){
                    console.log("id in login=",data[0]._id)
                    localStorage.setItem('_id', JSON.stringify(data[0]._id));
                    this.props.changeView('create')
                }
            


        })
    }

    render() {
        return (
            <div>
                <div >
                    <div>
                        <label>Username:</label>
                        <input id="username" type="text" name="username" onChange={this.handleChangeUserName.bind(this)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input id="password" type="password" name="password" onChange={this.handleChangePassword.bind(this)} />
                    </div>
                    <div>
                        <button   onClick={() => this.getUser()} >Login</button>
                    </div>
                </div>
                <p>
                    <a onClick={() => this.props.changeView('signup')} >Create an Account </a>

                </p>
            </div>)
    }

}

export default Login;
