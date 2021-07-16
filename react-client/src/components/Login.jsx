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
         axios.get('/api/cv', { username: this.state.username }).then((error,data) => {
             if (error) throw error
             else{
                console.log('data in client', data.password)
                //redirect to create
                if(data.password===this.state.password){
   
                   this.props.changeView('create')
                }
             }
            
            

        })
    }

    render() {
        return (
            <div>
                <form >
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
                    <a onClick={()=>this.props.changeView('signup')} >Create an Account </a>

                    </p>
            </div>)
    }

}

export default Login;
