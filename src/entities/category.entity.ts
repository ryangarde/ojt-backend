import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryEntity {
	@ApiProperty({ example: 1, description: 'Primary ID of the category' })
	id: number;

	@ApiProperty({ example: 'Category', description: 'Category name' })
	name: string;

	@ApiPropertyOptional({ example: '2023-05-19T18:37:19.186Z', description: 'Date created' })
	created_at: string;

	@ApiPropertyOptional({ example: '2023-05-19T18:37:19.186Z', description: 'Date updated' })
	updated_at: string;
}
