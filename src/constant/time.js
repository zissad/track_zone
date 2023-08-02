export const TIMEZONE_NAME = ["GMT", "UTC", "PST", "EST", "EDT", "BST", "MST"];

export const TIMEZONE_OFFSET = {
  PST: -7,
  EST: -4,
  EDT: -4,
  BST: 1,
  MST: -6,
};

const getOffset = () => {
  const OFFSET = [];
  for (let i = -11.5; i <= 12; i += 0.5) {
    OFFSET.push(i);
  }
  return OFFSET;
};

export const OFFSET = getOffset();
