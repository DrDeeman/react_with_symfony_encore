export interface Poster{
    id:number,
    name:string,
    genre:string,
    raiting:number,
    logo:string
  }

  export interface TFilm extends Poster{
    description:string,
    duration:number
  }
  
  export type Media={
    films:Array<Poster>,
    serials:Array<Poster>,
    [index: string]:any
  }