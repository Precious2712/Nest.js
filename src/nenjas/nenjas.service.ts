import { Injectable } from '@nestjs/common';
import { CreateNenjaDto } from './dto/create-nenja.dto';
import { UpdateNenjasDto } from './dto/update-nenja.dto';

@Injectable()
export class NenjasService {
    products = [
        { phone: "iPhone 15", price: 999, color: "Black" },
        { phone: "Samsung Galaxy S23", price: 899, color: "White" },
        { phone: "Google Pixel 8", price: 799, color: "Obsidian" },
        { phone: "OnePlus 11", price: 749, color: "Green" },
        { phone: "Xiaomi 13 Pro", price: 699, color: "Blue" },
        { phone: "Sony Xperia 5 V", price: 849, color: "Gray" },
        { phone: "Motorola Edge+", price: 799, color: "Red" },
        { phone: "Asus ROG Phone 7", price: 1099, color: "Black" },
        { phone: "Nokia X30", price: 649, color: "Sky" },
        { phone: "Huawei P60 Pro", price: 899, color: "Silver" }
    ];

    find() {
        return this.products
    }
}