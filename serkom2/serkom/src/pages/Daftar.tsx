import { useState } from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Daftar() {
  const [open, setOpen] = useState(true);
  const dropbea = [
    "Jalur Prestasi Siswa (JPS)",
    "Beasiswa Kartu Indonesia Pintar Kuliah (KIP Kuliah)",
    "Beasiswa Forum OSIS Nasional",
  ];
  const [beainput, setBeaInput] = useState(0);
  const Menus = [
    { title: "Dashboard", path: "/" },
    { title: "Daftar", path: "/daftar" },
    { title: "Hasil", path: "/hasil" },
  ];
  const [nameinput, setnameinput] = useState("");
  const [emailinput, setemailinput] = useState("");
  const [phoneinput, setphoneinput] = useState("");
  const [semesterinput, setsemesterinput] = useState(1);
  const [ipkinput, setipkinput] = useState(0);
  const [documentinput, setdocumentinput] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async () => {
    if (nameinput === "" || emailinput === "") {
      alert("Data belum lengkap!");
      return;
    }

    // alert("Uploading Data!");

    axios
      .post(
        "http://localhost:8080/api/pendaftaran",
        {
          name: nameinput,
          email: emailinput,
          phone: phoneinput,
          semester: semesterinput,
          ipk: ipkinput,
          scholarship: dropbea[beainput],
          document: documentinput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then(() => {
        alert("Data Berhasil Dikirim!");
      })

      .catch((error) => {
        alert(`Error: ${JSON.stringify(error)}`);
      });
  };
  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="flex">
      <div
        className={`bg-dark-purple h-screen p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={handleToggleSidebar}
        />

        <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-white text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Beasiswa
          </h1>
        </div>
        <div
          className={`flex items-center rounded-md bg-light-white mt-6 pt-2.5 pb-2.5 ${
            !open ? "px-2.5" : "px-4"
          }py-2`}
        >
          <BsSearch
            className={`text-white text-lg block float-left cursor-pointer ml-3 ${
              open && "mr-2"
            }`}
          />
          <input
            type="search"
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                onClick={() => navigate(menu.path)}
                className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
              >
                <span className="text-2xl block float-left">
                  <RiDashboardFill />
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </li>
            </>
          ))}
        </ul>
      </div>

      <div className="p-7">
        <h1 className="text-2xl font-semibold mt-2">Daftar Beasiswa</h1>
        <div className="flex flex-col flex-1 mx-[400px] ml-[100px] mt-20">
          <input
            type="text"
            placeholder="Nama lengkap"
            onChange={(e) => setnameinput(e.target.value)}
            className={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setemailinput(e.target.value)}
            className={inputStyle}
          />
          <input
            type="number"
            placeholder="No.telp"
            onChange={(e) => setphoneinput(e.target.value)}
            className={inputStyle}
          />
          <input
            type="number"
            placeholder="Semester"
            onChange={(e) => setsemesterinput(parseInt(e.target.value))}
            className={inputStyle}
          />
          <input
            type="number"
            placeholder="IPK"
            onChange={(e) => setipkinput(parseInt(e.target.value))}
            className={inputStyle}
          />
          <div className="bg-white border-2 border-gray-400 rounded-full p-[8px] my-[6px] px-[35px] focus:border-dark-purple focus: outline-none">
            <select
              className="bg-white"
              disabled={ipkinput < 3}
              onChange={(e) => setBeaInput(parseInt(e.target.value))}
            >
              {dropbea.map((value, index) => (
                <option key={index} value="index">
                  {value}
                </option>
              ))}
            </select>
          </div>
          <input
            type="file"
            accept="document/*"
            placeholder="Document"
            onChange={(e) => setdocumentinput(e.target.value)}
            className={inputStyle}
            disabled={ipkinput < 3}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handlesubmit();
            }}
            disabled={ipkinput < 3}
            className={ButtonStyle}
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle =
  "border-2 border-gray-400 rounded-full p-[8px] my-[6px] px-[35px] focus:border-dark-purple focus: outline-none";

const ButtonStyle =
  "bg-dark-purple text-white text-lg mt-[6px] py-[6px] rounded-full hover:cursor-pointer hover:bg-light-purple flex flex-row px-[16px] justify-center items-center font-semibold duration-500 disabled:bg-gray-300 disabled:cursor-not-allowed";
