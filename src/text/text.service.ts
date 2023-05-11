import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateTextDto from './dto/createText.dto';
import UpdateTextDto from './dto/updateText.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Text from '../database/text.entity';
 
@Injectable()
export default class TextService {

  constructor(
    @InjectRepository(Text)
    private textRepository: Repository<Text>
  ) {}
 
  getAllPosts() {
    return this.textRepository.find();
  }
 
  async getTextById(id: number) {
    const text = await this.textRepository.findOne({});
    if (text) {
      return text;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
 
  async createText(text: CreateTextDto) {
    const newText = await this.textRepository.create(text);
    await this.textRepository.save(newText);
    return newText;
  }

  async updateText(id: number, post: UpdateTextDto) {
    await this.textRepository.update(id, post);
    const updatedText = await this.textRepository.findOne({});
    if (updatedText) {
      return updatedText
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
 
  async deletePost(id: number) {
    const deleteResponse = await this.textRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Text not found', HttpStatus.NOT_FOUND);
    }
  }
}