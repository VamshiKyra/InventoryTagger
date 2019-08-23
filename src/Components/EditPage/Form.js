import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Formik } from "formik";
import makeInputGreatAgain, {
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from "react-native-formik";
import MaterialTextInput from "../../common/MaterialTextInput";
import { compose } from "recompose";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Icon, Item, Label, Textarea } from "native-base";
import Geolocation from "@react-native-community/geolocation";
import {
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
  modifyUser
} from "../../actions";
import { Spinner, Styles, Button } from "../../common";
import Picker from "react-native-picker-select";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  // item: Yup.string().required(),
  // description: Yup.string().required(),
  // locationName: Yup.string().required("Location Name is required"),
  // City: Yup.string().required("City is required"),
  // address: Yup.string().required("Address is required"),
  // State: Yup.string().required("State is required"),
  // Zip: Yup.string().required("Zip is required"),
  // Country: Yup.string()
  //   .required("Country is required")
  //   .default(() => {
  //     return "USA";
  //   }),
  // Cellphone: Yup.string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("Phone is required")
});
const MyInput = compose(
  makeInputGreatAgain,
  withNextInputAutoFocusInput
)(MaterialTextInput);
let { width, height } = Dimensions.get("window");
const Forms = withNextInputAutoFocusForm(View);
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "../../Img/background.png"
    };
  }
  componentDidMount() {
    if (!this.props.edit) {
      // Geolocation.getCurrentPosition(
      //   position => {
      //     const { latitude, longitude } = position.coords;
      //     this.props.latitudeChange(latitude);
      //     this.props.longitudeChange(longitude);
      //   },
      //   error => Alert.alert("Unable to find location"),
      //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      // );
    }
  }

  renderImage() {
    const picture = this.props.image;
    return (
      <View>
        <Image
          source={{
            uri: picture
          }}
          style={{
            width: width * 0.9,
            height: width * 1.1,
            margin: width * 0.05
          }}
        />
      </View>
    );
  }
  render() {
    const placeholder = {
      label: "Select...",
      value: null,
      color: "#9EA0A4"
    };
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <Formik
            onSubmit={() => Keyboard.dismiss()}
            validationSchema={validationSchema}
            render={() => {
              return (
                <Forms>
                  <Item>
                    <View style={styles.item}>
                      <View>
                        <Text style={styles.labelText}>Item Type</Text>
                      </View>
                      <View>
                        <Picker
                          name="item"
                          type="item"
                          placeholder={placeholder}
                          items={[
                            { label: "Ambulance", value: "Ambulance" },
                            { label: "Command Post", value: "Command Post" },
                            { label: "Generator", value: "Generator" },
                            { label: "Water Palette", value: "Water Palette" }
                          ]}
                          onValueChange={type => this.props.typeChange(type)}
                          style={styles}
                          value={this.props.type}
                        />
                      </View>
                    </View>
                  </Item>
                  <Item>
                    <View style={[styles.item, { paddingBottom: 10 }]}>
                      <View>
                        <Text style={styles.labelText}>Description</Text>
                      </View>
                      <View>
                        <TextInput
                          multiline={true}
                          numberOfLines={4}
                          placeholder="Write a description…"
                          style={[
                            styles.itemWidth,
                            { color: "#222222", fontSize: 17, height: 80 }
                          ]}
                          onChangeText={description =>
                            this.props.descriptionChange(description)
                          }
                          value={this.props.description}
                          returnKeyType="next"
                        />
                      </View>
                    </View>
                  </Item>
                  <View style={{ paddingBottom: 15 }} />
                  <MyInput
                    label="Location Name"
                    name="locationName"
                    type="locationName"
                    value={this.props.location_name}
                    onChangeText={locationName =>
                      this.props.locationChange(locationName)
                    }
                    autoCorrect={false}
                  />
                  <MyInput
                    label="Address"
                    name="address"
                    type="address"
                    value={this.props.address}
                    onChangeText={Address => this.props.addressChange(Address)}
                    autoCorrect={false}
                  />
                  <MyInput
                    label="City"
                    name="City"
                    type="City"
                    value={this.props.city}
                    onChangeText={City => this.props.cityChange(City)}
                    autoCorrect={false}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.halfWidth}>
                      <MyInput
                        label="State"
                        name="State"
                        type="State"
                        value={this.props.State}
                        onChangeText={State => this.props.stateChange(State)}
                        autoCorrect={false}
                      />
                    </View>
                    <View style={styles.halfWidth}>
                      <MyInput
                        label="ZIP"
                        name="Zip"
                        type="Zip"
                        value={this.props.zip}
                        onChangeText={Zip => this.props.zipChange(Zip)}
                        autoCorrect={false}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.halfWidth}>
                      <MyInput
                        label="Latitude"
                        name="Lat"
                        type="Lat"
                        value={this.props.latitude}
                        onChangeText={Lat => this.props.latitudeChange(Lat)}
                        autoCorrect={false}
                      />
                    </View>
                    <View style={styles.halfWidth}>
                      <MyInput
                        label="Longitude"
                        name="Long"
                        type="Long"
                        value={this.props.longitude}
                        onChangeText={Long => this.props.longitudeChange(Long)}
                        autoCorrect={false}
                      />
                    </View>
                  </View>
                  <MyInput
                    label="Phone"
                    name="Phone"
                    type="Phone"
                    value={this.props.phone}
                    onChangeText={Phone => this.props.phoneChange(Phone)}
                    autoCorrect={false}
                    keyboardType="numeric"
                  />
                </Forms>
              );
            }}
          />
          {this.renderImage()}
          {/* <Formik
                    initialValues={{ email: '' }}
                    onSubmit={values => console.log(values)}
                >
                    {props => (
                        <View>
                            <TextInput
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                            />
                           
                            <Button label='Submit' onClick={props.handleSubmit}/>
                        </View>
                    )}
                </Formik> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  labelText: {
    color: "#808080",
    fontSize: 12,
    fontWeight: "600"
  },
  item: {
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingTop: 10
  },
  itemWidth: {
    width: width * 0.9
  },
  inputIOS: {
    fontSize: 17,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderRadius: 4,
    color: "#222222",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: "purple",
    borderRadius: 8,
    color: "#222222",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  halfWidth: {
    width: width * 0.5
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
    edit
  };
};
const mapDispatchToProps = {
  typeChange,
  descriptionChange,
  locationChange,
  addressChange,
  cityChange,
  stateChange,
  zipChange,
  latitudeChange,
  longitudeChange,
  createUser,
  createTs,
  modifyTs,
  modifyUser,
  phoneChange
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
