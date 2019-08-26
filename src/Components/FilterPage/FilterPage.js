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
import { clearSelection, searchInventory, searchText, clearSearchList } from "../../actions";
import Head from "./Head";
import Picker from "react-native-picker-select";
import { Button } from "../../common";
let { width, height } = Dimensions.get("window");
class FilterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onReset() {

    }
    onApply() {

    }
    render() {
        const placeholder = {
            label: "Select...",
            value: null,
            color: "#9EA0A4"
        };
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
                                        onValueChange={type => this.props.filterType(type)}
                                        style={styles}
                                        value={this.props.filter_type}
                                    />
                                </View>
                            </View>
                        </Item>
                        <Item>
                            <View style={[styles.item, { padding: 10, }]}>
                                <View style={{ paddingBottom: 10 }}>
                                    <Text style={styles.labelText}>Keywords</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput placeholder="Search" />
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
    const { list, admin_list } = state.inventorylist;
    const { search_text, filter_type, filter_user, filter_date } = state.search;
    return {
        list,
        admin_list,
        search_text,
        filter_type,
        filter_user,
        filter_date
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
)(FilterPage);