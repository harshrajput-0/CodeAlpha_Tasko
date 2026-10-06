import { useState, useEffect } from "react";
// import { TaskoLogo } from "../smaill-items/Tasko";
import { SearchBar } from "../smaill-items/SearchBar";
import { CreateButton } from "../smaill-items/Create";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16  items-center px-6">
        {/* Left */}
        <div className="flex-1">
          <CreateButton />
        </div>

        {/* Center */}
        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="flex flex-1 justify-end gap-2">
          <CreateButton />
        </div>
      </div>
    </header>
  );
};
