import { HttpException } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime';

type ApiResponseProps = {
	data?: any;
	status?: number;
	error?: any;
	message?: string;
};

// export function apiResponse(response, status: StatusType = 'SE', message?: any): any {
export function apiResponse<T = any>({ data, status = 200, error, message }: ApiResponseProps) {
	let messageStr = message;

	if (error?.constructor?.name === 'PrismaClientValidationError') {
		messageStr = error?.message;
	}

	if (error instanceof TypeError || (error instanceof Error && !(error instanceof HttpException))) {
		status = 500;
	} else if (error) {
		status = error?.status ?? 500;
		messageStr = error?.message;
	}

	if (error?.statusCode == 413) {
		messageStr = 'File too large';
	}

	if (error || status >= 400) {
		const exp = new HttpException(
			{
				status: error?.status || status,
				message: messageStr,
			},
			status
		);

		return exp as any;
	} else {
		return data;
	}
}
