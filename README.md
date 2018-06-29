Selling merchandise online has become a staple using the mobile platform. In this tutorial,
we will explore how we can leverage the power of React-Native mobile framework to create our very own online shop.

We'll start by creating three different screens, such as the products page which is the home page of the app, a 
checkout page and a receipt page, navigation between screens will be done by react-navigation and we'll fetch products from the data stores via Redux.

When we are finished, you'll have a complete blueprint that you can expand upon and apply your own concepts.

Let's get started!

## Boilerplate

To create a new project run react-native init <project-name>. Example: react-native webshop. 

Run the app

First, let's run the project to see how it looks.

```javascript

Type the command

react-native run-ios  -for running the app on an ios simulator
				or:
react-native run-android - for running the app on a connected Android phone/emulator

```

## Begin customizing the project

Let's begin by creating a directory named app in the project folder. The app folder will have all our javascript source code.

## Directory structure

Now, let's create a few directories inside /app that will help us structure our code such that it is modular and easier to maintain.

```javascript

cd app
mkdir assets components pages redux routes styles
 
```
we'll also create a dummy database file in the app folder for called data.js to avoid us from doing any server-side setup.

```javascript

// app/data.js

const books = [
{
	id: "1",
	title: "Beginning Android Programming",
	author: "J.F DiMarzio",
	authorbio: "About DiMarzio",
	publicationdate: "2017 by John Wiley & Sons",
	introduction: "This book is written to help start beginning Android developers ",
	picture: require("./assets/images/books/android.png"),
	cost: 25
},
{
	id: "2",
	title: "ES6 & Beyound",
	author: "Kyle Simpson",
	authorbio: "Kyle Simpson is a thorough pragmatist.",
	publicationdate: "2015-5-5",
	introduction: "This book is about shaking up your sense of understanding by exposing you ",
	picture: require("./assets/images/books/es6.png"),
	cost: 35.99
},
{
	id: "3",
	title: "ng-book 2",
	author: "Ari Lerner",
	authorbio: "Full stack web developer and trainer.",
	publicationdate: "2016-5-10",
	introduction: "A complete refernce book on angular 2. ",
	picture: require("./assets/images/books/ngbook21.png"),
	cost: 25.99
},
{
	id: "4",
	title: "Pro Git",
	author: "Scott Chacon and Ben Straub",
	authorbio: "Full stack web developer and trainer.",
	publicationdate: "2016-5-10",
	introduction: "Welcome to the second edition of Pro Git.  ",
	picture: require("./assets/images/books/progit.png"),
	cost: 45.99
},
{
	id: "5",
	title: "Reactjs Blueprints",
	author: "Sven A. Robbestad",
	authorbio: "Sven A. Robbestad is a developer with a keen interest in the Web .",
	publicationdate: "2016-7-10",
	introduction: "ReactJS was developed as a tool to solve a problem with the application state. ",
	picture: require("./assets/images/books/reactjsblue.png"),
	cost: 20.99
},
{
	id: "6",
	title: "ReAwaken The Giant Within",
	author: "Tony Robins",
	authorbio: "Tony Robbins is one of the great influences of this generation.",
	publicationdate: "2013-5-10",
	introduction: "I’m sending you this gift of a condensed version of my 544-page original book in the hope",
	picture: require("./assets/images/books/awaken.png"),
	cost: 22
},
{
	id: "7",
	title: "SurviveJS",
	author: "Juho Vapsalainen",
	authorbio: "Full stack web developer and trainer.",
	publicationdate: "2016-5-10",
	introduction: "Front-end development moves forward fast.  ",
	picture: require("./assets/images/books/survivejs.png"),
	cost: 25.99
},
{
	id: "8",
	title: "Switching To Angular2",
	author: "Minko Gechev",
	authorbio: "Minko Gechev is a software engineer who strongly believes in open source software. ",
	publicationdate: "March 2016",
	introduction: "It is the modern framework you need to build performant and robust web applications.",

	picture: require("./assets/images/books/switchingto.png"),
	cost: 21
},
{
	id: "9",
	title: "Unlimited Sales Success",
	author: "Brian Tracy",
	authorbio: "A world class motivational and sales consultant.",
	publicationdate: "2013-2-10",
	introduction: "A complete refernce book on todays selling. ",
	picture: require("./assets/images/books/selling.png"),
	cost: 25.99
},
{
	id: "10",
	title: "Web Development with Node and ExpressJS",
	author: "Ethan Brown",
	authorbio: "A senior software engineer at PoP Art.",
	publicationdate: "2014-6-27",
	introduction: "Learn to build modern web applications with node and expressjs ",
	picture: require("./assets/images/books/node.png"),
	cost: 19.99
}
];

export const getProducts = () => {
    return books;
    
}


```

