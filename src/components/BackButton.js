import React, { memo } from 'react';
import { TouchableOpacity, Button , Text} from 'react-native';

const BackButton = ({ goBack }) => (
    <TouchableOpacity onPress={goBack}>
       <Text>Hello World, Go Back Home</Text>
    </TouchableOpacity>
  );

  export default memo(BackButton);