import { GET_PAGES_ITEM_SAVE, INIT_PAGES_ITEMS } from "./actionTypes";

export const savePagesItem = (pages) => ({
  type: GET_PAGES_ITEM_SAVE,
  payload: pages,
});

export const initPagesItem = () => ({
  type: INIT_PAGES_ITEMS,
});
