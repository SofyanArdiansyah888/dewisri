import { Transition } from "react-transition-group";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { sideMenu as useSideMenuStore } from "@/stores/side-menu";
import { atom, useRecoilValue } from "recoil";
import { linkTo, nestedMenu, enter, leave } from "./index";
import { Lucide, Modal, ModalBody } from "@/base-components";
import classnames from "classnames";
import TopBar from "@/components/top-bar/Main";
import MobileMenu from "@/components/mobile-menu/Main";
import MainColorSwitcher from "@/components/main-color-switcher/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main";
import { checkMenu } from "../../stores/side-menu";
import { getUser } from "../../services/database";
import { useError } from "../../hooks/useError";

function Main() {
  const navigate = useNavigate();
  const { errorMessage, setErrorMessage } = useError();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState([]);

  const sideMenuStore = useRecoilValue(useSideMenuStore);
  

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");
    const sideMenu = () => nestedMenu($h.toRaw(checkMenu()), location);
    setFormattedMenu(sideMenu());
  }, [sideMenuStore, location.pathname]);

  return (
    <>
      <div className="py-5 md:py-0">
        {/* <DarkModeSwitcher />
      <MainColorSwitcher /> */}
        <MobileMenu />
        <TopBar />
        <div className="flex overflow-hidden">
          {/* BEGIN: Side Menu */}
          <nav className="side-nav">
            <ul>
              {/* BEGIN: First Child */}
              {formattedMenu.map((menu, menuKey) =>
                menu == "devider" ? (
                  <li
                    className="side-nav__devider my-6"
                    key={menu + menuKey}
                  ></li>
                ) : (
                  <li key={menu + menuKey}>
                    <SideMenuTooltip
                      tag="a"
                      content={menu.title}
                      href={menu.subMenu ? "#" : menu.pathname}
                      className={classnames({
                        "side-menu": true,
                        "side-menu--active": menu.active,
                        "side-menu--open": menu.activeDropdown,
                      })}
                      onClick={(event) => {
                        event.preventDefault();
                        linkTo(menu, navigate);
                        setFormattedMenu($h.toRaw(formattedMenu));
                      }}
                    >
                      <div className="side-menu__icon">
                        <Lucide icon={menu.icon} />
                      </div>
                      <div className="side-menu__title">
                        {menu.title}
                        {menu.subMenu && (
                          <div
                            className={classnames({
                              "side-menu__sub-icon": true,
                              "transform rotate-180": menu.activeDropdown,
                            })}
                          >
                            <Lucide icon="ChevronDown" />
                          </div>
                        )}
                      </div>
                    </SideMenuTooltip>
                    {/* BEGIN: Second Child */}
                    {menu.subMenu && (
                      <Transition
                        in={menu.activeDropdown}
                        onEnter={enter}
                        onExit={leave}
                        timeout={300}
                      >
                        <ul
                          className={classnames({
                            "side-menu__sub-open": menu.activeDropdown,
                          })}
                        >
                          {menu.subMenu.map((subMenu, subMenuKey) => (
                            <li key={subMenuKey}>
                              <SideMenuTooltip
                                tag="a"
                                content={subMenu.title}
                                href={subMenu.subMenu ? "#" : subMenu.pathname}
                                className={classnames({
                                  "side-menu": true,
                                  "side-menu--active": subMenu.active,
                                })}
                                onClick={(event) => {
                                  event.preventDefault();
                                  linkTo(subMenu, navigate);
                                  setFormattedMenu($h.toRaw(formattedMenu));
                                }}
                              >
                                <div className="side-menu__icon">
                                  <Lucide icon="Activity" />
                                </div>
                                <div className="side-menu__title">
                                  {subMenu.title}
                                  {subMenu.subMenu && (
                                    <div
                                      className={classnames({
                                        "side-menu__sub-icon": true,
                                        "transform rotate-180":
                                          subMenu.activeDropdown,
                                      })}
                                    >
                                      <Lucide icon="ChevronDown" />
                                    </div>
                                  )}
                                </div>
                              </SideMenuTooltip>
                              {/* BEGIN: Third Child */}
                              {subMenu.subMenu && (
                                <Transition
                                  in={subMenu.activeDropdown}
                                  onEnter={enter}
                                  onExit={leave}
                                  timeout={300}
                                >
                                  <ul
                                    className={classnames({
                                      "side-menu__sub-open":
                                        subMenu.activeDropdown,
                                    })}
                                  >
                                    {subMenu.subMenu.map(
                                      (lastSubMenu, lastSubMenuKey) => (
                                        <li key={lastSubMenuKey}>
                                          <SideMenuTooltip
                                            tag="a"
                                            content={lastSubMenu.title}
                                            href={
                                              lastSubMenu.subMenu
                                                ? "#"
                                                : lastSubMenu.pathname
                                            }
                                            className={classnames({
                                              "side-menu": true,
                                              "side-menu--active":
                                                lastSubMenu.active,
                                            })}
                                            onClick={(event) => {
                                              event.preventDefault();
                                              linkTo(lastSubMenu, navigate);
                                            }}
                                          >
                                            <div className="side-menu__icon">
                                              <Lucide icon="Zap" />
                                            </div>
                                            <div className="side-menu__title">
                                              {lastSubMenu.title}
                                            </div>
                                          </SideMenuTooltip>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </Transition>
                              )}
                              {/* END: Third Child */}
                            </li>
                          ))}
                        </ul>
                      </Transition>
                    )}
                    {/* END: Second Child */}
                  </li>
                )
              )}
              {/* END: First Child */}
            </ul>
          </nav>
          {/* END: Side Menu */}
          {/* BEGIN: Content */}
          <div className="content">
            <Outlet />
          </div>
          {/* END: Content */}
        </div>
      </div>
      <Modal
        show={errorMessage}
        onHidden={() => {
          setErrorMessage(null);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Oops...</div>
            <div className="text-slate-500 mt-2">{errorMessage}</div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setErrorMessage(null);
              }}
              className="btn w-24 btn-primary"
            >
              Ok
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Main;
