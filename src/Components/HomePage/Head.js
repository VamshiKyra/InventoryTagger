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
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Styles } from "../../common";
import { clearSelection, searchInventory, searchText, clearSearchList } from "../../actions";
import { connect } from "react-redux";
import * as Constants from "../../common/Constants";
class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addButton() {
    this.props.clearSelection();
    this.props.navigation.navigate("Camera");
  }
  onSearchText() {
    const { list, admin_list, search_text } = this.props;
    this.props.searchInventory(list, admin_list, search_text);
  }
  componentDidMount() {
    console.log("all", this.props)
  }
  render() {
    const { list_count, admin_list_count, search_count } = this.props;
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
            <Button transparent>
              <Thumbnail
                square
                style={{ height: 31, width: 100 }}
                source={require("../../Img/inventor_tagger.png")}
              />
            </Button>
          </Left>
          <Body>
            <Title>Inventory</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.addButton()}>
              <AntDesign name="pluscircleo" size={22} color="#007BCF" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#007AFF",
                  marginLeft: 4
                }}
              >
                Add
              </Text>
            </Button>
          </Right>
        </Header>
        <Header
          searchBar
          style={{ marginTop: 0, paddingTop: 0, backgroundColor: "#F6F6F6" }}
        >
          <Item
            style={{
              backgroundColor: "#FFF",
              borderWidth: 1,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: "#C6C4C0",
              height: 36,
              marginRight: 5,
              borderRadius: 5
            }}
          >
            <Icon name="ios-search" style={{ fontSize: 16 }} />
            <Input placeholder="Search" onChangeText={(input) => this.props.searchText(input)} value={this.props.search_text} returnKeyType="go"
              onSubmitEditing={() => this.onSearchText()} />
            <Icon
              type="MaterialIcons"
              name="clear"
              style={{ fontSize: 12, color: "#808080" }}
              onPress={() => this.props.clearSearchList()}
            />
          </Item>
          <Button
            bordered
            style={{
              width: 64,
              height: 36,
              borderColor: "#C6C4C0",
              backgroundColor: "#FFF"
            }}
            onPress={() => this.props.navigation.navigate("Filters")}
          >
            <Text>Filter</Text>
          </Button>
        </Header>
        <View
          style={[
            { height: 25, backgroundColor: Constants.BROWN },
            Styles.center
          ]}
        >
          <Text style={{ color: "#FFF" }}>
            {search_count} of {parseInt(list_count) + parseInt(admin_list_count)} Items Listed • 0 Filters
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { type } = state.add;
  const { list, admin_list, admin_list_count, list_count } = state.inventorylist;
  const { search_text, search_count } = state.search;
  return {
    type,
    list,
    admin_list,
    search_text,
    admin_list_count,
    list_count,
    search_count
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
