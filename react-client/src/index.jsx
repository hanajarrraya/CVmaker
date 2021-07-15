import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Create from './components/Create.jsx';

import axios from 'axios';

/*
  READ THESE COMMENTS AS A PART OF STEP TWO

  To manage switching among the different views in this application, 
  we have implemented a "view switcher" in the `App` component. 

  There are three key parts to the view switcher:
    1. The `view` property defined on the `App` component's `state`
    2. The `changeView` method defined on the `App` component
    3. The `renderView` method defined on the `App` component

  The value of the `view` property will determine which gets returned by the
  `renderView` method, which is invoked inside the `App` component's `render`. 
  You can set the initial value of `view` in the `App` component's `constructor`
  function, determining what view gets rendered "by default".

  If you haven't modified this code yet, the view switcher observes the following rules:
  - The default view is 'feed'
  - If the view is set to 'feed', the `<Feed>` component is displayed
  - If the view is set to any other value, the `<Post>` component is displayed
  - The `changeView` function should change the value of `view` in the `App` component's state.

  You'll make some refactors and additions to this view switcher throughout the
  next steps of the assessment. When you're ready, return to the README.
*/

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'login',
      items: [],
      post: {}
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView(option, post) {
    this.setState({
      view: option,
      post: post
    });
  }
  // componentDidMount(){
  // //get items of feed from db
  // axios.get('/api/blogs').then(({data})=>{
  //   //  console.log('data in client',data)
  //   this.setState({
  //     items:data
  //   })
  // }

  // )


  // }
  renderView() {
    const { view } = this.state;

    if (view === 'logout' || view === 'login') {
      return <Login />
    } else if (view === 'create') {
      return <Create />
    }

  }
  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo"
            onClick={() => this.changeView('login')}>
            CVmaker
          </span>

          <span className="nav-unselected" onClick={() => this.changeView('create')}>
            Create
          </span>

          <span className="nav-unselected" onClick={() => this.changeView('logout')}>
            Logout
          </span>
        </div>

        <div className="main">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('cvmaker'));
