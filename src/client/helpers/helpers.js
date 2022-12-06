export const getQtyOfPages = (arrayDataLength, limitPerPage) =>
  Math.ceil(arrayDataLength / limitPerPage);
