import React, { useState, useEffect } from 'react';

import { Row } from 'reactstrap';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getMenuList } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';

// 메뉴 정보 출력

const AuthMenuList = ({ menuIdList, setCheckItems, checkItems, pageValue }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  // 조회 처리
  useEffect(() => {
    setLoading(true);

    getMenuList({ params: { pageMode: 'AUTH' } })
      .then((data) => {
        setMenus(data.dataList);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (menuIdList !== null && menuIdList !== undefined && menuIdList.length > 0) {
      setCheckItems(menuIdList);
    }
  }, [menuIdList, setCheckItems]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      menus.forEach((el) => idArray.push(el.menuId));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <h5 className="mt-2" style={{ fontSize: '1em' }}>
            메뉴 설정 <span style={{ color: 'red' }}>*</span>
          </h5>
          <div className="table-rep-plugin">
            <div
              className="table-responsive mb-4"
              data-pattern="priority-columns"
              style={{ height: '600px' }}
            >
              <Table id="tech-companies-1" className="table table-striped table-bordered">
                <Thead>
                  <Tr>
                    <Th>
                      <input
                        type="checkbox"
                        name="select-all"
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                        checked={checkItems.length === menus.length ? true : false}
                      />
                    </Th>
                    <Th>메뉴 ID</Th>
                    <Th>메뉴 명</Th>
                    <Th>상위 메뉴 명</Th>
                    <Th>메뉴 타입</Th>
                    <Th>메뉴 URL</Th>
                    <Th>메뉴 설명</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {menus.map((menu) => (
                    <Tr key={menu.menuId}>
                      <Td>
                        <input
                          type="checkbox"
                          name={`select-${menu.menuId}`}
                          onChange={(e) => handleSingleCheck(e.target.checked, menu.menuId)}
                          // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                          checked={checkItems.includes(menu.menuId) ? true : false}
                          disabled={pageValue === 'D' ? true : false}
                        />
                      </Td>
                      <Td>{menu.menuId}</Td>
                      <Td>{menu.menuName}</Td>
                      <Td>{menu.parentMenuNm}</Td>
                      <Td>{menu.menuType}</Td>
                      <Td>{menu.menuUrl}</Td>
                      <Td>{menu.menuDesc}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </div>
        </Row>
      )}
    </React.Fragment>
  );
};

export default AuthMenuList;
