import * as React from 'react';
import { Button, View, Text, SafeAreaView, Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {

    const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
    React.useEffect(() => {
        const onDimensionsChange = ({ window }) => {
            setDimensions(window);
        };
        Dimensions.addEventListener('change', onDimensionsChange);

        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);

    const isLargeScreen = dimensions.width >= 1024;
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    
                    <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 16 }}>
                        Welcome to Home Page
                    </Text>
                    
                </View>
            </View>
        </View>
    );
}

export default HomeScreen;