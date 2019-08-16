import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Formik } from "formik";
import makeInputGreatAgain, {
    withNextInputAutoFocusForm,
    withNextInputAutoFocusInput
} from "react-native-formik";
import MaterialTextInput from "../../common/MaterialTextInput";
import { compose } from "recompose";
import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    City: Yup.string().required("City is required"),
    Address1: Yup.string().required("Address is required"),
    State: Yup.string().required("State is required"),
    Zip: Yup.string().required("Zip is required"),
    Country: Yup.string()
        .required("Country is required")
        .default(() => {
            return "USA";
        }),
    Cellphone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Cell phone is required")
});
const MyInput = compose(
    makeInputGreatAgain,
    withNextInputAutoFocusInput
)(MaterialTextInput);
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
        }
    }
    onTypeChange = (type) => {
        console.log(type);
    }
    onSubmit = () => {
        console.log("submit")
    }
    render() {
        return (
            <View>
                <Formik
                    onSubmit={this.onSubmit.bind(this)}
                    validationSchema={validationSchema}
                    render={() => {
                        return (
                            <Forms>
                                <MyInput
                                    label="Type"
                                    name="Type"
                                    type="name"
                                    value={this.state.type}
                                    onChangeText={this.onTypeChange.bind(this)}
                                    autoCorrect={false}
                                />
                            </Forms>
                        )
                    }} />
            </View >
        );
    }
}

export default Form;