import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CartEntity {
	@ApiProperty({ example: 1, description: 'Primary ID of cart' })
	id: number;

	@ApiProperty({ example: 1, description: "User's id" })
	user_id: number;

	@ApiPropertyOptional({ example: '2023-05-19T18:37:19.186Z', description: 'Date created' })
	created_at: string;

	@ApiPropertyOptional({ example: '2023-05-19T18:37:19.186Z', description: 'Date updated' })
	updated_at: string;

	@ApiProperty({
		example: [
			{
				cart_id: 1,
				item_id: 1,
				item: {
					id: 1,
					name: 'Item 1',
					price: '10.00',
					description: 'Sample description',
					created_at: '2023-05-19T18:37:19.186Z',
					updated_at: '2023-05-19T18:37:19.186Z',
				},
			},
		],
		description: "Cart's items",
	})
	items: object[];
}
