import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput } from 'react-native';
import {
    Container,
    Content,
    Item,
    Footer,
    Icon,
    Card,
    CardItem,
    Body
} from "native-base";
import { connect } from "react-redux";
import { clearSelection, searchInventory, searchText, clearSearchList, filterType, filterBy, filterDate, filterSearch } from "../../actions";
import Head from "./Head";
import Picker from "react-native-picker-select";
import { Button } from "../../common";
let { width, height } = Dimensions.get("window");
class FilterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_picker: []
        };
    }
    componentDidMount() {
        const { users } = this.props;
        let user_picker = users.map(user => {
            const pick = {
                label: user.name,
                value: user.id
            };
            return pick;
        });
        this.setState({ user_picker });
    }
    onReset() {
        this.props.filterType('');
        this.props.filterBy('');
        this.props.filterDate('');
        this.props.searchText('');
        this.props.clearSearchList();
    }
    onApply() {
        const { list, admin_list, filter_type, filter_user, search_text, navigation } = this.props;
        let filters = {
            user_id: filter_user,
            type: filter_type
        };
        if (filter_type == "" || filter_type == null) delete filters.type;
        if (filter_user == "" || filter_user == null) delete filters.user_id;
        console.log("filter", list, admin_list, filters, search_text);
        this.props.filterSearch(list, admin_list, filters, search_text, navigation);
    }
    render() {
        const placeholder = {
            label: "Select...",
            value: null,
            color: "#9EA0A4"
        };
        const { user_picker } = this.state;
        return (
            <Container>
                <Head onReset={() => this.onReset()} onBack={() => this.props.navigation.navigate("Inventory")} />
                <Content>
                    <Card>

                        <Item>
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.labelText}>Item Type</Text>
                                </View>
                                <View>
                                    <Picker
                                        name="item"
                                        type="item"
                                        placeholder={placeholder}
                                        items={[
                                            { label: "Ambulance", value: "Ambulance" },
                                            { label: "Command Post", value: "Command Post" },
                                            { label: "Generator", value: "Generator" },
                                            { label: "Water Palette", value: "Water Palette" }
                                        ]}
                                        onValueChange={type => this.props.filterType(type)}
                                        style={styles}
                                        value={this.props.filter_type}
                                    />
                                </View>
                            </View>
                        </Item>
                        <Item>
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.labelText}>Added By</Text>
                                </View>
                                <View>
                                    <Picker
                                        name="item"
                                        type="item"
                                        placeholder={placeholder}
                                        items={user_picker}
                                        onValueChange={type => this.props.filterBy(type)}
                                        style={styles}
                                        value={this.props.filter_user}
                                    />
                                </View>
                            </View>
                        </Item>
                        {/* <Item>
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.labelText}>Date Added</Text>
                                </View>
                                <View>
                                    <Picker
                                        name="item"
                                        type="item"
                                        placeholder={placeholder}
                                        items={[
                                            { label: "Ambulance", value: "Ambulance" },
                                            { label: "Command Post", value: "Command Post" },
                                            { label: "Generator", value: "Generator" },
                                            { label: "Water Palette", value: "Water Palette" }
                                        ]}
                                        onValueChange={type => this.props.filterDate(type)}
                                        style={styles}
                                        value={this.props.filter_date}
                                    />
                                </View>
                            </View>
                        </Item> */}
                        <Item>
                            <View style={[styles.item, { padding: 10, }]}>
                                <View style={{ paddingBottom: 10 }}>
                                    <Text style={styles.labelText}>Keywords</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Search" onChangeText={(input) => this.props.searchText(input)} value={this.props.search_text} returnKeyType="go"
                                        onSubmitEditing={() => this.onApply()} />
                                </View>
                            </View>
                        </Item>
                        <Button label="Apply" onClick={() => this.onApply()} />
                    </Card>
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    labelText: {
        color: "#808080",
        fontSize: 12,
        fontWeight: "600"
    },
    item: {
        flexDirection: "column",
        paddingHorizontal: 15,
        paddingTop: 10
    },
    itemWidth: {
        width: width * 0.9
    },
    inputIOS: {
        fontSize: 17,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderColor: "gray",
        borderRadius: 4,
        color: "#222222",
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 17,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderColor: "purple",
        borderRadius: 8,
        color: "#222222",
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    halfWidth: {
        width: width * 0.5
    },
    inputContainer: { height: 40, width: width * 0.8, justifyContent: "center", alignContent: "center", padding: 10, borderWidth: 1, borderColor: "#C6C4C0", }
});
const mapStateToProps = state => {
    const { list, admin_list, users } = state.inventorylist;
    const { search_text, filter_type, filter_user, filter_date } = state.search;
    return {
        list,
        admin_list,
        search_text,
        filter_type,
        filter_user,
        filter_date,
        users
    };
};
const mapDispatchToProps = {
    clearSelection,
    searchInventory,
    searchText,
    clearSearchList,
    filterType,
    filterBy,
    filterDate,
    filterSearch
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterPage);