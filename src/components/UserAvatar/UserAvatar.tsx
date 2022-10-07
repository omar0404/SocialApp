import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../Colors';
type props = {
  name: string;
};
const UserAvatar = ({ name }: props) => (
  <View style={style.container}>
    <Text style={style.name}>{name?.substring(0, 2)}</Text>
  </View>
);
const style = StyleSheet.create({
  container: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    marginRight: 16,
    marginTop: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
});
export default UserAvatar;
