import React from 'react';

const ActorScriptButton = ({
  firstName,
  lastName,
  setCurrentActor,
  setCurrentCharacters,
  currentScript,
  id,
}) => {
  // on change, change the value of current actor
  const onClickChange = (e) => {
    const value = e.target.value.split(' '); // todo, use actorId here instead of string manipulation
    const firstName = value.at(0);
    const lastName = value.at(-1);
    setCurrentActor([firstName, lastName]);

    // fetch request to get the current characters for the current actor
    fetch(`/script/${currentScript}/characters?actor=${id}`)
      .then((response) => response.json())
      .then((characterData) => {
        const charArr = characterData.map((character) => character.name);
        setCurrentCharacters(charArr);
      })
      .catch((error) => {
        console.error(`error: ${error} when fetching current characters`);
      });
  };
  // set button value as a string with first and last name
  const buttonVal = `${firstName} ${lastName}`;
  return (
    <input
      onClick={onClickChange}
      className='actorNameButton button-small'
      type='button'
      value={buttonVal}
    />
  );
};

export default ActorScriptButton;
