import { IsDateString, IsIn, IsJSON, IsObject, IsOptional, IsString, IsUrl} from "class-validator";
import { availableRequestMethods } from "./message.entities";

export class CreateRequestMessageDto {

    @IsUrl()
    url: string;

    @IsObject()
    @IsOptional()
    headers?: Record<string, string>;

    @IsObject()
    @IsOptional()
    body?: Record<string, any>;

    @IsIn(availableRequestMethods)
    method: string;

    @IsDateString()
    sendAt: Date;
}