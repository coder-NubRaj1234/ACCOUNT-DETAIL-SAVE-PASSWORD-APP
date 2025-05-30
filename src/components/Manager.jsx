import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { faEye, faEyeSlash, faClone } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect, useRef } from "react";

const Manager = () => {
  const [btnVAl, setBtnVal] = useState("Add");
  const [editBtn, setEditBtn] = useState(true);

  const [form, setForm] = useState({
    siteName: "",
    userName: "",
    password: "",
  });
  const [data, setData] = useState([]);
  const [eyeIcon, setEyeIcon] = useState(faEye);

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

      setEditBtn(true);
      setTimeout(() => {
        console.log("add btn click", editBtn);
      }, 1000);

      toast("🦄 Save your account !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{

      toast("🦄 Fill all input feailds !", {
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

    toast("🦄 Delete  your account !", {
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
    toast("🦄 Coppied !", {
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
      <section className="text-white h-[82vh] relative py-10">
        <div class="absolute top-0 z-[-2] h-[100%] w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

        <div className=" container box-border  w-[95%] mt-2.5 m-auto  ">
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

          <div className="inputs text-white mt-5">
            <div>
              <label
                htmlFor="siteName"
                className="px-1 my-2 block font-semibold"
              >
                Application Name:
              </label>
              <input
                value={form.siteName}
                type="text"
                id="siteName"
                name="siteName"
                placeholder="Enter your application name"
                className=" border border-2  border-green-600 w-full rounded-xl px-3.5 text-lg focus:outline-1 outline-green-600 py-0.5"
                onChange={(e) => saveAccount(e)}
              />
            </div>

            <div className="flex flex-col">
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
                className=" border border-2  border-green-600  rounded-xl px-3.5 text-lg focus:outline-1 outline-green-600 py-0.5"
                onChange={(e) => saveAccount(e)}
              />
              <label
                htmlFor="password"
                className="px-1 my-2 block font-semibold"
              >
                Account Password:
              </label>
              <div className="w-full relative">
                <input
                  value={form.password}
                  type={eyeIcon == faEye ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder="Enter your account password"
                  className=" border border-2  border-green-600  rounded-xl px-3.5 text-lg focus:outline-1 outline-green-600 py-0.5 w-full"
                  onChange={(e) => saveAccount(e)}
                />
                <FontAwesomeIcon
                  onClick={() => {
                    showPassword();
                  }}
                  className="absolute right-2 top-2.5 cursor-pointer"
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
                  <table className="w-full ">
                    <thead className="border">
                      <tr className="text-center py-4  ">
                        <th className="pl-2">Site</th>
                        <th className="pl-2">Account Name</th>
                        <th className="pl-2">Password</th>
                        <th className="pl-2">Action</th>
                      </tr>
                    </thead>

                    <tbody className=" border-collapse">
                      {data.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center border items-stretch py-4"
                          >
                            <td className="py-2 flex flex-col gap-5 ">
                              <a href={item.siteName} target="_blank">
                                {item.siteName}
                              </a>

                              <FontAwesomeIcon
                                onClick={() => copyData(item)}
                                icon={faClone}
                                className="pl-3 cursor-pointer"
                              ></FontAwesomeIcon>
                            </td>

                            <td className="py-2  ">
                              <div className="flex flex-col gap-5">
                                <span> {item.userName}</span>
                                <FontAwesomeIcon
                                  onClick={() => copyData(item.userName )}
                                  icon={faClone}
                                  className="pl-3 cursor-pointer"
                                ></FontAwesomeIcon>
                              </div>
                            </td>
                            <td className="py-2 ">
                              <div className="flex flex-col gap-5">
                                <span> {item.password}</span>
                                <FontAwesomeIcon
                                  onClick={() => copyData(item.password)}
                                  icon={faClone}
                                  className="pl-3 cursor-pointer"
                                ></FontAwesomeIcon>
                              </div>
                            </td>

                            <td className=" Edit flex flex-col justify-center items-center  gap-5 ">
                              <span
                                onClick={() => {
                                  if (editBtn) {
                                    editAccount(item.id);
                                    console.log(editBtn);
                                  } else {
                                    toast("🦄 Edit first your account !", {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: false,
                                      pauseOnHover: false,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "dark",
                                    });
                                }}}
                                className="cursor-pointer"
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
                                onClick={() => {
                                  deletAccount(item.id);
                                }}
                                className=" delete cursor-pointer"
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/hwjcdycb.json"
                                  trigger="hover"
                                  stroke="bold"
                                  colors="primary:#16c79e,secondary:#16c79e"
                                  style={{ width: "25px" }}
                                ></lord-icon>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
