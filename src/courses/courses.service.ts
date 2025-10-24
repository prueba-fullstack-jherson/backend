import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Course } from './course.model';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  // Using the Course model directly (sequelize-typescript is initialized in main.ts)
  constructor() {}

  async create(data: CreateCourseDto) {
    try {
      const course = await Course.create(data as any);
      return course;
    } catch (err) {
      throw new InternalServerErrorException('Failed to create course');
    }
  }

  async findAll() {
    return Course.findAll();
  }

  async findOne(id: number) {
    const course = await Course.findByPk(id);
    if (!course) throw new NotFoundException(`Course with id ${id} not found`);
    return course;
  }

  async update(id: number, data: UpdateCourseDto) {
    const course = await Course.findByPk(id);
    if (!course) throw new NotFoundException(`Course with id ${id} not found`);
    try {
      await course.update(data as any);
      return course;
    } catch (err) {
      throw new InternalServerErrorException('Failed to update course');
    }
  }

  async remove(id: number) {
    const course = await Course.findByPk(id);
    if (!course) throw new NotFoundException(`Course with id ${id} not found`);
    await course.destroy();
    return { deleted: true };
  }
}
