import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import avatarImg from "../assets/images/placeholder.jpg";
import { ResponseContext } from "../hooks/ResponseContext";
import useAuth from "../hooks/useAuth";
import { axiosSecure } from "../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { setResponseData } = useContext(ResponseContext);

  //
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axiosSecure.get("/search", {
        params: { query: searchQuery },
      });
      console.log("Search results:", response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error("Error searching:", error);
      toast.error("Error searching");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  //
  const { data: userData = [], refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });

  return (
    <div className="border-b bg-[#A91D3A] sticky top-0 z-50">
      <div className="navbar  container mx-auto">
        {/* <div className="navbar-start">navbar start items were here</div> */}
        <div className="navbar-start lg:flex">
          {/* Logo Here */}
          <Link to={"/"} className="text-white text-2xl">
            TechZen
          </Link>
        </div>
        <div className="navbar-center flex">
          <input
            type="text"
            className="p-2 md:min-w-96 rounded-lg"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="border p-2.5 hover:bg-[#d62649] bg-[#A91D3A] rounded-lg text-white  -ml-10"
            onClick={handleSearch}
          >
            <IoSearchOutline />
          </button>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user && userData.photo ? userData.photo : avatarImg}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-36 p-2 shadow"
              >
                <li>
                  <a>{userData?.name}</a>
                </li>
                <li onClick={logOut}>
                  <a className="hover:bg-red-500 hover:text-slate-100 rounded-lg">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"} className="btn btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
