import { PostDetails } from '../../src/screens';
import { create, act } from 'react-test-renderer';
import { ActivityIndicator, Text, View } from 'react-native';
import Axios from '../../src/api';
jest.mock('../../src/api');
jest.useFakeTimers('legacy');

it('should render ActivityIndicator while loading comments', () => {
  const testRender = create(
    <PostDetails
      route={{ params: { post: { id: -1, user: { name: 'omar' } } } }}
    />,
  );
  expect(testRender.root.findByType(ActivityIndicator)).toBeDefined();
});
it('should render no comments text', async () => {
  let testRender = {};
  await act(() => {
    testRender = create(
      <PostDetails
        route={{ params: { post: { id: -1, user: { name: 'omar' } } } }}
      />,
    );
    jest.runAllTimers();
  });

  expect(
    testRender?.root
      .findAllByType(Text)
      .filter(e => e.props.testID === 'no_comments'),
  ).toHaveLength(1);
});

it('should render comments correctly', async () => {
  Axios.get.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }] });

  let testRender = {};
  await act(() => {
    testRender = create(
      <PostDetails
        route={{ params: { post: { id: 1, user: { name: 'omar' } } } }}
      />,
    );
  });
  jest.runAllTimers();

  expect(testRender.toJSON()).toMatchSnapshot();
  expect(
    testRender?.root
      .findAllByType(View)
      .filter(e => e.props.testID === 'comment'),
  ).toHaveLength(2);
});
