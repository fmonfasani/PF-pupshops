import { IsEnum } from "class-validator";
import { TicketStatus } from "../ticket-status.enum";


export class UpdateTicketStatusDto {
    @IsEnum(TicketStatus)
    status: TicketStatus;
}