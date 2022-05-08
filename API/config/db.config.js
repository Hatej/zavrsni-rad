export const HOST = "localhost";
export const USER = "postgres";
export const PASSWORD = "bazepodataka";
export const DB = "ZavrsniRad";
export const dialect = "postgres";
export const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};