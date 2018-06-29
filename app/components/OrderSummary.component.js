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
