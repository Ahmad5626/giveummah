import { useState, useRef, useEffect, useContext } from "react";
import { Heart, Search, Settings, X, Globe, Home, ChevronDown, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "@/context/auth-context";
import { Toaster, toast } from "sonner";
import img from "../../assets/logo.png"
import AnimatedButton from "../animatedButton";
export function Navbar({ position }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const inputRef = useRef();
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault();
    // const query = inputRef.current.value.trim();
    // if (query) {
    //   navigate(`/search?query=${encodeURIComponent(query)}`);
    // }
    const formData = new FormData(e.target);
    const searchQuery = formData.get("query");
    if (!searchQuery) {
      return;
    }
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };



  }, []);



  const { userData } = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCheckLogin(true);
    }
  }, []);

  function handleLogout() {
    toast.success("Logout successfully!");
    localStorage.removeItem("token");

    setCheckLogin(false);
  }

  return (
    <>
      <Toaster position="top-center" />
      <header className={`${position} top-0 z-40 w-full `}>
        <div className="container mx-auto px-4 md:px-20 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">

              <span className="md:text-3xl font-bold text-purple-500">
                <img src={img} className="w-40 md:w-60"></img>
              </span>
            </Link>

            {/* Search Bar */}


            <div className="mx- hidden  md:block px-8" >
              <form onSubmit={handleSearch}>
                <div className="relative" >
                  <Search className="absolute left-3 top-1/2 h-4 w-8 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Discover inspiring causes"
                    name="query"
                    className=" rounded-full border-gray-300 border-1 lg:w-[500px] pl-10 py-4 placeholder:font-bold  md:text-[16px] focus-visible:ring-[#AC6908] cursor-pointer"
                  />
                </div>
              </form>
            </div>




            {/* Desktop Navigation */}
            <div className="flex items-center gap-3">
              {/* <AnimatedButton /> */}
              <Button asChild className="rounded-full  border-2 border-[#AC6908] text-[#AC6908] hover:bg-gray-300 text-[10px] md:text-[16px] bg-gray-100 py-2 md:px-8 m-0">
                <Link to="/fundraisingForm" className="p-0 m-0"> Start a Campaign </Link>
              </Button>

              {/* <div className="">
                {userData.fullName}
              </div> */}

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white "
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="size-7" />
                ) : (
                  <div className="flex flex-col gap-1  ">
                    <Menu className=" size-7" />
                  </div>
                )}
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4 md:hidden">
            <form className="relative" onSubmit={handleSearch} >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Discover inspiring causes"
                name="query"
                className="w-full rounded-full border-gray-200 pl-10 pr-4 focus-visible:ring-[#AC6908]"
              />
            </form>
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed right-0 top-22 z-20 h-screen w-[90%] max-w-sm overflow-y-auto border-0 rounded-2xl bg-white shadow-lg md:w-96"
        >
          <div className="flex flex-col">
            <div className="p-4">
              <div className="text-sm font-medium text-gray-600">SALAM!</div>

              <div ref={searchRef} className="relative mt-3">
                <form
                  className="flex cursor-pointer items-center rounded-md border bg-gray-50 px-3 py-2"
                  onSubmit={handleSearch}
                >
                  <Search className="mr-2 h-5 w-5 text-gray-400" />
                  <span className="text-gray-500">
                    <input type="text" placeholder="Search for campaigns..." name="query" className="w-full bg-transparent focus:outline-none focus-visible:ring-[#AC6908]" />
                  </span>
                </form>

                {/* {isSearchOpen && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border bg-white p-3 shadow-md">
                    <Input
                      type="text"
                      placeholder="Search for campaigns..."
                      className="mb-3 border-gray-300"
                      autoFocus
                    />
                    <div className="max-h-60 overflow-y-auto">
                      <div className="py-1 text-sm text-gray-700">Recent searches</div>
                      <div className="py-1 text-sm text-gray-500">No recent searches</div>
                    </div>
                  </div>
                )} */}
              </div>

              <div className="mt-3 flex items-center text-sm">
                <Globe className="mr-2 h-4 w-4 text-gray-400" />
                <Link to="/dashboard" className="flex items-center font-medium text-gray-900">
                  View Profile
                  <span className="ml-1 text-orange-500">→</span>
                </Link>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>

            <div className="p-4">
              <div className="mb-3 text-sm font-medium text-gray-600">START</div>

              {/* <Link to="#" className="flex items-center py-2 text-sm font-medium text-gray-900">
                <Home className="mr-2 h-4 w-4 text-gray-400" />
                Support
              </Link> */}

              {/* <div className="flex items-center justify-between py-2 text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full text-gray-400">
                      <span className="text-xs">$</span>
                    </div>
                    us $ USD
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div> */}

              <Link to="/auth" className="block py-2 text-sm font-medium text-gray-900">
                Sign up
              </Link>
              <a href="/auth" className="block py-2 text-sm font-medium text-gray-900" onClick={handleLogout}>
                {checkLogin ? 'Logout' : 'Login'}

              </a>
            </div>

            <div className="h-px w-full bg-gray-200"></div>

            <div className="p-4 text-xs text-gray-500">© 2025 Giveummah</div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-10 bg-black/20" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
}
