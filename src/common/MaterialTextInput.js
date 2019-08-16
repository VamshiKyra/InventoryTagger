import React from "react";
import { Text, View } from "react-native";
import { TextField } from "react-native-material-textfield";

export default class MaterialTextInput extends React.PureComponent {
  // Your custom input needs a focus function for `withNextInputAutoFocus` to work
  focus() {
    this.input.focus();
  }

  render() {
    const { error, touched, ...props } = this.props;

    const displayError = !!error && touched;
    const errorColor = "rgba(239, 51, 64,0.8)";

    return (
      <View>
        <TextField
          ref={input => (this.input = input)}
          labelHeight={12}
          baseColor={displayError ? errorColor : "#BBBBBB"}
          tintColor="#BBBBBB"
          textColor="#333333"
          {...props}
        />
        <Text
          style={{
            textAlign: "right",
            fontSize: 12,
            color: displayError ? errorColor : "transparent",
            height: 20
          }}
        >
          {error}
        </Text>
      </View>
    );
  }
}
