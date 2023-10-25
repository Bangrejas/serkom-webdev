import { useEffect, useState } from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Hasil() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", path: "/" },
    { title: "Daftar", path: "/daftar" },
    { title: "Hasil", path: "/hasil" },
  ];

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  const fetchDataFromDatabase = async () => {
    axios
      .get("http://localhost:8080/api/pendaftaran")
      .then((response) => setData(response.data))
      .catch((error) => alert(`Terjadi error: ${JSON.stringify(error)}`));
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  return (
    <div className="flex">
      <div
        className={`bg-dark-purple h-screen p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 fixed`}
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

      <div className="flex flex-col flex-1 mx-[400px] ml-[330px] mt-10">
        <h1 className="text-2xl font-semibold mt-2 mb-8">Hasil Beasiswa</h1>
        {data.map((value: any, index) => (
          <div className="pb-20">
            <p>{value.name}</p>
            <p>{value.email}</p>
            <p>{value.phone}</p>
            <p>{value.semester}</p>
            <p>{value.ipk}</p>
            <p>{value.scholarship}</p>
            <p>{value.document}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
