import { useNavigation } from '@react-navigation/native';
import React, { Fragment } from 'react';
import { View, StyleSheet, TextInput, Pressable, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MIIcons from "react-native-vector-icons/MaterialIcons";
import ChatCard from './Chat/components/ChatCard';
import { useEffect } from 'react';
import { getAllUsers } from "../server/User";
import { useState } from 'react';

export default function SearchUser() {
    let navigation = useNavigation();
    const [users, setUsers] = useState({
        data: [],
        count: 0
    });
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            setLoader(true);
            getAllUsers().then((res) => {
                if(res.data){
                    if(res.data[0].data && res.data[0].count){
                        setUsers(res.data[0]);
                    }
                }
                setLoader(false);
            }).catch((err) => {
                console.log(err);
                setLoader(false);
            });
        })();
    }, []);

    return (
        <Fragment>
            <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
            <View style={styles.searchContainer}>
                <View style={styles.searchField}>
                    <View style={{ borderRadius: 50, overflow: "hidden" }}>
                        <Pressable onPress={() => {
                            navigation.goBack();
                        }} style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "rgba(0,0,0,0.2)" }}>
                            <MIIcons name="arrow-back" size={24} color={"rgba(0,0,0,0.8)"} />
                        </Pressable>
                    </View>
                    <TextInput style={styles.search} placeholder='Search User...' placeholderTextColor={"rgba(0,0,0,0.5)"} />
                </View>
            </View>
            <ScrollView style={styles.userScroll}>
                <View style={styles.userListing}>
                    {
                        users.data.map((item, index) => {
                            return <ChatCard key={index} user_id={item._id} name={item.username} message={item.description} />
                        })
                    }
                </View>
            </ScrollView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    searchField: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E5E5E5",
        paddingHorizontal: 12,
        borderRadius: 50,
        overflow: "hidden"
    },
    search: {
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 16,
        color: "rgba(0,0,0,0.8)"
    },
    userScroll: {
        flex: 1
    },
    userListing: {
        flex: 1,
        flexDirection: "column"
    }
});