import { Body, Controller, Post, Request, Get, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, PickType, OmitType } from '@nestjs/swagger';
import { AuthEntity, UserEntity } from '@/entities/user.entity';
import { IncorrectPasswordEntity, UserExistEntity, UserNotFoundEntity } from '@/entities/response.entity';

@ApiTags('Auth')
@Controller('')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('login')
	@HttpCode(200)
	@ApiOperation({ summary: 'Login' })
	@ApiResponse({ status: 200, type: AuthEntity })
	@ApiResponse({ status: 400, type: IncorrectPasswordEntity })
	@ApiResponse({ status: 404, type: UserNotFoundEntity })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					type: 'string',
					example: 'email@gmail.com',
				},
				password: {
					type: 'string',
					example: 'password',
				},
			},
			required: ['email', 'password'],
		},
	})
	async login(@Body() body) {
		return this.authService.login(body);
	}

	@Public()
	@Post('register')
	@ApiOperation({ summary: 'Register' })
	@ApiResponse({ status: 201, type: AuthEntity })
	@ApiResponse({ status: 400, type: UserExistEntity })
	// @ApiBody({ type: PickType(UserEntity, ['email', 'name', 'password']) })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					type: 'string',
					example: 'email@gmail.com',
				},
				name: {
					type: 'string',
					example: 'My Name',
				},
				password: {
					type: 'string',
					example: 'password',
				},
			},
			required: ['email', 'name', 'password'],
		},
	})
	async register(@Body() body) {
		return this.authService.register(body);
	}

	@Get('profile')
	@ApiOperation({ summary: 'Profile' })
	@ApiResponse({ status: 200, type: OmitType(UserEntity, ['password']) })
	getProfile(@Request() { user }) {
		return {
			email: user.email,
			name: user.name,
			role: user.role.name,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};
	}
}
