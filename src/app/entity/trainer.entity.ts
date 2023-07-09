export interface ITrainerProfile {
    services: string[];
    description: string;
    tags: string[];
    experience: number;
    mode: string[];
}

export interface ITrainerAvailableDate{
    date: Date;
    time: string[];
}

export interface ITagArray{
    tags: string[];
}