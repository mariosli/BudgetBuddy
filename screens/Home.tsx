import * as React from 'react';
import { Text, View } from "react-native";

export default function Home() {
    const [categories, setCategories] = React.useState();
    return (
        <View style={{ alignItems: 'center' }}>
            <Text>Home screen</Text>
        </View>
    );
}