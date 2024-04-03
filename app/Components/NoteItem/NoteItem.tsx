"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash, heart } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";

interface Props {
  title: string;
  description: string;
  isFavourite: boolean;
  id: string;
}

function NoteItem({ title, description, isFavourite, id }: Props) {
  const { theme, deleteNote, updateNote } = useGlobalState();
  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="note-footer">
        {isFavourite ? (
          <button
            className="favourite"
            onClick={() => {
              const note = {
                id,
                isFavourite: !isFavourite,
              };

              updateNote(note);
            }}
          >
            Add to Favourite
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const note = {
                id,
                isFavourite: !isFavourite,
              };

              updateNote(note);
            }}
          >
            Remove Favourite
          </button>
        )}
        <button className="edit">{edit}</button>
        <button
          className="delete"
          onClick={() => {
            deleteNote(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .note-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .favourite,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .favourite {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default NoteItem;
