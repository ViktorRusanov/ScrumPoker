import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import CardList from './src/components/CardList/CardList';
import Card from './src/components/Card/Card';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardList: [1, 2, 3, 5, 8, 13, 20, 40, 100, '?'],
      currentCard: '100'
    }
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    });

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }
  handlePress = (number) => {
    this.setState({
      currentCard: number
    });
    this.flipCard();
  };
  render() {
    const frontAnimatedStyle = {
      transform: [
        {rotateY: this.frontInterpolate}
      ]
    };
    const backAnimatedStyle = {
      transform: [
        {rotateY: this.backInterpolate}
      ]
    };
    const {cardList, currentCard} = this.state;
    return (
      <View style={styles.container}>
            <Animated.View style={[styles.frontStyle, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
              <CardList list={cardList} cardStyle={[styles.cardStyle, styles.smallCard]} pressCard={this.handlePress} />
            </Animated.View>
            <Animated.View style={[styles.frontStyle, styles.backCard, backAnimatedStyle, {opacity: this.backOpacity}]}>
              <Card number={currentCard} cardStyle={[styles.cardStyle, styles.bigCard]} pressCard={this.handlePress} />
            </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  frontStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: '15%'

  },
  backCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  smallCard: {
    width: 90,
    height: 90,
    fontSize: 30
  },
  bigCard: {
    width: 200,
    height: 300,
    fontSize: 60
  },
  cardStyle: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#547CCF',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderStyle: 'solid',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'white',
    margin: 10,

  }
});

