import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';

class Card extends Component {
  constructor(props) {
    super(props);
  }
  handlePress = () => {
    const { pressCard, number } = this.props;
    pressCard(number);
  };
  render() {
    const {number, cardStyle } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={cardStyle}>{number}</Text>
      </TouchableOpacity>
    );
  }
}

export default Card;
