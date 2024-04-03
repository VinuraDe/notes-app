"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Notes from "../Components/Notes/Notes";

function page() {
  const { completedTasks } = useGlobalState();

  return <Notes title="Completed Notes" notes={completedTasks} />;
}

export default page;
