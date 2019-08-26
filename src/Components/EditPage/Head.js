import React, { Component } from "react";
import { Text, View } from "react-native";
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
import { Styles } from "../../common";
import { clearSelection } from "../../actions";
import { connect } from "react-redux";
import * as Constants from "../../common/Constants";
class Head extends Component {
  backButton() {
    this.props.clearSelection();
    this.props.navigation.navigate("Inventory");
  }
  render() {
    return (
      <View>
        <Header
          style={{
            marginTop: -20,
            borderBottomWidth: 3,
            borderBottomColor: Constants.BROWN
          }}
        >
          <Left>
            <Button transparent onPress={() => this.backButton()}>
              <Text style={{ color: "#222222", fontSize: 17 }}>Cancel</Text>
            </Button>
          </Left>
          <Body>
            <Title>Add Info</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.onSubmit()}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: Constants.BLUE
                }}
              >
                Save
              </Text>
            </Button>
          </Right>
        </Header>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const { type } = state.add;
  return {
    type
  };
};
const mapDispatchToProps = {
  clearSelection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Head);
