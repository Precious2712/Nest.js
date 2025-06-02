import {
    Body,
    Controller,
    Post,
    Param,
    Get,
    NotFoundException
} from "@nestjs/common";
import { WalletService } from "./wallet.service";

@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @Post()
    async createUserData(@Body() body: any) {
        try {
            const { _id, ...createWalletDto } = body;
            return this.walletService.createUserWallet(createWalletDto, _id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get('/user/:userId')
    async getWallet(@Param('userId') userId: string) {
        try {
            return this.walletService.findAllByUserId(userId);
        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }
};