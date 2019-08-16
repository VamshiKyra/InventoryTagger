import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail,Icon, Text, Left, Body, Right, Button } from 'native-base';
const Item = () => {
  return (
    <View>
      <ListItem thumbnail >
        <Left>
          {/* <Thumbnail square source={{ uri: '../../Img/photo-generator.png' }} /> */}
          <Thumbnail square source={require('../../Img/photo-generator.png')} />
        </Left>
        <Body>
          <Text>Ambulance</Text>
          <Text note numberOfLines={1}>Jefferson County Sheriff's Office</Text>
        </Body>
        <Right>
          <Button transparent>
           <Icon name="arrow-forward" style={{color:"#333333"}} />
          </Button>
        </Right>
      </ListItem>
    </View>
  );
};

export default Item;