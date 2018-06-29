import React, { Component } from 'react';

import {
	View,
	Text,
	FlatList,
  StyleSheet,
  ScrollView
} from 'react-native';

import CartItems  from './CartItems.component';
import CustomerForm from './CustomerForm.component';

class CheckoutItems extends Component {  
  render() {
  	const { cartItems, navigation, cartTotal } = this.props;
    return (
      <View style={styles.container}>
            	
            		<View style={styles.annouc}>
            			<Text style={styles.anncText}>Please confirm your order and checkout your cart.</Text>
            		</View>
            		<View style={styles.ckitems}>
            		<FlatList 
                  data={cartItems}
            			renderItem={({item, index}) => <CartItems item={item} index={index} />}
            			keyExtractor={(item) => item.id}
            			ItemSeparatorComponent= {()=> <View style={{height:0.3, backgroundColor:'#34495e90'}}/> }
            		/>
            		<Text style={styles.text}>Total: $ {(cartTotal).toFixed(2)}</Text>	
            		</View>
            		<View style={styles.custForm}>
                  <ScrollView>
            			 <CustomerForm navigation={navigation}/>
                  </ScrollView> 
            		</View>

       </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  custForm: {
    flex: 1
  },
  ckitems: {
    height: 170
  },
    annouc:{
      padding: 12,
      borderRadius: 5,
      backgroundColor: '#34495e90',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      textAlign: 'center',
      color: 'red'
    },
    anncText:{
        textAlign: 'center',
        color: '#fff'  
    }
});

export default CheckoutItems;