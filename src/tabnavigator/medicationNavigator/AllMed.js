import React, { useState, useEffect } from 'react';
import {
    Platform,
    StyleSheet,
    Text, View,
    Button,
    TextInput,
    Image,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    FlatList
} from 'react-native';
import Colors from '../../constants/Colors';
import { GetAppointmentDate, GetMonthName , GetYear} from '../../core/datehelper'
import MedicationHandler from '../../components/MedicationHandler';


const DATA = [{
    "id": "eeba197ee9ab978d02435b4d4a0411beaa4e2bba2a28c01a30b37ac000e09bfa",
    "durg_name": "Chestnut Beeswax",
    "durg_name_b": "Pacific",
    "date": "10/31/2019"
}, {
    "id": "161fbaced5a5bbf9638ac6b7ed5cb9e84477ad62fb73e033d76b5e66287cd840",
    "durg_name": "Benazepril Hydrochloride",
    "durg_name_b": "Safeway Home Orange Scent",
    "date": "12/29/2019"
}, {
    "id": "2603a98391b283669b39517dcd76e72962192b6dadc98f4de796844e730c6328",
    "durg_name": "Covergirl Outlast Stay Fabulous 3in1 Foundation",
    "durg_name_b": "Cefdinir",
    "date": "5/28/2019"
}, {
    "id": "8bae8ce09a26276cf8c0be20c9341eb22a6e097ae089eeedc830b0ab42763827",
    "durg_name": "Ibuprofen",
    "durg_name_b": "WHITE OAK POLLEN",
    "date": "9/19/2019"
}, {
    "id": "8d9c718e8ba8efe64332d37a62f09ce01a769eb66ff5a0f9701612270e3f3ec6",
    "durg_name": "Methocarbamol",
    "durg_name_b": "Cepacol Sore Throat Maximum Numbing Honey Lemon",
    "date": "8/20/2019"
}, {
    "id": "26899006cdb53580c1f1676f32e6f48cf4dfe3b9c3d1ab42f24d42f650d4cb9c",
    "durg_name": "Oxygen",
    "durg_name_b": "LAMICTAL",
    "date": "6/6/2019"
}, {
    "id": "dded7e0d6cfc6a194ed50eefb42129b38cf595328f1d5042d557511e1c695ae0",
    "durg_name": "Dermablend Professional SkinPerfector Redness Reducing Primer Sunscreen",
    "durg_name_b": "Prevage Anti Aging Moisture Broad Spectrum Sunscreen SPF 30",
    "date": "8/21/2019"
}, {
    "id": "2213dc22dc60995b0e127e9493c2229fb3c3baa19fbb892e1e3046324801e9a0",
    "durg_name": "Oxygen",
    "durg_name_b": "SILICEA",
    "date": "10/9/2019"
}, {
    "id": "edf812e1558179709c9802e800403b22f444e3af13c6ebd564cdbdac0916ca95",
    "durg_name": "triamcinolone acetonide",
    "durg_name_b": "Fluoxetine Hydrochloride",
    "date": "10/4/2019"
}, {
    "id": "d9d3ea2c3bf7f0e45a207d0144e3b7b358e28a8ef70575ab2883f512d5de02dd",
    "durg_name": "La Roche Posay Laboratoire Dermatologique Pigmentclar Daily Dark Spot Correcting Moisturizer Broad Spectrum SPF 30 Sunscreen",
    "durg_name_b": "METOPROLOL SUCCINATE",
    "date": "5/9/2020"
}, {
    "id": "46d6022721bebeab004e188dac2783f8eb5bc6de3d37ee1f27bed7b6db990919",
    "durg_name": "Sandostatin LAR Depot",
    "durg_name_b": "Dolce and Gabbana The Lift Foundation Bronze 144",
    "date": "11/26/2019"
}, {
    "id": "ee95dc7a7f110a7afcdd7c2506f46aa1d46bcc0190df69c755c834cf3158ac14",
    "durg_name": "Ri Mucil",
    "durg_name_b": "Safeway Instant Hand Sanitizing wipes",
    "date": "11/30/2019"
}, {
    "id": "359bcf4c5a2c3c4dec4bc102eccc3f1ed4ead0845cea773bfeed427de0cc4f66",
    "durg_name": "Adderall",
    "durg_name_b": "On Duty 24 Hours Clear Protection",
    "date": "3/8/2020"
}, {
    "id": "7a58ae54b7f99d00718b7837350665799401e67703b739cdaac0b0e477c0e609",
    "durg_name": "Oxygen",
    "durg_name_b": "take cover anti-aging foundation",
    "date": "12/21/2019"
}, {
    "id": "893545a2d1ba9fff7984d79bac4e42471170ea4d900bca812587563544193b67",
    "durg_name": "sodium bicarbonate",
    "durg_name_b": "topiramate",
    "date": "6/17/2019"
}, {
    "id": "ccedc93916c8fb5ce87fc95af6b24177bead07d42e67708fedc654f6d2d7b6a2",
    "durg_name": "EpiPen",
    "durg_name_b": "Glyburide-Metformin Hydrochloride",
    "date": "1/12/2020"
}, {
    "id": "0d567002256000a66ace891cfc2b1c9ac996ec033777ce99288735cf1d5f35b9",
    "durg_name": "Benazepril Hydrochloride",
    "durg_name_b": "Ondansetron",
    "date": "11/13/2019"
}, {
    "id": "a02fdb4d26d012bdba0e7f192eac4337c34d3b4a7696dbe4ca401d43e2722146",
    "durg_name": "BZK Cleansing",
    "durg_name_b": "Diclofenac Sodium",
    "date": "1/2/2020"
}, {
    "id": "4ee97cee3b167169091c8d81114551c685948206e9fbba59758e2704c640de17",
    "durg_name": "TOPCARE",
    "durg_name_b": "Arava",
    "date": "6/6/2019"
}, {
    "id": "80bef82bfacc105d4546b6859155395d4c36236f85e4ffb8f799b57d8032ad95",
    "durg_name": "MOISTURIZING MAKEUP",
    "durg_name_b": "VANILLA CREAM AND APPLE BLOSSOM ANTIBACTERIAL MOISTURIZING HAND SP",
    "date": "3/27/2020"
}];

const AllMed = props => {
    return (
        <View style={styles.screenContainer}>
            <FlatList
                style={{ marginTop: 10 }}
                data={DATA}
                renderItem={({ item }) => (
                    <MedicationHandler
                        medDate={GetAppointmentDate(item.date)+ ' '+GetMonthName(item.date)}
                        medMonth={GetYear(item.date)}
                        medicationDate={item.date}
                        medicationDetails={item.durg_name + ', ' + item.durg_name_b}
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
export default AllMed;