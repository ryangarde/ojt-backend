import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { ItemImage } from '@prisma/client';

export class ItemEntity {
	@ApiProperty({ example: 1, description: 'ID of the item' })
	id: number;

	@ApiProperty({ example: 'Item 1', description: 'Name of the item' })
	name: string;

	@ApiProperty({ example: 1, description: 'The id of the category' })
	category_id: number;

	@ApiProperty({ example: '10.00', description: 'Price of the item' })
	price: string;

	@ApiPropertyOptional({ example: 'Sample description', description: 'Description of the item' })
	description: string;

	@ApiPropertyOptional({ example: '2023-05-19T18:37:19.186Z', description: 'Date created' })
	created_at: string;

	@ApiPropertyOptional({ example: '2023-05-19T18:37:19.186Z', description: 'Date updated' })
	updated_at: string;

	@ApiPropertyOptional({
		example: [{ id: 1, name: 'image1.jpg', item_id: 1, created_at: '2023-05-19T18:37:19.186Z', updated_at: '2023-05-19T18:37:19.186Z' }],
		description: 'Images of the item',
	})
	images: ItemImage[];
}

export class ItemCreatePayload extends OmitType(ItemEntity, ['id', 'created_at', 'updated_at', 'images']) {
	@ApiProperty({
		example: [{ name: 'image1.jpg' }],
		description: 'Images of the item',
	})
	images: ItemImage[];
}

export class ItemUpdatePayload extends OmitType(ItemEntity, ['id', 'created_at', 'updated_at', 'images']) {
	@ApiProperty({
		example: [{ id: 1, name: 'image1.jpg' }],
		description: 'Images of the item',
	})
	images: ItemImage[];
}
