import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import { connect } from 'react-redux';

import OrderSummary from '../components/OrderSummary.component';
import Logo from '../components/Logo.component';
import Cart from '../components/Cart.component';
import themes from '../styles/theme.style';

class Receipt extends Component {

 static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Receipt',
      headerLeft: <Logo navigation={navigation}/>,
      headerRight: <Cart navigation={navigation}/>
    }
  }
  getTotal(){
  	let total = 0;
  	const { items } = this.props;
  	for (let i = 0; i < items.length; i++) {
  		total = total + items[i].cost
  	}
  	return <Text style={styles.totText}>Total: ${(total).toFixed(2)}</Text>
  }

  render() {
  	const { customer, items, navigation } = this.props;
    return (
      <View style={styles.container}>
      	
      	<View style={styles.headings}>
      		<Text>Invoice for your purchase</Text>
      	</View>
      	<View style={styles.billings}>
      		<Text style={styles.billtext}>Billing details</Text>
      		<Text style={styles.text}>{customer.name}</Text>
      		<Text style={styles.text}>{customer.phone}</Text>
      		<Text style={styles.text}>{customer.email}</Text>
      		<Text style={styles.text}>{customer.street}</Text>
      	</View>
      	<View style={styles.orderSumm}>
      		<Text style={styles.billtext}>Order summary</Text>
      		<FlatList
      		data={items}
      		renderItem={({item}) => <OrderSummary item={item}/>}
      		keyExtractor={(item) => item.id}
      		ItemSeparatorComponent={() => <View style={{height:0.5, backgroundColor:'#34495e90'}} />}
      		/>
      		{this.getTotal()}
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex: 1
	},
	headings: {
		backgroundColor: '#34495e90',
		padding: 12,
    	borderRadius: 5,
    	margin: 10,
    	justifyContent: 'center',
    	alignItems: 'center'
	},
	orderSumm: {
		flex: 1,
		margin: 10
	},
	billtext: {
		padding: 6,
		borderWidth: 1,
    borderRadius: 3,
    borderColor: themes.BACKGROUND_COLOR,
    justifyContent: 'center',
	},
	text: {
		margin: 5
	},
	billings: {
		height: 130,
		margin: 10
	},
	totText: {
		textAlign: 'center',
		color: 'red'
	}
});

const mapStateToProps = (state) => ({
	customer: state.order.order.customer,
	items: state.order.order.items
})

export default connect(mapStateToProps)(Receipt);