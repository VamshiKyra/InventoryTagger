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
import {
  editMode,
  typeChange,
  descriptionChange,
  locationChange,
  addressChange,
  cityChange,
  stateChange,
  zipChange,
  latitudeChange,
  longitudeChange,
  phoneChange,
  imageChange,
  uidChange,
  createUser,
  createTs,
  modifyUser,
  modifyTs,
  userId
} from "../../actions";
import moment from "moment";
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
      },
      date: "",
      time: ""
    };
  }
  componentDidMount() {
    let list = this.props.list;
    let admin_list = this.props.admin_list;
    if (
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params
    ) {
      if (this.props.navigation.state.params.uid) {
        const { uid } = this.props.navigation.state.params;
        console.log("Uid", uid)
        if (list && list.length > 0) {
          list.map(item => {
            if (item.uid == uid) {
              this.setItem(item, false);
            }
          });
        }
        if (admin_list && admin_list.length > 0) {
          admin_list.map(item => {
            if (item.uid == uid) {
              this.setItem(item, true);
            }
          });
        }
      }
    }
  }
  setItem(item, admin) {
    console.log("i", item, admin)

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
      image,
      create_user,
      create_ts,
      modify_user,
      modify_ts,
      uid
    } = item;
    this.props.typeChange(type);
    this.props.descriptionChange(description);
    this.props.locationChange(location_name);
    this.props.addressChange(address);
    this.props.cityChange(city);
    this.props.stateChange(State);
    this.props.zipChange(zip);
    this.props.latitudeChange(latitude);
    this.props.longitudeChange(longitude);
    this.props.phoneChange(phone);
    this.props.imageChange(image);
    this.props.uidChange(uid);
    this.props.createUser(create_user);
    this.props.createTs(create_ts);
    this.props.modifyUser(modify_user);
    this.props.modifyTs(modify_ts);
    const date = moment(create_ts).format("MM/DD/YYYY");
    const time = moment(create_ts).format("LT");
    if (admin) {
      const { user_id } = item;
      console.log("user_id", user_id)
      this.props.userId(user_id);
    }
    this.setState({ date, time });
  }
  onEdit() {
    const { uid } = this.props;
    this.props.editMode(true);
    this.props.navigation.navigate("EditPage", {
      uid
    });
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
      image,
      create_user,
      create_ts
    } = this.props;
    const { date, time } = this.state;
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
                Added by {create_user} on {date} at {time} EST
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
  const { list, admin_list } = state.inventorylist;
  const {
    type,
    description,
    location_name,
    address,
    State,
    zip,
    city,
    latitude,
    longitude,
    phone,
    image,
    create_user,
    create_ts,
    modify_user,
    modify_ts
  } = state.add;
  return {
    list,
    type,
    description,
    location_name,
    address,
    State,
    zip,
    city,
    latitude,
    longitude,
    phone,
    image,
    create_user,
    create_ts,
    modify_user,
    modify_ts,
    admin_list
  };
};
const mapDispatchToProps = {
  editMode,
  typeChange,
  descriptionChange,
  locationChange,
  addressChange,
  cityChange,
  stateChange,
  zipChange,
  latitudeChange,
  longitudeChange,
  phoneChange,
  imageChange,
  uidChange,
  createUser,
  createTs,
  modifyUser,
  modifyTs,
  userId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPage);
