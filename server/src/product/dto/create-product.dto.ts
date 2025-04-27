import { IsArray, IsNotEmpty, IsNumber, IsString, IsUrl, Min, MinLength } from "class-validator"
import { isTypedArray } from "util/types"

export class CreateProductDto {
    @IsNotEmpty()
    @IsString({message: "Product should be provided with a valid name"})
    name: string

    @IsNumber({maxDecimalPlaces: 0}, {message: "Product qty should be an integer number"})
    @Min(0)
    qty: number
    @IsNumber({maxDecimalPlaces: 2}, {message: "Product price should be a number in format 0 or 0.00"})
    @Min(0)
    price: number

    @IsArray()
    @IsString({each: true})
    @MinLength(1, {each: true, message: "Product should be provided with at least one category",})
    categories: string[]

    @IsUrl({}, {message: "Product should be providade with a valid url string"})
    photo: string
}

