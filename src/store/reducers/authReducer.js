const initState = {
    isLoogedIn: true,
    token: 12345,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {


        default:
            return state;
    }
}

export default authReducer;