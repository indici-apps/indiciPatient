import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native';

import AllergiesHandler from '../components/AllergiesHandler';
import Colors from '../constants/Colors'

const DATA = [{
    "id": "4814c70e380a12ffb1df3c18295c09ae28ca2699159c81665d4c81e94adfc9c0",
    "allergy_level": "High",
    "allergy_title": "Levofloxacin",
    "allergy_type": "Levofloxacin",
    "allergy_symptoms": "pede",
    "comments": "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc."
}, {
    "id": "401ae626ca37b92973955c21b3757f41ea8612a31736cba5a7568e4533fab996",
    "allergy_level": "Medium",
    "allergy_title": "AMARANTHUS SPINOSUS POLLEN",
    "allergy_type": "Pigweed Spiny",
    "allergy_symptoms": "et",
    "comments": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo."
}, {
    "id": "6c449404ae26851b245a89a8d84959993abccb1ab06f9dac4e3ee7fc7e4448ac",
    "allergy_level": "Medium",
    "allergy_title": "Motion Sickness",
    "allergy_type": "Absinthium, Aconitum nap., Antimon. tart., Belladonna, Bryonia, Carbolicum acidum, Colchicum, Conium, Ferrum metallicum, Gelsemium, Glonoinum, Hyoscyamus, Ipecac., Iris versicolor, Lycopodium, Nux vom., Petroleum, Phosphorus, Sepia, Symphoricarpus racemosus, Tabacum, Theridion, Zingiber, Echinacea, Hypericum, Passiflora, Valeriana",
    "allergy_symptoms": "sed vel",
    "comments": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."
}, {
    "id": "25c5a9b440688b4888b41d86b253dd6bf3f3455b20fb60be4bec6e2c34a3dab0",
    "allergy_level": "Medium",
    "allergy_title": "Bupropion Hydrochloride",
    "allergy_type": "Bupropion Hydrochloride",
    "allergy_symptoms": "in tempor",
    "comments": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo."
}, {
    "id": "46f04f0e957470a1d518521503186ca2f200208eb7a66dd61db746223f2b3678",
    "allergy_level": "High",
    "allergy_title": "Warfarin Sodium",
    "allergy_type": "Warfarin Sodium",
    "allergy_symptoms": "in",
    "comments": "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
}, {
    "id": "1091310b30234c8ac5bf71e05cd3a61ecdd236fd76905ee42ac962e2fde48bec",
    "allergy_level": "High",
    "allergy_title": "hydrocortisone",
    "allergy_type": "hydrocortisone",
    "allergy_symptoms": "nulla",
    "comments": "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo."
}, {
    "id": "9ed2024a4edca6983e4dd33902b198d480365a2717fb16758b233189ee401ea2",
    "allergy_level": "Medium",
    "allergy_title": "Rasuvo",
    "allergy_type": "methotrexate",
    "allergy_symptoms": "suspendisse",
    "comments": "Maecenas rhoncus aliquam lacus."
}, {
    "id": "5a0d5bc44f922c53db048c37e924dd577efab7e4abb1ea70c88e0ead9c5eb189",
    "allergy_level": "Low",
    "allergy_title": "Oxygen",
    "allergy_type": "Oxygen",
    "allergy_symptoms": "eu mi",
    "comments": "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl."
}, {
    "id": "037ea4b72b29282e94aaaba31f9660b73695c1a8a29ac8c3cb9a064d10e3add2",
    "allergy_level": "Low",
    "allergy_title": "Healing Support",
    "allergy_type": "Betula Cortex, Caltha Palustris, Galium Aparine, Sedum Acre, Thuja Occidentalis, Urtica urens, Clematis Erecta, Hedera Helix, Juniperus Communis, Quillaja Saponaria, Sempervivum Tectorum, Echinacea,",
    "allergy_symptoms": "massa",
    "comments": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim."
}, {
    "id": "a064a80b8c6c4848484e0e11e6072234836327fd183a0c0729ee24ec55229b1c",
    "allergy_level": "High",
    "allergy_title": "eye itch relief",
    "allergy_type": "ketotifen fumarate",
    "allergy_symptoms": "semper",
    "comments": "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."
}, {
    "id": "3030dffc7a659030d110a2f72ab30477166b5660ec7fe49b5b742d8935a64410",
    "allergy_level": "Medium",
    "allergy_title": "Oral-B Fluorinse Mint",
    "allergy_type": "Oral-B Fluorinse Mint",
    "allergy_symptoms": "dui",
    "comments": "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat."
}, {
    "id": "1fd45566dd7e8aad14e387d98f60bde22936c013fe9cdd786ac11aafa8700cec",
    "allergy_level": "Medium",
    "allergy_title": "Hydrochlorothiazide",
    "allergy_type": "Hydrochlorothiazide",
    "allergy_symptoms": "vitae",
    "comments": "Nulla ut erat id mauris vulputate elementum. Nullam varius."
}, {
    "id": "1b4aadd8b67ce716b8e366b8e290c47aa71f1aa3fda4d15a37fb187739094bd9",
    "allergy_level": "Medium",
    "allergy_title": "Dairy Allergy Relief",
    "allergy_type": "Natural Medicine",
    "allergy_symptoms": "consequat metus",
    "comments": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi."
}, {
    "id": "a5f01b75dc142eaf480505a3bcb4922f4c528f471b36ece1fd02e2496b8fb3ba",
    "allergy_level": "Low",
    "allergy_title": "Minocin Kit",
    "allergy_type": "minocycline hydrochloride",
    "allergy_symptoms": "in eleifend",
    "comments": "Donec dapibus. Duis at velit eu est congue elementum."
}, {
    "id": "11f9836609d74f7fb3bd4771f7e923eff3c6d0df42693768cb7aaa4ad48dcdf7",
    "allergy_level": "Low",
    "allergy_title": "bioCorneum plus SPF 30 advanced SCAR SUPERVISION",
    "allergy_type": "OCTINOXATE, OCTISALATE, OCTOCRYLENE, OXYBENZONE",
    "allergy_symptoms": "in lacus",
    "comments": "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."
}];


function GetTagColor(allergyLevel)
{
    if(allergyLevel === 'High'){
        return { backgroundColor: Colors.highAllergy, borderRadius: 50, }
    }
    if(allergyLevel === 'Medium'){
        return { backgroundColor: Colors.midAllergy, borderRadius: 50, }
    }
    if(allergyLevel === 'Low'){
        return { backgroundColor: Colors.lowAllergy, borderRadius: 50, }
    }
}
const AllergiesScreen = props => {
    return (
        <View style={styles.screenContainer}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
            {/* <AllergiesHandler styles={{ backgroundColor: Colors.lowAllergy, borderRadius: 50, }} /> */}

            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <AllergiesHandler
                        styles= {GetTagColor(item.allergy_level)}
                        algLevel={item.allergy_level}
                        algTitle={item.allergy_title}
                        algType={item.allergy_type}
                        symptoms={item.allergy_symptoms}
                        comment={item.comments}
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

    },


});
export default AllergiesScreen;
