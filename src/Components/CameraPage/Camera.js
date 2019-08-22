import React, { PureComponent } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { RNCamera } from "react-native-camera";
import { connect } from "react-redux";
import { editMode, imageChange } from "../../actions";
import {
  Container,
  Header,
  Content,
  Accordion,
  List,
  Item,
  Input,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Thumbnail
} from "native-base";
import * as Constants from "../../common/Constants";
let { width, height } = Dimensions.get("window");
class Camera extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Inventory")}
          >
            <View>
              <Text style={styles.left}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Take Photo</Text>
          </View>
          <View style={{ height: 1, width: 60, backgroundColor: "#FFF" }} />
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
        />
        <View
          style={{
            flex: 0,
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            height: 150
          }}
        >
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Adding an inventory item is a 2-step process. First take a photo,
              and then add info.
            </Text>
          </View>
          <View style={styles.controls}>
            <Icon
              type="Ionicons"
              name="ios-reverse-camera"
              style={{
                fontSize: 50,
                color: "#222222"
              }}
            />
            <TouchableOpacity onPress={this.takePicture.bind(this)}>
              <View style={styles.bigcircle}>
                <View style={styles.circle} />
              </View>
            </TouchableOpacity>
            <View>
              <Icon type="Entypo" name="flash" style={{ fontSize: 40 }} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    /** Barcode Scanner
     * onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
     */
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      if (data && data.uri) {
        this.props.editMode(false);
        this.props.imageChange(data.uri);
        this.props.navigation.navigate("EditPage");
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  headerContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 18,
    borderBottomWidth: 2
  },
  title: {
    color: "#222222",
    fontSize: 17,
    fontWeight: "bold"
  },
  left: {
    color: "#222222",
    fontSize: 17
  },
  summary: {
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  summaryText: {
    color: "#222222",
    fontSize: 15,
    flexWrap: "wrap",
    textAlign: "center"
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#222222"
  },
  bigcircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 8,
    borderColor: "#222222",
    alignItems: "center",
    justifyContent: "center"
  },
  controls: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
const mapStateToProps = state => {
  const {} = state.add;
  return {};
};
const mapDispatchToProps = {
  editMode,
  imageChange
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Camera);
