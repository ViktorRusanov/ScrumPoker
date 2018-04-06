import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

export default class App extends React.Component {
  componentWillMount() {
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(1);
  }

  handlePress = () => {
    Animated.parallel([
      Animated.timing(this.animatedValue1, {
        toValue: 200,
        duration: 900
      }),
      Animated.spring(this.animatedValue2, {
        toValue: 3,
      })
    ]).start();
  };


  render() {
    const animateStyles = {
      transform: [
        {translateY: this.animatedValue1},
        {scale: this.animatedValue2}
      ]
    };
    return (
      <View style={styles.container}>
        <Text style={styles.card}>1</Text>
        <Animated.Text style={[styles.card, animateStyles]} onPress={this.handlePress} >2</Animated.Text>
        <Text style={styles.card}>3</Text>
        <Text style={styles.card}>5</Text>
        <Text style={styles.card}>8</Text>
        <Text style={styles.card}>13</Text>
        <Text style={styles.card}>20</Text>
        <Text style={styles.card}>40</Text>
        <Text style={styles.card}>100</Text>
        <Text style={styles.card}>?</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    margin: 30
  },
  card: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    backgroundColor: '#547CCF',

    textAlign: 'center',
    textAlignVertical: 'center',
    borderStyle: 'solid',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'white',
    width: 90,
    height: 90
  }
});
