import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  AsyncStorage,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Content,
  Accordion,
  List,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Fab,
  Footer
} from "native-base";
import { connect } from "react-redux";
import Item from "./Item";
import Head from "./Head";
import { getInventory, offlineMode } from "../../actions";
import firebase from "react-native-firebase";
import NetInfo from "@react-native-community/netinfo";
import { Styles } from "../../common";
let { width, height } = Dimensions.get("window");
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trdt: "",
      active: false
    };
  }
  componentDidMount() {
    // AsyncStorage.setItem("Items", "");
    AsyncStorage.getItem("Items").then(item => console.log(item));
    this.props.getInventory();
    // Subscribe
    this.unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === true) {
        this.props.offlineMode(false);
      } else {
        this.props.offlineMode(true);
      }
    });

    // Unsubscribe
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  offlineTest = async () => {
    try {
      alert(this.props.offline);
    } catch (error) {
      console.log(error);
    }
  };
  onSubmit(image) {
    const {
      type,
      description,
      location_name,
      address,
      State,
      zip,
      latitude,
      longitude,
      phone,
      city
    } = this.props;
    const inventory = {
      type,
      description,
      location_name,
      address,
      State,
      zip,
      latitude,
      longitude,
      phone,
      image,
      city
    };
    this.props.addInventory(inventory);
    this.props.navigation.navigate("Inventory");
  }
  uploadImage(mime = "image/jpeg") {
    const { uri } = this.props.navigation.state.params;
    const newUri = uri.toString();
    const newUriIos = newUri.replace("file://", "");
    // navigator.geolocation.getCurrentPosition(position => {
    //   const latlng = {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude
    //   };

    // });
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === "ios" ? newUriIos : uri;
      let uploadBlob = null;
      const imageName = moment().valueOf();
      const imageRef = firebase.storage().ref(`/public/${imageName}`);
      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob._ref, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          console.log(imageRef.getDownloadURL());
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
          // this.props.uploadImages(imageName, latlng, url);
          this.onSubmit(url);
          this.setState({ loading: false });
        })
        .catch(error => {
          reject(error);
          alert("error please try again", JSON.stringify(error));
          this.setState({ loading: false });
        });
    });
  }
  render() {
    const { list } = this.props;
    return (
      <Container>
        <Head navigation={this.props.navigation} />
        <ImageBackground
          style={{
            flex: 1
          }}
          resizeMode="center"
          source={require("../../Img/logo_background.png")}
        >
          <Content>
            <List style={{ backgroundColor: "#FFF" }}>
              {list &&
                list.map((item, index) => {
                  return (
                    <Item
                      key={index}
                      item={item}
                      navigation={this.props.navigation}
                    />
                  );
                })}
            </List>
          </Content>
          <TouchableOpacity onPress={() => this.offlineTest()}>
            <View style={Styles.syncButton}>
              <Icon
                type="FontAwesome5"
                name="sync"
                style={{ fontSize: 25, color: "#FFF" }}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  const { list } = state.inventorylist;
  const { offline } = state.auth;
  return {
    list,
    offline
  };
};
const mapDispatchToProps = {
  getInventory,
  offlineMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inventory);
