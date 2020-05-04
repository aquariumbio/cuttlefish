export default {
    lists: [
        {
            id: 1,
            title: "Not Started",
            titleColor: "#909090",
            item: [
                {
                    task1: {
                        id: 1,
                        list: 1,
                        title: "Debug Server",
                        members: "",
                        deadline: '06/01/2020'
                    }
                },
                {
                    task2: {
                        id: 1,
                        list: 1,
                        title: "Connect to Backend Server",
                        members: "",
                        deadline: '07/01/2020'
                    }
                }
            ]
        },
        {
            id: 2,
            title: "In Progress",
            titleColor: "#E6B265",
            item: [
                {
                    task3: {
                        id: 2,
                        list: 2,
                        title: "Meeting with Ben",
                        members: "",
                        deadline: '04/30/2020'
                    },
                }
            ]
        },
        {
            id: 3,
            title: "Completed",
            titleColor: "#4CAF50",
            item: [
                {
                    task4: {
                        id: 3,
                        list: 3,
                        title: "Integrate React Router",
                        members: "",
                        deadline: '04/04/2020'
                    },
                }
            ]
        }
    ],
    tasks: [
        {
            id: 1,
            list: 1,
            status: "Not Started",
            statusColor: "#909090",
            title: "Debug Server",
            members: "Phuong, Thomas",
            deadline: "05/01/2020"
        },
        {
            id: 2,
            list: 1,
            status: "Not Started",
            statusColor: "#909090",
            title: "Add Authentication Feature",
            members: "Phuong, Thomas",
            deadline: '05/21/2020'
        },
        {
            id: 3,
            list: 1,
            status: "Not Started",
            statusColor: "#909090",
            title: "Connect to Backend Server",
            members: "Phuong, Thomas",
            deadline: '07/01/2020'
        },
        {
            id: 4,
            list: 1,
            status: "Not Started",
            statusColor: "#909090",
            title: "User Testings for React web app",
            members: "Phuong, Thomas",
            deadline: '07/12/2020'
        },
        {
            id: 5,
            list: 2,
            status: "In Progress",
            statusColor: "#E6B265",
            title: "Meeting with Ben",
            members: "Phuong, Thomas, Melody",
            deadline: '04/25/2020'
        },
        {
            id: 6,
            list: 2,
            status: "In Progress",
            statusColor: "#E6B265",
            title: "User Testings for Figma design",
            members: "Phuong, Thomas, Melody",
            deadline: '04/30/2020'
        },
        {
            id: 7,
            list: 2,
            status: "In Progress",
            statusColor: "#E6B265",
            title: "Building GUI for React web app",
            members: "Phuong, Thomas",
            deadline: '05/01/2020'
        },
        {
            id: 8,
            list: 3,
            status: "Completed",
            statusColor: "#4CAF50",
            title: "Integrate React Router",
            members: "Phuong, Thomas",
            deadline: '04/04/2020'
        },
        {
            id: 9,
            list: 3,
            status: "Completed",
            statusColor: "#4CAF50",
            title: "User Research - Interviews",
            members: "Phuong, Thomas, Melody",
            deadline: '04/04/2020'
        }
    ]

}