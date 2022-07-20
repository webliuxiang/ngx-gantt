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
    },
    {
        id: '00006',
        title: 'Project 6'
    },
    {
        id: '00007',
        title: 'Project 7'
    },
    {
        id: '00008',
        title: 'Project 8'
    },
    {
        id: '00009',
        title: ''
    },
];

export const mockItems = [
    {
        id: 'item-0101',
        title: 'VERSION 0101',
        start: 1601318400,
        group_id: '00001',
        color: '#FF0000',
    },
    {
        id: 'item-0102',
        title: 'VERSION 0102',
        start: 1590935675,
        end: 1591318400,
        color: '#9ACD32',
        group_id: '00001',
        expandable: true
    },
    {
        id: 'item-0103',
        title: 'VERSION 0103',
        end: 1590035000,
        group_id: '00001'
    },
    {
        id: 'item-0202',
        title: 'VERSION 0202',
        start: 1581035675,
        end: 1590230000,
        group_id: '00002',
        links: ['item-0203'],
        color: 'rgb(52, 143, 228, 0.5)',
        barStyle: {
            border: '1px solid rgb(52, 143, 228)'
        }
    },
    {
        id: 'item-0203',
        title: 'VERSION 0203',
        start: 1593548400,
        end: 1602428400,
        group_id: '00002',
        links: ['item-0204']
    },
    {
        id: 'item-0204',
        title: 'VERSION 0204',
        start: 1591035675,
        end: 1592418400,
        group_id: '00002',
        links: ['item-0301', 'item-0402']
    },

    {
        id: 'item-0301',
        title: 'VERSION 0301',
        start: 1596035675,
        end: 1599018400,
        group_id: '00003'
    },
    {
        id: 'item-0302',
        title: 'VERSION 0302',
        start: 1592035675,
        end: 1598018400,
        group_id: '00003'
    },
    {
        id: 'item-0303',
        title: 'VERSION 0303',
        start: 1590135675,
        end: 1594018400,
        group_id: '00003'
    },
    {
        id: 'item-0401',
        title: 'VERSION 0401',
        start: 1589035675,
        end: 1594018400,
        group_id: '00004'
    },
    {
        id: 'item-0402',
        title: 'VERSION 0402',
        start: 1596035675,
        end: 1599918400,
        group_id: '00004'
    },
    {
        id: 'item-0403',
        title: 'VERSION 0403',
        start: 1593035675,
        end: 1599018400,
        group_id: '00004'
    },
    {
        id: 'item-0404',
        title: 'VERSION 0404',
        start: 1591035675,
        end: 1592918400,
        group_id: '00004'
    },
    {
        id: 'item-0501',
        title: 'VERSION 0501',
        start: 1599935675,
        end: 1602018400,
        group_id: '00005'
    },
    {
        id: 'item-0502',
        title: 'VERSION 0502',
        start: 1591035675,
        end: 1594018400,
        group_id: '00005'
    },
    {
        id: 'item-0503',
        title: 'VERSION 0503',
        start: 1595035675,
        end: 1599018400,
        group_id: '00005'
    },
    {
        id: 'item-0601',
        title: 'VERSION 0601',
        start: 1591035675,
        end: 1592918400,
        group_id: '00006'
    },
    {
        id: 'item-0701',
        title: 'VERSION 0701',
        start: 1599935675,
        end: 1602018400,
        group_id: '00007'
    },
    {
        id: 'item-0802',
        title: 'VERSION 0802',
        start: 1591035675,
        end: 1594018400,
        group_id: '00008'
    },
    {
        id: 'item-0903',
        title: 'VERSION 0903',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0904',
        title: 'VERSION 0904',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0905',
        title: 'VERSION 0905',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0906',
        title: 'VERSION 0906',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0907',
        title: 'VERSION 0907',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0908',
        title: 'VERSION 0908',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0909',
        title: 'VERSION 0909',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0913',
        title: 'VERSION 0913',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0914',
        title: 'VERSION 0914',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0915',
        title: 'VERSION 0915',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0916',
        title: 'VERSION 0916',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0917',
        title: 'VERSION 0917',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0918',
        title: 'VERSION 0918',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
    {
        id: 'item-0919',
        title: 'VERSION 0919',
        start: 1595035675,
        end: 1609018400,
        group_id: '00009'
    },
];
