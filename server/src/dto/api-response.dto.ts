import { ResponseMessageType } from "./enums/response-message-type.enum";

export class ApiResponse<T> {
    data: T | null;
    property?: any;
    message: ResponseMessageType;
    
    constructor(data: T | null = null, message: ResponseMessageType=ResponseMessageType.SUCCESS, property: any = null) {
      this.data = data;
      this.property = property;
      this.message = message;
    }
  }