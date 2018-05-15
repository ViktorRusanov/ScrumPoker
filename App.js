import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import CardList from './src/components/CardList/CardList';
import Card from './src/components/Card/Card';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardList: [1, 2, 3, 5, 8, 13, 20, 40, 100, '?'],
      currentCard: '100',
      zIndex: -1
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
  handleSelectCard = (number) => {
    this.setState({
      currentCard: number,
      zIndex: this.state.zIndex < 0 ? 1: -1
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
    const {cardList, currentCard, zIndex} = this.state;
    const { container, generalCardStyle, smallCard, bigCard, generalStyle, backStyle } = styles;
    return (
      <View style={container}>
            <Animated.View style={[generalStyle, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
              <CardList list={cardList} cardStyle={[generalCardStyle, smallCard]} pressCard={this.handleSelectCard} />
            </Animated.View>
            <Animated.View style={[generalStyle, backStyle, backAnimatedStyle, {opacity: this.backOpacity, zIndex}]}>
              <Card number={currentCard} cardStyle={[generalCardStyle, bigCard]} pressCard={this.handleSelectCard} />
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
    backgroundColor: 'black'
  },

  generalStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: '15%',
    backfaceVisibility: 'hidden'
  },
  backStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%'
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
  generalCardStyle: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#547CCF',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderStyle: 'solid',
    borderRadius: 15,
    margin: 10
  }
});

