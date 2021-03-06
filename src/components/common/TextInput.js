import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, textStyles } from '../../assets';

const propTypes = {
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  hasError: PropTypes.bool,
};

const MyTextInput = (props) => {
  const { title, style, hasError, ...textInputProps } = props;
  const textInputStyle = !title && { flex: 1, textAlign: 'center' };

  return (
    <View style={[styles.container, style, { borderBottomColor: hasError ? 'red' : colors.gray }]}>
      <TextInput
        style={[styles.textInput, textStyles.h1, textInputStyle]}
        keyboardType="numeric"
        {...textInputProps}
        underlineColorAndroid="transparent"
      />
      {!!title && <Text style={[textStyles.bodySmall, styles.title]}>{title}</Text>}
    </View>
  );
};

MyTextInput.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  textInput: {
    textAlign: 'right',
    flex: 0.55,
    paddingTop: 0,
    paddingBottom: 0,
    height: 44,
  },
  title: {
    marginLeft: 5,
    marginBottom: 5,
    color: colors.grayLight,
  },
});

export { MyTextInput as TextInput };
