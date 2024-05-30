/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

// This hook receives two parameters:
// storageKey: This is the name of our storage that gets used when we retrieve/save our persistent data.
// initialState: This is our default value, but only if the store doesn't exist, otherwise it gets overwritten by the store.
export default (storageKey:string, initialState:any) => {

  // Initiate the internal state.
  const [state, setInternalState] = useState(initialState);

  // Only on our initial load, retrieve the data from the store and set the state to that data.
  useEffect(() => {

    // Retrieve the data from the store.
    const storageInBrowser = localStorage.getItem(storageKey);

    // If the store exists, overwrite the state with the store's data.
    // Otherwise if the store doesn't exist then "initialState" remains our default value.
    if (storageInBrowser) {
      setInternalState(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create a replacement method that will set the state like normal, but that also saves the new state into the store.
  const setState = (newState:any) => {
    // localStorage.setItem(storageKey, newState);
    setInternalState(newState);
  };

  return [state, setState];
};
