export interface CommonField{
    email:string,
    password:string
    role:"student"|"employer"|"admin"
}

export interface User extends CommonField{
    name:string
}

export interface Employer extends CommonField{
    companyname:string
}