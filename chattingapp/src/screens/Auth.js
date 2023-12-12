import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useState } from 'react';
import { Color } from '../utils/Color';
import { Api } from '../utils/Api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Signin({ auth, setAuth }) {
    let navigation = useNavigation();
    const [data, setData] = useState({
        authId: "",
        password: ""
    });
    const [loader, setLoader] = useState(false);

    const handleContinue = async () => {
        if (!loader) {
            if (data.authId !== "" && data.password !== "") {
                setLoader(true);
                Api.post("/api/user", {
                    authId: data.authId,
                    password: data.password
                }).then((res) => {
                    setLoader(false);
                    if (res.headers && res.headers["set-cookie"] && res.headers["set-cookie"].length !== 0) {
                        console.log("dkksd");
                        AsyncStorage.setItem("auth-token", res.headers["set-cookie"][0].split("; ")[0].substring(14));
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Chat' }]
                        });
                    }
                    setData({
                        authId: "",
                        password: ""
                    });
                }).catch((err) => {
                    setLoader(false);
                    setData({
                        authId: "",
                        password: ""
                    });
                    console.log(err);
                });
            }
        }
    }

    return (
        <View style={styles.main}>
            <View style={{ width: "75%", height: 380 }}>
                <Text style={{ ...styles.logo, marginBottom: 80 }}>Whatsapp</Text>
                <TextInput value={data.authId} onChangeText={(text) => {
                    setData((prev) => ({
                        ...prev,
                        authId: text
                    }));
                }} style={{ ...styles.input, marginBottom: 15 }} placeholder='Username or email' placeholderTextColor={"#3D3D74"} />
                <TextInput value={data.password} onChangeText={(text) => {
                    setData((prev) => ({
                        ...prev,
                        password: text
                    }));
                }} style={{ ...styles.input, marginBottom: 25 }} secureTextEntry placeholder='Password' placeholderTextColor={"#3D3D74"} />
                <Button onPress={handleContinue} title='Continue' color={Color.primary} textColor={"white"} />
                <Pressable onPress={() => { 
                    navigation.navigate("Chat");
                }}>
                    <Text style={styles.smallText}>Forget your password?</Text>
                </Pressable>
            </View>
            <View style={{ position: "absolute", bottom: 30, flexDirection: "row", gap: 4 }}>
                <Text style={{ color: "#585F9D", fontSize: 12 }}>New to Whatsapp?</Text>
                <Pressable onPress={() => {
                    setAuth({
                        signin: false,
                        signup: true
                    })
                }}>
                    <Text style={{ color: "#585F9D", fontSize: 12, fontWeight: "600" }}>Signup</Text>
                </Pressable>
            </View>
        </View>
    );
}

function Signup({ auth, setAuth }) {
    let navigation = useNavigation();
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });
    const [loader, setLoader] = useState(false);

    const handleContinue = async () => {
        if (!loader) {
            if (data.username !== "" && data.email !== "" && data.password !== "" && data.phone !== "") {
                setLoader(true);
                Api.post("/api/user/register", {
                    username: data.username,
                    email: data.email,
                    mobile: {
                        phone: data.phone
                    },
                    password: data.password
                }).then((res) => {
                    setLoader(false);
                    if (res.headers && res.headers["set-cookie"] && res.headers["set-cookie"].length !== 0) {
                        console.log("dkksd");
                        AsyncStorage.setItem("auth-token", res.headers["set-cookie"][0].split("; ")[0].substring(14));
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Chat' }]
                        });
                    }
                    setData({
                        username: "",
                        email: "",
                        phone: "",
                        password: ""
                    });
                }).catch((err) => {
                    setLoader(false);
                    setData({
                        username: "",
                        email: "",
                        phone: "",
                        password: ""
                    });
                    console.log(err);
                });
            }
        }
    }

    return (
        <View style={styles.main}>
            <View style={{ width: "75%", height: "max-content" }}>
                <Text style={{ ...styles.logo, marginBottom: 80 }}>Whatsapp</Text>
                <TextInput value={data.username} onChangeText={(text) => {
                    setData((prev) => ({
                        ...prev,
                        username: text
                    }));
                }} style={{ ...styles.input, marginBottom: 15 }} placeholder='Username' placeholderTextColor={"#3D3D74"} />
                <TextInput value={data.email} onChangeText={(text) => {
                    setData((prev) => ({
                        ...prev,
                        email: text
                    }));
                }} style={{ ...styles.input, marginBottom: 15 }} placeholder='Email' placeholderTextColor={"#3D3D74"} />
                <TextInput value={data.phone} onChangeText={(text) => {
                    setData((prev) => ({
                        ...prev,
                        phone: text
                    }));
                }} style={{ ...styles.input, marginBottom: 15 }} placeholder='Mobile' keyboardType='number-pad' placeholderTextColor={"#3D3D74"} />
                <TextInput value={data.password} onChangeText={(text) => {
                    setData((prev) => ({
                        ...prev,
                        password: text
                    }));
                }} style={{ ...styles.input, marginBottom: 25 }} secureTextEntry placeholder='Password' placeholderTextColor={"#3D3D74"} />
                <Button title='Continue' color={Color.primary} textColor={"white"} onPress={handleContinue} />
                {/* <Pressable onPress={() => { }}>
                    <Text style={styles.smallText}>Forget your password?</Text>
                </Pressable> */}
            </View>
            <View style={{ position: "absolute", bottom: 30, flexDirection: "row", gap: 4 }}>
                <Text style={{ color: "#585F9D", fontSize: 12 }}>Already have an account?</Text>
                <Pressable onPress={() => {
                    setAuth({
                        signin: true,
                        signup: false
                    })
                }}>
                    <Text style={{ color: "#585F9D", fontSize: 12, fontWeight: "600" }}>Signin</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default function Auth() {

    const [auth, setAuth] = useState({
        signin: true,
        signup: false
    });

    if (auth.signin) {
        return <Signin auth={auth} setAuth={setAuth} />
    } else if (auth.signup) {
        return <Signup auth={auth} setAuth={setAuth} />
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        fontFamily: "Amelaryas, Manrope",
        fontWeight: "600",
        fontSize: 35,
        textAlign: "center",
        color: "black"
    },
    input: {
        borderWidth: 1,
        borderColor: "#CFDBEC",
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#F5F9FF",
        color: "#3D3D74",
        borderRadius: 8,
        fontSize: 14
    },
    smallText: {
        color: "#585F9D",
        fontSize: 13,
        textAlign: "center",
        marginTop: 25
    }
});