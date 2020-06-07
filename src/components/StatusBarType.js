//  

import React, { memo } from 'react';
import { StatusBar } from 'react-native';

const StatusBarType = ({ goBack }) => (
     Platform.OS === 'ios' && <StatusBar barStyle='dark-content'  /> 
);

export default memo(StatusBarType);