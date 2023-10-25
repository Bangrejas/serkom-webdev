import { useState } from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { useNavigate } from "react-router";
export default function App() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", path: "/" },
    { title: "Daftar", path: "/daftar" },
    { title: "Hasil", path: "/hasil" },
  ];

  const navigate = useNavigate();

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
        <h1 className="text-2xl font-semibold mt-2">Dashboard</h1>

        {/* Card pilihan beasiswa yang tersedia */}
        <div className="card-group container">
          <div className="card mt-8">
            <div className="card-body">
              <h5 className="card-title">Jalur Prestasi Siswa (JPS)</h5>
              <p className="card-text">
                Ada 2 kriteria yang bisa dipilih, yaitu: Beasiswa Prestasi
                Akademik: beasiswa yang diperuntukan untuk calon mahasiswa yang
                memiliki prestasi dibidang akademik seperti peringkat sekolah,
                kejuaraan cerdas cermat, osn, nilai tryout, dll Beasiswa
                Prestasi Non Akademik: beasiswa yang diperuntukan untuk calon
                mahasiswa yang memiliki prestasi dibidang non-akademik seperti
                juara olahraga, juara seni, dll
                <p className="mt-4">Persyaratan Beasiswa JPS</p>
                <ol className="mt-2">
                  <li>
                    - Nilai rapor semester 1 – 5 rata-rata minimal 70 untuk 3
                    pelajaran: matematika, bahasa indonesia, dan bahasa inggris
                  </li>
                  <li>
                    - Siswa SMA/SMK/MA yang lulus tahun 2021, 2020, 2019, atau
                    2018
                  </li>
                  <li>- Peringkat 1 – 5 sekolah</li>
                  <li>
                    - Memiliki sertifikat/piagam prestasi minimal level
                    kabupaten
                  </li>
                  <li>- Peringkat 1 – 5 sekolah</li>
                </ol>
              </p>
            </div>
          </div>
          <div className="card mt-10">
            <div className="card-body">
              <h5 className="card-title">
                Beasiswa Kartu Indonesia Pintar Kuliah (KIP Kuliah)
              </h5>
              <p className="card-text">
                Beasiswa ini merupakan beasiswa yang diberikan untuk mahasiswa
                yang kurang mampu dalam ekonomi dan mempunyai Kartu Indonesia
                Pintar (KIP)/Surat Keterangan Tidak Mampu (SKTM) sesuai
                ketentuan pemerintah. Beasiswa KIP-Kuliah ini diberikan dengan
                syarat dan ketentuan sebagaimana yang ditetapkan oleh
                pemerintah.
                <p className="mt-4">Syarat Beasiswa KIP Kuliah</p>
                <ol className="mt-2">
                  <li>
                    - Siswa SMA/SMK/Sederajat yang lulus tahun 2021, 2020, atau
                    2019
                  </li>
                  <li>
                    - Memiliki potensi akademik baik tetapi memiliki
                    keterbatasan ekonomi yang didukung bukti dokumen yang sah
                  </li>
                  <li>
                    - Lulus seleksi penerimaan mahasiswa baru di Program Studi
                    yang telah terakreditasi.
                  </li>
                </ol>
              </p>
            </div>
          </div>
          <div className="card mt-10">
            <div className="card-body">
              <h5 className="card-title">Beasiswa Forum OSIS Nasional</h5>
              <p className="card-text">
                Beasiswa FON 2023 merupakan beasiswa kuliah di Institut
                Teknologi Telkom Purwokerto (ITTP) yang secara khusus diberikan
                bagi pengurus OSIS se Indonesia.
                <p className="mt-4">Syarat & Ketentuan</p>
                <ol className="mt-2">
                  <li>- Lulusan SMA/MA/SMK tahun 2023, 2022 atau 2021</li>
                  <li>
                    - Nilai rapor semester 1 – 5 dengan nilai rata-rata minimal
                    70 untuk 3 mata pelajaran: Matematika, Bahasa Indonesia dan
                    Bahasa Inggris
                  </li>
                  <li>
                    - Semua jurusan bisa mendaftar
                    (IPA/IPS/Agama/Bahasa/Teknik/Non Teknik)
                  </li>
                  <li>
                    - Pernah menjadi pengurus OSIS (dibuktikan dengan keterangan
                    dari sekolah)
                  </li>
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
