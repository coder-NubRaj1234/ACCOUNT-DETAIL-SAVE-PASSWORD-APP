import React, { use } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { faEye, faEyeSlash, faClone } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect, useRef } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core";

const Manager = () => {
  const [btnVAl, setBtnVal] = useState("Add");
  const [editBtn, setEditBtn] = useState(true);
  const [dataPassShow, setDataPassShow] = useState(faEye);
  const [message, setMessage] = useState("Save");

  const [form, setForm] = useState({
    siteName: "",
    userName: "",
    password: "",
  });
  const [data, setData] = useState([]);
  const [eyeIcon, setEyeIcon] = useState(faEye);



  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

 
  

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log(windowWidth); // This will log every time window width changes
  }, [windowWidth]);

  //here i load data from localStorage...

  useEffect(() => {
    let passwordData = JSON.parse(localStorage.getItem("passwordManagerData"));
    if (passwordData) {
      setData(passwordData);
    }
  }, []);

  //here i hendle add Acount button........
  const addAcount = () => {
    if (form.userName && form.siteName && form.password) {
      setData([...data, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwordManagerData",
        JSON.stringify([...data, { ...form, id: uuidv4() }])
      );

      console.log();
      setForm({
        siteName: "",
        userName: "",
        password: "",
      });
      setBtnVal("Add");

     

      toast(`✅   ${message} your account !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setMessage("Save")
    } else {
      toast("🚨 Fill all input fields !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletAccount = (id) => {
    console.log("This is delet item id", id);

    setData(data.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwordManagerData",
      JSON.stringify(data.filter((item) => item.id !== id))
    );

    toast("❌  Deleted  your account !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  

  const editAccount = (id) => {
  
    setMessage("Edit");
    setEditBtn(false);
    setBtnVal("Edit");
    const item = data.filter((i) => {
      return i.id == id;
    });
    setForm({ ...item[0] });
    setData(data.filter((item) => item.id !== id));
  };
  //here i hendle input & add Acccount..

  const saveAccount = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  //here my password show handle...
  const showPassword = () => {
    if (eyeIcon.iconName == "eye-slash") {
      setEyeIcon(faEye);
    } else {
      setEyeIcon(faEyeSlash);
    }
  };


  //here the data will copy it's icons..
  const copyData = (text) => {
    toast("✍️  Coppied !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <section className="text-white min-h-[82vh] relative py-10">
        <div class="absolute top-0 z-[-2] h-[100%] w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

        <div className=" container box-border  w-[95%] mt-2.5 m-auto lg:px-40 lg:w-[100%] ">
          <div className="top">
            <h1 className="text-2xl font-bold text-center ">
              <span className="text-green-700">&lt;</span>
              <span>Pass</span>
              <span className="text-green-700">Po/&gt;</span>
            </h1>
            <h2 className="text-center py-2.5 text-xl font-roboto font-bold">
              Manage Here Your All Acount
            </h2>
          </div>

          <div className="inputs text-white mt-5 lg:m-auto">
            <div>
              <label
                htmlFor="siteName"
                className="px-1 my-2 block font-semibold"
              >
                Application Addresh:
              </label>
              <input
                value={form.siteName}
                type="text"
                id="siteName"
                name="siteName"
                placeholder="Enter your application name"
                className=" border border-2  border-green-600 w-full rounded-xl px-3.5 text-lg focus:outline-1 outline-green-600 py-1"
                onChange={(e) => saveAccount(e)}
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-5">
              <div className="lg:w-full">
                <label
                  htmlFor="userName"
                  className="px-1 my-2 block font-semibold "
                >
                  Account Name:
                </label>
                <input
                  value={form.userName}
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Enter your account name"
                  className=" border border-2  border-green-600  rounded-xl px-3.5 text-lg focus:outline-1 outline-green-600 py-1 w-full"
                  onChange={(e) => saveAccount(e)}
                />
              </div>

              <div className="w-full relative">
                <label
                  htmlFor="password"
                  className="px-1 my-2 block font-semibold"
                >
                  Account Password:
                </label>
                <input
                  value={form.password}
                  type={eyeIcon == faEye ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder="Enter your account password"
                  className=" border border-2  border-green-600  rounded-xl px-3.5 text-lg focus:outline-1 outline-green-600 py-1 w-full"
                  onChange={(e) => saveAccount(e)}
                />
                <FontAwesomeIcon
                  onClick={() => {
                    showPassword();
                  }}
                  className="absolute right-2 top-3 cursor-pointer    transition-all duration-300  hover:scale-110"
                  icon={eyeIcon}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center items-center">
              <button
                onClick={() => {
                  addAcount();
                }}
                className="bg-green-600 rounded-lg px-3.5 w-full py-1  font-semibold font-roboto cursor-pointer hover:bg-green-700 transition-all duration-200 flex justify-center items-center gap-1"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/efxgwrkc.json"
                  trigger="morph"
                  colors="primary:#ffffff"
                  className="text-white"
                ></lord-icon>

                <span className=""> {btnVAl} Account</span>
              </button>
            </div>
          </div>

          <div className="mt-15 ">
            {data.length == 0 && (
              <h2 className="px-2 py-4 text-xl font-roboto font-bold">
                No Account Details
              </h2>
            )}

            {data.length > 0 && (
              <>
                <h2 className="px-2 py-4 text-xl font-roboto font-bold">
                  Your Account Details
                </h2>
                <div className="container">
                  {windowWidth > 800 && (
                    <table className="w-full  items-stretch">
                      <thead className="border  text-lg font-roboto">
                        <tr className="text-center  ">
                          <th className="pl-2 py-4 border max-w-[10rem] min-w-[40%] break-words whitespace-normal  ">
                            Site
                          </th>
                          <th className="pl-2 py-4 border max-w-[10rem] min-w-[25%] break-words whitespace-normal">
                            Account Name
                          </th>
                          <th className="pl-2 py-4 border max-w-[10rem] min-w-[25%] break-words whitespace-normal">
                            Password
                          </th>
                          <th className="pl-2 py-4 border break-words whitespace-normal lg:w-fit">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className=" border-collapse overflow-clip text-center border border-1">
                        {data.map((item, index) => {
                          return (
                            <>
                              <tr key={index} className="border ">
                                <td className="py-2  break-words whitespace-normal break-words border">
                                  <div className="flex flex-col gap-5">
                                    <a href={item.siteName} target="_blank" className="underline">
                                      {item.siteName}
                                    </a>

                                    <FontAwesomeIcon
                                      onClick={() => copyData(item.siteName)}
                                      icon={faClone}
                                      className="cursor-pointer transition-all duration-300  hover:scale-110 w-fit m-auto"
                                    ></FontAwesomeIcon>
                                  </div>
                                </td>

                                <td className="py-2   break-words whitespace-normal break-words border">
                                  <div className="flex flex-col gap-5">
                                    <span className="break-words">
                                      {item.userName}
                                    </span>
                                    <FontAwesomeIcon
                                      onClick={() => copyData(item.userName)}
                                      icon={faClone}
                                      className="pl-3 cursor-pointer pl-3 cursor-pointer transition-all duration-300  hover:scale-110 w-fit m-auto"
                                    ></FontAwesomeIcon>
                                  </div>
                                </td>
                                <td className="py-2 break-words whitespace-normal border">
                                  <div className="flex flex-col gap-5 max-w-full ">
                                    <span className="break-words ">
                                      {item.password}
                                    </span>
                                    <FontAwesomeIcon
                                      onClick={() => copyData(item.password)}
                                      icon={faClone}
                                      className="cursor-pointer transition-all duration-300  hover:scale-110  w-fit m-auto "
                                    ></FontAwesomeIcon>
                                  </div>
                                </td>

                                <td className=" Edit  break-words whitespace-normal break-words border py-2">
                                  <div className="flex flex-col gap-2 max-fill ">
                                    <span
                                      className="cursor-pointer break-words break-words"
                                      onClick={() => {
                                        if (editBtn) {
                                          editAccount(item.id);
                                          console.log(editBtn);
                                        } else {
                                          toast(
                                            "🚨 Edit first your account !",
                                            {
                                              position: "top-right",
                                              autoClose: 5000,
                                              hideProgressBar: false,
                                              closeOnClick: false,
                                              pauseOnHover: false,
                                              draggable: true,
                                              progress: undefined,
                                              theme: "dark",
                                            }
                                          );
                                        }
                                      }}
                                    >
                                      <lord-icon
                                        src="https://cdn.lordicon.com/exymduqj.json"
                                        trigger="in"
                                        delay="500"
                                        stroke="bold"
                                        state="in-dynamic"
                                        colors="primary:#16c79e,secondary:#16c79e"
                                        style={{ width: "25px" }}
                                        className=" transition-all duration-300  hover:scale-110"
                                      ></lord-icon>
                                    </span>

                                    <span
                                      className=" delete cursor-pointer "
                                      onClick={() => {
                                        deletAccount(item.id);
                                      }}
                                    >
                                      <lord-icon
                                        src="https://cdn.lordicon.com/hwjcdycb.json"
                                        trigger="hover"
                                        stroke="bold"
                                        colors="primary:#16c79e,secondary:#16c79e"
                                        style={{ width: "25px" }}
                                        className=" transition-all duration-300  hover:scale-110"
                                      ></lord-icon>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  )}

                  {windowWidth < 800 &&
                    data.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-[#0f172a]  to-[#334155] mx-3 box-shadow flex flex-col gap-2 px-4 py-4 font-semibold font-roboto rounded-lg mb-10"
                        >
                          <div className="flex flex-col gap-1">
                            <p>
                              Account Addresh:
                              <span className="pl-5">
                                {" "}
                                <FontAwesomeIcon
                                  onClick={() => copyData(item.siteName)}
                                  icon={faClone}
                                  className="cursor-pointer"
                                ></FontAwesomeIcon>
                              </span>
                            </p>
                            <p className="font-light underline">
                              <a href={item.siteName}>{item.siteName}</a>
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>
                              User Name:{" "}
                              <span className="pl-5">
                                <FontAwesomeIcon
                                  onClick={() => copyData(item.userName)}
                                  icon={faClone}
                                  className=" cursor-pointer"
                                ></FontAwesomeIcon>
                              </span>
                            </p>
                            <p className="font-light">{item.userName}</p>
                          </div>
                          <div className=" relative flex flex-col gap-1">
                            <p>
                              Password:
                              <span className="pl-5">
                                {" "}
                                <FontAwesomeIcon
                                  onClick={() => copyData(item.password)}
                                  icon={faClone}
                                  className="cursor-pointer"
                                ></FontAwesomeIcon>
                              </span>
                            </p>
                            <input
                              readOnly
                              type="text"
                              value={item.password}
                              className="w-fit outline-none border-none  pointer-events-none bg-transparent  font-roboto font-medium"
                            />
                          </div>

                          <div className="flex  gap-10 justify-end items-center">
                            <span
                              className="cursor-pointer break-words break-words"
                              onClick={() => {
                                if (editBtn) {
                                  editAccount(item.id);
                                  console.log(editBtn);
                                } else {
                                  toast("🚨 Edit first your account !", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                  });
                                }
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="in"
                                delay="500"
                                stroke="bold"
                                state="in-dynamic"
                                colors="primary:#16c79e,secondary:#16c79e"
                                style={{ width: "25px" }}
                              ></lord-icon>
                            </span>

                            <span
                              className=" delete cursor-pointer "
                              onClick={() => {
                                deletAccount(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#16c79e,secondary:#16c79e"
                                style={{ width: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Manager;
