import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, PanResponder, Alert } from 'react-native';
import { Card, Image, Icon, Rating, Input, Button } from 'react-native-elements';
// import { DISHES } from '../shared/dishes';
// import {COMMENTS} from '../shared/comments'
import { ScrollView } from 'react-native-virtualized-view';
import { FlatList } from 'react-native-gesture-handler';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { SliderBox } from 'react-native-image-slider-box';



const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
};


class RenderDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  render() {
    // gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -50) return 1; // right to left
      if (dx < 250) return 2;
      return 0;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState) === 1) {
          Alert.alert(
            'Add Favorite',
            'Are you sure you wish to add ' + dish.name + ' to favorite?',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress: () => { this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite() } },
            ]
          );
        }
        if (recognizeDrag(gestureState) === 2) {
          this.props.onPressComment();
        }
        return true;
      }
    });
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card {...panResponder.panHandlers}>
          {/* <Image source={{ uri: baseUrl + dish.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image> */}
          <Card.Title>{dish.name}</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon raised reverse type='font-awesome' color='#f50'
              name={this.props.favorite ? 'heart' : 'heart-o'}
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            <Icon raised reverse name='pencil' type='font-awesome' color='#0055ff'
              onPress={() => this.props.onPressComment()} />

          </View>

        </Card>
      );
    }
    return (<View />);
  }
  handlea2() {
    this.setState({ showModal: true });
  }
}

class ModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      author: '',
      comment: ''
    };
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', margin: 20 }}>
        <Rating startingValue={this.state.rating} showRating={true}
          onFinishRating={(value) => this.setState({ rating: value })} />
        <View style={{ height: 20 }} />
        <Input value={this.state.author} placeholder='Author' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
          onChangeText={(text) => this.setState({ author: text })} />
        <Input value={this.state.comment} placeholder='Comment' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
          onChangeText={(text) => this.setState({ comment: text })} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title='SUBMIT' color='#7cc'
            onPress={() => this.handleSubmit()} />
          <View style={{ width: 10 }} />
          <Button title='CANCEL' color='#7cc'
            onPress={() => this.props.onPressCancel()} />
        </View>
      </View>
    );
  }
  handleSubmit() {
    // alert(this.props.dishId + ':' + this.state.rating + ':' + this.state.author + ':' + this.state.comment);
    this.props.postComment(this.props.dishId, this.state.rating, this.state.author, this.state.comment);
    this.props.onPressCancel();
  }
}

import { postFavorite, postComment } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});


class Dishdetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    const dish = this.props.dishes.dishes[dishId];
    const comments = this.props.comments.comments.filter((cmt) => cmt.dishId === dishId);

    const favorite = this.props.favorites.some((el) => el === dishId);
    return (
      <ScrollView>
        <Animatable.View animation='flipInY' duration={2000} delay={1000}>
          <RenderSlider dish={dish} />
        </Animatable.View>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <RenderDish dish={dish} favorite={favorite} onPressFavorite={() => this.markFavorite(dishId)} onPressComment={() => this.setState({ showModal: true })} />
        </Animatable.View>
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
          <RenderComments comments={comments} />
        </Animatable.View>
        <Modal animationType={'slide'} visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <ModalContent dishId={dishId} postComment={this.props.postComment}
            onPressCancel={() => this.setState({ showModal: false })} />
        </Modal>
      </ScrollView>
    );
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
}
class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()} />
      </Card>
    );
  }
  renderCommentItem(item, index) {

    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>

        <Rating startingValue={item.rating} imageSize={16} readonly style={{ flexDirection: 'row' }} />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);


class RenderSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 30,
      height: 0
    };
  }
  render() {
    const images = [
      baseUrl + this.props.dish.image,
      baseUrl + 'images/buffet.png',
      baseUrl + 'images/logo.png'
    ];
    return (
      <Card onLayout={this.onLayout}>
        <SliderBox images={images} parentWidth={this.state.width - 30} />
      </Card>
    );
  }
  onLayout = (evt) => {
    this.setState({
      width: evt.nativeEvent.layout.width,
      height: evt.nativeEvent.layout.height,
    });
  };
}