So your project directory should now look like this:

```javascript

. app/assets - This is where all our images, videos, etc will go in
. app/styles - This is where your global styles, themes will go 
. app/components - This directory will contain your resusable components
. app/pages - This directory will hold all the screen components
. app/routes - This is where we will keep all our app's routing logic
. app/redux - This will contain all our redux state management files like actions, reducers, store etc

```

In addition, we're going to need few more packages for our app, most notably: react-navigation, redux, react-redux, redux-thunk
so on the command line run yarn add redux, react-redux, react-navigation, redux-thunk

# Theme variables

In general, every app should have well defined font sizes, colors, spacing, etc. This is done so that the app looks consistent across screens.
We introduce a common file theme.style.js which will be located at app/styles/theme.style.js

In the theme file we define our theme variables as follows:

```javascript

// app/styles/theme.style.js

export default{
    BUTTON_COLOR: '#1abc8c',
    BACKGROUND_COLOR: '#1abc9c'
}

```

## Adding a route handler and a global redux store to the project

Let's open the App.js file in the root of our project, remove everything from the initial scaffold, and replace it with the following:

```javascript

// /App.js

import React, { Component } from 'react';

import { Provider } from 'react-redux';

import store from './app/redux/store';

import Route from './app/routes';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <Route/>

      </Provider>
    );
  }
}

```

Of course, to run this, you need to create a file called index.js in the /app/routes directory. It should look like this:

## Let's now create our routes.

```javascript

// app/routes/index.js

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

```

It's pretty straightforward as you can see, we are importing createStackNavigator from react-navigation package to provide us with stack navigation
of our three pages, namely Products page, Checkout Page and the Receipt Page. The navigation also has some header navigation options for our top nav bar.

## Let's now create our redux global store.

```javascript

// app/redux.store.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middleware = [thunk];
const initialState = {};

export default createStore(rootReducer, initialState, applyMiddleware(...middleware));

```

We'll also create our root reducer.

```javascript

// app/redux/reducers/index.js

import { combineReducers } from  'redux';

import productReducer from './productReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    products: productReducer,
    cart: cartReducer,
    order: orderReducer
})

```

As seen from the imports above, the productReducer will hold all products. 

```javascript

// app/redux/reducers/productReducer.js

import { FETCH_PRODUCTS } from '../actions/types';

const initialState = {
    items: []
};
export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                ...state,
                items:action.payload
            }
        default:
            return state
    }
}

```

The cartReducer will hold the items in the cart.

```javascript

// app/redux/reducers/cartReducer.js

import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART } from '../actions/types';

const initialState = {
    cart: [],
    total: 0,
}

export default function(state=initialState, action) {
    switch(action.type){
        case ADD_TO_CART:
            return {
                ...state,
                cart: [action.payload, ...state.cart],
                total: state.total + action.payload.cost
            }
        case EMPTY_CART:
            return {
                ...state,
                cart: [],
                total: 0
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item, i) => i !== action.payload.index),
                total: state.total - action.payload.item.cost
            }
        default:
            return state
    }
}


```

The orderReducer will hold our ordered items and billing info.

