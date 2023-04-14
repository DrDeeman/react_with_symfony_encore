export type Logo = {
    id:number,
    name:string,
    genre:string,
    raiting:number,
    logo:string
  }
  
  export type Media={
    films:Array<Logo>,
    serials:Array<Logo>,
    [index: string]:any
  }