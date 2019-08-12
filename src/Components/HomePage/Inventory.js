import React, { Component } from 'react'
import { View, Text } from 'react-native';
// import { Container, Header, Content, Accordion } from "native-base";
const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
 class Inventory extends Component {
  render() {
    return (
      <View>
        <Text>r</Text>
        </View>
    //   <Container>
    //   <Header />
    //   <Content padder>
    //     <Accordion
    //       dataArray={dataArray}
    //       headerStyle={{ backgroundColor: "#b7daf8" }}
    //       contentStyle={{ backgroundColor: "#ddecf8" }}
    //     />
    //   </Content>
    // </Container>
    )
  }
}
export default Inventory;