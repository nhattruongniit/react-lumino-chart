// TYPES
export const SET_SIMULATOR = 'SIMULATOR/SET_SIMULATOR';

// ACTIONS
export const setSimulation = (simulatorData) => ({
  type: SET_SIMULATOR,
  payload: {
    simulation: simulatorData
  },
})

const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {



    case SET_SIMULATOR:
      return payload.simulation;
    default:
      return state;
  }
}
