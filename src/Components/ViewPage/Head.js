import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Content, Accordion, List, Item, Input, Left, Button, Icon, Body, Title, Right, Thumbnail } from "native-base";
import { Styles } from "../../common";
import * as Constants from "../../common/Constants";
class Head extends Component {
    render() {
        return (
            <View>
                <Header style={{marginTop:-20, borderBottomWidth: 3, borderBottomColor: Constants.BROWN }} >
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                            <Text style={{color:"#007AFF", fontSize:18}}> Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Details</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.onSubmit()}>
                            <Text style={{fontSize:18, fontWeight:"bold", color:Constants.BLUE}}>Edit</Text>
                        </Button>
                    </Right>
                </Header>
            </View>
        );
    }
}

export default Head;