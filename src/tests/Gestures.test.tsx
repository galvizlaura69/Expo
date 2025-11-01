import { Gesture, GestureStateChangeEvent, TapGestureHandlerEventPayload } from 'react-native-gesture-handler';

describe('Gestures unitarios', () => {
  it('ejecuta el callback de double tap', () => {
    const mockFn = jest.fn();
    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(mockFn);

    const mockEvent: GestureStateChangeEvent<TapGestureHandlerEventPayload> = {
      nativeEvent: {
        numberOfPointers: 1,
        state: 4, 
        oldState: 2,
        handlerTag: 1,
      },
    } as any;

    doubleTap.handlers.onStart?.(mockEvent);

    expect(mockFn).toHaveBeenCalled();
  });

  it('ejecuta el callback de pan', () => {
    const mockFn = jest.fn();
    const pan = Gesture.Pan().onChange(mockFn);

    const event = { changeX: 10, changeY: 5 };
    pan.handlers.onChange?.(event as any);

    expect(mockFn).toHaveBeenCalledWith(event);
  });
});
