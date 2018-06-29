import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import Receipt from '../pages/Receipt';

import themes from '../styles/theme.style';

const Route = createStackNavigator(
{
  Products: { screen: Products},
  Checkout: { screen: Checkout},
  Receipt: { screen: Receipt}
},
{
 navigationOptions: {
 	headerStyle: {
 		backgroundColor: themes.BACKGROUND_COLOR,
 		paddingHorizontal: 10,
 	},
 	headerTintColor: '#fff'
 }
}
);

export default Route;