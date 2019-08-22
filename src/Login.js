import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  AlertIOS,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  Switch,
  Platform,
  ScrollView,
  Image
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { emailChange, passwordChange, loginUser } from "./actions";
import { Spinner, Styles, Button } from "./common";
const { width, height } = Dimensions.get("window");
const background = require("./Img/background.png");
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      biometryType: "",
      email: "",
      password: "",
      fingerSwitch: false
    };
  }
  // render(){
  //   return(
  //     <View><Text>Hello</Text></View>
  //   );
  // }
  // renderButton() {
  //   // if (this.props.loading) {
  //     return <Spinner size="large" />;
  //   // }
  // }
  onEmailChange(text) {
    this.props.emailChange(text);
  }
  onPasswordChange(text) {
    this.props.passwordChange(text);
  }
  onButtonPress() {
    console.log(this.props);
    // const email = this.props.email;
    // const password = this.props.password;
    // const navigation = this.props.navigation;
    // if (email && password) {
    //   this.props.loginUser({ email, password, navigation });
    // } else {
    //   this.props.loginUserError();
    // }
  }

  //   componentWillMount() {
  //     TouchID.isSupported()
  //       .then(biometryType => {
  //         console.log("WE WANT THIS BIOMETRY", biometryType);
  //         if (biometryType === "FaceID") {
  //           console.log("FaceID is supported.");
  //           this.setState({ biometryType: "Enable FaceID" });
  //         }
  //         if (biometryType === "TouchID" || biometryType == true) {
  //           console.log("TouchID is supported.");
  //           this.setState({ biometryType: "Enable TouchID" });
  //         }
  //         if (biometryType === "") {
  //           console.log("TouchID not supported");
  //         }
  //       })
  //       .catch(e => console.log("TouchID not supported"));
  //     console.log(this.state.biometryType);
  //     AsyncStorage.getItem("touchid")
  //       .then(res => {
  //         console.log(res);
  //         if (res == "true") {
  //           this.setState({ fingerSwitch: true });
  //           this.authenticate();
  //         }
  //       })
  //       .catch(e => console.log(e));
  //   }
  // switchChange() {
  //   // if (this.state.fingerSwitch === false) {
  //   //   this.setState({ fingerSwitch: true });
  //   //   AsyncStorage.setItem("touchid", "true")
  //   //     .then(res => {
  //   //       // console.log(res);
  //   //     })
  //   //     .catch(e => console.log(e));
  //   //   //this._pressHandler();
  //   // }
  //   // if (this.state.fingerSwitch === true) {
  //   //   this.setState({ fingerSwitch: false });
  //   //   AsyncStorage.setItem("touchid", "false")
  //   //     .then(res => {
  //   //       // console.log(res);
  //   //     })
  //   //     .catch(e => console.log(e));
  //   // }
  //   // AsyncStorage.getItem("touchid")
  //   //   .then(res => {
  //   //     console.log(res);
  //   //   })
  //   //   .catch(e => console.log(e));
  // }

  //   _pressHandler() {
  //     this.authenticate();
  //     console.log("pressHandler");
  //     TouchID.isSupported()
  //       .then(biometryType => {
  //         console.log(biometryType);
  //         if (biometryType === "FaceID") {
  //           console.log("FaceID is supported.");
  //           this.setState({ biometryType: "Enable FaceID" });
  //           this.authenticate();
  //         }
  //         if (biometryType === "TouchID") {
  //           console.log("TouchID is supported.");
  //           this.setState({ biometryType: "Enable TouchID" });
  //           this.authenticate();
  //         }
  //         if (biometryType === "") {
  //           console.log("TouchID not supported");
  //         }
  //       })
  //       .catch(error => {
  //         console.log("TouchID not supported error");
  //       });
  //   }
  //   authenticate() {
  //     return TouchID.authenticate()
  //       .then(success => {
  //         //AlertIOS.alert("Authenticated Successfully");
  //         console.log("TouchID");
  //         this.retrieveData();
  //       })
  //       .catch(error => {
  //         console.log(error.message);
  //         //AlertIOS.alert(error.message);
  //       });
  //   }

  //   retrieveData() {
  //     console.log("retrieveData");
  //     AsyncStorage.getItem("email")
  //       .then(res => {
  //         console.log("EMAIL");
  //         console.log(res);
  //         if (res && res.length > 0) {
  //           this.onEmailChange(res);
  //         }
  //       })
  //       .catch(e => console.log(e));

  //     AsyncStorage.getItem("password")
  //       .then(res => {
  //         console.log(res);
  //         console.log("PASSWORD");
  //         if (res && res.length > 0) {
  //           this.onPasswordChange(res);
  //         }
  //         if (this.props.email && this.props.password) {
  //           console.log("button press");
  //           this.onButtonPress();
  //         }
  //       })
  //       .catch(e => console.log(e));

  //     AsyncStorage.getItem("accesstoken")
  //       .then(res => {
  //         console.log(res);
  //         console.log("ACCESSTOKEN");
  //         if (res) {
  //           let navigation = this.props.navigation;
  //           this.props.fbTouch(res, navigation);
  //         }
  //       })
  //       .catch(e => console.log(e));

  //     AsyncStorage.getItem("googleAccess")
  //       .then(res => {
  //         console.log("googleAccess ");
  //         console.log(res);
  //         const googleAccess = res;
  //         if (res) {
  //           AsyncStorage.getItem("idToken")
  //             .then(res => {
  //               const idToken = res;
  //               let navigation = this.props.navigation;
  //             })
  //             .catch(e => console.log(e));
  //         }
  //       })
  //       .catch(e => console.log(e));
  //   }

  onSignIn() {
    console.log("signin", this.props);
    this.props.loginUser(this.props);
    // this.props.navigation.navigate("Navigation");
  }
  render() {
    return (
      <ImageBackground
        source={background}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.mainContainer}>
          <View style={styles.markWrap}>
            <Image
              source={require("./Img/logo.png")}
              style={{ width: 110, height: 143 }}
            />
            {/* <View style={styles.titleContainer}>
                <Text style={styles.titleText}>EXPLORE</Text>
                <View style={styles.subContainer}>
                  <Text style={styles.subtitleText}>FLORIDA</Text>
                </View>
              </View> */}
          </View>
          <View>
            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
              <View style={styles.inputWrap}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#000"
                  style={[Styles.input, styles.blackFont]}
                  //onChangeText={Email => this.setState({ Email })}
                  onChangeText={this.onEmailChange.bind(this)}
                  value={this.props.email}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.inputWrap}>
                <TextInput
                  placeholderTextColor="#000"
                  placeholder="Password"
                  style={[Styles.input, styles.blackFont]}
                  //onChangeText={Password => this.setState({ Password })}
                  onChangeText={this.onPasswordChange.bind(this)}
                  //value={this.state.Password}
                  ref={input => (this.passwordInput = input)}
                  value={this.props.password}
                  returnKeyType="go"
                  onSubmitEditing={this.onButtonPress.bind(this)}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate("Forget")}
              >
                <View style={{ padding: 10 }}>
                  <Text
                    style={{
                      color: "#007AFF",
                      fontSize: 12,
                      fontWeight: "bold",
                      textAlign: "right"
                    }}
                  >
                    Forgot Password?
                  </Text>
                </View>
              </TouchableOpacity>
              {this.state.biometryType.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={styles.fingerPrint}>
                    {this.state.biometryType}
                  </Text>
                  <Switch
                    value={this.state.fingerSwitch}
                    onValueChange={() => this.switchChange()}
                  />
                </View>
              )}
              {this.props.loading ? (
                <Spinner />
              ) : (
                <Button label="Sign In" onClick={() => this.onSignIn()} />
              )}
              {/* <View style={styles.button}>
                    {this.props.loading ? (
                      <Spinner />
                    ) : (
                      <Text style={styles.buttonText}>Sign In</Text>
                    )}
                  </View> */}

              <Text style={styles.errorTextStyle}></Text>
            </KeyboardAvoidingView>
            <View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                {/* <SocialIcon
                    button
                    type="facebook"
                    title="Facebook"
                    style={styles.socialStyle}
                    iconSize={17}
                    onPress={() => this.props.fbLogin(this.props.navigation)}
                  />
                  <SocialIcon
                    button
                    type="google"
                    title="Google"
                    style={styles.socialStyle}
                    iconSize={17}
                    onPress={
                      () => this.props.googleLogin(this.props.navigation)
                      // AlertIOS.alert(
                      //   "Google Authentication is not ready yet. Please wait!"
                      // )
                    }
                  />  */}
              </View>
              <View style={styles.signupWrap}>
                <Text style={[Styles.black, styles.accountText]}>
                  No Account Yet?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  <View>
                    <Text style={Styles.subText2}> Request an Account</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: 40
                }}
              >
                <Image
                  source={require("./Img/kyra_logo.png")}
                  style={{ height: 59, width: 119 }}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 35
  },
  markWrap: {
    alignItems: "center",
    alignContent: "center",
    marginTop: 60,
    marginBottom: 44
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: 190
  },
  titleText: {
    ...Platform.select({
      ios: {
        fontSize: 47,
        color: "#FFFFFF",
        fontStyle: "normal"
      },
      android: {
        fontSize: 47,
        color: "#FFFFFF"
      }
    })
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#FFFFFF",
    height: 23,
    width: "100%"
  },
  subtitleText: {
    // ...Platform.select({
    //   ios: {
    //     fontFamily: "SFProDisplay-Heavy"
    //   },
    //   android: {
    //     fontFamily: "SF-Pro-Display-Heavy"
    //   }
    // }),
    fontSize: 11,
    color: "#171812",
    textAlign: "center",
    letterSpacing: 10,
    width: "100%",
    paddingRight: 32,
    paddingLeft: 32
  },
  socialStyle: {
    width: 150,
    height: 50,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFF"
  },
  wrapper: {},
  inputWrap: {
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    height: 20,
    width: 20
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 17
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 46,
    width: "100%",
    borderRadius: 23,
    borderWidth: 4,
    borderColor: "#FFA000",
    backgroundColor: "#FFA000",
    alignContent: "center"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18
    // ...Platform.select({
    //   ios: {
    //     fontFamily: "SFProDisplay-Bold"
    //   },
    //   android: {
    //     fontFamily: "SF-Pro-Display-Bold"
    //   }
    // })
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15
  },
  signinwith: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12
    // ...Platform.select({
    //   ios: {
    //     fontFamily: "SFProDisplay-Bold"
    //   },
    //   android: {
    //     fontFamily: "SF-Pro-Display-Bold"
    //   }
    // })
  },
  fingerPrint: {
    color: "#D8D8D8",
    fontWeight: "600",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 10
  },
  accountText: {
    textAlign: "center"
  },
  signupLinkText: {
    fontSize: 14,
    marginLeft: 5
    // ...Platform.select({
    //   ios: {
    //     fontFamily: "SFProDisplay-Bold"
    //   },
    //   android: {
    //     fontFamily: "SF-Pro-Display-Bold"
    //   }
    // })
  },
  whiteFont: {
    color: "#FFF"
  },
  blackFont: {
    color: "#000"
  },
  errorTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "red",
    padding: 10
  }
});
const mapStateToProps = state => {
  const { email, password, error, loading } = state.auth;
  return {
    email,
    password,
    error,
    loading
  };
};
const mapDispatchToProps = {
  emailChange,
  passwordChange,
  loginUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
