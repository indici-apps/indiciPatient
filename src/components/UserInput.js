import React, { memo } from 'react';
import { View, StyleSheet, Text, TextInput as Input } from 'react-native';
const UserInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <Input
      placeholderTextColor="#707070" 
      style={styles.input}
      selectionColor="#600EE6"
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    opacity: 0.7,
    backgroundColor: "rgba(226, 230, 234, 1)",
    padding: 10,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(226, 230, 234, 1)",
    marginLeft: 25,
    marginRight: 25,
    color: "#000",
    fontWeight: "600"
    
  },
  error: {
    color: '#cc3300',
    marginLeft: 30,
    borderColor: 'red'
  
  },
});

export default memo(UserInput);
