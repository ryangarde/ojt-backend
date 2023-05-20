import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
	@ApiProperty({ example: 'My Name', description: "User's fullname" })
	name: string;

	@ApiProperty({ example: 'email@gmail.com', description: "User's email address" })
	email: string;

	@ApiProperty({ example: '12345', description: "User's password" })
	password: string;

	@ApiProperty({ example: 'user', description: 'Role of User, can either be user or admin' })
	role: string;

	@ApiProperty({ example: '2023-05-19T18:37:19.186Z', description: 'Date created' })
	created_at: string;

	@ApiProperty({ example: '2023-05-19T18:37:19.186Z', description: 'Date updated' })
	updated_at: string;
}

export class AuthEntity {
	@ApiProperty({
		example: {
			email: 'email@gmail.com',
			name: 'My Name',
			role: 'user',
			created_at: '2023-05-19T18:37:19.186Z',
			updated_at: '2023-05-19T18:37:19.186Z',
		},
		description: "User's fullname",
	})
	user: object;

	@ApiProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyeWFuZ2FyZGUxMkBnbWFpbC5jb20iLCJuYW1lIjoiUnlhbiIsInBhc3N3b3JkIjoiJDJiJDEwJFBPWXNzV2o0QktjSnFPTTVDRW5RU3VoN0lmR2w3VzZtNlp4RmlxbVA4NlFBZnVuWC9ZOE1LIiwicm9sZV9pZCI6MiwiY3JlYXRlZF9hdCI6IjIwMjMtMDUtMTlUMTg6Mzc6MDguNDE2WiIsInVwZGF0ZWRfYXQiOiIyMDIzLTA1LTE5VDE4OjM3OjA4LjQxNloiLCJyb2xlIjp7ImlkIjoyLCJuYW1lIjoidXNlciIsImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTE5VDE4OjM2OjU0LjcwMloiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNS0xOVQxODozNjo1NC43MDJaIn0sImlhdCI6MTY4NDUyMTQyOCwiZXhwIjoxNjg0NTUwMjI4fQ.kN8z8iDX8OhinZWDdJdLNXAFhsNLvVwC2oQdnpC3H1E',
		description: 'JWT Token',
	})
	access_token: string;
}
