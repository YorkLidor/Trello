export const SET_USER = 'SET_USER'



const initialState = {
    user: {
        "_id": "u101",
        "fullname": "Gal Zohar",
        "username": "galzo@ggmail.com",
        "password": "aBambi123",
        "imgUrl": "https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg",
        "mentions": [{ //optional
            "id": "m101",
            "boardId": "m101",
            "taskId": "t101"
        }],
        boards: [],
        favBoards:["b201"]
    },
    users: [
        {
            "_id": "u101",
            "fullname": "Gal Zohar",
            "username": "galzo@ggmail.com",
            "password": "aBambi123",
            "imgUrl": "https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg",
            "mentions": [{ //optional
                "id": "m101",
                "boardId": "m101",
                "taskId": "t101"
            }]
        },
        {
            "_id": "u102",
            "fullname": "Abi Abambi",
            "username": "abi@ababmi.com",
            "password": "aBambi123",
            "imgUrl": "http://some-img.jpg",
            "mentions": [{ //optional
                "id": "m101",
                "boardId": "m101",
                "taskId": "t101"
            }]
        }],
    userAction: null
}


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            console.log('action.user:', action.user.favBoards)
            return { ...state, user: action.user }
        default:
            return state
    }
}


