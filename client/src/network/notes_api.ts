///we don't have to export because we only use it here

import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Note } from "../models/note";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error; //error is key cuz of controller Fn
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        "Request failed with status: " +
          response.status +
          " and message: " +
          errorMessage
      );
    }
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
  //same url means cookies sent automatically, send credentials in header if not
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}
//remember, even receiving credentials from backend, we need to add credentials: "include" in fetch options
export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}
export async function logout() {
  await fetchData("http://localhost:5000/api/users/logout", {
    method: "POST",
  });
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("http://localhost:5000/api/notes", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

/////
export interface NoteInput {
  title: string;
  text?: string;
  deadline?: number;
  importance?: number;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData("http://localhost:5000/api/notes", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function updateNote(noteId: string, note: NoteInput) {
  const response = await fetchData(
    "http://localhost:5000/api/notes/" + noteId,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(note),
    }
  );
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData("http://localhost:5000/api/notes/" + noteId, {
    method: "DELETE",
    credentials: "include",
  });
}
