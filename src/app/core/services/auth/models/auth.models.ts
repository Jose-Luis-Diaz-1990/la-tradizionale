/*Se definen las interfaces de Usuarios y respuesta del API una vez que se identifican*/
export interface IUser {
    _id:string;
   email:string;
   password:string | null;
   name: string;
   surnames: string;
   address: string;
   postaCode: string;
   city: string;
   createdAt?:string;
   updatedAt?:string;
   __v?:string;
}

export interface IUserSignInResponse {
   user:IUser;
   token:string;
}