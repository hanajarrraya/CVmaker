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
      id:""
      
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView(option) {
    this.setState({
      view: option,
      
    });
  }
  changeId(id) {
    this.setState({
      id:id,
      
    });
  }
  renderView() {
    const { view } = this.state;

    if (view === 'logout' || view === 'login') {
      return <Login changeView={this.changeView} changeId={this.changeId.bind(this)} />
    } else if (view === 'create') {
      return <Create id={this.state.id} />
    }else if (view === 'signup') {
      return <Signup changeView={this.changeView} changeId={this.changeId.bind(this)} />
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
