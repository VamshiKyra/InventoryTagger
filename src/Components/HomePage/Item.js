import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Icon,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
const Item = props => {
  return (
    <View>
      <ListItem thumbnail>
        <Left>
          {/* <Thumbnail square source={{ uri: '../../Img/photo-generator.png' }} /> */}
          <Thumbnail square source={{ uri: props.item.image }} />
        </Left>
        <Body>
          <Text>{props.item.type}</Text>
          <Text note numberOfLines={1}>
            {props.item.location_name}
          </Text>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() =>
              props.navigation.navigate("ViewPage", {
                uid: props.item.uid
              })
            }
          >
            <Icon name="arrow-forward" style={{ color: "#333333" }} />
          </Button>
        </Right>
      </ListItem>
    </View>
  );
};

export default Item;
