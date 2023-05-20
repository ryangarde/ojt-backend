import { ApiProperty } from '@nestjs/swagger';

export class ItemImageEntity {
	@ApiProperty({ example: 1, description: 'Primary ID of the image' })
	id: number;

	@ApiProperty({ example: 'Item 1', description: 'Image file or base 64 string', type: 'file' })
	name: string;

	@ApiProperty({ example: 1, description: 'The id of the image' })
	item_id: number;

	@ApiProperty({ example: '2023-05-19T18:37:19.186Z', description: 'Date created' })
	created_at: string;

	@ApiProperty({ example: '2023-05-19T18:37:19.186Z', description: 'Date updated' })
	updated_at: string;
}
