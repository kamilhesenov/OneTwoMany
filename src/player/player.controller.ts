import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    ParseIntPipe,
    Put,
    Delete
} from '@nestjs/common';
import {PlayerService} from './player.service';
import {PlayerDto} from './dto/player.dto';
import {PlayerEntity} from '../entities/player.entity';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('player')
@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {
    }

    @Post()
    createPlayer(@Body() playerDto: PlayerDto): Promise<PlayerEntity> {
        return this.playerService.create(playerDto);
    }

    @Get()
    getAllPlayers(): Promise<PlayerEntity[]> {
        return this.playerService.findAllPlayers();
    }

    @Get(':id')
    getPlayerById(@Param('id', ParseIntPipe) id: number): Promise<PlayerEntity> {
        return this.playerService.findPlayerById(id);
    }

    @Put(':id')
    updatePlayer(
        @Param('id', ParseIntPipe) id: number,
        @Body() playerDto: PlayerDto,
    ): Promise<string> {
        return this.playerService.update(id, playerDto);
    }

    @Delete(':id')
    deletePlayer(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.playerService.delete(id);
    }
}
