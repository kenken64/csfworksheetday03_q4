export class Registration {
    constructor(
        public firstName: string, 
        public lastName: string, 
        public phoneNumber1: number,
        public phoneNumber2: number,
        public phoneNumber3: number,
        public email: string,
        public eventAttending: number[],
        public spouseFirstName?: string, 
        public spouseLastName?: string, 
        public orderDVD?: string,
        public comments?: string,
    ){

    }
}