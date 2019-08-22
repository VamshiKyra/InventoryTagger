import React, { Component } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Accordion,
  List,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Fab,
  Footer
} from "native-base";
import { connect } from "react-redux";
import Item from "./Item";
import Head from "./Head";
import { getInventory } from "../../actions";
import firebase from "react-native-firebase";
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trdt: "",
      active: false
    };
  }
  componentDidMount() {
    this.props.getInventory();
  }
  offlineTest = async () => {
    try {
      const { currentUser } = await firebase.auth();
      alert(currentUser.displayName);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { list } = this.props;
    return (
      <Container>
        <Head navigation={this.props.navigation} />
        <ImageBackground
          style={{
            flex: 1
          }}
          resizeMode="center"
          source={require("../../Img/logo_background.png")}
        >
          <Content>
            <List style={{ backgroundColor: "#FFF" }}>
              {list &&
                list.map((item, index) => {
                  return (
                    <Item
                      key={index}
                      item={item}
                      navigation={this.props.navigation}
                    />
                  );
                })}
            </List>
            <Footer>
              <Button onPress={() => this.offlineTest()}>
                <Text>Contact</Text>
              </Button>
            </Footer>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  const { list } = state.inventorylist;
  return {
    list
  };
};
const mapDispatchToProps = {
  getInventory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inventory);
