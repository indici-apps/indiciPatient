import React, { useCallback } from 'react';
import { Button, View, Text, SafeAreaView, Dimensions, StyleSheet, FlatList } from 'react-native';

import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import ResourcesWebHandler from "../components/ResourcesWebHandler";
import { fetchResourcesFromApi } from "../../shared/actions/ResourcesActions";
import { GetAppointmentDate, GetMonthName, GetYear } from '../../shared/core/datehelper'

let token = '';
let pageNumber = 1;
let pageSize = 100;


const ResourcesWebScreen = props => {
    const { Resources, isGetting } = props.Resources;
    const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
    React.useEffect(() => {
        const onDimensionsChange = ({ window }) => {
            setDimensions(window);
        };
        Dimensions.addEventListener('change', onDimensionsChange);

        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);

    const isLargeScreen = dimensions.width >= 1024;
    let columnCount = isLargeScreen ? 2 : 1;

    useFocusEffect(
        useCallback(() => {
            props.getResources();
        }, [])
    );

    return (
        <View style={styles.container}>
            {
                isGetting && <Text style={{ textAlign: 'center', marginTop: 5 }}> Loading...</Text>
            }
            {
                <FlatList
                    data={Resources}
                    renderItem={({ item }) => (
                        <ResourcesWebHandler
                            rptDate={GetAppointmentDate(item.resource.occurrenceDateTime) + ' ' + GetMonthName(item.resource.occurrenceDateTime)}
                            rptYear={GetYear(item.resource.occurrenceDateTime)}
                            name={'Resource Name: ' + item.resource.content.title}
                            reportdetails={item.resource.content.hasOwnProperty('contentType') ? 'yes' : 'no'}
                            reportLink={item.resource.content.hasOwnProperty('contentType') ? item.resource.content.data : 'http://google.com/'}
                        />
                    )}
                    keyExtractor={item => item.resource.id}
                    horizontal={false}
                    key={columnCount}
                    numColumns={columnCount}
                    initialNumToRender={0}
                    maxToRenderPerBatch={10}
                    windowSize={7}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                    }}
                />
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    wrapContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});


function mapStateToProps(state) {
    return {
        Resources: state.Resources
    }
}

function mapDispatchToProps(disptach) {
    return {
        getResources: () => disptach(fetchResourcesFromApi(token, pageSize, pageNumber))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourcesWebScreen)

//export default ResourcesWebScreen;