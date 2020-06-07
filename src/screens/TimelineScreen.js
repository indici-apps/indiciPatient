import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors'

import TimelineHandler from '../components/TimelineHandler'
import { GetAppointmentDate, GetMonthName, GetYear } from "../core/datehelper";

const DATA = [{
    "id": "a96477a2498b5f2f36ba5b3b6a33c01866bf32ac49333ad54adca936dcba1417",
    "doctor_name": "Frederick Channer",
    "date": "2020-01-30",
    "doctor_notes": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam."
}, {
    "id": "7f9d04d220fdc135e19cfae8488583dbe00bf544ed5b595cf5826082d15429c8",
    "doctor_name": "Katherina Weine",
    "date": "2020-03-05",
    "doctor_notes": "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy."
}, {
    "id": "e87ccd93c7e00a027cf96bd5c18698b3a69d821d06714ac7558d6d59d0bf6070",
    "doctor_name": "Sidonnie Beacon",
    "date": "2020-05-11",
    "doctor_notes": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue."
}, {
    "id": "62acf30618483c7705ade4b544edc1b0770f0dd6a49ff5c96cc404b92c54006e",
    "doctor_name": "Dalenna Dunstall",
    "date": "2020-03-08",
    "doctor_notes": "Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis."
}, {
    "id": "f9eda8267b2dfface0f13f881e6429d9efe9550f407867ebc1c1934ec1894145",
    "doctor_name": "Addy Roston",
    "date": "2020-01-11",
    "doctor_notes": "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis."
}, {
    "id": "8cbd5766b278861559f55682ca2d77b095c77afb849f6b2246f77e124fabeb0e",
    "doctor_name": "Bernice Ranyelld",
    "date": "2020-02-22",
    "doctor_notes": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue."
}, {
    "id": "7b3d8321b63b4c5b37cbe2e711d4baa0601527dcb24a9af6ac84380c483a0426",
    "doctor_name": "Nissa Volage",
    "date": "2020-03-03",
    "doctor_notes": "Proin interdum mauris non ligula pellentesque ultrices."
}, {
    "id": "bebdbb302079241251844d1e3f687bd9a97e13e9763477ccff93e8d4815b7c17",
    "doctor_name": "Moses Bartolomeotti",
    "date": "2020-01-20",
    "doctor_notes": "Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat."
}, {
    "id": "a153c40b41da71c33e647c9e0e075e5e67d081eb11ed7daf2155b570e4567af4",
    "doctor_name": "Mada Dickings",
    "date": "2020-02-08",
    "doctor_notes": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam."
}, {
    "id": "12f030d0b082b64c8b3970172b5eb9beef0222d43b123582a82004a6855905e4",
    "doctor_name": "Franciska Wyss",
    "date": "2020-01-27",
    "doctor_notes": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo."
}, {
    "id": "59707efec2d7d93d020a9eae5f97712b7695d9d88049f64d8862d5ed9fb6d2c7",
    "doctor_name": "Tremain Trillow",
    "date": "2020-01-16",
    "doctor_notes": "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio."
}, {
    "id": "cccf479d7e9543c789c1e3df6aeb3bf454bb1f8450ce53e2ed8c00640f152ccc",
    "doctor_name": "Way Treadger",
    "date": "2020-02-04",
    "doctor_notes": "Suspendisse ornare consequat lectus."
}, {
    "id": "be7357ddf23092708a24b271317c677866c5fc8d717cce899eab2ace21c45f51",
    "doctor_name": "Vania Ulyat",
    "date": "2020-05-06",
    "doctor_notes": "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem."
}, {
    "id": "dc0fa446b10a5e4c9b28f5ac344bec5fe520e8a99e441f593cc3fbc636815013",
    "doctor_name": "Annetta Forcer",
    "date": "2020-02-07",
    "doctor_notes": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
}, {
    "id": "6059c537c0eb51cdba123167fd76bbf4315eb66962326cfbb33fa4e9a8798a74",
    "doctor_name": "Ali Cartmale",
    "date": "2020-05-11",
    "doctor_notes": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."
}];


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
}


const TimelineScreen = props => {
    return (
        <View style={styles.screenContainer}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}


            <FlatList
                style={{ marginTop: 10 }}
                data={DATA}
                renderItem={({ item }) => (
                    <TimelineHandler
                        tmDate={GetAppointmentDate(item.date)+' '+GetMonthName(item.date)}
                        tmMonth={GetYear(item.date)}
                        doctor_name={'Dr.' + item.doctor_name}
                        time={item.date}
                        doctor_comment={item.doctor_notes}
                    // selected={!!selected.get(item.id)}
                    // onSelect={onSelect}
                    />
                )}
                keyExtractor={item => item.id}

            />
        </View>
    );
};
const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.defaultBackground,

    },

});
export default TimelineScreen;
