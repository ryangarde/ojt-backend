import { ApiProperty } from '@nestjs/swagger';

export class IncorrectPasswordEntity {
	@ApiProperty({ example: 400, description: 'Status code' })
	status: number;

	@ApiProperty({ example: 'Incorrect password', description: 'Message' })
	message: string;
}

export class UnauthorizedEntity {
	@ApiProperty({ example: 401, description: 'Status code' })
	status: number;

	@ApiProperty({ example: 'Unauthorized', description: 'Message' })
	message: string;
}

export class UserNotFoundEntity {
	@ApiProperty({ example: 404, description: 'Status code' })
	status: number;

	@ApiProperty({ example: 'User not found', description: 'Message' })
	message: string;
}

export class UserExistEntity {
	@ApiProperty({ example: 400, description: 'Status code' })
	status: number;

	@ApiProperty({ example: 'User already exists', description: 'Message' })
	message: string;
}

export class NotFoundEntity {
	@ApiProperty({ example: 404, description: 'Status code' })
	status: number;

	@ApiProperty({ example: 'Not found', description: 'Message' })
	message: string;
}
