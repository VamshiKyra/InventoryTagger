import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Container, Content, Footer, Icon } from "native-base";
import Head from "./Head";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { Spinner } from "../../common";
import moment from "moment";
import Form from "./Form";
import RNFetchBlob from "rn-fetch-blob";
import { Button } from "../../common";
import {
  addInventory,
  uploadImages,
  typeChange,
  descriptionChange,
  locationChange,
  addressChange,
  cityChange,
  stateChange,
  zipChange,
  latitudeChange,
  phoneChange,
  longitudeChange,
  createUser,
  createTs,
  modifyTs,
  modifyUser,
  imageChange
} from "../../actions";
let { width, height } = Dimensions.get("window");
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    if (this.props.edit) {
      if (
        this.props.navigation &&
        this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.uid
      ) {
        const { uid } = this.props.navigation.state.params;
        const { list } = this.props;
        list.map(item => {
          if (item.uid == uid) {
            console.log("Item", item);
            this.setState({ selectItem: item });
            this.props.typeChange(item.type);
            this.props.descriptionChange(item.description);
            this.props.locationChange(item.location_name);
            this.props.addressChange(item.address);
            this.props.cityChange(item.city);
            this.props.stateChange(item.State);
            this.props.zipChange(item.zip);
            this.props.latitudeChange(item.latitude);
            this.props.longitudeChange(item.longitude);
            this.props.phoneChange(item.phone);
            this.props.imageChange(item.image);
          }
        });
      }
    }
  }
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
    this.setState({ loading: true });
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
    return (
      <Container>
        <Head onSubmit={() => this.uploadImage()} />
        <Content>
          <Form
            ref={instance => {
              this.child = instance;
            }}
            navigation={this.props.navigation}
            onSubmit={() => this.uploadImage()}
          />

          {this.state.loading && (
            <View style={styles.spinnerLogo}>
              <Spinner />
            </View>
          )}
        </Content>
        <Footer style={styles.footer}>
          <TouchableOpacity>
            <View style={styles.button}>
              <Icon
                type="FontAwesome5"
                name="camera"
                style={{ fontSize: 15, color: "#007AFF" }}
              />
              <Text style={styles.retake}> Retake</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.delete}>Delete Item</Text>
            </View>
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  retake: {
    fontSize: 17,
    color: "#007AFF",
    fontWeight: "600"
  },
  delete: {
    color: "#CC0000",
    fontSize: 17,
    fontWeight: "500"
  },
  button: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.5
  },
  spinnerLogo: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    position: "absolute"
  },
  footer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});
const mapStateToProps = state => {
  const {
    type,
    description,
    location_name,
    address,
    State,
    zip,
    city,
    latitude,
    longitude,
    phone,
    image,
    edit
  } = state.add;
  const { list } = state.inventorylist;
  return {
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
    image,
    list,
    edit
  };
};
const mapDispatchToProps = {
  addInventory,
  uploadImages,
  typeChange,
  descriptionChange,
  locationChange,
  addressChange,
  cityChange,
  stateChange,
  zipChange,
  latitudeChange,
  phoneChange,
  longitudeChange,
  createUser,
  createTs,
  modifyTs,
  modifyUser,
  imageChange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage);
