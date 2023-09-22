import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  Row,
  Col,
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Form,
} from 'reactstrap';
import { Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ReactECharts from 'echarts-for-react';

// import instance from 'axios-apis/interceptors';
import Loader from 'src/components/Common/Loader';

import { getBoardList } from 'src/axios-apis/backend';
import { useLocation } from 'react-router-dom';

import classnames from 'classnames';

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';

// ============================== [데이터 모니터링] ==============================

function QueryStringToJSON(qs) {
  qs = qs.substr(1);
  //파라메터별 분리
  var pairs = qs.split('&');

  var result = {}; //json 빈 객체

  //각 파라메터별 key/val 처리
  pairs.forEach(function (pair) {
    pair = pair.split('='); //key=val 분리
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result)); //json 객체를 문자열화해서 리턴
}

const MonitoringList = () => {
  const [domain, setDomain] = useState('');
  const [options, setOptions] = useState({});
  const [datas, setDatas] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [endPage, setEndPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sensorIdfSelBox, setSensorIdfSelBox] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setactiveTab] = useState('1');
  const [startData, setStartData] = useState('');
  const location = useLocation();
  let queryString = useRef('');
  const pagingCount = useRef(5); // 한페이지에서 보일 페이지 수 -> state변화가 필요하지 않다. -> 리렌더링방지

  // 검색조건에 들어갈 데이터 셋팅
  const [formData, setFormData] = useState({
    schTitle: '',
  });

  // 검색 버튼 클릭 시, 조회 할 데이터 셋팅
  const [submit, setSubmit] = useState({});

  // 페이징 검색 조건
  let search = useMemo(() => {
    return {
      startPage: currentPage,
      rowsPerPage: pageSize,
      currentPage: currentPage,
      pagingCount: pagingCount.current,
      schBoardName: submit.schTitle,
    };
  }, [pageSize, submit, currentPage]);

  useEffect(() => {
    const urlParam = location.search;
    const urlParamObj = QueryStringToJSON(urlParam);
    if (urlParam !== '' && urlParam !== null) {
      search.startPage = urlParamObj.startPage;
      search.rowsPerPage = urlParamObj.rowsPerPage;
      search.currentPage = urlParamObj.currentPage;
      search.schBoardName = urlParamObj.schBoardName;
      setFormData({
        schTitle: urlParamObj.schBoardName,
      });

      location.search = '';
    }
  }, [location, search]);

  const getDatas = useCallback(() => {
    setLoading(true);

    queryString.current = Object.entries(search)
      .map(([key, value]) => value && key + '=' + value)
      .filter((v) => v)
      .join('&');

    getBoardList({ params: search })
      .then((data) => {
        setDatas(data.dataList);
        setStartPage(data.startPage);
        setCurrentPage(data.currentPage);
        setEndPage(data.endPage);
        setTotalPage(data.totalPage);
        setLoading(false);
        console.log('listData', data);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [search]);

  // 조회 처리
  useEffect(() => {
    getDatas();
  }, [getDatas]);

  const defaultVal = useMemo(() => {
    return {
      startDate: nowDate('D'),
      endDate: nowDate('D'),
      startTime: '00:00:01',
      endTime: nowDate('T'),
      domainType: '03001',
      sensorIdf: 'CDS001',
      limitRange: 500,
      startData: startData,
    };
  }, []);

  // const { control, register, handleSubmit, watch, setValue } = useForm({
  //   defaultValues: defaultVal,
  // });

  // console.log(defaultValues.startDate);
  // const axiosInterface = useCallback(
  //   (pdata) => {
  //     setLoading(true);
  //     if (pdata === '' || pdata == null) {
  //       pdata = defaultVal;
  //     }
  //     const url =
  //       '/sensors/' +
  //       pdata.sensorIdf +
  //       '/realtime-data?startDate=' +
  //       pdata.startDate +
  //       ' ' +
  //       pdata.startTime +
  //       '&endDate=' +
  //       pdata.endDate +
  //       ' ' +
  //       pdata.endTime +
  //       '&offset=0&limit=' +
  //       pdata.limitRange;
  //     // 데이터 통신
  //     instance
  //       .get(url)
  //       .then((res) => {
  //         const recordData = generateData(res.data.recordData);
  //         // console.log(1, res.data);
  //         // console.log(2, recordData);
  //
  //         setOptions({
  //           title: {
  //             text: '[' + res.data.totalCnt + '] 건의 데이터 조회',
  //             left: 10,
  //           },
  //           toolbox: {
  //             feature: {
  //               dataZoom: {
  //                 yAxisIndex: false,
  //               },
  //               saveAsImage: {
  //                 pixelRatio: 2,
  //               },
  //             },
  //           },
  //           tooltip: {
  //             trigger: 'axis',
  //             axisPointer: {
  //               type: 'shadow',
  //             },
  //           },
  //           grid: {
  //             bottom: 90,
  //           },
  //           dataZoom: [
  //             {
  //               type: 'inside',
  //             },
  //             {
  //               type: 'slider',
  //             },
  //           ],
  //           xAxis: {
  //             data: recordData.categoryData,
  //             silent: false,
  //             splitLine: {
  //               show: false,
  //             },
  //             splitArea: {
  //               show: false,
  //             },
  //           },
  //           yAxis: {
  //             splitArea: {
  //               show: false,
  //             },
  //           },
  //           series: [
  //             {
  //               type: 'bar',
  //               // data: data.valueData,
  //               data: recordData.valueData,
  //               // Set `large` for large data amount
  //               large: true,
  //             },
  //           ],
  //         }); // option end
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //       })
  //       .finally(function () {
  //         // always executed
  //         setLoading(false);
  //       });
  //   },
  //   [defaultVal]
  // );

  // useEffect(() => {
  //   axiosInterface(); // defaultVal 바뀔 때만 호출
  // }, [axiosInterface]);
  //
  // const onSubmit = async (data) => {
  //   // await new Promise((r) => setTimeout(r, 1000));
  //   console.log(data);
  //   // setValue("sensorIdf", data.sensorIdf);
  //   axiosInterface(data);
  // };

  // const domainTypeSelBox = watch("domainType");
  // const limitRange = watch("limitRange");

  // useEffect(() => {
  //   console.log("domainTypeSelBox >>> " + domainTypeSelBox);
  //   let sensorIdfOpt = "";

  //   if (domainTypeSelBox === "03001") {
  //     sensorIdfOpt =
  //       '<option value="CDS001">작물보호재생산팀 RTO</option>' +
  //       '<option value="CDS002">폐수처리장 부지경계</option>' +
  //       '<option value="CDS003">안전환경 옥상(울주군 설치)</option>';
  //     setValue("sensorIdf", "CDS001");
  //   }

  //   if (domainTypeSelBox === "03002") {
  //     sensorIdfOpt =
  //       '<option value="BDS001">가속도센서1</option>' +
  //       '<option value="BDS002">표면온도센서</option>' +
  //       '<option value="BDS003">대기온도센서</option>' +
  //       '<option value="BDS004">기울기센서1</option>';
  //     setValue("sensorIdf", "BDS001");
  //   }

  //   if (domainTypeSelBox === "03003") {
  //     sensorIdfOpt =
  //       '<option value="FDS001">3-in-1 Air sensor</option>' +
  //       '<option value="FDS010">Air NH3 sensor</option>' +
  //       '<option value="FDS016">Weather Station</option>';
  //     setValue("sensorIdf", "FDS001");
  //   }
  //   setSensorIdfSelBox(sensorIdfOpt);
  // }, [domainTypeSelBox, setValue]); // domainTypeSelBox, setValue 바뀔 때만 호출

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="데이터 모니터링" breadcrumbItem="데이터 모니터링" />

            <Card>
              {/* <Form onSubmit={handleSubmit(onSubmit)}>
                <CardBody>
                  <Row>
                    <Col xxl={1} lg={4}>
                      <div className="mb-xxl-0 mt-2">도메인 선택</div>
                    </Col>
                    <Col xxl={2} lg={4}>
                      <div className="mb-3 mb-xxl-0">
                        <select
                          className="form-select"
                          {...register("domainType")}
                        >
                          <option value="03001">화학도메인</option>
                          <option value="03002">교량도메인</option>
                          <option value="03003">축사도메인</option>
                        </select>
                      </div>
                    </Col>
                    <Col xxl={1} lg={4}>
                      <div className="mb-xxl-0 mt-2">센서 선택</div>
                    </Col>
                    <Col xxl={2} lg={4}>
                      <div className="mb-3 mb-xxl-0">
                        <select
                          className="form-select"
                          {...register("sensorIdf")}
                          id="sensorIdf"
                          name="sensorIdf"
                          dangerouslySetInnerHTML={{ __html: sensorIdfSelBox }}
                        ></select>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col xxl={1} lg={4}>
                      <div className="mb-xxl-0 mt-2">측정항목</div>
                    </Col>
                    <Col xxl={2} lg={4}>
                      <div className="mb-3 mb-xxl-0">
                        <select className="form-select">
                          <option>전체</option>
                          <option value="1">황화수소</option>
                          <option value="2">암모니아</option>
                          <option value="3">총휘발성유기화합물</option>
                          <option value="4">복합악취</option>
                          <option value="5">풍향</option>
                          <option value="6">풍속</option>
                        </select>
                      </div>
                    </Col>
                    <Col xxl={2} lg={4}>
                      <div className="mb-xxl-0 mt-2">조회 데이터 수 : </div>
                    </Col>
                    <Col xxl={2} lg={4}>
                      <select className="form-select">
                        {["500", "1000", "1500", "2000"].map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col xxl={1} lg={4}>
                      <div className="mb-xxl-0 mt-2">시작 날짜</div>
                    </Col>
                    <Col sm={2}>
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="startDate"
                            placeholder="date placeholder"
                            type="date"
                          />
                        )}
                        name="startDate"
                      />
                    </Col>
                    <Col sm={2}>
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="startTime"
                            placeholder="time placeholder"
                            type="time"
                          />
                        )}
                        name="startTime"
                      />
                    </Col>
                    <Col xxl={1} lg={4}>
                      <div className="mb-xxl-0 mt-2">종료 날짜</div>
                    </Col>
                    <Col sm={2}>
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="startDate"
                            placeholder="date placeholder"
                            type="date"
                          />
                        )}
                        name="startDate"
                      />
                    </Col>
                    <Col sm={2}>
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="startTime"
                            placeholder="time placeholder"
                            type="time"
                          />
                        )}
                        name="startTime"
                      />
                    </Col>

                    <Col xxl={1} lg={4}>
                      <div className="mb-3 mb-xxl-0">
                        <button
                          type="submit"
                          className="btn btn-soft-secondary w-100"
                        >
                          <i className="bx bx bx-search-alt align-middle"></i>{" "}
                          조회
                        </button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Form> */}
              <CardBody className="border-bottom">
                <Row>
                  <Col md={4}>
                    <Row>
                      <Col xxl={3} lg={4}>
                        <Nav className="flex-column" pills>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === '1',
                              })}
                              onClick={() => {
                                setactiveTab('1');
                              }}
                            >
                              <p className="fw-bold mb-2">차트</p>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Col>
                      <Col xxl={3} lg={4}>
                        <Nav className="flex-column" pills>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === '2',
                              })}
                              onClick={() => {
                                setactiveTab('2');
                              }}
                            >
                              <p className="fw-bold mb-2">데이터</p>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <ReactECharts option={options} opts={{ renderer: 'svg', height: '400px' }} />
                    </Row>
                  </TabPane>
                  <TabPane
                    tabId="2"
                    id="v-pills-payment"
                    role="tabpanel"
                    aria-labelledby="v-pills-payment-tab"
                  >
                    <div>
                      <Table
                        id="tech-companies-1"
                        className="table table-striped table-bordered table-hover"
                        style={{ textAlign: 'center' }}
                      >
                        <Thead>
                          <Tr>
                            <Th>도메인 식별자</Th>
                            <Th>센서 명</Th>
                            <Th>실 측정 시간</Th>
                            <Th>센서 식별자</Th>
                            <Th>측정항목</Th>
                            <Th>측정 값</Th>
                            <Th>각도 값</Th>
                            <Th>트랜잭션 ID</Th>
                            <Th>연동데이터 생성시각</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {datas.map((board) => (
                            <Tr key={board.boardId}>
                              <Td>{board.boardId}</Td>
                              <Td>{board.title}</Td>
                              <Td>{board.createUserNm}</Td>
                              <Td>{board.updateDate}</Td>
                              <Td>{board.readCnt}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const nowDate = (type) => {
  let today = new Date();

  if (type === 'D') {
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  } else if (type === 'T') {
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);
    return hours + ':' + minutes + ':' + seconds;
  }
};

const generateData = (dataParam) => {
  const categoryData = [];
  const valueData = [];
  for (let i = 0; i < dataParam.length; i++) {
    categoryData.push(dataParam[i].metricsIdentifier);
    valueData.push(dataParam[i].measurementValue);
  }
  return {
    categoryData: categoryData,
    valueData: valueData,
  };
};

export default MonitoringList;
