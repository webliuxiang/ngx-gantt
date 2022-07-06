export const mockSubItems = [
    {
        id: '1',
        title: 'VERSION 0101',
        start: 1644035675,
        color: '#FF0000',
    },
    {
        id: '2',
        title: 'VERSION 0102',
        start: 1644935675,
        end: 1667990702,
        color: '#9ACD32',
    },
    {
        id: '3',
        title: 'VERSION 0103',
        end: 1642018400,
    },

]
export const mockGroups = [
    {
        id: '00001',
        title: 'Project 1',
        class: 'test'
    },
    {
        id: '00002',
        title: 'Project 2'
    },
    {
        id: '00003',
        title: 'Project 3'
    },
    {
        id: '00004',
        title: 'Project 4'
    },
    {
        id: '00005',
        title: 'Project 5'
    }
];

export const mockItems = [
    {
        id: '1',
        title: 'VERSION 0101',
        start: 1644035675,
        ac_start: 1644135675,
        group_id: '00001',
        color: '#FF0000',
        itemcolor: '#FF0000',
        children: [
            {
                id: 'item-child-0101',
                title: 'VERSION Children 0101',
                start: 1644035675,
                ac_start: 1644135675,
                group_id: '00001',
                color: '#FF0000',
                itemcolor: '#FF0000',
                linkable: false
            }
        ]
    },
    {
        id: '2',
        title: 'VERSION 0102',
        start: 1644935675,
        end: 1654990702,
        ac_start: 1644945675,
        ac_end: 1667991702,
        color: '#9ACD32',
        itemcolor: 'pink',
        group_id: '00001',
        expandable: true
    },
    {
        id: '3',
        title: 'VERSION 0103',
        end: 1642018400,
        itemcolor: 'green',
        group_id: '00001'
    },
    {
        id: '4',
        title: 'VERSION 0104',
        itemcolor: 'green',
        group_id: '00001',
    },
    {
        id: '5',
        title: 'VERSION 0201',
        itemcolor: 'green',
        group_id: '00002'
    },
    {
        id: '6',
        title: 'VERSION 0202',
        start: 1646035675,
        end: 1647018400,
        ac_start: 1646135675,
        ac_end: 1647118400,
        group_id: '00002',
        color: 'rgb(52, 143, 228, 0.5)',
        itemcolor: 'lightblue',
        barStyle: {
            border: '1px solid rgb(52, 143, 228)'
        }
    },
    {
        id: '7',
        title: 'VERSION 0203',
        start: 1644235675,
        end: 1646718400,
        ac_start: 1644245675,
        ac_end: 1646728400,
        itemcolor: 'lightgreen',
        group_id: '00002',
    },
    {
        id: '8',
        title: 'VERSION 0204',
        start: 1646035675,
        end: 1647418400,
        ac_start: 1646135675,
        ac_end: 1647428400,
        itemcolor: 'yellow',
        group_id: '00002',
    },

    {
        id: '9',
        title: 'VERSION 0301',
        start: 1646035675,
        end: 1649018400,
        ac_start: 1646135675,
        ac_end: 1649118400,
        itemcolor: 'orange',
        group_id: '00003'
    },
    {
        id: '101',
        title: 'VERSION 0302',
        start: 1642035675,
        end: 1648018400,
        group_id: '000030'
    },
    {
        id: '10',
        title: 'VERSION 0302',
        start: 1642035675,
        end: 1648018400,
        group_id: '00003'
    },
    {
        id: '11',
        title: 'VERSION 0303',
        start: 1644135675,
        end: 1645018400,
        group_id: '00003'
    },
    {
        id: '12',
        title: 'VERSION 0401',
        start: 1645035675,
        end: 1647018400,
        group_id: '00004'
    },
    {
        id: '13',
        title: 'VERSION 0402',
        start: 1646035675,
        end: 1649918400,
        group_id: '00004'
    },
    {
        id: '14',
        title: 'VERSION 0403',
        start: 1643035675,
        end: 1649018400,
        group_id: '00004'
    },
    {
        id: '15',
        title: 'VERSION 0404',
        start: 1646035675,
        end: 1649918400,
        group_id: '00004'
    },
    {
        id: '16',
        title: 'VERSION 0501',
        start: 1648935675,
        end: 1649935675,
        group_id: '00005'
    },
    {
        id: '17',
        title: 'VERSION 0502',
        start: 1646035675,
        end: 1647018400,
        group_id: '00005'
    },
    {
        id: '18',
        title: 'VERSION 0503',
        start: 1645035675,
        end: 1649018400,
        group_id: '00005'
    }
];