```javascript

// app/redux/reducers/orderReducer.js

import { ADD_ORDER } from '../actions/types';

const initialState = {
	    order: {
        items: [],
        customer: {}
    }
}

export default function(state = initialState, action) {
	switch(action.type) {
		case ADD_ORDER:
			return {
				...state,
				order: {customer: action.payload.customer, items: action.payload.cartItems}
			}
		default:
			return state
	}
}

```

From the above we know all our reducers depend on actions to produce new state for our store. So let's create the actions. First we need to create the type of
actions we'll take.

```javascript

// app/redux/actions/types.js

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_ORDER = 'ADD_ORDER';
export const EMPTY_CART = 'EMPTY_CART';

```

So we can see that we'll be fetching our products from the dummy database, adding items to the cart, removing items from the cart, emptying the cart, and generating orders.

## Let's now create the individual actions.

Our product action:

```javascript

// app/redux/actions/productAction.js

import { FETCH_PRODUCTS } from './types';
import { getProducts } from '../../data';

export const fetchProducts = () => dispatch => {
	const books = getProducts();
     dispatch({
        type: FETCH_PRODUCTS,
        payload: books
    })
}

``` 


Our cart actions:

```javascript

// app/redux/actions/cartActions.js

import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART } from './types';

export const addToCart = (item) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: item
    })
}

export const removeItem = (item) => dispatch => {
	dispatch({
		type: REMOVE_FROM_CART,
		payload: item
	})
}

export const emptyCart = () => dispatch => {
	dispatch({
		type: EMPTY_CART
	})
}


```

Our order action:

```javascript

// app/redux/actions/orderAction.js

import { ADD_ORDER } from './types';

export const addOrder = (data) => dispatch => {
	dispatch({
		type: ADD_ORDER,
		payload: data
	})
}

```

# Creating the pages

Let's add the following files into the app/pages subfolder:

First the products page: 

```javascript

// app/pages/products.js


import React, { Component } from 'react';
import {  
    View, 
    StyleSheet, 
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import  Product  from '../components/Product/Product.component';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../redux/actions/productAction';
import Logo from '../components/TopBar/Logo.component';
import Cart from '../components/Cart.component';

class Products extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Products',
      headerLeft: <Logo navigation={navigation}/>,
      headerRight: <Cart navigation={navigation}/>
    }
  }
  constructor(props) {
      super(props);
  }

  componentWillMount = () => {
    this.props.fetchProducts();
  }

  addItemsToCart = (product) => {
      this.props.addToCart(product);
  }

  render() {
    const { products, navigation } = this.props
    return (
        <View style={styles.container}>
          
        <View style={styles.body}>
          <FlatList 
          data={products} 
          renderItem={({item}) => <Product item={item} addItemsToCart={this.addItemsToCart} product={item}/>}
          keyExtractor ={(item) => item.id}
          ItemSeparatorComponent= {()=> <View style={{height:0.5, backgroundColor:'#34495e90'}}/> }/>
        </View>
      </View>
 
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
      flex: 1,
      justifyContent: 'center'
    }
});
const mapStateToProps = (state) => ({
    products: state.products.items
})

export default connect(mapStateToProps, {addToCart,fetchProducts})(Products);

```

The checkout page:

```javascript

// app/pages/Checkout.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutItems from '../components/CheckoutItems.component';
import Logo from '../components/Logo.component';
import Cart from '../components/Cart.component';

export class Checkout extends Component {

 static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Checkout',
      headerLeft: <Logo navigation={navigation}/>,
      headerRight: <Cart navigation={navigation}/>
    }
  }
    render() {
    	const { cartItems, navigation, cartTotal } = this.props;
        return (
            <CheckoutItems cartItems={cartItems} cartTotal={cartTotal} navigation={navigation}/>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart,
    cartTotal: state.cart.total
});


export default connect(
    mapStateToProps
)(Checkout);


```

The receipt page:

```javascript

// app/pages/Receipt.js

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

```

Then the checkout page:

