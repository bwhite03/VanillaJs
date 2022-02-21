export const isValid = (v) => {
  if (v !== 'undefined' && v !== null) return true;
  return false;
};

export const formatMoney = (input) => {
  input = input.toString();
  const pos = input.indexOf('.');
  const left = input.substring(0, pos);
  let right = input.substring(pos + 1);
  if (right.length == 1) {
    right += '0';
  }
  return `$${left}.${right}`;
};
