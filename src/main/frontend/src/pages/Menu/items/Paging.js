import React, { useEffect, useState } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

/////
// const Paging = ({page, count, setPage}) => {
const Paging = ({ totalCount, postPerPage, handlePageChange, page }) => {

    const [check, setCheck] = useState();


    useEffect(() =>{
        if(Math.ceil(totalCount / 10) > 5) return setCheck(5)
        else return setCheck(Math.ceil(totalCount / 10))
    }) 


    return (
    <Pagination
    activePage={Number(page)} // 현재 페이지
    itemsCountPerPage={postPerPage} // 한 페이지랑 보여줄 아이템 갯수
    totalItemsCount={totalCount ? totalCount : 0} // 총 아이템 갯수
    pageRangeDisplayed={check} // paginator의 페이지 범위
    prevPageText={"‹"} // "이전"을 나타낼 텍스트
    nextPageText={"›"} // "다음"을 나타낼 텍스트
    onChange={handlePageChange} />); // 페이지 변경을 핸들링하는 함수
};

export default Paging;