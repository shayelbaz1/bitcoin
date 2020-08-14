import { utils } from '../services/utils.service'

export class Contact {

    constructor(
        public name: string = '',
        public imgURL: string = '',
        public email: string = '',
        public phone: string = '',
        public _id?: string
    ) { }

    setId?() {
        this._id = utils.makeId()
    }


}