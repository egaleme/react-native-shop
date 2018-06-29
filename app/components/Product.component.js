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
