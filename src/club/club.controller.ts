import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put
} from '@nestjs/common';
import {ClubService} from './club.service';
import {ClubDto} from './dto/club.dto';
import {ClubEntity} from '../entities/club.entity';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('club')
@Controller('club')
export class ClubController {
    constructor(private readonly clubService: ClubService) {
    }

    @Post()
    createClub(@Body() clubDto: ClubDto): Promise<ClubEntity> {
        return this.clubService.create(clubDto);
    }

    @Get()
    getAllClubs(): Promise<ClubEntity[]> {
        return this.clubService.findAllClubs();
    }

    @Get(':id')
    getClubById(@Param('id', ParseIntPipe) id: number): Promise<ClubEntity> {
        return this.clubService.findClubById(id);
    }

    @Put(':id')
    updateClub(
        @Param('id', ParseIntPipe) id: number,
        @Body() clubDto: ClubDto,
    ): Promise<string> {
        return this.clubService.update(id, clubDto);
    }

    @Delete(':id')
    deleteClub(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.clubService.delete(id);
    }
}
