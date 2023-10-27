import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// //Import Scrollbar
import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';
import withRouter from 'src/components/Common/withRouter';
import { Link } from 'react-router-dom';

//i18n
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { initPagesItem } from 'src/store/actions';

// ============================= [메뉴] ==================================

const SidebarContent = (props) => {
  const dispatch = useDispatch();
  // const [view, setView] = useState(false);

  const { pages } = useSelector((state) => ({
    pages: state.pagesReducer.pages,
  }));

  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains('active')) {
        item.classList.remove('active');
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.remove('mm-show');
        }

        parent.classList.remove('mm-active');
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove('mm-show');

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('mm-active'); // li
            parent3.childNodes[0].classList.remove('mm-active');

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove('mm-show'); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('mm-show'); // li
                parent5.childNodes[0].classList.remove('mm-active'); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;

    let pathnameArr = pathName.split('/');
    let activePath = '/' + pathnameArr[1];
    if (pathnameArr.length > 2) {
      activePath += '/' + pathnameArr[2];
    }

    const ul = document.getElementById('side-menu');
    const items = ul.getElementsByTagName('a');
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      // console.log(items[i]);
      if (activePath === items[i].pathname) {
        matchingMenuItem = items[i];
        console.log(activePath);
        break;
      }
    }

    // 리덕스로 페이징처리 저장 후 다른메뉴로 이동 시 데이터 초기화 ===================================
    // console.log(`pathname : ${pages.pathname}, activePath : ${activePath}`);
    if (pages.pathname !== activePath) {
      // console.log("==== redux pages init ====");
      dispatch(initPagesItem());
      pages.pathname = activePath;
      // console.log("pages ", page`s);
    } else {
      // console.log("==== same ====");
    }
    // ================================================================

    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown, pages, dispatch]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu('#side-menu');
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t('Menu')} </li>
            <li>
              <Link to="/dashboard">
                <i className="bx bx-home-circle"></i>
                <span>{props.t('Main')}</span>
              </Link>
            </li>

            {/* <li>
              <Link to="/contacts-list">
                <i className="bx bx-chat"></i>
                <span>{props.t("회원관리")}</span>
              </Link>
            </li> */}

            <li className="menu-title">{props.t('System')}</li>
            <li>
              <Link to="/#" className="has-arrow ">
                <span className="badge rounded-pill bg-success float-end" key="t-new"></span>
                <i className="bx bxs-wrench"></i>
                <span key="t-jobs">{props.t('CMS관리')}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/board">{props.t('게시판')}</Link>
                </li>
                <li>
                  <Link to="/user">{props.t('사용자 관리')}</Link>
                </li>
                <li>
                  <Link to="/menu">{props.t('메뉴 관리')}</Link>
                </li>
                <li>
                  <Link to="/code">{props.t('공통 코드 관리')}</Link>
                </li>
                <li>
                  <Link to="/admin/auth">{props.t('권한 관리')}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <span className="badge rounded-pill bg-success float-end" key="t-new"></span>
                <i className="bx bx-chalkboard"></i>
                <span key="t-jobs">{props.t('데이터 모니터링')}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/monitoring">{props.t('데이터 모니터링')}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <span className="badge rounded-pill bg-success float-end" key="t-new"></span>
                <i className="bx bx-briefcase-alt"></i>
                <span key="t-jobs">{props.t('Sample')}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/job-list">{props.t('Sample List')}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
