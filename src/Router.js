import React, { Component } from "react";
import { View, Platform, Text, Alert } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import Login from "./Login";
import AuthLoadingScreen from "./AuthLoadingScreen";
import Inventory from "./Components/HomePage/Inventory";
import EditPage from "./Components/EditPage/EditPage";
import ViewPage from "./Components/ViewPage/ViewPage";
import Camera from "./Components/CameraPage/Camera";
import Geolocation from "@react-native-community/geolocation";

const LoginStackNew = createStackNavigator(
  {
    Inventory: { screen: Inventory },
    EditPage: { screen: EditPage },
    ViewPage: { screen: ViewPage },
    Camera: { screen: Camera }
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
    this.state = {
      initialPosition: ""
    };
  }

  componentDidMount() {
    console.log("LOCATION");

    Geolocation.getCurrentPosition(
      position => {
        console.log("POSITION", position);
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      error => Alert.alert("Error", JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    console.log("LOCATION FINAL");
  }
  render() {
    return <MainNav />;
  }
}
export default Router;
