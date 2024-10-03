import { ApiProperty, PickType } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "../../products/entities/product.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        example: [{ "id": "", "quantity": 1 }],
        description: "An array of product objects with id and quantity",
        isArray: true,
    })
    @IsArray()
    @ArrayMinSize(1)
    products: Array<{ id: string, quantity: number }>;
}

