import init from '../initialState'

const setData = (state, action) => {
	let newstate = Object.assign({}, state);
	switch (action.type) {
		case "NEW_PATH":
			newstate.path = action.id
			return newstate
		break;
		default:
			return state || init.data
	}
}

export default setData