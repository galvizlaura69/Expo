jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  return {
    ...actual,
    GestureHandlerRootView: ({ children }: any) => children, 
  };
});

import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import EmojiSticker from '../components/EmojiSticker';

describe('Gestos en EmojiSticker', () => {
  const stickerSource = { uri: 'test.png' };
  const renderSticker = () =>
    render(<EmojiSticker imageSize={100} stickerSource={stickerSource} />);

  it('duplica tamaño al hacer doble tap', () => {
    const { getByTestId } = renderSticker();
  const image = getByTestId('emoji-sticker');
    fireEvent(image, 'onGestureHandlerEvent', {
      nativeEvent: { numberOfTaps: 2 },
    });
    expect(image.props.style[0].width).toBe(100);
    expect(image.props.style[0].height).toBe(100);
  });

  it('se mueve al arrastrar (pan gesture)', () => {
    const { getByTestId } = renderSticker();
    const container = getByTestId('gesture-container');
    fireEvent(container, 'onGestureHandlerEvent', {
      nativeEvent: { translationX: 50, translationY: 20 },
    });
    const transform = container.props.style[0].transform;
    expect(transform).toEqual(
      expect.arrayContaining([
        { translateX: expect.any(Number) },
        { translateY: expect.any(Number) },
      ])
    );
  });
});
