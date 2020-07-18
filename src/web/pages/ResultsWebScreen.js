import React, { useCallback } from 'react';
import { Button, View, Text, SafeAreaView, Dimensions, StyleSheet, FlatList } from 'react-native';
import ResutlsWebHandler from "../components/ResutlsWebHandler";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { GetAppointmentDate, GetMonthName, GetYear } from '../../shared/core/datehelper'
import { fetchReportsFromApi } from "../../shared/actions/ReportsActions";


let pageNumber = 1;
let pageSize = 100;


const ResultsWebScreen = props => {
    const { Reports, isFetching } = props.Reports;
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
            //console.log(getUserId())
            props.getReports();
        }, [])
    );
    return (
        <View style={styles.container}>
            {
                isFetching && <Text>Loading...</Text>
            }
            {
                <FlatList
                    data={Reports}
                    renderItem={({ item }) => (
                        <ResutlsWebHandler
                            rptDate={GetAppointmentDate(item.resource.created) + ' ' + GetMonthName(item.resource.created)}
                            rptYear={GetYear(item.resource.created)}
                            name={item.resource.content[0].attachment.title}
                            reportdetails={item.resource.author[0].display}
                            reportLink={'http://dummyimage.com/121x231.jpg/cc0000/ffffff'}
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
        Reports: state.Reports
    }
}
let token = '';
function mapDispatchToProps(disptach) {
    return {
        getReports: () => disptach(fetchReportsFromApi(token, pageSize, pageNumber))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsWebScreen)
//export default ResultsWebScreen;