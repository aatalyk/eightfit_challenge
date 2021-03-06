import React from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, textStyles } from '../../assets';

const propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  title: PropTypes.string,
  currentIndex: PropTypes.number,
  onSelect: PropTypes.func,
  titles: PropTypes.array,
};

export const SegmentedControl = ({ style, titles, currentIndex, onSelect }) => (
  <View style={[styles.container, style]}>
    {titles.map((title, i) => {
      const isActive = i === currentIndex;
      const backgroundColor = isActive ? colors.black : 'white';
      const titleColor = isActive ? 'white' : colors.black;
      const borderRightWidth = titles.length - 1 > i ? 1 : 0; // in case there are more than 2 items

      return (
        <TouchableWithoutFeedback onPress={() => onSelect(title, i)} key={i}>
          <View
            style={[
              {
                backgroundColor,
                borderRightWidth,
              },
              styles.titleContainer,
            ]}
          >
            <Text style={[styles.title, textStyles.bodySmall, { color: titleColor }]}>
              {title.toUpperCase()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    })}
  </View>
);

SegmentedControl.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.black,
  },
  titleContainer: {
    justifyContent: 'center',
    borderRightColor: colors.black,
  },
  title: {
    paddingHorizontal: 20,
  },
});
