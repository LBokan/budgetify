export const setPaddingBottomValue = (hasPadding) => {
  switch (hasPadding) {
    case true:
      return '40px';

    case false:
    default:
      return '0';
  }
};
