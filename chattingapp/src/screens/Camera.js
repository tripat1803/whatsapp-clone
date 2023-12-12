import { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';

export default function Camera() {

    const [{ cameraRef }, { takePicture }] = useCamera(null);

    return (
        <Fragment>
            <StatusBar backgroundColor={"gray"} />
            <View style={styles.container}>
                <RNCamera
                    ref={cameraRef}
                    type={RNCamera.Constants.Type.back}
                    style={styles.camera}
                />
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 1
    }
});