interface Branch {
    id: number;
    name: string;
    logo: string;
    image: string;
    slug: string;
    address: string;
}

interface Service {
    id: number;
    name: string;
    title: string;
    price: string;
    duration: number;
    category_name: string;
    branch: Branch;
    employees: Employee[];
}

interface Employee {
    id: number;
    username: string;
    image: string;
    first_name: string;
    ratings: any[]; // Assuming ratings have a specific structure, replace any with appropriate type
    records: Record[];
}

interface Record {
    record_start_datetime: string;
    record_end_datetime: string;
}

interface Client {
    id: number;
    first_name: string;
    last_name: string | null;
    phone: string;
    email: string;
}

interface EmployeeInfo {
    id: number;
    username: string;
    email: string;
    branch: Branch;
}

export interface RecordView {
    id: number;
    uuid: string;
    record_start_datetime: string;
    record_end_datetime: string;
    branch: Branch;
    services: Service[];
    client: Client;
    thank_you_text: string;
    employee: EmployeeInfo;
}