```javascript

// app/pages/Checkout.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutItems from '../components/CheckoutItems.component';
import Logo from '../components/Logo.component';
import Cart from '../components/Cart.component';

export class Checkout extends Component {

 static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Checkout',
      headerLeft: <Logo navigation={navigation}/>,
      headerRight: <Cart navigation={navigation}/>
    }
  }
    render() {
    	const { cartItems, navigation, cartTotal } = this.props;
        return (
            <CheckoutItems cartItems={cartItems} cartTotal={cartTotal} navigation={navigation}/>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart,
    cartTotal: state.cart.total
});


export default connect(
    mapStateToProps
)(Checkout);


```

Let's now create our resusable components which are stored in the components subfolder:

We'll start by creating the cart component which stores the number of items in the cart as seen in the right hand of the top bar.
It also uses the Animated api, so that anytime an item is added it's opacity get animated.

```javascript

// app/components/Cart.component.js

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Animated
} from 'react-native';
import { connect } from 'react-redux';


export class Cart extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	opacity: new Animated.Value(1)
	  };
	}

	componentWillReceiveProps(nextProps) {
	    if (nextProps.cartItems !== this.props.cartItems) {
	    	this.startAnimation();
	    }
	}

	startAnimation(){
		Animated.timing(this.state.opacity,
		{
			toValue: 0,
			duration: 500
		}).start(()=> {
			setTimeout(()=> {
				this.endAnimation()
			}, 100);
		})
	}

	endAnimation(){
		Animated.timing(this.state.opacity,
		{
			toValue: 1,
			duration: 500
		}).start()
	}

	onPress = () => {
		this.props.navigation.navigate('Checkout');
	}
    render() {
    	const { cartItems } = this.props;
    	let animatedStyle = {opacity: this.state.opacity}
        return (
            <Animated.View style={[styles.container, animatedStyle]}>
            	<TouchableOpacity onPress={this.onPress}>
            		<Text style={styles.cart}>Your cart: {(cartItems).length} items</Text>
            	</TouchableOpacity>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
});

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cart:{
		color: 'white',
		fontSize: 14
	}
})

export default connect(
    mapStateToProps
)(Cart);


```

We also have the cart items component which displays all the items in cart as well as the calculated total cost of the items in the cart.
You can also swipte to delete any item in the cart.

```javascript

// app/components/CartItems.component.js

import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert 
} from 'react-native';

import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

import { removeItem } from '../redux/actions/cartActions';

class CartItems extends Component {

    state = {
        activeRowKey: null
    }

    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => { this.setState({activeRowKey: null})},
            onOpen: (secId, rowId, direction) => { this.setState({activeRowKey: this.props.item.id})},
            right: [
                {
                    onPress: () => {
                        const deleteRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                            {text: 'No', onPress:() => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress:() => { this.props.removeItem({index: this.props.index, item: this.props.item})}},
                            ],
                            { cancelable: true}
                        )
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        }
        const { item, index } = this.props;
        return (
            <Swipeout {...swipeSettings}>
                <View style={styles.container}>
                    
                    <View style={styles.productDes}>
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={styles.text}>${(item.cost).toFixed(2)}</Text>
                    </View>
                </View>
            </Swipeout>
    );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    productDes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 14,
        padding: 10
    }
});

export default connect(null,{removeItem})(CartItems);

```

Then the custormer form resuseable component that displays customer checkout form for their billing details:

