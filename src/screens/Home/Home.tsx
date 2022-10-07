import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { PostCard } from '../../components';
import { Post, RootStackParamList } from '../../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Colors from '../../Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ route, navigation }: Props) => {
  const { posts } = route.params;
  const onPostPress = (post: Post) => {
    navigation.navigate('PostDetails', { post });
  };
  return (
    <ScrollView style={style.container}>
      {posts.map(post => (
        <TouchableOpacity
          style={style.card}
          key={post.id}
          onPress={() => onPostPress(post)}>
          <PostCard bodyLines={3} post={post} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    borderRadius: 10,
    backgroundColor: Colors.card,
    marginTop: 18,
    padding: 10,
  },
});
export default Home;
