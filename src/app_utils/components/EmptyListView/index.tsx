import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import styles from '@Utils/styles';

const { dimmedWhiteText, mediumText } = styles

const index = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10}}>
            <Ionicons name="sad" size={96} color="lightgrey" />
            <Text style={[dimmedWhiteText, mediumText]}>
                nothing to show here
            </Text>
        </View>
    )
}

export default index