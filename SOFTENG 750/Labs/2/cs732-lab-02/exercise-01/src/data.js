import dayjs from 'dayjs';

/**
 * Contains some dummy customer data.
 */
export const initialCustomers = [
    {
        id: 1,
        firstName: 'Genevieve',
        lastName: 'Floyd',
        dob: dayjs('1986-03-17'),
        membershipExpires: dayjs().add(3, 'days'),
        membershipTier: 'Gold'
    },
    {
        id: 2,
        firstName: 'Franklin',
        lastName: 'Hart',
        dob: dayjs('1998-10-10'),
        membershipExpires: dayjs().subtract(1, 'month'),
        membershipTier: 'Silver'
    },
    {
        id: 3,
        firstName: 'Zelda',
        lastName: 'Barlow',
        dob: dayjs('1991-12-03'),
        membershipExpires: dayjs().add(2, 'years'),
        membershipTier: 'Platinum'
    },
    {
        id: 4,
        firstName: 'Roderick',
        lastName: 'Kennedy',
        dob: dayjs('1981-01-03'),
        membershipExpires: dayjs().subtract(4, 'years'),
        membershipTier: 'Gold'
    },
    {
        id: 5,
        firstName: 'Cecil',
        lastName: 'Pearce',
        dob: dayjs('2001-01-07'),
        membershipExpires: dayjs().subtract(1, 'days'),
        membershipTier: 'Platinum'
    },
    {
        id: 6,
        firstName: 'Isabella',
        lastName: 'Ramsey',
        dob: dayjs('1989-04-23'),
        membershipExpires: dayjs().add(3, 'weeks'),
        membershipTier: 'Bronze'
    }
];