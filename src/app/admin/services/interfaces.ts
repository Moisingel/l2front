import { Time } from "@angular/common";

export interface ResponseBackend {
    data: DataBase;
    success: boolean;
}

export interface ErrorBackend {
    error: string;
    success: boolean;
}

export interface DataBase {
    animales: Animal[];
    lugares: Lugar[];
    tipos: Tipo[];
    razas: Raza[];
    responsables: Responsable[];
    antecedentes: Antecedente[];
    //usuarios: Usuario[];
}

export interface Animal {
    id : number;
    codigo : string;
    nombre : string;
    sexo: string;
    fecha_nacimiento: Date;
    hora_nacimiento: Time;
    tipo_id: number;
    tipo: Tipo;
    raza_id: number;
    raza: Raza;
    lugar_id?: number;
    lugar?: Lugar;
    madre_id?: number;
    madre?: Animal;
    padre_id?: number;
    padre?: Animal;
    antecedentes?: Antecedente[];
    hijos?: Animal[];
}

export interface Tipo {
    id: number;
    nombre: string;
}

export interface Raza {
    id: number;
    nombre: string;
}

export interface Lugar {
    id: number;
    nombre: string;
}

export interface Responsable {
    id: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno?: string;
    dni: string;
    password: string;
    telefono: string;
}

export interface Antecedente {
    id: number;
    fecha: Date;
    hora: Time;
    diagnostico: string;
    tratamiento: string;
    cantidad: number;
    unidad: string;
    peso: number;
    animal_id: number;
    animal?: Animal;
    responsable_id: number;
    responsable?: Responsable;
}