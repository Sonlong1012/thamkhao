import React, { Component } from 'react';
import { Divider, ListItem, Text } from 'react-native-elements';
import { Card } from 'react-native-elements';
// import { LEADERS } from '../shared/leader';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = (state) => {
    return {
        leaders: state.leaders
    }
};
class AboutUs extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     leader: LEADERS
        // };
    }
    render() {
        // const id = this.props.route.params?.id;
        // const leader = this.state.leader[id];
        return (

            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={1000} delay={500}>
                    <RenderHistory />
                </Animatable.View>
                <Animatable.View animation='fadeInUp' duration={1000} delay={500}>
                <Card>
                    {/* <RenderAboutUs leader={leader} /> */}
                    <Card.Title>Corportate Leadership</Card.Title>
                    <Card.Divider></Card.Divider>
                   
                        <RenderLeadership leaders={this.props.leaders.leaders}
                            isLoading={this.props.leaders.isLoading}
                            errMess={this.props.leaders.errMess} />
                   
                </Card>
                </Animatable.View>
            </ScrollView>


        );
    }

}
class RenderLeadership extends Component {
    render() {

        if (this.props.isLoading) {
            return (
                <Card>
                    <Card.Divider />
                    <Loading />
                </Card>
            );
        }
        else if (this.props.errMess) {
            return (
                <Card>

                    <Card.Divider />
                    <Text>{this.props.errMess}</Text>
                </Card>
            );
        }
        else {
            return (<Card>
                <FlatList data={this.props.leaders}
                    renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
                    keyExtractor={(item) => item.id.toString()} />
            </Card>);

        }

    }
    renderLeaderItem(item, index) {
        return (

            <ListItem key={index}>
                <Avatar rounded source={{ uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold' }}>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

        );
    }
}


class RenderHistory extends Component {
    render() {
        return (
            <Card>
                <Card.Title>Our History</Card.Title>
                <Card.Divider />
                <Text style={{ margin: 10 }}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
                <Text style={{ margin: 10 }}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the worlds best cuisines in a pan.</Text>
            </Card>
        );
    }
}
export default connect(mapStateToProps)(AboutUs);