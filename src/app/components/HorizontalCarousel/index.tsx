import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

type HorizontalCarouselProps<T> = {
    items: T[],
    itemRenderer: (item: T, key: number) => React.JSX.Element,
    itemGap?: number
}

export default function HorizontalCarousel<T>(props: HorizontalCarouselProps<T>) {
    return (
        <View style={styles.containter}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} centerContent contentContainerStyle={{ gap: props.itemGap ?? 5 }}>
                {props.items.map((item, key) => props.itemRenderer(item, key))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        width: "100%",
        padding: 5,
        paddingLeft: 20,
        paddingBottom: 20
    }
})