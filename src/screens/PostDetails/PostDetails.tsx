import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import Axios from '../../api';
import { PostCard, UserAvatar } from '../../components';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Comment } from '../../types';
import Colors from '../../Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetails'>;

const PostDetails = ({ route }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setCommentsLoading] = useState<boolean>(true);
  const { post } = route.params;
  const getComments = useCallback(async () => {
    try {
      const { data: commentsData } = await Axios.get<Comment[]>(
        `posts/${post.id}/comments`,
      );
      setComments(commentsData);
    } catch (error) {
    } finally {
      setCommentsLoading(false);
    }
  }, [post.id]);
  const renderComments = () => {
    if (!comments.length) {
      return <Text style={style.noCmnts}> No Comments</Text>;
    }
    return (
      <View>
        <Text style={style.commentsLen}>
          {comments.length} {comments.length > 1 ? 'Comments' : 'Comment'} :{' '}
        </Text>
        {comments.map(({ name, body, id }) => (
          <View key={id} style={style.commentContainer}>
            <UserAvatar name={post.user.name} />
            <View style={style.commentWrapper}>
              <Text style={style.commentName}>{name}</Text>
              <Text style={style.commentBody}>{body}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };
  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <View style={style.container}>
      <View style={style.postCard}>
        <PostCard post={post} />
      </View>
      <View style={style.commentsContainer}>
        {isCommentsLoading ? <ActivityIndicator /> : renderComments()}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  postCard: { padding: 10 },
  commentsContainer: {
    marginTop: 15,
    backgroundColor: Colors.primary,
    flex: 1,
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 0.4,
    borderColor: Colors.secondary,
    paddingBottom: 18,
  },
  commentBody: {
    marginTop: 10,
    color: Colors.text.secondary,
  },
  commentWrapper: {
    flex: 1,
  },

  commentName: {
    color: Colors.text.primary,
  },
  noCmnts: {
    color: Colors.text.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 12,
    alignSelf: 'center',
  },
  commentsLen: {
    color: Colors.text.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 12,
  },
});
export default PostDetails;
