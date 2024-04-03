"use client";
import Notes from "./Components/Notes/Notes";
import { useGlobalState } from "./context/globalProvider";

export default function Home() {
  const { notes } = useGlobalState();

  return <Notes title="All Notes" notes={notes} />;
}
