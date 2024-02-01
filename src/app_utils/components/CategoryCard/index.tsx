import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import defaultStyles from '@Utils/styles'

const { smallText, whiteText } = defaultStyles

interface CategoryCardProps {
    categoryName: string;
    isSelected: boolean;
    onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categoryName, isSelected, onPress }) => {    
    return (
        <TouchableHighlight style={[styles.container, isSelected && styles.selectedContainer]} onPress={onPress}>
            <Text style={[smallText, whiteText, isSelected && styles.selectedTitle]}>{categoryName}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedContainer: {
        backgroundColor: 'lightgrey',
    },
    selectedTitle: {
        color: 'black',
    },
})

export default CategoryCard