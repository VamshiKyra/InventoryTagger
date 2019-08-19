import React, { Component } from 'react'
import { View, Text, ImageBackground } from 'react-native';
import { Container, Header, Content, Accordion, List, Left, Button, Icon, Body, Title, Right } from "native-base";
import Item from "./Item";
import Head from "./Head";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trdt: ""
    };
  }
  render() {
    const dataArray = [
      { title: "First Element", content: "Lorem ipsum dolor sit amet" },
      { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
      { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
    ];
    return (
      // <View>
      //   <Text>r</Text>
      //   </View>

      <Container>
        <Head navigation={this.props.navigation}/>
        <ImageBackground style={{
          flex: 1
        }}
          resizeMode="center" source={require("../../Img/logo_background.png")}>
          <Content >
            <List style={{backgroundColor:"#FFF"}}>
              {dataArray.map((item,index) => {
                return (
                  <Item key={index}  />
                );
              })}

            </List>

          </Content>
        </ImageBackground>
      </Container>
    )
  }
}
export default Inventory;