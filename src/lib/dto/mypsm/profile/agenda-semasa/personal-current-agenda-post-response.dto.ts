export interface PostPersonalCurrentAgendaResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    totalData:  number;
    totalPage:  null;
    agendaList: AgendaList[];
}

export interface AgendaList {
    agendaId:   string;
    agendaType: string;
    status:     string;
    remark:     string;
}
