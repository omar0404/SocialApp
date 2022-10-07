import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/screens';
import { WithSplashScreen } from './src/containers/Splash';
import { SensitiveInfo } from './src/service';
import Axios from './src/api';
import PostDetails from './src/screens/PostDetails/PostDetails';
import { Post, RootStackParamList, User } from './src/types';
import Colors from './src/Colors';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
function isPost(post: Post | null): post is Post {
  return !!post;
}
const App = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const postsRef = useRef<Post[]>([]);

  const getPostsUsers = useCallback(async (posts: Post[]): Promise<Post[]> => {
    const usersPromises = [...posts, { ...posts[0], user_id: 2319 }].map(
      ({ user_id: userId, ...post }) => {
        return Axios.get<User>(`/users/${userId}`)
          .then(({ data }) => ({
            ...post,
            user: data,
          }))
          .catch(() => {
            return null;
          });
      },
    );
    const res = await Promise.all(usersPromises);

    return res.filter(isPost);
  }, []);
  const getPosts = async (): Promise<Post[]> => {
    return Axios.get<Post[]>('/posts').then(res => res.data);
  };
  const init = useCallback(async () => {
    await SensitiveInfo.setItem(
      'token',
      'e43b2ff4ca95ddc6491460bc4f7749d64dc78d8bfe7cef28c08c86190957bcdd',
    );
    try {
      const posts = await getPosts();
      const postsWithUsers = await getPostsUsers(posts);
      postsRef.current = postsWithUsers;
    } catch (error) {
    } finally {
      setIsAppReady(true);
    }
  }, [getPostsUsers]);
  useEffect(() => {
    init();
  }, [init]);
  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer
        theme={{
          ...DarkTheme,
          colors: { ...DarkTheme.colors, background: Colors.screenBackground },
        }}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.header },
            headerTitleStyle: { color: Colors.text.primary },
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{ posts: postsRef.current }}
          />
          <Stack.Screen name="PostDetails" component={PostDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </WithSplashScreen>
  );
};

export default App;
