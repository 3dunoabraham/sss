"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";


export const useNavigationEvent = (onStart: () => void, onPathnameChange: () => void) => {
  const pathname = usePathname(); // Get current route
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    // console.log("navigating...", )
    onStart();
    if (savedPathNameRef.current !== pathname) {
      onPathnameChange();
      savedPathNameRef.current = pathname;
      // console.log("Updated REF pathname")
    }
  }, [pathname, onPathnameChange]);
};