import React, { useState, useEffect } from "react";

import GuessNew from "./GuessNew";

export const SessionNew = (props) => {
  const [game, setGame] = useState([]);
  const [errorMessage, setErrorMessages] = useState([])

  useEffect(() => {
    getGames();
    createSession();
  }, []);

  const getGames = ()=>{
    setGame({id: 9999, answer: 'serves', created_at: '', updated_at: ''})
  };

  const createSession = async (event) => {
    event.preventDefault();
    let gameObject = {}
    gameObject["game"] = game
    try {
      const response = await fetch(`/api/v1/sessions/`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameObject),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        setErrorMessages(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log("error in fetch:", error);
    }
  };
  
  const submitGuess = async (event, formPayload) => {
    event.preventDefault();
    formPayload = {'word': formPayload }
    formPayload["game"] = game
    try {
      const response = await fetch(`/api/v1/guesses/`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });
      
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        setErrorMessages(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log("error in fetch:", error);
    }
  };

  return (
    <div className="game-card-container float-center">

      <br />
      <br />
      <div className="grid-container tile-container">
        <div className="grid-x grid-padding-x grid-padding-y word-tile">
          <div className="cell card">
             <h1 className="float-center"id="gametype">Daily Game</h1>
          </div>
        </div>
      </div>
      <div className="">
        <div className="new-game-card">
          <div className="">
            <GuessNew game={game} submitGuess={submitGuess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionNew;