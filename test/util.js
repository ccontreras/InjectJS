export const getKey = (len) => {
  let txt = '';
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < len; i += 1) {
    txt += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return txt;
};
