import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) { }

    @Get()
    getAllTask(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }
    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards();
    // }


    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }


    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: createBoardDto
    // ): Board {
    //     return this.boardService.createBoard(createBoardDto);
    // }


    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    // @Get('/:id')
    // // localhost:5000?id=okweofowkefok 이런식은 Parameter -> Param 사용
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardService.getBoardByID(id);
    // }

    @Delete('/:id')
    // ParseIntPipe: 메소드로 오는 파라미터가 숫자로 잘 되어 오는지 확인하고, 그렇지 않으면 에러 발생 시킴
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.boardService.deleteBoard(id)
    }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardService.deleteBoard(id);
    // }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
        return this.boardService.updateBoardStatus(id, status);
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus): Board {
    //     return this.boardService.updateBoardStatus(id, status);
    // }
}
