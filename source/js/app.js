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
    },

    {
        'id': 2,
        'name': 'Othmane Rhazlani',
    },

    {
        'id': 3,
        'name': 'Azdin Rhazlani',
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


// function to find id include in array 
const findObject = (array, id) => {
    return array.find((element) => element.id == id);
}


const blurContainer = document.querySelector('#blur-container');

function refreshBoard() {
    // tbody element
    const board = document.querySelector("#board");

    let htmlBoard = "";
    // Display all items task
    columnBoard.forEach(itemBoard => {
        
        let changeColorBorderBoard = itemBoard.columnId == 1 ? 'border-blue-600' : itemBoard.columnId == 2 ? 'border-yellow-600' : 'border-purple-600'
    
        let taskOfBoard = tasks.filter(task => task.status == itemBoard.columnId)
        
        htmlBoard += `
            <div class="w-2/6 bg-gray-900 border border-gray-500 rounded-md max-h-full flex flex-col justify-between">
                <div class="w-full border-b border-gray-500 bg-gray-800 p-3 rounded-md">
                    <div class="flex items-center">
                        <div class="w-6 h-6 border-2 rounded-full ${changeColorBorderBoard} mr-3"></div>
                        <h1 class="text-white mr-4 font-semibold text-xl">${itemBoard.nameColumn}</h1>
                        <span class="h-6 px-2 text-center bg-gray-900 rounded-full text-white">${taskOfBoard.length}</span>
                    </div>
                    <p class="text-gray-400 mt-2">${itemBoard.des}</p>
                </div>
                <div class="h-5/6 flex flex-col justify-between">
                    <div class="w-11/12 mx-auto overflow-auto hideScroll">
                        ${taskOfBoard.map(task =>
                            `<div class="bg-gray-700 rounded-md mt-3 border border-gray-600">
                                <div class="w-full bg-gray-800 p-2 rounded flex justify-between border-b border-gray-600">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 rounded-full bg-white mr-3"></div>
                                        <p class="mr-3 text-white font-poppins">m</p>
                                        <span class="px-2 text-sm font-medium text-center text-white rounded-full ${findObject(priorities, task.priority).name == 'P1' ? 'bg-red-500 border-2 border-red-700' : findObject(priorities, task.priority).name  == 'P2' ? 'bg-orange-500 border-2 border-orange-700' : 'bg-green-500 border-2 border-green-700'} mr-3">${findObject(priorities, task.priority).name }</span>
                                    </div>
                    
                                    <span class="text-white text-2xl">
                                        <i class="fa-solid fa-ellipsis hover:scale-x-105 cursor-pointer"></i>
                                    </span>
                                </div>
                                <div class="p-3">
                                    <h2 class="text-center text-lg font-semibold text-white mb-3">${task.taskName}</h2>
                    
                                    <div class="flex justify-around items-center">
                                        <div class="text-center text-white">
                                            <p>${task.stratDate}</p>
                                            <p>13:30 pm</p>
                                        </div>
                                        
                                        <div class="w-20 h-1 bg-gray-300 rounded"></div>
                                        
                                        <div class="text-center text-white">
                                            <p>${task.endDate}</p>
                                            <p>13:30 pm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                        ).join('') }
                    </div>
                    <div id="displyForm" class="bg-gray-900 w-full rounded-b-md p-4 text-gray-400 hover:bg-gray-700 cursor-pointer">
                        <p> <span><i class="fa-solid fa-plus"></i></span> Add item</p>
                    </div>
                </div>    
            </div>
        `
    });
    
    board.innerHTML = htmlBoard;
    const displyForm = document.querySelectorAll('#displyForm');
    // event display form
    displyForm.forEach(btn => {
        btn.addEventListener('click', () => {
            form.classList.add('flex')
            form.classList.remove('hidden')

            blurContainer.classList.add('blur-lg');
        })
    })
}

refreshBoard();


// event display and close form add item
const form = document.querySelector("#formAddItem");
const contentForm = `
    <div class="w-1/2 mx-auto">
        <div class="mt-10 bg-gray-700 shadow-black p-5 rounded-lg ">
            <h2 class="text-center text-2xl font-bold text-white">Add Task</h2>
            <form action="" method="get" class="flex flex-col">
                <label class="text-white mb-1" for="">Title Of Task</label>
                <input class="title px-4 py-3 rounded-lg mb-4" type="text" placeholder="Enter title of task">
                
                <label class="text-white mb-1" for="">Start Date Of Task</label>
                <input class="startDate px-4 py-3 rounded-lg mb-4" type="datetime-local">
                
                <label class="text-white mb-1" for="">End Date Of Task</label>
                <input class="endDate px-4 py-3 rounded-lg mb-4" type="datetime-local">
                
                <label class="text-white mb-1" for="">Status</label>
                <select class="status px-4 py-3 rounded-lg mb-4">
                    <optgroup label="Status">
                        <option value="1">To Do</option>
                        <option value="2">In Progress</option>
                        <option value="3">Done</option>
                    </optgroup>
                </select>

                <label class="text-white mb-1" for="">Select Priority Of Task</label>
                <select class="priority px-4 py-3 rounded-lg mb-4">
                    <optgroup label="Priority">
                    <option value="1">P1</option>
                    <option value="2">P2</option>
                    <option value="3">P3</option>
                    </optgroup>
                </select>
                
                <div class="flex justify-between mt-5">
                <button id="closeForm" class="text-white w-1/5 bg-gray-600 py-3 rounded-lg duration-500 hover:bg-gray-500 cursor-pointer hover:duration-500 hover:scale-[1.06]">Cancel</button>
                    <input type="submit" value="Add" class="text-white w-1/5 bg-gray-500 py-3 rounded-lg duration-500 hover:bg-gray-400 cursor-pointer hover:duration-500 hover:scale-[1.06]">
                </div>
            </form>
        </div>
    </div>`;

form.innerHTML = contentForm;

const closeForm = document.querySelector('#closeForm');
// event close form
closeForm.addEventListener('click', (e) => {
    e.preventDefault();
    form.classList.add('hidden');
    form.classList.remove('flex')
    blurContainer.classList.remove('blur-lg');
})


    




