import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Image
        source={{
          uri: 'https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Keep Note</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Navbar;
