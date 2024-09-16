import { ApiProperty, PickType } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "../../products/entities/product.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        example: [{"id": ""}],
        description: "An array of product objects with at least one product",
        isArray: true,
    })
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>

}

//export class PostOrderDto extends PickType(CreateOrderDto, ['userId', 'products']){}
