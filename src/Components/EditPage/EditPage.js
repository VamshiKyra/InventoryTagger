import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  AsyncStorage
} from "react-native";
import { Container, Content, Footer, Icon } from "native-base";
import Head from "./Head";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { Spinner } from "../../common";
import moment from "moment";
import Form from "./Form";
import DropdownAlert from "react-native-dropdownalert";
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
  imageChange,
  getAddress,
  updateInventory,
  deleteInventory
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
    const { latitude, longitude, edit } = this.props;
    if (!edit) {
      this.props.getAddress(latitude, longitude);
    }
  }
  checkOffline() {
    this.setState({ loading: true });
    let error = this.validation();
    if (error && error.length > 0) {
      this.dropDownAlertRef.alertWithType("error", "Error", error);
      this.setState({ loading: false });
    } else {
      if (this.props.offline) {
        const {
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
        } = this.props;
        const itemList = {
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
        };
        AsyncStorage.getItem("Items").then(item => {
          if (item) {
            let ArrayItems = [];
            ArrayItems = JSON.parse(item);
            ArrayItems.push(itemList);
            AsyncStorage.setItem("Items", JSON.stringify(ArrayItems));
            this.props.navigation.navigate("Inventory");
          } else {
            let ArrayItems = [];
            ArrayItems.push(itemList);
            AsyncStorage.setItem("Items", JSON.stringify(ArrayItems));
            AsyncStorage.getItem("Items").then(e => console.log(e));
            this.props.navigation.navigate("Inventory");
          }
        });
        this.setState({ loading: false });
      } else {
        const { image } = this.props;
        if (image.toString().includes("file:")) {
          this.uploadImage(image);
        } else {
          this.onSubmit(image);
        }
      }
    }
  }
  uploadImage(uri) {
    const mime = "image/jpeg";
    const newUri = uri.toString();
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
      city,
      edit,
      uid,
      create_user,
      create_ts,
      modify_user,
      modify_ts,
      user_id
    } = this.props;

    if (edit) {
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
        city,
        uid,
        create_user,
        create_ts,
        user_id
      };
      console.log("inventory", inventory);
      this.dropDownAlertRef.alertWithType(
        "success",
        "Updated is Success",
        "Record updated successfully"
      );
      this.props.updateInventory(inventory, this.props.admin);
    } else {
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
      this.dropDownAlertRef.alertWithType(
        "success",
        "Saved Success",
        "Record added to the inventory"
      );
      this.props.addInventory(inventory);
    }
    this.props.navigation.navigate("Inventory");
  }
  validation() {
    let error_msg = "";
    const {
      type,
      description,
      location_name,
      address,
      city,
      State,
      zip,
      phone,
      image
    } = this.props;
    if (this.isEmpty(type)) {
      error_msg += "Type is required\n";
    }
    if (this.isEmpty(description)) {
      error_msg += "Description is required\n";
    }
    if (this.isEmpty(location_name)) {
      error_msg += "Location Name is required\n";
    }
    if (this.isEmpty(address)) {
      error_msg += "Address is required\n";
    }
    if (this.isEmpty(city)) {
      error_msg += "City is required\n";
    }
    if (this.isEmpty(State)) {
      error_msg += "State is required\n";
    }
    if (this.isEmpty(zip)) {
      error_msg += "Zip code is required\n";
    }
    if (this.isEmpty(phone)) {
      error_msg += "Phone is required\n";
    }
    if (this.isEmpty(image)) {
      error_msg += "Image is required\n";
    }
    return error_msg;
  }
  isEmpty(key) {
    if (key === "" || key === null || key === undefined) {
      return true;
    } else {
      return false;
    }
  }
  deleteItem() {
    const { uid, user_id, admin } = this.props;
    if (admin) {
      this.props.deleteInventory(uid, user_id);
    } else {
      this.props.deleteInventory(uid, '');
    }
    this.props.navigation.navigate("Inventory");
  }
  render() {
    const { loading } = this.state;
    return (
      <Container>
        <DropdownAlert
          ref={ref => (this.dropDownAlertRef = ref)}
          zIndex={200}
          messageNumOfLines={10}
        />
        <Head
          onSubmit={() => this.checkOffline()}
          navigation={this.props.navigation}
        />
        <Content>
          <Form
            ref={instance => {
              this.child = instance;
            }}
            navigation={this.props.navigation}
            onSubmit={() => this.checkOffline()}
          />
          {loading && <Spinner loader={loading} />}
        </Content>
        <Footer style={styles.footer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Camera")}
          >
            <View style={styles.button}>
              <Icon
                type="FontAwesome5"
                name="camera"
                style={{ fontSize: 15, color: "#007AFF" }}
              />
              <Text style={styles.retake}> Retake</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.deleteItem()}>
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
    left: width * 0.45,
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
    edit,
    create_user,
    create_ts,
    modify_user,
    modify_ts,
    uid,
    user_id
  } = state.add;
  const { admin } = state.inventorylist;
  const { offline } = state.auth;
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
    edit,
    offline,
    create_user,
    create_ts,
    modify_user,
    modify_ts,
    uid,
    admin,
    user_id
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
  imageChange,
  getAddress,
  updateInventory,
  deleteInventory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage);
