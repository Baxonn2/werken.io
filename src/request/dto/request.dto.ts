import { IsDateString, IsIn, IsJSON, IsObject, IsOptional, IsUrl} from "class-validator";
import { availableRequestMethods } from "./request.entity";

export class CreateRequestDto {

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