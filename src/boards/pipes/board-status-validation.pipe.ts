import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

// 실제 요청을 받는 핸들러 쪽에 BoardStatusValidationPipe를 넣어줘야 함
export class BoardStatusValidationPipe implements PipeTransform {

    readonly statusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any) {
        // value -> {"status": "hello"} 이면 hello가 value
        // toUpperCase를 사용해서 문자열을 대문자로 변환
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`)
        }

        return value;
    }
    private isStatusValid(status: any) {
        // value값이 들어 있으면 index값 리턴, 없으면 -1 리턴
        const index = this.statusOptions.indexOf(status);
        return index !== -1
    }
}