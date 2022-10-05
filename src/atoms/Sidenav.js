const { atom } = require("recoil");

export const sideNavAtom = atom({
  key: "sideNavAtom", // unique ID (with respect to other atoms/selectors)
  default: "All", // default value (aka initial value)
});
