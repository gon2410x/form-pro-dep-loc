export const storage = {
  get(Key) {
    const val = window.localStorage.getItem(Key);
    if (!val) {
      return null;
    }
    return JSON.parse(val);
  },
  set(Key, val) {
    window.localStorage.setItem(Key, JSON.stringify(val));
  },
  remove(Key) {
    window.localStorage.removeItem(Key);
  },
  clear() {
    window.localStorage.clear();
  },
};
export default storage;
