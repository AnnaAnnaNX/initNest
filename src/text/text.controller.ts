import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import TextService from './text.service';
import CreateTextDto from './dto/createText.dto';
import UpdateTextDto from './dto/updateText.dto';
 
@Controller('posts')
export default class TextController {
  constructor(
    private readonly postsService: TextService
  ) {}
 
  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }
 
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getTextById(Number(id));
  }
 
  @Post()
  async createPost(@Body() post: CreateTextDto) {
    return this.postsService.createText(post);
  }

 
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}