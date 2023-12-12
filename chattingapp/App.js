import React, { Fragment } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigators/StackNavigation';
import { Color } from './src/utils/Color';

function App() {
  return (
    <Fragment>
      <StatusBar backgroundColor={Color.primary} />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Fragment>
  );
}

const styles = StyleSheet.create({

});

export default App;
