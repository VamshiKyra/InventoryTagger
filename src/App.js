import React, { Component } from "react";
import Router from "./Router";
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  Alert,
  StatusBar,
  AsyncStorage
} from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";
import firebase from "react-native-firebase";
import Geolocation from "@react-native-community/geolocation";

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
  }
  // componentDidMount() {
  //   SplashScreen.hide();
  // }
  //   async componentDidMount() {
  //     // SplashScreen.hide();
  //     // AsyncStorage.getItem("notification")
  //     //   .then(res => {
  //     //     if (res == null) {
  //     //       AsyncStorage.setItem("notification", "true");
  //     //       alert("true");
  //     //     } else {
  //     //       alert(res);
  //     //     }
  //     //   })
  //     //   .catch(e => console.log(e));
  //     this.notificationDisplayedListener = firebase
  //       .notifications()
  //       .onNotificationDisplayed((notification: Notification) => {
  //         AsyncStorage.getItem("notification")
  //           .then(res => {
  //             if (res == "true") {
  //               Alert.alert(notification._body);
  //             }
  //           })
  //           .catch(e => console.log(e));

  //         // Process your notification as required
  //         // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  //       });
  //     this.notificationListener = firebase
  //       .notifications()
  //       .onNotification((notification: Notification) => {
  //         AsyncStorage.getItem("notification")
  //           .then(res => {
  //             if (res == "true") {
  //               Alert.alert(notification._body);
  //               console.log(notification);
  //             }
  //           })
  //           .catch(e => console.log(e));
  //       });
  //     this.notificationOpenedListener = firebase
  //       .notifications()
  //       .onNotificationOpened((notificationOpen: NotificationOpen) => {
  //         // Get the action triggered by the notification being opened
  //         const action = notificationOpen.action;
  //         console.log(action);
  //         // Get information about the notification that was opened
  //         const notification: Notification = notificationOpen.notification;
  //         AsyncStorage.getItem("notification")
  //           .then(res => {
  //             if (res == "true") {
  //               Alert.alert(notification._body);
  //             }
  //           })
  //           .catch(e => console.log(e));
  //       });

  //     const notificationOpen: NotificationOpen = await firebase
  //       .notifications()
  //       .getInitialNotification();
  //     if (notificationOpen) {
  //       // App was opened by a notification
  //       // Get the action triggered by the notification being opened
  //       const action = notificationOpen.action;
  //       // Get information about the notification that was opened
  //       const notification: Notification = notificationOpen.notification;
  //       AsyncStorage.getItem("notification")
  //         .then(res => {
  //           if (res == "true") {
  //             Alert.alert(notification._body);
  //           }
  //         })
  //         .catch(e => console.log(e));
  //     }
  //     // const notificationOpen: NotificationOpen = await firebase
  //     //   .notifications()
  //     //   .getInitialNotification();
  //     // if (notificationOpen) {
  //     //   const action = notificationOpen.action;
  //     //   const notification: Notification = notificationOpen.notification;
  //     //   var seen = [];
  //     //   alert(
  //     //     JSON.stringify(notification.data, function(key, val) {
  //     //       if (val != null && typeof val == "object") {
  //     //         if (seen.indexOf(val) >= 0) {
  //     //           return;
  //     //         }
  //     //         seen.push(val);
  //     //       }
  //     //       return val;
  //     //     })
  //     //   );
  //     // }
  //     if (Platform.OS === "ios") {
  //       navigator.geolocation.requestAuthorization();
  //     } else {
  //       PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //       );
  //     }
  //   }
  //   componentWillUnmount() {
  //     // this.notificationDisplayedListener();
  //     // this.notificationListener();
  //     // this.notificationOpenedListener();
  //   }
  //   _authorize() {
  //     // firebase
  //     //   .messaging()
  //     //   .hasPermission()
  //     //   .then(enabled => {
  //     //     if (enabled) {
  //     //       return null;
  //     //     } else {

  //     //     }
  //     //   });
  //     // firebase
  //     //   .messaging()
  //     //   .requestPermission()
  //     //   .then(() => {
  //     //     // User has authorised
  //     //   })
  //     //   .catch(error => {
  //     //     // User has rejected permissions
  //     //   });
  //   }
  requestLocation() {
    const config = {
      authorizationLevel: "always"
    };
    Geolocation.setRNConfiguration(config);
    Geolocation.requestAuthorization();
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={{ flex: 1 }}>
          <Provider store={store}>
            <Router />
          </Provider>
        </View>
      </SafeAreaView>
    );
  }
}
export default App;
