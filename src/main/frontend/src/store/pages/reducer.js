import { GET_PAGES_ITEM_SAVE, INIT_PAGES_ITEMS } from "./actionTypes";

// =============== [조회 시, 필요한 파라미터 정보 : 페이징 처리시 필요함] ===============

const INIT_STATE = {
  pages: {
    schInputBox: "", // 입력값 조회조건
    rowsPerPage: 10, // 한페이지에 보이는 row 수
    currentPage: 1, // 현재 페이지 수
    pagingCount: 5, // 한 페이지에 보일 페이징 수
    pathname: "/dashboard",
  },
  error: {},
};
// const INIT_STATE = {
//   pages: {},
//   error: {},
// };

const pagesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PAGES_ITEM_SAVE:
      return {
        ...state,
        pages: action.payload,
      };
    case INIT_PAGES_ITEMS:
      return {
        pages: INIT_STATE.pages,
      };

    default:
      return state;
  }
};

export default pagesReducer;
