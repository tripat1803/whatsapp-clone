import { View, StyleSheet } from 'react-native';
import ChatCard from './components/ChatCard';
import { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';

export default function Chat() {

  let socket = useContext(SocketContext);
  console.log(socket.chats);

  return (
    <View>
      {
        Object.keys(socket.chats).map((key, index) => {
          // console.log(socket.chats[key][socket.chats.length ]);
          return (
            <ChatCard key={index} name={key} message={""} />
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  
});