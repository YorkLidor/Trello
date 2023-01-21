// Guidelines
// boardStore (no need for groupStore, taskStore), boardService
// *. Support saving the entire board and also on the task level, 
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities

import { utilService } from "../util.service"

// *. activites - when board is updated, the frontend does not send the activities array within the board 
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios

// *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. We do not handle concurrent editing - needs versioning

// Rendering performance:
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task


// <BoardDetails> => <BoardGroup v-for / map>
// <BoardGroup> => <TaskPreview v-for / map>
// <TaskDetails> (supports edit) - initially can be loaded in seperate route 
// (later on we can place it in a modal and nested route)




const activity = {
    "id": utilService.makeId(),
    "txt": "Changed Color",
    "createdAt": Date.now(),
    // "byMember": userService.getLoggedinUser(),
    // "task": task
}

// TODO: Store - saveTask
// function storeSaveTask(task, activity) {

//     board = boardService.saveTask(boardId, groupId, task, activity)
//     // commit(ACTION) // dispatch(ACTION)
// }

// boardService
// function saveTask(boardId, groupId, task, activity) {
//     const board = getById(boardId)
//     // PUT /api/board/b123/task/t678

//     // TODO: find the task, and update
//     board.activities.unshift(activity)
//     saveBoard(board)
//     // return board
//     // return task
// }


export const jBoard = {
    "_id": "b101",
    "title": "Robot dev proj",
    "isStarred": false,
    "archivedAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {
        "isBackGroundImg": true,
        "bg": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/17c10de18b89807a945d83325a9002eb/photo-1647831597506-3f9071cbbd6f.jpg",
        "isLabelsLarge": false
    },
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#7bc86c"
        },
        {
            "id": "l102",
            "title": "Progress",
            "color": "#f5dd29"
        },
        {
            "id": "l103",
            "title": "Think about it",
            "color": "#ffaf3f"
        },
        {
            "id": "l104",
            "title": "I am a spoon!",
            "color": "#ef7564"
        },
        {
            "id": "l105",
            "title": "Messy",
            "color": "#cd8de5"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com"
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Group 1",
            "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo",
                    "labelIds": ["l104"],
                    "style": {
                        "bgColor": "#29cce5"
                    }

                },
                {
                    "id": "c102",
                    "title": "Add Samples",
                    "labelIds": ["l104", "l105"]
                },
                {
                    "id": "c105",
                    "title": "Add Food",
                    "labelIds": ["l101", "l103"]
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Do that",
                    "archivedAt": 1589983468418,
                    "labelIds": ["l101"]
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "status": "in-progress", // monday
                    "priority": "high",

                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "memberIds": ["u101"],
                    "labelIds": ["l101", "l102", "l103", "l104"],
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#7bc86c"
                    },

                }
            ],
            "style": {}
        },
        {
            "id": "g103",
            "title": "Group 3",
            "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "c201",
                    "title": "Eat shawarma!!",
                },
                {
                    "id": "c202",
                    "title": "Go to bathroom",
                    "labelIds": ["l102","l103", "l105"]
                },
                {
                    "id": "c203",
                    "title": "Go to sleep",
                    "labelIds": ["l102", "l105"],
                    "style": {
                        "bgColor": "#ef7564"
                    }
                }
            ],
            "style": {}
        },
    ],
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ],

    "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
}

const user = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [{ //optional
        "id": "m101",
        "boardId": "m101",
        "taskId": "t101"
    }]
}

// <LabelPicker info={} onUpdate={} />
// <MemberPicker info={} onUpdate={} />
// <DatePicker info={} onUpdate={} />

// <DynamicPicker info={} onUpdate={} >


// For Monday Mostly:
// Dynamic Components: 

// <TaskPreview> => <tr> 
//    <td v-for="(cmpType) in cmpsOrder">
//         <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
//    </td>
// </tr>

function updateTask(cmpType, data) {
    // Switch by cmpType
    // task.members = data
    // task.status = data

    // dispatch to store: updateTask(task, activity)
}


const cmp1 = {
    type: 'status-picker',
    info: {
        selectedStatus: 'pending',
        statuses: [{}, {}]
    }
}

const cmp2 = {
    type: 'member-picker',
    info: {
        selectedMembers: ['m1', 'm2'],
        members: ['m1', 'm2', 'm3']
    }
}

const cmp3 = {
    type: 'date-picker',
    info: {
        selectedDate: '2022-09-07',
    }
}






// export function TaskPreview({ task }) {
//     //GET FROM STORE
//     const cmpsOrder = [
//       "status-picker",
//       "member-picker",
//       "date-picker",
//       "priority-picker",
//     ];
//     return (
//       <section>
//         <h5>{task.txt}</h5>
//         {cmpsOrder.map((cmp, idx) => {
//           return (
//             <DynamicCmp
//               cmp={cmp}
//               key={idx}
//               onUpdate={(data) => {
//                 console.log("Updating: ", cmp, "with data:", data);
//                 // make a copy, update the task
//                 // Call action: updateTask(task)
//               }}
//             />
//           );
//         })}
//       </section>
//     );
//   }

// export function DynamicCmp({ cmp, info, onUpdate }) {
//     switch (cmp) {
//         case "status-picker":
//             return <StatusCmp info={info} onUpdate={onUpdate} />;
//         case "member-picker":
//             return <MemberPicker info={info} onUpdate={onUpdate} />;
//         default:
//             return <p>UNKNOWN {cmp}</p>;
//     }
// }
