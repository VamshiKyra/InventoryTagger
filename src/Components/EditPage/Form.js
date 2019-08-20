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
  item: Yup.string().required(),
  description: Yup.string().required(),
  locationName: Yup.string().required("Location Name is required"),
  City: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  State: Yup.string().required("State is required"),
  Zip: Yup.string().required("Zip is required"),
  Country: Yup.string()
    .required("Country is required")
    .default(() => {
      return "USA";
    }),
  Cellphone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone is required")
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
    this.state = {};
  }

  onSubmit = () => {
    console.log("submit", this.props);
    this.props.navigation.navigate("ViewPage");
  };
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
            onSubmit={this.onSubmit.bind(this)}
            validationSchema={validationSchema}
            render={() => {
              return (
                <Forms>
                  {/* <MyInput
                                    label="Type"
                                    name="Type"
                                    type="name"
                                    value={this.state.type}
                                    onChangeText={this.onTypeChange.bind(this)}
                                    autoCorrect={false}
                                /> */}
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
                    {/* <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: "70%" }}
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.type}
                                    onValueChange={this.onTypeChange.bind(this)}
                                >
                                    <Picker.Item label="Wallet" value="key0" />
                                    <Picker.Item label="ATM Card" value="key1" />
                                    <Picker.Item label="Debit Card" value="key2" />
                                    <Picker.Item label="Credit Card" value="key3" />
                                    <Picker.Item label="Net Banking" value="key4" />
                                </Picker> */}
                  </Item>
                  <Item>
                    <View style={[styles.item, { paddingBottom: 10 }]}>
                      <View>
                        <Text style={styles.labelText}>Description</Text>
                      </View>
                      <View>
                        <Textarea
                          rowSpan={5}
                          placeholder="Write a description…"
                          style={[
                            styles.itemWidth,
                            { color: "#222222", fontSize: 17 }
                          ]}
                          onChangeText={description =>
                            this.props.descriptionChange(description)
                          }
                          value={this.props.description}
                        />
                      </View>
                    </View>
                  </Item>
                  {/* <Item>
                                    <View style={[styles.item, { paddingBottom: 10 }]}>
                                        <View >
                                            <Text style={styles.labelText}>Address</Text>
                                        </View>
                                        <View >
                                            <TextInput
                                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                                onChangeText={(text) => this.setState({ text })}
                                                value={this.state.text}
                                            />
                                        </View>
                                    </View>
                                </Item> */}
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
                    value={this.props.Address}
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
                  />
                </Forms>
              );
            }}
          />
          <Image
            source={require("../../Img/photogenerator.png")}
            style={{ width: width * 0.9, margin: width * 0.05 }}
          />
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
    image
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
    image
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
