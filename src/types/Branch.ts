

  export interface Record {
    record_start_datetime: string;
    record_end_datetime: string;
  }


  
  
  export interface Employee {
    id: number;
    username: string;
    image: string;
    first_name: string;
    ratings: any[]; // Assuming ratings can be of any type
    records: Record[];
  }
  
  
  
  export interface Service {
    id: number;
    name: string;
    title: string;
    price: string;
    duration: number;
    category_name: string;
    branch: Branch;
    employees: Employee[];
  }
  
  
  export interface Branch {
    id: number;
    slug: string;
    name: string;
    address: string;
    image: string;
    logo: string;
    services: Service[];
  }
  