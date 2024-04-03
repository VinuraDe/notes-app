"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Notes from "../Components/Notes/Notes";

function page() {
  const { normalNotes } = useGlobalState();
  return <Notes title="Favourite Notes" notes={normalNotes} />;
}

export default page;
