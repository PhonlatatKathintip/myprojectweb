import React, { useState, useEffect } from "react";
import Link from "next/link";
import _ from "lodash";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import { AnimateSharedLayout, motion } from "framer-motion";
import configData from "../../volume/data.json";

export default function Home({ systemInfo }) {
  // console.log("Trans Data", systemInfo?.attributes?.logo);

  const menuList = [
    {
      title: "หน้าแรก",
      link: "/#",
    },
    {
      title: "บทความ/ข่าวสาร",
      link: "/Blogshow",
    },
    {
      title: "ผลิตภัณฑ์",
      link: "/#main-feature",
    },
    {
      title: "ติดต่อเรา",
      link: "/contact",
    },
  ];
  const [active, setActive] = useState(false);
  const [state, setState] = useState({
    top: false,
  });
  const [openCart, setOpenCart] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      currentScrollPos < prevScrollPos && currentScrollPos > prevScrollPos
    );

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  useEffect(() => {
    setOpenCart(false);
    return () => {};
  }, [prevScrollPos]);

  const handleClick = () => {
    setOpenCart(!openCart);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      className="w-full bg-white shadow-xl"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List onClick={handleClick}>
        {_.map(menuList, (eachList, index) => (
          <Link href={eachList?.link} key={index}>
            <ListItem button key={eachList?.title}>
              <ListItemText primary={eachList?.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <AnimateSharedLayout>
      <nav className="flex items-center flex-wrap bg-white p-3  shadow-xl blur-backdrop-filter fixed z-10 w-full">
        <Link href="/">
          <div className="inline-flex items-center p-1 mr-4 ">
            <img
              src={
                _.trimEnd(configData?.mainConfig?.apiServer, "/api") +
                systemInfo?.attributes?.logo?.data?.attributes?.url
              }
              className="h-16"
              alt={systemInfo?.title || "Title"}
            />
          </div>
        </Link>

        <button
          className=" inline-flex p-2 hover:bg-gray-600 rounded lg:hidden text-gray-500 ml-auto hover:text-white outline-none border-2 bg-gray-400"
          onClick={handleClick}
        >
          <div
            className={`${
              openCart ? "tham-active" : ""
            }   tham tham-e-spin tham-w-6`}
          >
            <div className="tham-box">
              <div className="tham-inner bg-white" />
            </div>
          </div>
        </button>

        <Drawer
          anchor="top"
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
        >
          {list("top")}
        </Drawer>

        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto font-head">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            {_.map(menuList, (eachList, index) => (
              <Link href={eachList?.link} key={index}>
                <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-600 items-center justify-center hover:bg-blue-600 hover:text-white">
                  {eachList?.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full">
          <Collapse in={openCart} timeout="auto" unmountOnExit>
            <div className="">{list("top")}</div>
          </Collapse>
        </div>
      </nav>
    </AnimateSharedLayout>
  );
}
