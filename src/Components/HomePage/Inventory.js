import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { Container, Header, Content, Accordion, Left,Button,Icon,Body, Title,Right } from "native-base";
const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
 class Inventory extends Component {
  render() {
    return (
      // <View>
      //   <Text>r</Text>
      //   </View>
      <Container>
      <Header style={{height:50, marginTop: -40}} >
      <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Inventory</Title>
          </Body>
          <Right>
          <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
              <Icon name='heart' />
            </Button>
            <Button transparent>
              <Icon name='more' />
            </Button>
          </Right>
      </Header>
      </Container>
    )
  }
}
export default Inventory;