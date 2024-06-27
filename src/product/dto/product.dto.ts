import { IsNumber, IsString } from 'class-validator'

export class ProductDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsNumber()
	price: number

	@IsString()
	brand: string

	@IsNumber()
	mainCamera: number

	@IsNumber()
	frontCamera: number

	@IsNumber()
	batteryCapacity: number

	@IsString()
	CPU: string

	@IsString()
	GPU: string

	@IsString()
	image: string

	@IsString()
	categoryId: string
}
