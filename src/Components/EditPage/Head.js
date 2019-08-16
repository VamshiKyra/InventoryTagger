import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Header, Content, Accordion, List, Item, Input, Left, Button, Icon, Body, Title, Right, Thumbnail } from "native-base";
import { Styles } from "../../common";
import * as Constants from "../../common/Constants";
class Head extends Component {
    render() {
        return (
            <View>
                <Header style={{ height: 60, marginTop: -50, borderBottomWidth: 3, borderBottomColor: Constants.BROWN }} >
                    <Left>
                        <Button transparent>
                            <Text style={{color:"#222222", fontSize:17}}>Cancel</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add Info</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate("EditPage")}>
                            <Text style={{fontSize:17, fontWeight:"bold", color:Constants.BLUE}}>Save</Text>
                        </Button>
                    </Right>
                </Header>
            </View>
        );
    }
}

export default Head;