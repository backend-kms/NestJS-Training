import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from './dto/create-board-dto';

export class BoardRepository extends Repository<Board> {
    constructor(@InjectRepository(Board) private dataSource: DataSource) {
        super(Board, dataSource.manager) // 변경
        // super(Board, dataSource.createEntityManager()) // 삭제
    }
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {

        const { title, description } = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });

        await this.save(board)
        return board;
    }
}