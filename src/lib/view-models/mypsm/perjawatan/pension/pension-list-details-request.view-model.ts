
// request

export interface PensionTableFilter {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    Filter;
}

export interface Filter {
}

const requestBody: PensionTableFilter = {
    pageNum: 1,
    pageSize: 10,
    orderBy: 'createdAt',
    orderType: 'asc',
    filter: {},
};
