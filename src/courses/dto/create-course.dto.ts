import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const createCourseSchema = z.object({
  name: z.string().min(1, 'name is required'),
  description: z.string().optional(),
  level: z.string().optional(),
  duration: z.number().int().nonnegative().optional(),
});

export const updateCourseSchema = createCourseSchema.partial();

export type CreateCourseDto = z.infer<typeof createCourseSchema>;
export type UpdateCourseDto = z.infer<typeof updateCourseSchema>;

// Clases para Swagger documentation
export class CreateCourseSwaggerDto {
  @ApiProperty({ description: 'Nombre del curso', example: 'Introducción a NestJS' })
  name: string;

  @ApiProperty({ description: 'Descripción del curso', example: 'Curso completo de NestJS', required: false })
  description?: string;

  @ApiProperty({ description: 'Nivel del curso', example: 'Beginner', required: false })
  level?: string;

  @ApiProperty({ description: 'Duración en horas', example: 40, required: false })
  duration?: number;
}

export class UpdateCourseSwaggerDto {
  @ApiProperty({ description: 'Nombre del curso', example: 'Introducción a NestJS', required: false })
  name?: string;

  @ApiProperty({ description: 'Descripción del curso', example: 'Curso completo de NestJS', required: false })
  description?: string;

  @ApiProperty({ description: 'Nivel del curso', example: 'Beginner', required: false })
  level?: string;

  @ApiProperty({ description: 'Duración en horas', example: 40, required: false })
  duration?: number;
}
