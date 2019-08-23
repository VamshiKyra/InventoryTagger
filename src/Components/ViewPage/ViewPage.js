import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Head from "./Head";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Footer,
  Icon,
  Card,
  CardItem,
  Text,
  Body
} from "native-base";
import { editMode } from "../../actions";
let { width, height } = Dimensions.get("window");
class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItem: {
        type: "",
        description: "",
        location_name: "",
        address: "",
        city: "",
        State: "",
        zip: "",
        latitude: "",
        longitude: "",
        phone: "",
        image: "",
        uid: ""
      }
    };
  }
  componentDidMount() {
    const list = this.props.list;
    if (
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params
    ) {
      if (this.props.navigation.state.params.uid) {
        const { uid } = this.props.navigation.state.params;
        list.map(item => {
          if (item.uid == uid) {
            this.setState({ selectItem: item });
          }
        });
      }
      //   if (this.props.navigation.state.params.data) {
      //     console.log(this.props.navigation.state.params.data);
      //     this.setState({ selectItem: this.props.navigation.state.params.data });
      //   }
    }
  }
  onEdit() {
    if (this.state.selectItem && this.state.selectItem.uid) {
      this.props.editMode(true);
      this.props.navigation.navigate("EditPage", {
        uid: this.state.selectItem.uid
      });
    }
  }
  render() {
    const {
      type,
      description,
      location_name,
      address,
      city,
      State,
      zip,
      latitude,
      longitude,
      phone,
      image
    } = this.state.selectItem;
    return (
      <Container>
        <Head
          onEdit={() => this.onEdit()}
          onBack={() => this.props.navigation.navigate("Inventory")}
        />
        <Content>
          <Card>
            <CardItem header style={{ paddingBottom: 0 }}>
              <Text style={styles.header}>{type}</Text>
            </CardItem>
            <Item>
              <CardItem>
                <Body>
                  <Text style={{ width: width * 0.9 }}>{description}</Text>
                </Body>
              </CardItem>
            </Item>
            <CardItem header style={{ paddingBottom: 0 }}>
              <Text>{location_name}</Text>
            </CardItem>
            <Item>
              <CardItem>
                <Body style={styles.row}>
                  <Icon type="MaterialIcons" name="location-on" />
                  <Text style={{ width: width * 0.5 }}>
                    {address} {city}, {State} {zip}
                  </Text>
                </Body>
              </CardItem>
            </Item>
            <CardItem>
              <Body style={styles.row}>
                <Icon type="MaterialCommunityIcons" name="cellphone-iphone" />
                <Text>{phone}</Text>
              </Body>
            </CardItem>
            <CardItem style={styles.paddingZero}>
              <Body style={styles.center}>
                {image.length > 0 && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: width * 0.9,
                      height: width,
                      margin: width * 0.05
                    }}
                  />
                )}
              </Body>
            </CardItem>
            <CardItem style={[styles.paddingZero, { paddingBottom: 10 }]}>
              <Text style={styles.footer}>
                Added by Mike Long on 08/08/2019 at 2:15 PM EST
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    color: "#222222",
    fontSize: 21,
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  },
  center: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  paddingZero: {
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0
  },
  footer: {
    color: "#808080",
    fontSize: 11,
    fontWeight: "600"
  }
});
const mapStateToProps = state => {
  const { list } = state.inventorylist;
  return {
    list
  };
};
const mapDispatchToProps = {
  editMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPage);
