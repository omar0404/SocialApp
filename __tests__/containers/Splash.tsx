import { WithSplashScreen } from '../../src/containers/Splash';
import { create, act } from 'react-test-renderer';
import { Text } from 'react-native';
jest.useFakeTimers('legacy');
it('home screen content shoudnt be visible until splash screen finishes', () => {
  let testRender = create(
    <WithSplashScreen isAppReady={false}>
      <Text testID={'home_text'}>home screen</Text>
    </WithSplashScreen>,
  );

  expect(testRender.root.findAllByProps({ testID: 'home_text' })).toHaveLength(
    0,
  );
  act(() => {
    testRender = create(
      <WithSplashScreen isAppReady={true}>
        <Text testID={'home_text'}>home screen</Text>
      </WithSplashScreen>,
    );
  });
  expect(
    testRender.root
      .findAllByType(Text)
      .filter(e => e.props.testID == 'home_text'),
  ).toHaveLength(1);
});
