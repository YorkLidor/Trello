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

//     board = boardService.saveTask(groupId, task, activity)
//     // commit(ACTION) // dispatch(ACTION)
// }

// boardService
// function saveTask(groupId, task, activity) {
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
        "backgroundImage": "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/17c10de18b89807a945d83325a9002eb/photo-1647831597506-3f9071cbbd6f.jpg)",
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
            "fullname": "Tommy",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U0439FVN118-16ee7292919c-512"
        },
        {
            "_id": "u102",
            "fullname": "Daniel",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U0439FW0LSE-206c323abef7-512"
        },
        {
            "_id": "u103",
            "fullname": "Lidor",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U0439GRBDR8-76b4a79a103c-512"
        },
        {
            "_id": "u104",
            "fullname": "Matan",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U045HE0SWR3-89a31180034c-512"
        },
        {
            "_id": "u105",
            "fullname": "Gal",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U043N5QQPT3-278bb6b34de8-512"
        },
        {
            "_id": "u106",
            "fullname": "Ori",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U043S281FLH-583926f36186-512"
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
                    "memberIds": ["u102"],
                    "style": {
                        "bgColor": "#29cce5"
                    }

                },
                {
                    "id": "c102",
                    "title": "Add Samples",
                    "labelIds": ["l104", "l105"],
                    "memberIds": ["u103", "u104", "u105",]
                },
                {
                    "id": "c105",
                    "title": "Add Food",
                    "labelIds": ["l101", "l103"],
                    "memberIds": ["u106"]
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
                    "labelIds": ["l101"],
                    "memberIds": ["u103", "u104", "u105",],
                    "attachments": [{
                        "id": 'att' + utilService.makeId(),
                        "url": "",
                        "filename": "puki",
                        "createdAt": Date.now()
                    },
                    {
                        "id": 'att' + utilService.makeId(),
                        "url": "",
                        "filename": "nuki",
                        "createdAt": Date.now()
                    }
                    ]
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
                    "attachments": [{
                        "id": 'att' + utilService.makeId(),
                        "url": "",
                        "filename": "puki",
                        "createdAt": Date.now()
                    }
                    ]

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
                    "labelIds": ["l102", "l103", "l105"]
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

export const jBoards = [{
    "_id": "b201",
    "title": "Robot dev proj",
    "isStarred": false,
    "archivedAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {
        "backgroundImage": "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/17c10de18b89807a945d83325a9002eb/photo-1647831597506-3f9071cbbd6f.jpg)",
        "bg": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/17c10de18b89807a945d83325a9002eb/photo-1647831597506-3f9071cbbd6f.jpg",
        "isLabelsLarge": false
    },
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#b7ddb0"
        },
        {
            "id": "l102",
            "title": "Progress",
            "color": "#f5ea92"
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
            "fullname": "Tommy",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U0439FVN118-16ee7292919c-512"
        },
        {
            "_id": "u102",
            "fullname": "Daniel",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U0439FW0LSE-206c323abef7-512"
        },
        {
            "_id": "u103",
            "fullname": "Lidor",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U0439GRBDR8-76b4a79a103c-512"
        },
        {
            "_id": "u104",
            "fullname": "Matan",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U045HE0SWR3-89a31180034c-512"
        },
        {
            "_id": "u105",
            "fullname": "Gal",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U043N5QQPT3-278bb6b34de8-512"
        },
        {
            "_id": "u106",
            "fullname": "Ori",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U043S281FLH-583926f36186-512"
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
                    "labelIds": ["l105"],
                    "memberIds": ["u102"],
                    "style": {
                        "bgColor": "#29cce5"
                    },
                    "attachments": [{
                        "id": 'sdsadfa1',
                        "url": "https://www.aljazeera.com/wp-content/uploads/2022/12/SSS10794_1-1.jpg?resize=770%2C513&quality=80",
                        "filename": "Design.png",
                        "createdAt": Date.now()
                    }],

                },
                {
                    "id": "c102",
                    "title": "Add Samples",
                    "labelIds": ["l104", "l105"],
                    "memberIds": ["u103", "u104", "u105",]
                },
                {
                    "id": "c105",
                    "title": "Add Food",
                    "labelIds": ["l101", "l103"],
                    "memberIds": ["u106"]
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
                    "labelIds": ["l101"],
                    "memberIds": ["u103", "u104", "u105",],
                    "attachments": [{
                        "id": 'att' + utilService.makeId(),
                        "url": "",
                        "filename": "puki",
                        "createdAt": Date.now()
                    },
                    {
                        "id": 'att' + utilService.makeId(),
                        "url": "",
                        "filename": "nuki",
                        "createdAt": Date.now()
                    }
                    ]
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
                    "attachments": [{
                        "id": 'att' + utilService.makeId(),
                        "url": "",
                        "filename": "puki",
                        "createdAt": Date.now()
                    }
                    ]

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
                    "labelIds": ["l102", "l103", "l105"]
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
},
{
    "_id": "b202",
    "title": "Kanban Template",
    "isStarred": false,
    "archivedAt": '',
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {
        "backgroundImage": "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg)",
        "bg": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg",
        "isLabelsLarge": false
    },
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#b7ddb0"
        },
        {
            "id": "l102",
            "title": "Progress",
            "color": "#f5ea92"
        },
        {
            "id": "l103",
            "title": "Think about it",
            "color": "#fad29c"
        },
        {
            "id": "l104",
            "title": "I am a spoon!",
            "color": "#efb3ab"
        },
        {
            "id": "l105",
            "title": "Messy",
            "color": "#dfc0eb"
        },
        {
            "id": "l106",
            "title": "Ronaldo",
            "color": "#8bbdd9"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tommy",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U0439FVN118-16ee7292919c-512"
        },
        {
            "_id": "u102",
            "fullname": "Daniel",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U0439FW0LSE-206c323abef7-512"
        },
        {
            "_id": "u103",
            "fullname": "Lidor",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U0439GRBDR8-76b4a79a103c-512"
        },
        {
            "_id": "u104",
            "fullname": "Matan",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U045HE0SWR3-89a31180034c-512"
        },
        {
            "_id": "u105",
            "fullname": "Gal",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U043N5QQPT3-278bb6b34de8-512"
        },
        {
            "_id": "u106",
            "fullname": "Ori",
            "imgUrl": "https://ca.slack-edge.com/T043N4KE97B-U043S281FLH-583926f36186-512"
        }

    ],
    "groups": [
        {
            "id": "g101",
            "title": "Backlog",
            "archivedAt": '',
            "tasks": [
                {
                    "id": "c101",
                    "title": "Backlog",
                    "labelIds": ["l104"],
                    "memberIds": ["u102"],
                    "style": {
                        "bgColor": "#047cbc"
                    },
                    "attachments": [{
                        "id": 'attvdfv51',
                        "url": "https://trello.com/1/cards/63cc5786d799a303d3225a60/attachments/63cc5787d799a303d3225c53/download/Backlog.png",
                        "filename": "Backlog.png",
                        "createdAt": Date.now()
                    }]

                },
                {
                    "id": "c102",
                    "title": "[Example task]",
                    "labelIds": ["l104", "l105"],
                    "memberIds": ["u103", "u104", "u105",],
                },
                {
                    "id": "c105",
                    "title": "Add Food",
                    "labelIds": ["l101", "l103"],
                    "memberIds": ["u106"]

                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Design",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Design & Research",
                    "archivedAt": 1589983468418,
                    "labelIds": ["l101"],
                    "memberIds": ["u103", "u104", "u105",],
                    "style": {
                        "bgColor": "#c474e4"
                    },
                    "attachments": [{
                        "id": 'fsdfsd165',
                        "url": "https://trello.com/1/cards/63cc5786d799a303d3225a62/attachments/63cc5787d799a303d3225c5c/download/Design.png",
                        "filename": "Design.png",
                        "createdAt": Date.now()
                    }]
                },
                {
                    "id": "c104",
                    "title": "MEsiiii",
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
                    "memberIds": ["u101","u102","u104"],
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
                    "attachments": [{
                        "id": 'att' + utilService.makeId(),
                        "url": "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202210/AP22271096428610_1200x768.jpeg?VersionId=DH2Lq1kxChXtScHrOOwXbZI4lCsh3.cv&size=690:388",
                        "filename": "MEsiii",
                        "createdAt": Date.now()
                    }
                    ]

                }
            ],
            "style": {}
        },
        {
            "id": "g103",
            "title": "To Do",
            "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "c201",
                    "title": "To Do",
                    "memberIds": ["u105","u106"]
                },
                {
                    "id": "c202",
                    "title": "Do to",
                    "labelIds": ["l102", "l103", "l105"]
                },
                {
                    "id": "c203",
                    "title": "Do Do Do",
                    "labelIds": ["l102", "l106"],
                    "style": {
                        "bgColor": "#ef7564"
                    },
                    "memberIds": ["u103"]
                }
            ],
            "style": {}
        },
        {
            "id": "g104",
            "title": "Doing",
            "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "c301",
                    "title": "Doing",
                },
                {
                    "id": "c302",
                    "title": "Doing Doing",
                    "labelIds": ["l102", "l105", "l106"]
                },
                {
                    "id": "c303",
                    "title": "Do Do Do Do",
                    "labelIds": ["l101", "l106"],
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
}]







