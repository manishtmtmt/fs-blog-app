import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import SearchBar from "./components/SearchBar";
import UpdatePost from "./components/UpdatePost";

const App = () => {
  const [closedNav, setClosedNav] = useState(false);

  const toggleNav = () => {
    setClosedNav(!closedNav);
  };

  const getNavWidth = () => (closedNav ? "w-16" : "w-56");

  return (
    <div className="flex">
      {/* nav section */}
      <div
        className={getNavWidth() + " min-h-screen transition-width border-r"}
      >
        <div className="sticky top-0">
          <Navbar closed={closedNav} />
        </div>
      </div>

      {/* content section */}
      <div className="flex-1 min-h-screen bg-gray-100">
        <div className="sticky top-0">
          <div className="flex item-center p-2 space-x-2">
            <button onClick={toggleNav}>
              {closedNav ? (
                <AiOutlineMenuUnfold size={25} />
              ) : (
                <AiOutlineMenuFold size={25} />
              )}
            </button>
            <SearchBar />
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:slug" element={<UpdatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
