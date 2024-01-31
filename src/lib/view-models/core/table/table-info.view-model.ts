interface TableInfoViewModel{
    pageNum: number;
    pageSize: number;
    orderBy: string;
    orderType: string;
    totalData: number;
    totalPage: number;
    data: object[];
    selectedData: object[];
}