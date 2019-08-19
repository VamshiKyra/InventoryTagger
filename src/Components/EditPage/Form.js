import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Dimensions, Image,TouchableWithoutFeedback,Keyboard } from 'react-native'
import { Formik } from "formik";
import makeInputGreatAgain, {
    withNextInputAutoFocusForm,
    withNextInputAutoFocusInput
} from "react-native-formik";
import MaterialTextInput from "../../common/MaterialTextInput";
import { compose } from "recompose";
import * as Yup from "yup";
import { Icon, Item, Label, Textarea } from "native-base";
import { Spinner, Styles, Button } from "../../common";
import Picker from 'react-native-picker-select';
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
        this.state = {
            type: '',
            description: "",
            locationName: "",
            Address: "",
            City: "",
            State: "",
            Zip: "",
            Lat: "",
            Long: "",
            Phone: "",
            Image: ""
        };
    }

    onSubmit = () => {
        console.log("submit", this.state);
        this.props.navigation.navigate("ViewPage");
    }
    render() {
        const placeholder = {
            label: 'Select...',
            value: null,
            color: '#9EA0A4',
        };
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View >
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
                                        <View >
                                            <Text style={styles.labelText}>Item Type</Text>
                                        </View>
                                        <View >
                                            <Picker
                                                name="item"
                                                type="item"
                                                placeholder={placeholder}
                                                items={[
                                                    { label: 'Ambulance', value: 'Ambulance' },
                                                    { label: 'Command Post', value: 'Command Post' },
                                                    { label: 'Generator', value: 'Generator' },
                                                    { label: 'Water Palette', value: 'Water Palette' },
                                                ]}
                                                onValueChange={(type) => this.setState({ type })}
                                                style={styles}
                                                value={this.state.type}
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
                                <Item >
                                    <View style={[styles.item, { paddingBottom: 10 }]}>
                                        <View >
                                            <Text style={styles.labelText}>Description</Text>
                                        </View>
                                        <View >
                                            <Textarea rowSpan={5} placeholder="Write a description…" style={[styles.itemWidth, { color: "#222222", fontSize: 17 }]} onChangeText={(description) => this.setState({ description })}
                                                value={this.state.description} />
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
                                <View style={{paddingBottom:15}}/>
                                <MyInput
                                    label="Location Name"
                                    name="locationName"
                                    type="locationName"
                                    value={this.state.locationName}
                                    onChangeText={(locationName) => this.setState({ locationName })}
                                    autoCorrect={false}
                                />
                                <MyInput
                                    label="Address"
                                    name="address"
                                    type="address"
                                    value={this.state.Address}
                                    onChangeText={(Address) => this.setState({ Address })}
                                    autoCorrect={false}
                                />
                                <MyInput
                                    label="City"
                                    name="City"
                                    type="City"
                                    value={this.state.City}
                                    onChangeText={(City) => this.setState({ City })}
                                    autoCorrect={false}
                                />
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.halfWidth}>
                                        <MyInput
                                            label="State"
                                            name="State"
                                            type="State"
                                            value={this.state.State}
                                            onChangeText={(State) => this.setState({ State })}
                                            autoCorrect={false}
                                        />
                                    </View>
                                    <View style={styles.halfWidth}>
                                        <MyInput
                                            label="ZIP"
                                            name="Zip"
                                            type="Zip"
                                            value={this.state.Zip}
                                            onChangeText={(Zip) => this.setState({ Zip })}
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
                                            value={this.state.Lat}
                                            onChangeText={(Lat) => this.setState({ Lat })}
                                            autoCorrect={false}
                                        />
                                    </View>
                                    <View style={styles.halfWidth}>
                                        <MyInput
                                            label="Longitude"
                                            name="Long"
                                            type="Long"
                                            value={this.state.Long}
                                            onChangeText={(Long) => this.setState({ Long })}
                                            autoCorrect={false}
                                        />
                                    </View>
                                </View>
                                <MyInput
                                    label="Phone"
                                    name="Phone"
                                    type="Phone"
                                    value={this.state.Phone}
                                    onChangeText={(Phone) => this.setState({ Phone })}
                                    autoCorrect={false}
                                />
                            </Forms>
                        )
                    }} />
                <Image source={require("../../Img/photogenerator.png")} style={{ width: width * 0.9, margin: width * 0.05 }} />
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
            </View >
            </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({
    labelText: {
        color: "#808080",
        fontSize: 12,
        fontWeight: '600',
    },
    item: {
        flexDirection: "column", paddingHorizontal: 15, paddingTop: 10
    },
    itemWidth: {
        width: width * 0.9,
    },
    inputIOS: {
        fontSize: 17,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderRadius: 4,
        color: "#222222",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 17,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderColor: 'purple',
        borderRadius: 8,
        color: '#222222',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    halfWidth: {
        width: width * 0.5
    }
});
export default Form;