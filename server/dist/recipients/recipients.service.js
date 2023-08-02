"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const recipient_schema_1 = require("./schemas/recipient.schema");
let RecipientsService = exports.RecipientsService = class RecipientsService {
    constructor(recipientModel) {
        this.recipientModel = recipientModel;
    }
    async getAll() {
        return this.recipientModel.find().exec();
    }
    async getOne(id) {
        return this.recipientModel.findById(id);
    }
    async create(recipientDto) {
        const newRecipient = new this.recipientModel(recipientDto);
        return newRecipient.save();
    }
    async remove(id) {
        return this.recipientModel.findByIdAndRemove(id);
    }
    async update(id, recipientDto) {
        return this.recipientModel.findByIdAndUpdate(id, recipientDto, {
            new: true,
        });
    }
};
exports.RecipientsService = RecipientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(recipient_schema_1.Recipient.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RecipientsService);
//# sourceMappingURL=recipients.service.js.map