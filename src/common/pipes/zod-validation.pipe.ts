import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const zodError = result.error as ZodError;
      // map to readable errors
      const errors = zodError.errors.map((e) => ({ path: e.path.join('.'), message: e.message }));
      throw new BadRequestException({ message: 'Validation failed', errors });
    }
    return result.data;
  }
}
