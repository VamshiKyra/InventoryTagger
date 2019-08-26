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
import * as Constants from "../../common/Constants";
import { connect } from "react-redux";
import { clearSelection, searchInventory, searchText, clearSearchList } from "../../actions";
class Head extends Component {
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
                        <Button transparent onPress={() => this.props.onBack()}>
                            <Icon name="arrow-back" />
                            <Text style={{ color: "#007AFF", fontSize: 18 }}> Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Filters</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.onReset()}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#333333"
                                }}
                            >
                                Reset
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
    const { list, admin_list } = state.inventorylist;
    const { search_text } = state.search;
    return {
        type,
        list,
        admin_list,
        search_text
    };
};
const mapDispatchToProps = {
    clearSelection,
    searchInventory,
    searchText,
    clearSearchList
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Head);