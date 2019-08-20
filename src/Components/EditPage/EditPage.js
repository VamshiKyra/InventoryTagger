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
import Form from "./Form";
import { Button } from "../../common";
import { addInventory } from "../../actions";
let { width, height } = Dimensions.get("window");
class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit() {
    console.log("sb", this.props);
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
      image
    } = this.props;
    console.log(
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
      "All"
    );
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
      image
    };
    this.props.addInventory(inventory);
  }
  render() {
    return (
      <Container>
        <Head onSubmit={() => this.onSubmit()} />
        <Content>
          <Form
            ref={instance => {
              this.child = instance;
            }}
            navigation={this.props.navigation}
          />
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
  addInventory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage);
