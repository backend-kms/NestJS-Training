import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
    ) { }

    async getAllBoards(
        user: User
    ): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id })

        const boards = await query.getMany();

        return boards;
    }
    // getAllBoards(): Board[] {
    //   return this.boards;
    // }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    // createBoard(createBoardDto: createBoardDto) {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     };

    //     this.boards.push(board);
    //     return board;
    // }

    async getBoardById(id: number): Promise<Board> {

        const found = await this.boardRepository.findOne({ where: { id } });


        if (!found) {
            throw new NotFoundException(`Can't find with id ${id} `);
        }

        return found;
    }

    // getBoardByID(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     if (!found) {
    //         throw new NotFoundException(`원하는 에러 메세지 입력: id와 일치하는 게시물이 존재하지 않습니다. ${id}`)
    //     }
    //     return found
    // }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({ id, user: { id: user.id } });

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id} `);
        }
    }

    // //return값을 주지 않을 것이기 때문에 void 사용
    // deleteBoard(id: string): void {
    //     const found = this.getBoardByID(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardByID(id);
    //     board.status = status;
    //     return board;
    // }
}