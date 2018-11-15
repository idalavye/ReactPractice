import React from 'react';

import AuthContext from '../auth-context';

class Login extends React.Component {

  static contextType = AuthContext;

  componentDidMount() {
    //Bu şekilde context kullanma özelliği react 16.6 sürümünde geldi. Daha öncesinde <AuthContext.Provider> tagı içerisinde 
    //context verilerine ulaşabiliyorduk. Artık istediğimiz yerde erişebiliyoruzz.
    console.log(this.context);
  }

  render() {
    return (
      <button onClick={this.context.toggleAuth}>
        {this.context.isAuth ? 'Logout' : 'Login'}
      </button>
    );
  }
}

export default Login;
