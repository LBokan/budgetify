export const setPaddingBottomValue = (isMultiple) => {
  switch (isMultiple) {
    case true:
      return '0';

    case false:
    default:
      return '40px';
  }
};