```javascript

// app/components/CustomerForm.component.js

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { connect } from 'react-redux';

import { addOrder } from '../redux/actions/orderAction';
import { emptyCart } from '../redux/actions/cartActions';

class CustomerForm extends Component {
 state = {
    name:'',
    phone: '',
    email: '',
    street: '',
  }

  renderTextfield(options) {
    return (
        <TextInput style={styles.textField} onChangeText={(value) => this.setState({[options.name]: value})} 
                placeholder= {options.label} value={this.state[options.name]} keyboardType= {options.keyboard || 'default'}/>
      );
  }

  onPressButton = () => {
        const {name, phone, email, street} = this.state;
        const { cartItems, navigation, addOrder, emptyCart } = this.props;
        if (name === '') { return Alert.alert('enter name')}
        if (phone === '') { return Alert.alert('enter phone')}
        if (email === '') { return Alert.alert('enter email')}
        if (street === '') { return Alert.alert('enter street')}
        let customer = { name: name, phone: phone, email: email, street: street}
        addOrder({cartItems: cartItems, customer: customer});
        emptyCart();
        this.setState({name: ''});
        this.setState({phone: ''});
        this.setState({email: ''});
        this.setState({street: ''});
        navigation.navigate('Receipt');
    }

  renderButton() {
        return (
            <TouchableOpacity style={styles.btn} onPress={this.onPressButton}>
                <Text style={styles.btnText}>proceed to checkout</Text>
            </TouchableOpacity>
        );
    }

  render() {
    return (
            <View style={styles.panel}>
                {this.renderTextfield({name: 'name', label: 'Your name'})}
                {this.renderTextfield({name: 'phone', label: 'Your phone number', keyboard: 'phone-pad'})}
                {this.renderTextfield({name: 'email', label: 'Your email address', keyboard: 'email-address'})}
                {this.renderTextfield({name: 'street', label: 'Your street'})}
                {this.renderButton()}
            </View>
    );
  }
}

const styles = StyleSheet.create({
	    panel: {
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 10,
        margin: 10
    },
    textField: {
        height: 40,
        margin: 8
    },
    btn: {
        backgroundColor: '#34495e',
        borderRadius: 3,
        padding: 12,
        flex: 1,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14
    }
});

const mapStateToProps = (state) => ({
	cartItems: state.cart.cart
})
export default connect(mapStateToProps, {addOrder, emptyCart})(CustomerForm);

```

We also have the checkout items component that displays both the cart items and the customer form:

```javascript

// ap/components/CheckoutItems.component.js

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

```

We also have the order summary component that displays all the items the customer order:

```javascript

// app/components/OrderSummary.component.js

import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity 
} from 'react-native';

class OrderSummary extends Component {

    render() {
        const { item } = this.props;
            return (
        <View style={styles.container}>
            
            <View style={styles.productDes}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.text}>${(item.cost).toFixed(2)}</Text>
            </View>
        </View>
    );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    productDes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
    },
    text: {
        fontSize: 14,
        margin: 5
    }
});

export default OrderSummary;

```

Then there is the product component that is responsible for displaying each product in the home screen:

```javascript

// app/components/Product.component.js

import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity 
} from 'react-native';

import themes from '../styles/theme.style';

class Product extends Component {
    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
    }
    render() {
        const { product } = this.props;
            return (
        <View style={styles.container}>
            <Image source={product.picture} style={{width:150,height:150}}/>
            <View style={styles.productDes}>
                <Text>{product.title}</Text>
                <Text>${(product.cost).toFixed(2)}</Text>
                <Text>{product.author}</Text>
                <TouchableOpacity onPress={this.addToCart} style={styles.addBtn}>
                    <Text style={styles.text}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    productDes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addBtn: {
        borderRadius: 30,
        margin: 10,
        backgroundColor: themes.BUTTON_COLOR
    },
    text: {
        color: '#fff',
        fontSize: 16,
        padding: 10
    }
});

export default Product;


```

Then lastly is our logo component that displays our logo in the top bar:

```javascript

// app/components/Logo.component.js

import React, { Component } from 'react';

import {
	Image,
	TouchableOpacity
} from 'react-native';


const logoImage = require('../assets/images/eco-logo.png');

class Logo extends Component {

  goHome = () => {
      this.props.navigation.navigate('Products');
  }
  render() {
    return (
      <TouchableOpacity onPress={this.goHome}>
          <Image source={logoImage} style={{width:32, height:32}}/>
      </TouchableOpacity>
    );
  }
}


export default Logo;

```

# Summary

We've finished the mobile shop app. You now have a fully functional shop built with React-native, Redux, React-navigation and React-native-swipeout.
While making this app, we resolved a number of technical hurddles, such as routing, global state management, animation and swipe to delete.

Please feel free to reach me at egaleme@gmail.com and the source code avaliable at [GitHub](https://github.com/egaleme/mobile-shop) .
