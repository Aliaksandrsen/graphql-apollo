import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutations/user";

import "./App.css";

export const App = () => {
  const { data, loading, error, refetch } = useQuery(
    GET_ALL_USERS
    // {pollInterval: 1500}
  );
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: "1",
    },
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState("");
  const [age, setAge] = useState(0);

  console.log(oneUser);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();

    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then((res) => {
      console.log(res);
      setUserName("");
      setAge(0);
    });
  };

  const getAll = (e) => {
    e.preventDefault();

    refetch();
  };

  if (loading) {
    return <h1> Loading...</h1>;
  }

  return (
    <div>
      <form>
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />

        <button onClick={addUser}>Create User</button>
        <button onClick={getAll}>Get Users</button>
      </form>
      <div>
        {users.map((user) => {
          return (
            <div key={user.id} className="user">
              {`name: ${user.username} age: ${user.age}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};
