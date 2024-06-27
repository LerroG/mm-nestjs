import { Prisma } from '@prisma/client'
import { returnCategoryObject } from 'src/category/return-category.object'

export const returnProductObject: Prisma.ProductSelect = {
	id: true,
	title: true,
	slug: true,
	description: true,
	price: true,
	brand: true,
	mainCamera: true,
	frontCamera: true,
	batteryCapacity: true,
	CPU: true,
	GPU: true,
	image: true,
	createdAt: true,
	category: { select: returnCategoryObject }
}
