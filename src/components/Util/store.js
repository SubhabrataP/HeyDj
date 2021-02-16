import React, { createContext } from "react";
let initialState = {
  userRole: "",
  userToken: "",
};

export const UserState = createContext(initialState);

class UserContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  handleUserUpdate = ({ userRole = "", userToken = "" }) => {
    this.setState({ userRole, userToken });
  };

  render() {
    return (
      <UserState.Provider
        value={{
          userRole: this.state.userRole,
          userToken: this.state.userToken,
          handleUserUpdate: this.handleUserUpdate,
        }}
      >
        {this.props.children}
      </UserState.Provider>
    );
  }
}

export default UserContext;
