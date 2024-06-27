import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductDto } from './dto/product.dto'
import { generateSlug } from 'src/utils/generate-slug'
import { returnProductObject } from './return-product.object'
import { CategoryService } from 'src/category/category.service'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private categoryService: CategoryService
	) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.search(searchTerm)

		return this.prisma.product.findMany({
			select: returnProductObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async search(searchTerm: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			},
			select: returnProductObject
		})
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug
			},
			select: returnProductObject
		})

		if (!product) throw new Error('Product not found')

		return product
	}

	async byCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: returnProductObject
		})

		if (!products) throw new Error('Products not found')

		return products
	}

	async create() {
		return this.prisma.product.create({
			data: {
				title: '',
				slug: '',
				image: '',
				description: '',
				price: 0,
				brand: '',
				mainCamera: 0,
				frontCamera: 0,
				batteryCapacity: 0,
				CPU: '',
				GPU: ''
			}
		})
	}

	async update(id: string, dto: ProductDto) {
		const {
			title,
			price,
			image,
			CPU,
			GPU,
			batteryCapacity,
			brand,
			categoryId,
			description,
			frontCamera,
			mainCamera
		} = dto

		await this.categoryService.byId(categoryId)

		return this.prisma.product.update({
			where: {
				id
			},
			data: {
				title,
				price,
				image,
				CPU,
				GPU,
				batteryCapacity,
				brand,
				description,
				frontCamera,
				mainCamera,
				slug: generateSlug(title),
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async delete(id: string) {
		return this.prisma.product.delete({
			where: {
				id
			}
		})
	}
}
