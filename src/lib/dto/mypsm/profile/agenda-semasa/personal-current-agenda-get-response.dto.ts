export interface GetPersonalCurrentAgendaResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    agendaList: AgendaList[];
}

export interface AgendaList {
    module:     string;
    agendaId:   string;
    agendaType: string;
    status:     string;
    remark:     string;
    requester:  string;
    date:       Date;
}
