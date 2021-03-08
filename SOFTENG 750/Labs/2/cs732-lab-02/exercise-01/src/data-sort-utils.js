import dayjs from 'dayjs';

const numericCompare = (c1, c2, prop) => c1[prop] - c2[prop];
const stringCompare = (c1, c2, prop) => c1[prop].localeCompare(c2[prop]);
const dateCompare = (c1, c2, prop) => dayjs(c1[prop]).toDate().valueOf() - dayjs(c2[prop]).toDate().valueOf()
const makeSortFunc = (prop, func) => (c1, c2) => func(c1, c2, prop);

export const membershipTiers = {
    'Bronze': 0,
    'Silver': 1,
    'Gold': 2,
    'Platinum': 3
}

export function isActive(customer) {
    return dayjs().isBefore(customer.membershipExpires);
}

export function sortCustomers(customers, sortProperty, sortDirection) {
    if (sortProperty === 'none' || sortDirection === 'none') {
        return customers;
    }

    const sorted = [...customers];

    switch (sortProperty) {

        // numeric comparisons
        case 'id':
            sorted.sort(makeSortFunc(sortProperty, numericCompare))
            break;

        // string comparisons
        case 'firstName':
        case 'lastName':
            sorted.sort(makeSortFunc(sortProperty, stringCompare))
            break;

        // date comparisons
        case 'dob':
        case 'membershipExpires':
            sorted.sort(makeSortFunc(sortProperty, dateCompare))
            break;

        // Special comparisons
        case 'isActive':
            sorted.sort((c1, c2) => (isActive(c1) ? 0 : 1) - (isActive(c2) ? 0 : 1))
            break;

        case 'membershipTier':
            sorted.sort((c1, c2) => membershipTiers[c1.membershipTier] - membershipTiers[c2.membershipTier])
            break;

        // default
        default:
            sorted.sort();
            break;
    }

    if (sortDirection === 'desc') {
        sorted.reverse();
    }

    return sorted;
}