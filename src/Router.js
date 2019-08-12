import React, { Component } from "react";
import { View, Platform, Text } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createSwitchNavigator
  } from "react-navigation";
  import Login from "./Login";
  import AuthLoadingScreen from "./AuthLoadingScreen";
  import Inventory from "./Components/HomePage/Inventory";

  const LoginStackNew = createStackNavigator(
    {
      Inventory: { screen: Inventory },
    },
    {
      initialRouteName: "Inventory",
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    }
  );
  const LoginStack = createStackNavigator(
    {
      Login: { screen: Login },
      Navigation: { screen: LoginStackNew }
    },
    {
      initialRouteName: "Login",
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    }
  );
  const MainNav = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: LoginStackNew,
      Auth: LoginStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  );
class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return <MainNav/>;
  }
}
export default Router;
