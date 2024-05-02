import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    // get the search location
    const urlParams = new URLSearchParams(location.search);
    // get which tab is opened
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
  <div className="min-h-screen flex flex-col md:flex-row">
    <div className="md:w-56">
      {/* sidebar */}
      <DashSidebar />
    </div>
    {/* profile */}
    {tab === "profile" && <DashProfile />}
    
    {/* Posts */}
    {tab === "posts" && <DashPosts />}
  </div>
  );
}
