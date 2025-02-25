import { IFormDataRequest } from "./IFormDataRequest";
import { IRequestQueue } from "./IRequestQueue";
import { IRestDelete } from "./IRestDelete";
import { IRestGet } from "./IRestGet";
import { IRestPatch } from "./IRestPatch";
import { IRestPost } from "./IRestPost";
import { IRestPut } from "./IRestPut";

export interface IRequester extends IRestPost, IRestGet, IRestDelete, IRestPut, IFormDataRequest, IRestPatch
//     IRequestQueue 
{ }
