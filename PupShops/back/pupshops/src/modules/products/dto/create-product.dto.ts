import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Categories } from "../../categories/categories.entity";

export class CreateProductDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    name:string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    imgUrl: string;

    @IsNumber()
    stock: number;

    @IsOptional()
    category?: string; //no sé

    @IsOptional()
    @IsString()
    waist?: string;

    @IsOptional()
    @IsString()
    weight?: string;



}
