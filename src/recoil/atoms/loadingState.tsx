import { atom, selector } from "recoil";

export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});

export const isLoadingSelector = selector({
  key: "isLoadingSelector",
  get: ({ get }) => {
    return get(isLoadingState);
  },
});
