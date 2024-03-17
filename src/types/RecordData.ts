export interface RecordData {
    uuid?: string;
    id?: string;
    record_start_datetime: string;
    record_end_datetime: string;
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
    branch_id: number;
    services_ids: number[];
    employee_id: number;
  }