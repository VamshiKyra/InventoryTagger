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
import moment from "moment";
import Item from "./Item";
import Head from "./Head";
import {
  getInventory,
  offlineMode,
  addInventory,
  latitudeChange,
  longitudeChange
} from "../../actions";
import firebase from "react-native-firebase";
import NetInfo from "@react-native-community/netinfo";
import Geolocation from "@react-native-community/geolocation";
import RNFetchBlob from "rn-fetch-blob";
import { Styles } from "../../common";
let { width, height } = Dimensions.get("window");
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trdt: "",
      active: false,
      loading: false
    };
  }
  componentDidMount() {
    // AsyncStorage.setItem("Items", "");
    this.props.getInventory();
    this.unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === true) {
        this.props.offlineMode(false);
      } else {
        this.props.offlineMode(true);
      }
    });
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.props.latitudeChange(latitude.toString());
        this.props.longitudeChange(longitude.toString());
      },
      error => alert("Error", JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = Geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords;
      this.props.latitudeChange(latitude.toString());
      this.props.longitudeChange(longitude.toString());
    });
  }
  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }
  uploadImage({
    type,
    description,
    location_name,
    address,
    city,
    State,
    zip,
    latitude,
    longitude,
    phone,
    image
  }) {
    const mime = "image/jpeg";
    const newUri = image.toString();
    const newUriIos = newUri.replace("file://", "");
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
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
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
            image: url,
            city
          };
          this.props.addInventory(inventory);
        })
        .catch(error => {
          reject(error);
          alert("error please try again", JSON.stringify(error));
          this.setState({ loading: false });
        });
    });
  }
  syncFiles = async () => {
    try {
      let items = await AsyncStorage.getItem("Items");
      console.log("items", items);
      let ArrayItems = JSON.parse(items);
      console.log("ArrayItems", ArrayItems);
      await ArrayItems.map(item => {
        this.uploadImage(item);
      });
    } catch (error) {
      console.log("Sync Error", error);
      alert("Unable to sync the files. Please try again later.");
    }
  };
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
          <TouchableOpacity onPress={() => this.syncFiles()}>
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
  offlineMode,
  addInventory,
  latitudeChange,
  longitudeChange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inventory);
