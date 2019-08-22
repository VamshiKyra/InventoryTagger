import { StyleSheet, Dimensions } from "react-native";

let { width, height } = Dimensions.get("window");
const Styles = StyleSheet.create({
  container: {
    marginTop: 150,
    backgroundColor: "#ededed",
    flexWrap: "wrap"
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 17
  },
  black: {
    color: "#000"
  },
  white: {
    color: "#FFF"
  },
  brown: {
    color: "#333333"
  },
  subText1: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "bold"
  },
  subText2: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "bold"
  },
  center: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 46,
    width: "100%",
    borderRadius: 23,
    borderWidth: 4,
    borderColor: "#333333",
    backgroundColor: "#FFFFFF",
    alignContent: "center"
  },
  buttonText: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold"
    // ...Platform.select({
    //   ios: {
    //     fontFamily: "SFProDisplay-Bold"
    //   },
    //   android: {
    //     fontFamily: "SF-Pro-Display-Bold"
    //   }
    // })
  },
  syncButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    bottom: 20,
    left: width * 0.5 - 30,
    backgroundColor: "#222222"
  },
  headerContainer: {}
});

const buttons = StyleSheet.create({
  primary: {
    flex: 1,
    height: 70,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20
  }
});

export { Styles, buttons };
