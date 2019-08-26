import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  ImageBackground
} from "react-native";
// import {AsyncStorage} from "@react-native-community/async-storage";
import SplashScreen from "react-native-splash-screen";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
const background = require("./Img/background.png");
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("jwtToken");
    SplashScreen.hide();
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <ImageBackground
        source={background}
        style={[styles.background]}
        resizeMode="cover"
        blurRadius={8}
      >
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  background: {
    flex: 1
  }
});

export default AuthLoadingScreen;
