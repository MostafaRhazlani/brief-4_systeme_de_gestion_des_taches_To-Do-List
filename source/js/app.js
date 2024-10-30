let columnBoard = [
    {
        'columnId': 1,
        'nameColumn': 'To Do',
        'des': 'This item has not been started',
        tasks: [
            {
                'taskId': 1,
                'taskName': "section-home",
                'stratDate': "Mon, Oct 10",
                'endDate': "Fri, Oct 15",
                'ownerTask': 'Mostafa Rhazlani',
                'priority': 'P1'
            },
        
            {
                'taskId': 2,
                'taskName': "section-shop",
                'stratDate': "Mon, Oct 28",
                'endDate': "Sun, Nov 03",
                'ownerTask': 'Mostafa Rhazlani',
                'priority': 'P2'
            },

            {
                'taskId': 3,
                'taskName': "section-shop",
                'stratDate': "Mon, Oct 28",
                'endDate': "Sun, Nov 03",
                'ownerTask': 'Mostafa Rhazlani',
                'priority': 'P3'
            },
        ]
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
        tasks: [
            {
                'taskId': 3,
                'taskName': "section-contact",
                'stratDate': "Tue, Sep 22",
                'endDate': "Mon, Sep 26",
                'ownerTask': 'Othmane Rhazlani',
                'priority': 'P1'
            },
        ]
    },
]

let users = [
    {
        'userId': 1,
        'userName': 'Mostafa Rhazlani',
    },

    {
        'userId': 2,
        'userName': 'Othmane Rhazlani',
    },

    {
        'userId': 3,
        'userName': 'Azdin Rhazlani',
    }
]

let priorities = [
    {
        'priorityId': 1,
        'priority': 'P1',
    },

    {
        'priorityId': 2,
        'priority': 'P2',
    },

    {
        'priorityId': 3,
        'priority': 'P3',
    },
]
// tbody element

const board = document.querySelector("#board");

let htmlBoard = "";

// Display all items task
columnBoard.forEach(itemBoard => {
    
    // condition for change color of item board
    const changeColorBorder = itemBoard.columnId == 1 ? 'border-indigo-600' : itemBoard.columnId == 2 ? 'border-yellow-500' : 'border-purple-800';
    
    // loop for display tasks
    const htmlTask = itemBoard.tasks ? itemBoard.tasks.map(task => {
        
        const changeBgColorPriority = task.priority == 'P1' ? 'bg-red-600' : task.priority == 'P2' ? 'bg-orange-600' : 'bg-green-600';
        
        return `
        <div class="bg-gray-700 rounded-md mt-3 border-2 border-red-600">
            <div class="w-full bg-gray-800 p-2 rounded flex justify-between border-b-2 border-red-600">
                <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-white mr-3"></div>
                    <p class="mr-3 text-white font-poppins">${task.ownerTask}</p>
                    <span class="h-6 px-1 text-center text-white rounded-full ${changeBgColorPriority} mr-3">${task.priority}</span>
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
        </div>
        

    `}) : ''

    let totalTasks = itemBoard.tasks ? itemBoard.tasks.length : 0;

    htmlBoard += `
        <div class="w-2/6 bg-gray-900 border border-gray-500 rounded-md max-h-full flex flex-col justify-between">
            <div class="w-full border-b border-gray-500 bg-gray-800 p-3 rounded-md">
                <div class="flex items-center">
                    <div class="w-6 h-6 border-2 rounded-full ${changeColorBorder} mr-3"></div>
                    <h1 class="text-white mr-4 font-semibold text-xl">${itemBoard.nameColumn}</h1>
                    <span class="h-6 px-2 text-center bg-gray-900 rounded-full text-white">${totalTasks}</span>
                </div>
                <p class="text-gray-400 mt-2">${itemBoard.des}</p>
            </div>

            <div class="h-5/6 flex flex-col justify-between">
                <div class="w-11/12 mx-auto overflow-auto hideScroll">
                    ${htmlTask}
                </div>
                <div class="bg-gray-900 w-full rounded-b-md p-4 text-gray-400 hover:bg-gray-700 cursor-pointer">
                    <p> <span><i class="fa-solid fa-plus"></i></span> Add item</p>
                </div>
            </div>
        </div>
    `

});

board.innerHTML = htmlBoard;

    




