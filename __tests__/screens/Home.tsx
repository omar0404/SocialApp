import { Home } from '../../src/screens';
import { create, act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
const POSTS = [
  { id: 1, title: 'post1', user: { name: 'omar' } },
  { id: 2, title: 'post2', user: { name: 'omar' } },
];
it('should render posts correctly', () => {
  let testRender = create(<Home route={{ params: { posts: [] } }} />);
  expect(testRender.root.findAllByProps({ testID: 'post_card' })).toHaveLength(
    0,
  );
  act(() => {
    testRender = create(
      <Home
        route={{
          params: {
            posts: POSTS,
          },
        }}
      />,
    );
  });

  expect(testRender.root.findAllByType(TouchableOpacity)).toHaveLength(2);
});
it('should navigate to post details screen when click on post', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  let testRender = create(
    <Home navigation={navigation} route={{ params: { posts: POSTS } }} />,
  );
  const firstPost = testRender.root.findAllByType(TouchableOpacity)[0];
  firstPost.props.onPress();
  expect(navigation.navigate).toHaveBeenCalled();
});
