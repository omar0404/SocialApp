import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../Colors';
import { Post } from '../../types';
import UserAvatar from '../UserAvatar';
type Props = {
  post: Post;
  bodyLines?: number;
};
const PostCard = ({ post, bodyLines }: Props) => (
  <View style={style.container}>
    <View style={style.headerContainer}>
      <UserAvatar name={post.user.name} />
      <View style={style.wrapper}>
        <Text style={style.name}>{post.user.name}</Text>
        <Text style={style.title}>{post.title}</Text>
      </View>
    </View>
    <Text numberOfLines={bodyLines} style={style.body}>
      {post.body}
    </Text>
  </View>
);
const style = StyleSheet.create({
  container: {
    paddingBottom: 12,
    marginTop: 18,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  wrapper: {
    flex: 1,
  },
  name: {
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 10,
    color: Colors.text.secondary,
  },
  body: {
    marginTop: 15,
    color: Colors.text.primary,
    lineHeight: 20,
    fontSize: 15,
    marginLeft: 10,
  },
});
export default PostCard;
