let columnBoard = [
    {
        'columnId': 1,
        'nameColumn': 'To Do',
        'des': 'This item has not been started',
    },

    {
        'columnId': 2,
        'nameColumn': 'In Progress',
        'des': 'This is being worked on',
    },

    {
        'columnId': 3,
        'nameColumn': 'Done',
        'des': 'This has been completed',
    },
]

let tasks = []

let users = [
    {
        'id': 1,
        'name': 'Mostafa Rhazlani',
        'img': './source/img/photo youcode.jpg'
    },

    {
        'id': 2,
        'name': 'Othmane Rhazlani',
        'img': './source/img/photo youcode.jpg'
    },

    {
        'id': 3,
        'name': 'Azdin Rhazlani',
        'img': './source/img/photo youcode.jpg'
    }
]

let priorities = [
    {
        'id': 1,
        'name': 'P1',
    },

    {
        'id': 2,
        'name': 'P2',
    },

    {
        'id': 3,
        'name': 'P3',
    },
]


let localTasks = JSON.parse( localStorage.getItem('localTasks')) ?? []

// function to find id include in array 
const findObject = (array, id) => {
    return array.find((element) => element.id == id);
}


const blurContainer = document.querySelector('#blur-container');

// gloabal variable to get current task id
let currentTaskId;
function refreshBoard() {
    // tbody element
    const board = document.querySelector("#board");

    let htmlBoard = "";
    // Display all items task
    columnBoard.forEach(itemBoard => {

        let changeColorBorderBoard = itemBoard.columnId == 1 ? 'border-blue-600' : itemBoard.columnId == 2 ? 'border-yellow-600' : 'border-purple-600'
        localTasks = JSON.parse( localStorage.getItem('localTasks')) ?? []

        let taskOfBoard = localTasks.filter(task => task.status == itemBoard.columnId)
        
        htmlBoard += `
            <div class="column w-2/6 bg-gray-900 border border-gray-500 rounded-md max-h-full flex flex-col justify-between">
                <div class="w-full border-b border-gray-500 bg-gray-800 p-3 rounded-md">
                    <div class="flex items-center">
                        <div class="w-6 h-6 border-2 rounded-full ${changeColorBorderBoard} mr-3"></div>
                        <h1 class="text-white mr-4 font-semibold text-xl">${itemBoard.nameColumn}</h1>
                        <span class="h-6 px-2 text-center bg-gray-900 rounded-full text-white">${taskOfBoard.length}</span>
                    </div>
                    <p class="text-gray-400 mt-2">${itemBoard.des}</p>
                </div>
                <div class="h-5/6 flex flex-col justify-between">
                    <div class="w-11/12 h-[350px] mx-auto overflow-auto hideScroll">
                        ${taskOfBoard.length != 0 ? taskOfBoard.map(task =>
                            `<div class="task bg-gray-700 rounded-md mt-2 border border-gray-600" data-task-id="${task.id}">
                                <div class="w-full bg-gray-800 p-2 rounded flex justify-between items-center border-b border-gray-600 relative">
                                    <div class="flex items-center">
                                        <img src="${findObject(users, task.ownerTask).img}" alt="" class="border-2 border-zinc-400 w-8 h-8 rounded-full mr-3">
                                        <p class="mr-3 text-white font-poppins">${findObject(users, task.ownerTask).name}</p>
                                        <span class="px-2 text-sm font-medium text-center text-white rounded-full ${findObject(priorities, task.priority).name == 'P1' ? 'bg-red-500 border-2 border-red-700' : findObject(priorities, task.priority).name  == 'P2' ? 'bg-orange-500 border-2 border-orange-700' : 'bg-green-500 border-2 border-green-700'} mr-3">${findObject(priorities, task.priority).name }</span>
                                    </div>
                                    
                                    <span class="menu text-white text-2xl">
                                        <i class="fa-solid fa-ellipsis hover:scale-x-105 cursor-pointer"></i>
                                    </span>

                                    <div class="options bg-slate-900 w-48 p-1 rounded border border-gray-500 absolute top-8 right-1 z-10 hidden">
                                        <div class="moveTask flex justify-between items-center w-full px-2 py-1 text-sm text-start font-light text-white hover:cursor-pointer hover:bg-gray-600 hover:bg-opacity-20 rounded">
                                            <button><i class="fa-solid fa-arrows-left-right"></i>&nbsp;&nbsp;Move To Column</button>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                        <div class="displayFromEdit flex justify-between items-center w-full px-2 py-1 text-sm text-start font-light text-white hover:cursor-pointer hover:bg-gray-600 hover:bg-opacity-20 rounded">
                                            <button><i class="fa-regular fa-pen-to-square"></i>&nbsp;&nbsp;Edit Task</button>
                                        </div>
                                        <button class="deleteTask w-full px-2 py-1 text-sm text-start font-light text-red-500 hover:bg-red-500 hover:text-red-400 hover:bg-opacity-15 rounded">
                                            <i class="fa-regular fa-trash-can"></i>&nbsp;&nbsp;
                                            Delete Task
                                        </button>
                                    </div>

                                    <div class="columns bg-slate-900 p-1 rounded border border-gray-500 absolute top-8 right-1 z-20 hidden">
                                        <p class="px-2 pb-3 pt-2 text-white text-sm">Select an Item</p>
                                        ${columnBoard.map((column) => `
                                            <button class="changeColumn flex flex-col justify-center w-full px-2 py-2 text-sm text-start font-light text-white hover:bg-gray-600 hover:bg-opacity-20 rounded" data-column-id="${column.columnId}">
                                                <div class="flex">
                                                    <div class="w-4 h-4 border-2 rounded-full ${column.columnId == 1 ? 'border-blue-600' : column.columnId == 2 ? 'border-yellow-600' : 'border-purple-600'} mr-3"></div>
                                                    ${column.nameColumn} 
                                                </div>
                                                <p class="text-gray-400 mt-1 text-[13px] ml-7">${column.des}</p>
                                            </button>`
                                        ).join('')}
                                        
                                    </div>
                                </div>
                                <div class="p-3">
                                    <h2 class=" text-lg font-semibold text-white mb-3">${task.taskName}</h2>

                                    <p class="text-white text-sm mb-3 font-light tracking-wide p-2 bg-gray-500 rounded shadow-inner shadow-gray-700/100">${task.des}</p>
                                    <div class="flex justify-evenly items-center text-sm">
                                        <div class="text-white paragraphe-size">
                                            <p class="mb-1"><i class="fa-regular fa-calendar"></i>&nbsp;${task.startDate}</p>
                                            <p><i class="fa-regular fa-clock"></i>&nbsp;${task.startTime}</p>
                                        </div>
                                        
                                        <i class="fa-solid fa-arrow-right text-white text-lg"></i>
                                        
                                        <div class="text-white paragraphe-size">
                                            <p class="mb-1"><i class="fa-regular fa-calendar"></i>&nbsp;${task.endDate}</p>
                                            <p><i class="fa-regular fa-clock"></i>&nbsp;${task.endTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                        ).join('') : `<p class="text-white p-3 text-center">Tasks Not Found</p>` }
                    </div>
                    <div id="displyForm" class="bg-gray-900 w-full rounded-b-md p-4 mt-2 text-gray-400 hover:bg-gray-700 cursor-pointer">
                        <p> <span><i class="fa-solid fa-plus"></i></span> Add item</p>
                    </div>
                </div>    
            </div>
        `
    });
    
    board.innerHTML = htmlBoard;
    const displyForm = document.querySelectorAll('#displyForm');
    const displayFormEdit = document.querySelectorAll('.displayFromEdit');
   
    // event display form
    displyForm.forEach((btn, columnId) => {
        btn.addEventListener('click', () => {
            const titleForm = document.querySelector('.titleForm');
            titleForm.innerText = 'Add Task';
            form.classList.add('flex')
            form.classList.remove('hidden')
            submit.dataset.id = columnId + 1;
            
            blurContainer.classList.add('blur-lg');
        })
    })

    displayFormEdit.forEach(btn => {
        btn.addEventListener('click', (e) =>{
            const titleForm = document.querySelector('.titleForm');
            titleForm.innerText = 'Edit Task';
            
            form.classList.add('flex')
            form.classList.remove('hidden')

            blurContainer.classList.add('blur-lg');

            let getTask = localTasks;

            let taskId = e.currentTarget.closest('.task').dataset.taskId

            currentTaskId = taskId;
            getTask.forEach(task => {
                if(taskId == task.id) {
                    title.value = task.taskName;
                    des.value = task.des;
                    startDate.value = task.startDate;
                    startTime.value = task.startTime;
                    endDate.value = task.endDate;
                    endTime.value = task.endTime;
                    priority.value = task.priority;
                    
                }
            })
        })
    })

    const menus = document.querySelectorAll('.menu');
    const options = document.querySelectorAll('.options');
    const columns = document.querySelectorAll('.columns');
    const moveTask = document.querySelectorAll('.moveTask');
    const deleteTask = document.querySelectorAll('.deleteTask');
    
    // show or hide option when click on button menu
    menus.forEach((menu, index) => {
        
        menu.addEventListener('click', () => {

            const currentOption = options[index]
            
            // check if the current option is hidden
            const isHidden = currentOption.classList.contains('hidden')

            // hide other option
            options.forEach(option => option.classList.add('hidden'))
            columns.forEach(column => column.classList.add('hidden'))

            // show current option after check is hidden
            if(isHidden) {
                currentOption.classList.remove('hidden')
            }
            
        })
    })

    
    // show or hide columns if click on button move to column
    moveTask.forEach((edit, index) => {
        edit.addEventListener('click', () => {
            
            const currentColumn = columns[index]
            
            // check if the current column is hidden
            const columnIsHidden = currentColumn.classList.contains('hidden');

            // hide another columns in other cards
            columns.forEach(column => column.classList.add('hidden'))

            // show the current column after check is hidden
            if(columnIsHidden) {
                currentColumn.classList.remove('hidden')

                let children = currentColumn.children;

                // loop to get child of card columns
               for(let child of children) {

                    // edit status of task
                    child.addEventListener('click', (event) => {
                        
                        // get id of itemBoard and id of task
                        let columnId = parseInt(event.currentTarget.dataset.columnId)
                        let taskId = event.currentTarget.closest('.task').dataset.taskId

                        // check if status of task equal id of itemBoard
                        let updateStatus = localTasks
                        if(findObject(updateStatus, taskId)) {
                            
                            
                            findObject(updateStatus, taskId).status = columnId;
                            
                            localStorage.setItem('localTasks', JSON.stringify(updateStatus))

                            refreshBoard();
                        }
                    })
               }
            }
        })
    })

    // delte task
    deleteTask.forEach(remove => {
        remove.addEventListener('click', (event) => {
            let taskId = event.currentTarget.closest('.task').dataset.taskId

            let removeTask = localTasks.filter(task => task.id != taskId)

            localStorage.setItem("localTasks", JSON.stringify(removeTask))
            refreshBoard();
        })
    })

}
refreshBoard();

// event display and close form add item
const form = document.querySelector("#formAddItem");
const contentForm = `
    <div class="xl:w-1/2 lg:w-1/2 md:w-3/4 sm:w-4/6  mx-auto form">
        <div class="mt-10 bg-gray-700 shadow-black p-5 rounded-lg ">
            <h2 class="titleForm text-center text-3xl mt-3 mb-7 font-bold text-white">Add Task</h2>
            <form action="" method="get" class="flex flex-col">
                <label class="text-white mb-1 pl-1" for="">Title Of Task</label>
                <input class="title px-2 py-2 rounded-md " type="text" placeholder="Enter title of task">
                <div class="h-6 px-2 pt-1">
                    <p class="validateTitle text-sm text-red-400"></p>
                </div>
                
                <label class="text-white mb-1 pl-1" for="">Description</label>
                <textarea class="des px-2 py-2 rounded-md max-h-24 min-h-16 focus:outline-none" name="" id="" placeholder="decription..."></textarea>
                <div class="h-6 px-2 pt-1">
                    <p class="validateDes text-sm text-red-400"></p>
                </div>
                <div class="flex-date flex sm:gap-4">
                    <div class="w-2/4">
                        <label class="text-white mb-1 pl-1" for="">Start Date Of Task</label>
                        <input class="startDate px-2 py-2 rounded-md w-full" type="date">
                        <div class="h-6 px-2 pt-1">
                            <p class="validateStDate text-sm text-red-400"></p>
                        </div>
                    </div>                    
                    <div class="w-2/4">
                        <label class="text-white mb-1 pl-1" for="">Start Time Of Task</label>
                        <input class="startTime px-2 py-2 rounded-md w-full" type="time">
                        <div class="h-6 px-2 pt-1">
                            <p class="validateStTime text-sm text-red-400"></p>
                        </div>
                    </div>
                </div>
                
                <div class="flex-date flex sm:gap-4">
                    <div class="w-2/4">
                        <label class="text-white mb-1 pl-1" for="">End Date Of Task</label>
                        <input class="endDate px-2 py-2 rounded-md w-full" type="date">
                        <div class="h-6 px-2 pt-1">
                            <p class="validateEnDate text-sm text-red-400"></p>
                        </div>
                    </div>                    
                    <div class="w-2/4">
                        <label class="text-white mb-1 pl-1" for="">End Time Of Task</label>
                        <input class="endTime px-2 py-2 rounded-md w-full" type="time">
                        <div class="h-6 px-2 pt-1">
                            <p class="validateEnTime text-sm text-red-400"></p>
                        </div>
                    </div>
                </div>

                <label class="text-white mb-1 pl-1" for="">Select Priority Of Task</label>
                <select class="priority px-2 py-2 rounded-md">
                    <optgroup label="Priority">
                    <option value=""></option>
                    <option value="1">P1</option>
                    <option value="2">P2</option>
                    <option value="3">P3</option>
                    </optgroup>
                </select>
                <div class="h-6 px-2 pt-1">
                    <p class="validatePriority text-sm text-red-400"></p>
                </div>
                
                <div class="flex justify-between mt-3 btns">
                    <button id="closeForm" class="text-white w-2/6 bg-gray-600 p-3 rounded-lg duration-500 hover:bg-gray-500 cursor-pointer hover:duration-500 hover:scale-[1.06]">Cancel</button>
                    <button id="submit" type="submit" class="text-white w-2/6 bg-gray-500 py-3 rounded-lg duration-500 hover:bg-gray-400 cursor-pointer hover:duration-500 hover:scale-[1.06]">Add</button>
                </div>
            </form>
        </div>
    </div>`;

form.innerHTML = contentForm;

// elements of message for validation
const submit = document.querySelector('#submit');
const validateTitle = document.querySelector('.validateTitle');
const validateDes = document.querySelector('.validateDes');
const validateStDate = document.querySelector('.validateStDate');
const validateStTime = document.querySelector('.validateStTime');
const validateEnDate = document.querySelector('.validateEnDate');
const validateEnTime = document.querySelector('.validateEnTime');
const validatePriority = document.querySelector('.validatePriority');

// elements of inputs
const title = document.querySelector('.title');
const des = document.querySelector('.des');
const startDate = document.querySelector('.startDate');
const startTime = document.querySelector('.startTime');
const endDate = document.querySelector('.endDate');
const endTime = document.querySelector('.endTime');
const priority = document.querySelector('.priority');

const titleForm = document.querySelector('.titleForm');

let idTask = 1

submit.addEventListener('click', (e) => {
    e.preventDefault();
    
    validateTitle.innerText = '';
    validateDes.innerText = '';
    validateStDate.innerText = '';
    validateStTime.innerText = '';
    validateEnDate.innerText = '';
    validateEnTime.innerText = '';
    validatePriority.innerText = '';

    // validation for title if empty or characters more than 25
    if (!title.value) {
        validateTitle.innerText = 'This field is required!';
        return;
    } else if (title.value.length > 25) {
        validateTitle.innerText = 'Title is Too Long';
        return;
    }

    // validation for description if empty or characters more than 100
    if (!des.value) {
        validateDes.innerText = 'This field is required!';
        return;
    } else if (des.value.length > 100) {
        validateDes.innerText = 'Description is Too Long';
        return;
    }

    // validation for start date if empty 
    if (!startDate.value) {
        validateStDate.innerText = 'This field is required!';
        return;
    }

    // validation for start time if empty 
    if (!startTime.value) {
        validateStTime.innerText = 'This field is required!';
        return;
    }

    // validation for end date if empty 
    if (!endDate.value) {
        validateEnDate.innerText = 'This field is required!';
        return;
    }

    // validation for end time if empty 
    if (!endTime.value) {
        validateEnTime.innerText = 'This field is required!';
        return;
    }

    // the start and end date entered by user
    let sDate = new Date(`${startDate.value}`);
    let eDate = new Date(`${endDate.value}`);
    
    // set date without hours minutes and secondes
    let nowDate = new Date();
    nowDate.setHours(0,0,0,0);
    
    // check if start date before now date
    if (sDate < nowDate) {
        validateStDate.innerText = 'This Date in Past';
        return;
    }

    // check if end date before start date
    if (eDate < sDate) {
        validateEnDate.innerText = 'Start Date And Time Must Be After End Date And Time';
        return;
    }

    // the start and end time entered by user
    let sTime = new Date(`${startDate.value}T${startTime.value}`);
    let eTime = new Date(`${endDate.value}T${endTime.value}`);

    // set date now without seconds
    let nowTime = new Date()
    nowTime.setSeconds(-60)

    // check if start time entered by user brfore time now
    if(sTime < nowTime) {
        validateStTime.innerText = 'This Time in Past';
        return;
    }

    // check if end time entered by user before start time
    if(eTime < sTime) {
        validateEnTime.innerText = 'End Time Must Be After Start Time';
        return;
    }

    if (priority.value === '') {
        validatePriority.innerText = 'Please select a priority!';
        return;
    }

    if(titleForm.innerText == 'Add Task') {
        // add task
        let taskObject = {
            'id':  idTask++,
            'taskName' : title.value,
            'des' : des.value,
            'startDate': startDate.value,
            'startTime': startTime.value,
            'endDate': endDate.value,
            'endTime': endTime.value,
            'ownerTask': 1,
            'status': submit.dataset.id,
            'priority': priority.value
        }   
    
        
        let addNewTask = localTasks;
        addNewTask.push(taskObject)
        
        localStorage.setItem('localTasks', JSON.stringify(addNewTask))
        refreshBoard();
        
    } else {
        
        // edit task
        let editTask = localTasks;
        let updateTask = findObject(editTask, currentTaskId)
        
        if(updateTask) {
            updateTask.taskName = title.value;
            updateTask.des = des.value;
            updateTask.startDate = startDate.value;
            updateTask.startTime = startTime.value;
            updateTask.endDate = endDate.value;
            updateTask.endTime = endTime.value;
            updateTask.priority = priority.value; 
        }

        localStorage.setItem('localTasks', JSON.stringify(editTask))
        refreshBoard();
    }

    

    // reset data
    title.value = '';
    des.value = '';
    startDate.value = '';
    startTime.value = '';
    endDate.value = '';
    endTime.value = ''
    priority.value = '1';

    form.classList.add('hidden');
    form.classList.remove('flex')
    blurContainer.classList.remove('blur-lg');
})

const closeForm = document.querySelector('#closeForm');
// event close form
closeForm.addEventListener('click', (e) => {
    e.preventDefault();
    form.classList.add('hidden');
    form.classList.remove('flex')
    blurContainer.classList.remove('blur-lg');


    // reset data
    title.value = '';
    des.value = '';
    startDate.value = '';
    startTime.value = '';
    endDate.value = '';
    endTime.value = ''
    priority.value = '1';
})

const select = document.querySelector('.select');

select.addEventListener('change', (event) => {
    let value = event.target.value

    if(value == 'date') {
        // sort by date
        localTasks.sort((a,b) => a.startDate.localeCompare(b.startDate));
        
    } else {
        // sort by priority
        localTasks.sort((a,b) => a.priority - b.priority);
    }
    refreshBoard();
    
})

const removeAll = document.querySelector('.removeAll');

removeAll.addEventListener('click', () => {
    localStorage.setItem('localTasks', JSON.stringify([]));
    refreshBoard();
    
})



    




