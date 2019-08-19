import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Head from "./Head";
import { Container, Content, Item, Footer, Icon, Card, CardItem, Text, Body } from "native-base";
let { width, height } = Dimensions.get("window");
class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <Head onSubmit={() => this.onSubmit()} />
                <Content>
                    <Card>
                        <CardItem header style={{paddingBottom:0, }} >
                            <Text style={styles.header}>Generator</Text>
                        </CardItem>
                        <Item >
                            <CardItem>
                                <Body >
                                    <Text style={{width:width*0.9}}>
                                        Perkins Type 2, 1500 kW Generator. Sound attenuated. Trailer mounted. 2260 Amps@ 480 Volts, 3 Phase, 60 Hz. Weight 59,000 lbs
                                </Text>
                                </Body>
                            </CardItem>
                        </Item >
                        <CardItem header style={{paddingBottom:0}}>
                            <Text>Jefferson County Sheriff’s Office</Text>
                        </CardItem>
                        <Item >
                            <CardItem>
                                <Body style={styles.row}>
                                    <Icon type="MaterialIcons" name="location-on" />
                                    <Text style={{width:width*0.5}}>
                                        169 Industrial Park Monticello, FL 32344
                                    </Text>
                                </Body>
                            </CardItem>
                        </Item>
                        <CardItem>
                            <Body style={styles.row}>
                                <Icon type="MaterialCommunityIcons" name="cellphone-iphone" />
                                <Text>
                                    (850) 342-0211
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem style={styles.paddingZero} >
                            <Body style={styles.center}>
                                <Image source={require("../../Img/photogenerator.png")} style={{ width: width * 0.9, margin: width * 0.05 }} />
                            </Body>
                        </CardItem>
                        <CardItem style={[styles.paddingZero,{paddingBottom:10}]}>
                            <Text style={styles.footer}>Added by Mike Long on 08/08/2019 at 2:15 PM EST</Text>
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
        fontWeight: 'bold',
    },
    row: {
        flexDirection: "row",
        alignContent: 'center',
        alignItems: 'center',
    },
    center: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paddingZero:{
        paddingTop: 0,
        paddingBottom: 0,
        margin:0
    },
    footer:{
        color:"#808080",
        fontSize: 11,
        fontWeight:"600"
    }
});
export default ViewPage;
