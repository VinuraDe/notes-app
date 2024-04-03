"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [notes, setTasks] = useState([]);

  const theme = themes[selectedTheme];

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allNotes = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/notes");

      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await axios.delete(`/api/notes/${id}`);
      toast.success("Note deleted");

      allNotes();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateNote = async (note) => {
    try {
      const res = await axios.put(`/api/notes`, note);

      toast.success("Note updated");

      allNotes();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const favouriteNotes = notes.filter((note) => note.isFavourite === true);
  const normalNotes = notes.filter((note) => note.isFavourite === false);

  React.useEffect(() => {
    if (user) allNotes();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        notes,
        deleteNote,
        isLoading,
        favouriteNotes,
        normalNotes,
        updateNote,
        modal,
        openModal,
        closeModal,
        allNotes,
        collapsed,
        collapseMenu,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
