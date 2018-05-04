import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

class CardList extends Component {

  render() {
    const { list, cardStyle, pressCard } = this.props;

    const content = [];
    for (let i = 0; i < list.length; i++) {
      content.push(<Card key={i} number={list[i]} cardStyle={cardStyle} pressCard={pressCard}/>);
    }
    return (
      <Fragment>
        {content}
      </Fragment>
    );
  }
}


CardList.propTypes = {};
CardList.defaultProps = {};

export default CardList;
