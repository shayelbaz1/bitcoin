import {Move} from './move.interface'
export interface User {
  _id?:string,
  name: string,
  imgURL: string,
  coins: number,
  moves: Move[]
}