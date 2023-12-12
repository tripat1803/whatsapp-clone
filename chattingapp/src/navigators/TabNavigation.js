import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chat from "../screens/Chat/Chat";
import Group from "../screens/Chat/Group";
import Status from "../screens/Chat/Status";
import { Color } from "../utils/Color";
import SocketProvider from "../context/SocketContext";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigation() {
  return (
    <SocketProvider>
      <Tab.Navigator initialRouteName="Chats" screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          color: "white",
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: Color.primary,
          // display: "none"
        },
        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: {
          backgroundColor: 'white'
        }
      }}>
        <Tab.Screen name="Chats" component={Chat} />
        <Tab.Screen name="Groups" component={Group} />
        <Tab.Screen name="Status" component={Status} />
      </Tab.Navigator>
    </SocketProvider>
  );
}
