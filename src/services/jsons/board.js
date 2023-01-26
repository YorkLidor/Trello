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
               "memberIds": ["u103", "u104", "u105",]
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
               "dueDate": { date: 16156215211, done: false },
               "byMember": {
                  "_id": "u101",
                  "username": "Tal",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
               },
               "style": {
                  "bgColor": "#7bc86c"
               }

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

export const jUser = {
   "_id": "u101",
   "fullname": "Matan Adi",
   "username": "matan@gmail.com",
   "password": "matan123",
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

export const jBoards = [
   {
      "_id":"b201",
      "title":"Robot dev proj",
      "isStarred":false,
      "archivedAt":1589983468418,
      "createdBy":{
         "_id":"u101",
         "fullname":"Abi Abambi",
         "imgUrl":"http://some-img"
      },
      "style":{
         "backgroundImage":"url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/17c10de18b89807a945d83325a9002eb/photo-1647831597506-3f9071cbbd6f.jpg)",
         "bg":"https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/17c10de18b89807a945d83325a9002eb/photo-1647831597506-3f9071cbbd6f.jpg",
         "isLabelsLarge":false
      },
      "labels":[
         {
            "id":"l101",
            "title":"Done",
            "color":"#b7ddb0"
         },
         {
            "id":"l102",
            "title":"Progress",
            "color":"#f5ea92"
         },
         {
            "id":"l103",
            "title":"Think about it",
            "color":"#ffaf3f"
         },
         {
            "id":"l104",
            "title":"I am a spoon!",
            "color":"#ef7564"
         },
         {
            "id":"l105",
            "title":"Messy",
            "color":"#cd8de5"
         }
      ],
      "members":[
         {
            "_id":"u101",
            "fullname":"Tommy",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U0439FVN118-16ee7292919c-512"
         },
         {
            "_id":"u102",
            "fullname":"Daniel",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U0439FW0LSE-206c323abef7-512"
         },
         {
            "_id":"u103",
            "fullname":"Lidor",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U0439GRBDR8-76b4a79a103c-512"
         },
         {
            "_id":"u104",
            "fullname":"Matan",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U045HE0SWR3-89a31180034c-512"
         },
         {
            "_id":"u105",
            "fullname":"Gal",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U043N5QQPT3-278bb6b34de8-512"
         },
         {
            "_id":"u106",
            "fullname":"Ori",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U043S281FLH-583926f36186-512"
         }
      ],
      "groups":[
         {
            "id":"g101",
            "title":"Group 1",
            "archivedAt":1589983468418,
            "tasks":[
               {
                  "id":"c101",
                  "title":"Replace logo",
                  "labelIds":[
                     "l105"
                  ],
                  "memberIds":[
                     "u102"
                  ],
                  "style":{
                     "bgColor":"#29cce5"
                  }
               },
               {
                  "id":"c102",
                  "title":"Add Samples",
                  "labelIds":[
                     "l104",
                     "l105"
                  ],
                  "memberIds":[
                     "u103",
                     "u104",
                     "u105"
                  ]
               },
               {
                  "id":"c105",
                  "title":"Add Food",
                  "labelIds":[
                     "l101",
                     "l103"
                  ],
                  "memberIds":[
                     "u106"
                  ]
               }
            ],
            "style":{
               
            }
         },
         {
            "id":"g102",
            "title":"Group 2",
            "tasks":[
               {
                  "id":"c103",
                  "title":"Do that",
                  "archivedAt":1589983468418,
                  "labelIds":[
                     "l101"
                  ],
                  "memberIds":[
                     "u103",
                     "u104",
                     "u105"
                  ]
               },
               {
                  "id":"c104",
                  "title":"Help me",
                  "status":"in-progress",
                  "priority":"high",
                  "description":"description",
                  "comments":[
                     {
                        "id":"ZdPnm",
                        "txt":"also @yaronb please CR this",
                        "createdAt":1590999817436,
                        "byMember":{
                           "_id":"u101",
                           "fullname":"Tal Tarablus",
                           "imgUrl":"http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                     }
                  ],
                  "checklists":[
                     {
                        "id":"YEhmF",
                        "title":"Checklist",
                        "todos":[
                           {
                              "id":"212jX",
                              "title":"To Do 1",
                              "isDone":false
                           }
                        ]
                     }
                  ],
                  "memberIds":[
                     "u101"
                  ],
                  "labelIds":[
                     "l101",
                     "l102",
                     "l103",
                     "l104"
                  ],
                  "dueDate":{ date: 16156215211,  done: false },
                  "byMember":{
                     "_id":"u101",
                     "username":"Tal",
                     "fullname":"Tal Tarablus",
                     "imgUrl":"http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                  },
                  "style":{
                     "bgColor":"#7bc86c"
                  }
               }
            ],
            "style":{
               
            }
         },
         {
            "id":"g103",
            "title":"Group 3",
            "archivedAt":1589983468418,
            "tasks":[
               {
                  "id":"c201",
                  "title":"Eat shawarma!!"
               },
               {
                  "id":"c202",
                  "title":"Go to bathroom",
                  "labelIds":[
                     "l102",
                     "l103",
                     "l105"
                  ]
               },
               {
                  "id":"c203",
                  "title":"Go to sleep",
                  "labelIds":[
                     "l102",
                     "l105"
                  ],
                  "style":{
                     "bgColor":"#ef7564"
                  }
               }
            ],
            "style":{
               
            }
         }
      ],
      "activities":[
         {
            "id":"a101",
            "txt":"Changed Color",
            "createdAt":154514,
            "byMember":{
               "_id":"u101",
               "fullname":"Abi Abambi",
               "imgUrl":"http://some-img"
            },
            "task":{
               "id":"c101",
               "title":"Replace Logo"
            }
         }
      ],
      "cmpsOrder":[
         "status-picker",
         "member-picker",
         "date-picker"
      ]
   },
   {
      "_id":"b203",
      "title":"Mesii",
      "isStarred":false,
      "archivedAt":"",
      "createdBy":{
         "_id":"u101",
         "fullname":"Abi Abambi",
         "imgUrl":"http://some-img"
      },
      "style":{
         "backgroundImage":"url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg)",
         "bg":"https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg",
         "isLabelsLarge":false
      },
      "labels":[
         {
            "id":"l101",
            "title":"Done",
            "color":"#b7ddb0"
         },
         {
            "id":"l102",
            "title":"Progress",
            "color":"#f5ea92"
         },
         {
            "id":"l103",
            "title":"Think about it",
            "color":"#fad29c"
         },
         {
            "id":"l104",
            "title":"I am a spoon!",
            "color":"#efb3ab"
         },
         {
            "id":"l105",
            "title":"Messy",
            "color":"#dfc0eb"
         },
         {
            "id":"l106",
            "title":"Ronaldo",
            "color":"#8bbdd9"
         }
      ],
      "members":[
         {
            "_id":"u101",
            "fullname":"Tommy",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U0439FVN118-16ee7292919c-512"
         },
         {
            "_id":"u102",
            "fullname":"Daniel",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U0439FW0LSE-206c323abef7-512"
         },
         {
            "_id":"u103",
            "fullname":"Lidor",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U0439GRBDR8-76b4a79a103c-512"
         },
         {
            "_id":"u104",
            "fullname":"Matan",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U045HE0SWR3-89a31180034c-512"
         },
         {
            "_id":"u105",
            "fullname":"Gal",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U043N5QQPT3-278bb6b34de8-512"
         },
         {
            "_id":"u106",
            "fullname":"Ori",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U043S281FLH-583926f36186-512"
         }
      ],
      "groups":[
         {
            "id":"g101",
            "title":"Backlog",
            "archivedAt":"",
            "tasks":[
               {
                  "id":"c101",
                  "title":"Backlog",
                  "labelIds":[
                     "l104"
                  ],
                  "memberIds":[
                     "u102"
                  ],
                  "style":{
                     "bgColor":"#047cbc"
                  }
               },
               {
                  "id":"c102",
                  "title":"[Example task]",
                  "labelIds":[
                     "l104",
                     "l105"
                  ],
                  "memberIds":[
                     "u103",
                     "u104",
                     "u105"
                  ]
               },
               {
                  "id":"c105",
                  "title":"Add Food",
                  "labelIds":[
                     "l101",
                     "l103"
                  ],
                  "memberIds":[
                     "u106"
                  ]
               }
            ],
            "style":{
               
            }
         },
         {
            "id":"g102",
            "title":"Design",
            "tasks":[
               {
                  "id":"c103",
                  "title":"Design & Research",
                  "archivedAt":1589983468418,
                  "labelIds":[
                     "l101"
                  ],
                  "memberIds":[
                     "u103",
                     "u104",
                     "u105"
                  ],
                  "style":{
                     "bgColor":"#c474e4"
                  }
               },
               {
                  "id":"c104",
                  "title":"MEsiiii",
                  "status":"in-progress",
                  "priority":"high",
                  "description":"description",
                  "comments":[
                     {
                        "id":"ZdPnm",
                        "txt":"also @yaronb please CR this",
                        "createdAt":1590999817436,
                        "byMember":{
                           "_id":"u101",
                           "fullname":"Tal Tarablus",
                           "imgUrl":"http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                     }
                  ],
                  "checklists":[
                     {
                        "id":"YEhmF",
                        "title":"Checklist",
                        "todos":[
                           {
                              "id":"212jX",
                              "title":"To Do 1",
                              "isDone":false
                           }
                        ]
                     }
                  ],
                  "memberIds":[
                     "u101",
                     "u102",
                     "u104"
                  ],
                  "labelIds":[
                     "l101",
                     "l102",
                     "l103",
                     "l104"
                  ],
                  "dueDate": {date: 16156215211,  done: false },
                  "byMember":{
                     "_id":"u101",
                     "username":"Tal",
                     "fullname":"Tal Tarablus",
                     "imgUrl":"http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                  },
                  "style":{
                     "bgColor":"#7bc86c"
                  }
               }
            ],
            "style":{
               
            }
         },
         {
            "id":"g103",
            "title":"To Do",
            "archivedAt":1589983468418,
            "tasks":[
               {
                  "id":"c201",
                  "title":"To Do",
                  "memberIds":[
                     "u105",
                     "u106"
                  ]
               },
               {
                  "id":"c202",
                  "title":"Do to",
                  "labelIds":[
                     "l102",
                     "l103",
                     "l105"
                  ]
               },
               {
                  "id":"c203",
                  "title":"Do Do Do",
                  "labelIds":[
                     "l102",
                     "l106"
                  ],
                  "style":{
                     "bgColor":"#ef7564"
                  },
                  "memberIds":[
                     "u103"
                  ]
               }
            ],
            "style":{
               
            }
         },
         {
            "id":"g104",
            "title":"Doing",
            "archivedAt":1589983468418,
            "tasks":[
               {
                  "id":"c301",
                  "title":"Doing"
               },
               {
                  "id":"c302",
                  "title":"Doing Doing",
                  "labelIds":[
                     "l102",
                     "l105",
                     "l106"
                  ]
               },
               {
                  "id":"c303",
                  "title":"Do Do Do Do",
                  "labelIds":[
                     "l101",
                     "l106"
                  ],
                  "style":{
                     "bgColor":"#ef7564"
                  }
               }
            ],
            "style":{
               
            }
         }
      ],
      "activities":[
         {
            "id":"a101",
            "txt":"Changed Color",
            "createdAt":154514,
            "byMember":{
               "_id":"u101",
               "fullname":"Abi Abambi",
               "imgUrl":"http://some-img"
            },
            "task":{
               "id":"c101",
               "title":"Replace Logo"
            }
         }
      ],
      "cmpsOrder":[
         "status-picker",
         "member-picker",
         "date-picker"
      ]
   },
   {
      "_id":"b202",
      "title":"Demo data",
      "isStarred":false,
      "archivedAt":"",
      "createdBy":{
         "_id":"u101",
         "fullname":"Abi Abambi",
         "imgUrl":"http://some-img"
      },
      "style":{
         "backgroundImage":"url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg)",
         "bg":"https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg",
         "isLabelsLarge":false
      },
      "labels":[
         {
            "id":"l101",
            "title":"Done",
            "color":"#b7ddb0"
         },
         {
            "id":"l102",
            "title":"Progress",
            "color":"#f5ea92"
         },
         {
            "id":"l103",
            "title":"Think about it",
            "color":"#fad29c"
         },
         {
            "id":"l104",
            "title":"I am a spoon!",
            "color":"#efb3ab"
         },
         {
            "id":"l105",
            "title":"Messy",
            "color":"#dfc0eb"
         },
         {
            "id":"l106",
            "title":"Ronaldo",
            "color":"#8bbdd9"
         },
         {
            "title":"Backend",
            "color":"#091E42",
            "id":"lXgrU9x"
         }
      ],
      "members":[
         {
            "_id":"u101",
            "fullname":"Tommy",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U0439FVN118-16ee7292919c-512"
         },
         {
            "_id":"u102",
            "fullname":"Daniel",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U0439FW0LSE-206c323abef7-512"
         },
         {
            "_id":"u103",
            "fullname":"Lidor",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U0439GRBDR8-76b4a79a103c-512"
         },
         {
            "_id":"u104",
            "fullname":"Matan",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U045HE0SWR3-89a31180034c-512"
         },
         {
            "_id":"u105",
            "fullname":"Gal",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U043N5QQPT3-278bb6b34de8-512"
         },
         {
            "_id":"u106",
            "fullname":"Ori",
            "imgUrl":"https://ca.slack-edge.com/T043N4KE97B-U043S281FLH-583926f36186-512"
         }
      ],
      "groups":[
         {
            "id":"g101",
            "title":"Backlog-Server",
            "archivedAt":"",
            "tasks":[
               {
                  "id":"TQeOi8",
                  "title":"Add TaskDetails",
                  "labelIds":[
                     "lXgrU9x"
                  ],
                  "attachments":[
                     {
                        "id":"attPlBsev",
                        "url":"http://res.cloudinary.com/dk2geeubr/image/upload/v1674733528/krnpxiiypm8ivkvuqijb.jpg",
                        "filename":"9.jpg",
                        "createdAt":1674733527499
                     }
                  ],
                  "cover":{
                     "style":{
                        "backgroundImage":"url(http://res.cloudinary.com/dk2geeubr/image/upload/v1674733528/krnpxiiypm8ivkvuqijb.jpg)"
                     },
                     "fullSize":false
                  }
               },
               {
                  "id":"LvAbDf",
                  "title":"Data model approval",
                  "labelIds":[
                     "lXgrU9x"
                  ],
                  "memberIds":[
                     "u101"
                  ]
               },
               {
                  "id":"c105",
                  "title":"Add Food",
                  "labelIds":[
                     "l101",
                     "l103",
                     "l102",
                     "l104",
                     "l105",
                     "l106",
                     "lXgrU9x"
                  ],
                  "memberIds":[
                     
                  ]
               },
               {
                  "id":"c203",
                  "title":"Socket implementation",
                  "labelIds":[
                     "l102",
                     "l106"
                  ],
                  "style":{
                     "bgColor":"#ef7564"
                  },
                  "memberIds":[
                     "u103"
                  ]
               },
               {
                  "id":"c102",
                  "title":"Create a server with express",
                  "labelIds":[
                     "l104",
                     "l105"
                  ],
                  "memberIds":[
                     "u103",
                     "u104"
                  ],
                  "attachments":[
                     {
                        "id":"attCc0zNF",
                        "url":"http://res.cloudinary.com/dk2geeubr/image/upload/v1674733839/kjlsawrz1crwbhidhepa.jpg",
                        "filename":"7.jpg",
                        "createdAt":1674733838676
                     }
                  ],
                  "cover":{
                     "style":{
                        "backgroundImage":"url(http://res.cloudinary.com/dk2geeubr/image/upload/v1674733839/kjlsawrz1crwbhidhepa.jpg)"
                     },
                     "fullSize":false
                  }
               }
            ],
            "style":{
               
            }
         },
         {
            "id":"hqUdrN",
            "title":"QA",
            "archivedAt":null,
            "tasks":[
               {
                  "id":"bvmUwD",
                  "title":"End day code review with all members",
                  "labelIds":[
                     "l102",
                     "l104"
                  ],
                  "memberIds":[
                     "u105",
                     "u104",
                     "u103"
                  ]
               },
               {
                  "id":"SU2bKv",
                  "title":"Meeting with head maneger for planning the code progress",
                  "labelIds":[
                     "l103",
                     "l104"
                  ]
               },
               {
                  "id":"DNIjDP",
                  "title":"App header",
                  "labelIds":[
                     "l103"
                  ],
                  "memberIds":[
                     "u105",
                     "u103"
                  ]
               },
               {
                  "id":"3Fz0Nm",
                  "title":"Advice from heead maneger",
                  "labelIds":[
                     "l102",
                     "l104"
                  ],
                  "attachments":[
                     {
                        "id":"attt10tGj",
                        "url":"http://res.cloudinary.com/dk2geeubr/image/upload/v1674733822/twlhkhx7gmfb7sorzafi.jpg",
                        "filename":"2.jpg",
                        "createdAt":1674733822401
                     }
                  ],
                  "cover":{
                     "style":{
                        "backgroundImage":"url(http://res.cloudinary.com/dk2geeubr/image/upload/v1674733822/twlhkhx7gmfb7sorzafi.jpg)"
                     },
                     "fullSize":false
                  }
               }
            ]
         },
         {
            "id":"g102",
            "title":"Backlig-client",
            "tasks":[
               {
                  "id":"c202",
                  "title":"Build basic tamplate",
                  "labelIds":[
                     "l103",
                     "l104"
                  ]
               },
               {
                  "id":"c201",
                  "title":"Routing Directory",
                  "memberIds":[
                     "u106"
                  ],
                  "attachments":[
                     {
                        "id":"attCiYEKO",
                        "url":"http://res.cloudinary.com/dk2geeubr/image/upload/v1674733803/qdknpku26yuo7kibanjn.jpg",
                        "filename":"4.jpg",
                        "createdAt":1674733802986
                     }
                  ],
                  "cover":{
                     "style":{
                        "backgroundImage":"url(http://res.cloudinary.com/dk2geeubr/image/upload/v1674733803/qdknpku26yuo7kibanjn.jpg)"
                     },
                     "fullSize":false
                  }
               },
               {
                  "id":"c103",
                  "title":"Add TaskDetails",
                  "archivedAt":1589983468418,
                  "labelIds":[
                     "l101"
                  ],
                  "memberIds":[
                     
                  ],
                  "style":{
                     "bgColor":"#c474e4"
                  }
               },
               {
                  "id":"Dakqya",
                  "title":"Add social media links",
                  "labelIds":[
                     "l104",
                     "l106"
                  ],
                  "attachments":[
                     {
                        "id":"attdlCgL1",
                        "url":"http://res.cloudinary.com/dk2geeubr/image/upload/v1674733917/gzhq5q0d81m5ksk0kkny.jpg",
                        "filename":"3.jpg",
                        "createdAt":1674733916977
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
               "memberIds": [
                  "u105",
                  "u103",
                  "u102"
               ],
               "labelIds": [
                  "l101"
               ],
               "dueDate": {date: 16156215211, done: false },
               "byMember": {
                  "_id": "u101",
                  "username": "Tal",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
               },
               "style": {
                  "bgColor": "#7bc86c"
               }
            },
            {
               "id": "c202",
               "title": "Build basic tamplate",
               "labelIds": [
                  "l103",
                  "l104"
               ]
            },
            {
               "id": "Mmfsfh",
               "title": "Implement Sass"
            },
            {
               "id": "Dakqya",
               "title": "Add social media links",
               "labelIds": [
                  "l104",
                  "l106"
               ]
            }
         ],
         "style": {

         }
      },
      {
         "id": "g103",
         "title": "In development",
         "archivedAt": 1589983468418,
         "tasks": [
            {
               "id": "c303",
               "title": "Sanity test for new component",
               "labelIds": [
                  "l102"
               ],
               "style": {
                  "bgColor": "#ef7564"
               },
               "memberIds": [
                  "u104"
               ]
            },
            {
               "id": "c101",
               "title": "functional testing for app header",
               "labelIds": [
                  "l102",
                  "l103",
                  "l104",
                  "lXgrU9x"
               ],
               "memberIds": [

               ],
               "style": {
                  "bgColor": "#047cbc"
               }
            },
            {
               "id": "c201",
               "title": "Routing Directory",
               "memberIds": [
                  "u106"
               ]
            },
            {
               "id": "4Uo7Yx",
               "title": "Connecting to PWA",
               "memberIds": [
                  "u103"
               ]
            },
            {
               "id": "Xp3zgy",
               "title": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse quidem, nam quaerat cupiditate blanditiis facere deleniti, a nemo laborum maiores consequuntur. Architecto, eveniet cumque. Deleniti eveniet nam sequi facere consequatur?"
            }
         ],
         "style": {

         }
      },
      {
         "id": "g104",
         "title": "Done",
         "archivedAt": 1589983468418,
         "tasks": [
            {
               "id": "c301",
               "title": "CSS variables",
               "memberIds": [
                  "u105"
               ],
               "labelIds": [
                  "l101",
                  "l102"
               ]
            },
            {
               "id": "GBpgcI",
               "title": "Making functions and mixins",
               "memberIds": [
                  "u104"
               ]
            },
            {
               "id": "c302",
               "title": "Social media assets",
               "labelIds": [
                  "l104",
                  "l106"
               ],
               "memberIds": [
                  "u104",
                  "u103"
               ]
            },
            {
               "id": "18CfBv",
               "title": "NPM"
            }
         ],
         "style": {

         }
      },
      {
         "id": "hqUdrN",
         "title": "QA",
         "archivedAt": null,
         "tasks": [
            {
               "id": "bvmUwD",
               "title": "End day code review with all members",
               "labelIds": [
                  "l102",
                  "l104"
               ],
               "memberIds": [
                  "u105",
                  "u104",
                  "u103"
               ]
            },
            {
               "id": "SU2bKv",
               "title": "Meeting with head maneger for planning the code progress",
               "labelIds": [
                  "l103",
                  "l104"
               ]
            },
            {
               "id": "8jlnZ6",
               "title": "Chacking bugs"
            },
            {
               "id": "VDKxQj",
               "title": "Creating data base with mongo"
            },
            {
               "id": "DNIjDP",
               "title": "App header",
               "labelIds": [
                  "l103"
               ],
               "memberIds": [
                  "u105",
                  "u103"
               ]
            },
            {
               "id": "3Fz0Nm",
               "title": "Advice from heead maneger",
               "labelIds": [
                  "l102",
                  "l104"
               ]
            }
         },
         {
            "id":"a1SJwV2",
            "txt":"guest removed task NPM cover",
            "createdAt":1674733606320,
            "byMember":{
               "fullname":"guest",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"18CfBv",
               "title":"NPM"
            }
         },
         {
            "id":"ayFHA5s",
            "txt":"guest changed task NPM cover color to #ffaf3f",
            "createdAt":1674733601158,
            "byMember":{
               "fullname":"guest",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"18CfBv",
               "title":"NPM"
            }
         },
         {
            "id":"adQWxch",
            "txt":"Added attachment 9.jpg",
            "createdAt":1674733527499,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"TQeOi8",
               "title":"Add TaskDetails"
            }
         },
         {
            "id":"ablSILL",
            "txt":"Added label undefined",
            "createdAt":1674380078556,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"3Fz0Nm",
               "title":"Advice from heead maneger"
            }
         },
         {
            "id":"aoseGcW",
            "txt":"Added attachment advice.jpg",
            "createdAt":1674380075015,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"3Fz0Nm",
               "title":"Advice from heead maneger"
            }
         },
         {
            "id":"ai4PP2s",
            "txt":"Added member Gal to board members.",
            "createdAt":1674379995809,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"DNIjDP",
               "title":"App header"
            }
         },
         {
            "id":"aB8MGNF",
            "txt":"Added label undefined",
            "createdAt":1674379990453,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"DNIjDP",
               "title":"App header"
            }
         },
         {
            "id":"aIpR4KT",
            "txt":"Added label undefined",
            "createdAt":1674379983849,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"DNIjDP",
               "title":"App header"
            }
         },
         {
            "id":"aSM0b5J",
            "txt":"Added attachment code.jpg",
            "createdAt":1674379956480,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"VDKxQj",
               "title":"Creating data base with mongo"
            }
         },
         {
            "id":"ax59Bwr",
            "txt":"Added attachment bug.jpg",
            "createdAt":1674379882354,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"8jlnZ6",
               "title":"s"
            }
         },
         {
            "id":"aZiRX3o",
            "txt":"Added label undefined",
            "createdAt":1674379812660,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"SU2bKv",
               "title":"Meeting with head maneger for planning the code progress"
            }
         },
         {
            "id":"azObnFI",
            "txt":"Added member Gal to board members.",
            "createdAt":1674379796630,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"bvmUwD",
               "title":"End day code review with all members"
            }
         },
         {
            "id":"aAaqdCa",
            "txt":"Added label undefined",
            "createdAt":1674379790226,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"bvmUwD",
               "title":"End day code review with all members"
            }
         },
         {
            "id":"ad1li3f",
            "txt":"Added label undefined",
            "createdAt":1674379754852,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"SU2bKv",
               "title":"Meeting with head maneger for planning the code progress"
            }
         },
         {
            "id":"armdtPG",
            "txt":"Added attachment npm.jpg",
            "createdAt":1674379361026,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"18CfBv",
               "title":"NPM"
            }
         },
         {
            "id":"aheIVQT",
            "txt":"Added member Matan to board members.",
            "createdAt":1674379283421,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"c302",
               "title":"Social media assets"
            }
         },
         {
            "id":"aKCbSdG",
            "txt":"Added label undefined",
            "createdAt":1674379261637,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c302",
               "title":"Doing Doing"
            }
         },
         {
            "id":"aDcwRmI",
            "txt":"Removed label undefined",
            "createdAt":1674379258545,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c302",
               "title":"Doing Doing"
            }
         },
         {
            "id":"autnKHN",
            "txt":"Removed member Lidor from board members.",
            "createdAt":1674379223811,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"GBpgcI",
               "title":"Making functions and mixins"
            }
         },
         {
            "id":"avxIo1z",
            "txt":"Added member Lidor to board members.",
            "createdAt":1674379219849,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"GBpgcI",
               "title":"Making functions and mixins"
            }
         },
         {
            "id":"aZGHoVa",
            "txt":"Added label undefined",
            "createdAt":1674379149842,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c301",
               "title":"CSS variables"
            }
         },
         {
            "id":"aP51Tvh",
            "txt":"Added member Gal to board members.",
            "createdAt":1674379142782,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"c301",
               "title":"CSS variables"
            }
         },
         {
            "id":"ajhOe0R",
            "txt":"Added attachment pwa.jpg",
            "createdAt":1674379052404,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"4Uo7Yx",
               "title":"Connecting to PWA"
            }
         },
         {
            "id":"aDZFcXu",
            "txt":"Added member Lidor to board members.",
            "createdAt":1674379017300,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"4Uo7Yx",
               "title":"Connecting to PWA"
            }
         },
         {
            "id":"a97LaaN",
            "txt":"Added attachment routing.jpg",
            "createdAt":1674378975508,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c201",
               "title":"Routing Directory"
            }
         },
         {
            "id":"aDs5wf2",
            "txt":"Removed member Daniel from board members.",
            "createdAt":1674378855189,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"c101",
               "title":"Backlog"
            }
         },
         {
            "id":"aDB4m3G",
            "txt":"Added label undefined",
            "createdAt":1674378850357,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c101",
               "title":"Backlog"
            }
         },
         {
            "id":"aSE3JGv",
            "txt":"Added label undefined",
            "createdAt":1674378846581,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c101",
               "title":"Backlog"
            }
         },
         {
            "id":"a8QTMbE",
            "txt":"Added attachment space.jpg",
            "createdAt":1674378839929,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c101",
               "title":"Backlog"
            }
         },
         {
            "id":"aciWUKJ",
            "txt":"Added member Matan to board members.",
            "createdAt":1674378801221,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"c303",
               "title":"Sanity test for new component"
            }
         },
         {
            "id":"aIxgOUa",
            "txt":"Added label undefined",
            "createdAt":1674378768915,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c303",
               "title":"Sanity test for new component"
            }
         },
         {
            "id":"aES4OZt",
            "txt":"Added attachment game.jpg",
            "createdAt":1674378659135,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"Dakqya",
               "title":"Add social media links"
            }
         },
         {
            "id":"aAiQnDT",
            "txt":"Added label undefined",
            "createdAt":1674378650791,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"Dakqya",
               "title":"Add social media links"
            }
         },
         {
            "id":"aVTm6Rp",
            "txt":"Added attachment implement sass.jpg",
            "createdAt":1674378587599,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"Mmfsfh",
               "title":"Implement Sass"
            }
         },
         {
            "id":"aAJ9dVG",
            "txt":"Removed label undefined",
            "createdAt":1674378489548,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c202",
               "title":"Do to"
            }
         },
         {
            "id":"aKLpyjN",
            "txt":"Removed label undefined",
            "createdAt":1674378392713,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c104",
               "title":"MEsiiii"
            }
         },
         {
            "id":"alCl7VW",
            "txt":"Removed member Tommy from board members.",
            "createdAt":1674378386257,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"c104",
               "title":"MEsiiii"
            }
         },
         {
            "id":"aDz3j2S",
            "txt":"Added member Lidor to board members.",
            "createdAt":1674378382899,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"c104",
               "title":"MEsiiii"
            }
         },
         {
            "id":"aMoCx3E",
            "txt":"Removed member Gal from board members.",
            "createdAt":1674377609649,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"c103",
               "title":"Add TaskDetails"
            }
         },
         {
            "id":"aTKzI4z",
            "txt":"Added attachment sss.png",
            "createdAt":1674377574564,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c103",
               "title":"Design & Research"
            }
         },
         {
            "id":"a2OxfNx",
            "txt":"Removed member Gal from board members.",
            "createdAt":1674377464293,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"c102",
               "title":"Create a server with express"
            }
         },
         {
            "id":"aFEaNAA",
            "txt":"Added attachment alarm watch.png",
            "createdAt":1674377376663,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c102",
               "title":"[Example task]"
            }
         },
         {
            "id":"aitsvdn",
            "txt":"Added label undefined",
            "createdAt":1674377202858,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"c105",
               "title":"Add Food"
            }
         },
         {
            "id":"a0fLQ8R",
            "txt":"Removed member Ori from board members.",
            "createdAt":1674377196883,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"c105",
               "title":"Add Food"
            }
         },
         {
            "id":"aDIp7FY",
            "txt":"Added member Tommy to board members.",
            "createdAt":1674377166843,
            "byMember":{
               "_id":"u101",
               "fullname":"Gal Zohar",
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673873845/g2gqvov30haxc8adehvi.jpg"
            },
            "task":{
               "id":"LvAbDf",
               "title":"Data model approval"
            }
         },
         {
            "id":"aZFxjxt",
            "txt":"Added label undefined",
            "createdAt":1674377138534,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"LvAbDf",
               "title":"Data model approval"
            }
         },
         {
            "id":"ahYhGxX",
            "txt":"Added label undefined",
            "createdAt":1674377078658,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"TQeOi8",
               "title":"Add TaskDetails"
            }
         },
         {
            "id":"atkwTeB",
            "txt":"Added label undefined",
            "createdAt":1674377030038,
            "byMember":{
               "imgUrl":"https://res.cloudinary.com/dk2geeubr/image/upload/v1673890694/profileDefault_khqx4r.png"
            },
            "task":{
               "id":"TQeOi8",
               "title":"Add TaskDetails"
            }
         },
         {
            "id":"a101",
            "txt":"Changed Color",
            "createdAt":154514,
            "byMember":{
               "_id":"u101",
               "fullname":"Abi Abambi",
               "imgUrl":"http://some-img"
            },
            "task":{
               "id":"c101",
               "title":"Replace Logo"
            }
         }
      ],
      "cmpsOrder":[
         "status-picker",
         "member-picker",
         "date-picker"
      ]
   }
]