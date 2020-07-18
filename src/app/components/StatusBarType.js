//  

import React, { memo } from 'react';
import { StatusBar, Platform } from 'react-native';

const StatusBarType = ({ goBack }) => (
     Platform.OS === 'ios' && <StatusBar barStyle='dark-content'  /> 
);

export default memo(StatusBarType);