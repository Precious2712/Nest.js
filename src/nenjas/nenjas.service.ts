import { Injectable } from '@nestjs/common';
import { CreateNenjaDto } from './dto/create-nenja.dto';
import { UpdateNenjasDto } from './dto/update-nenja.dto';

@Injectable()
export class NenjasService {
    private ninjas = [
        { id: 0, name: 'top', price: 100, description: "comfortable on skin" },
        { id: 1, name: 'skirt', price: 100, description: "comfortable on female skin" },
    ];

    getNenjas(name?: string) {
        if (name) {
            return this.ninjas.filter((ninja) => ninja.name === name);
        }
        return this.ninjas;
    }

    getNenja(id: number) {
        const ninja = this.ninjas.find((ninja) => ninja.id === id);
        console.log('ninja', ninja);

        if (!ninja) {
            throw new Error('Ninja not found');
        }

        return ninja;
    }

    createNenjas(createNenjaDto: CreateNenjaDto) {
        const newNinja = {
            ...createNenjaDto,
            id: Date.now(),
        }
        this.ninjas.push(newNinja)

        return newNinja;
    }

    // updateNenjas(id: number, updateNenjaDto: UpdateNenjasDto) {
    //     this.ninjas = this.ninjas.map((el) => {
    //         if (el.id === id) {
    //             return { ...el, ...updateNenjaDto }
    //         }
    //         return el;
    //     })

    //     return this.getNenja(id)
    // }

    updateNenjas(id: number, updateNenjaDto: UpdateNenjasDto) {
        // Check if ninja exists before updating
        const existingNinja = this.getNenja(id);
        if (!existingNinja) {
            throw new Error(`Ninja with ID ${id} not found`);
        }

        this.ninjas = this.ninjas.map((el) =>
            el.id === id ? { ...el, ...updateNenjaDto } : el
        );

        return this.getNenja(id); // Return updated ninja
    }

    removeNenja(id: number) {
        const toBeRemoved = this.getNenja(id);

        this.ninjas = this.ninjas.filter((el) => el.id === id);

        return toBeRemoved;
    }
}
