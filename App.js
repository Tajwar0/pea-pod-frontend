import { StyleSheet, TabBarIOSItem, Text, View } from 'react-native';
import Main from './Components/Main';


export default function App() {
  return (
    <Main/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '20px',
    alignItems: 'center',
  },
});
