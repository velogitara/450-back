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
exports.RecipientsController = void 0;
const common_1 = require("@nestjs/common");
const create_recipient_dto_1 = require("./dto/create-recipient.dto");
const update_recipient_dto_1 = require("./dto/update-recipient.dto");
const recipients_service_1 = require("./recipients.service");
let RecipientsController = exports.RecipientsController = class RecipientsController {
    constructor(recipientService) {
        this.recipientService = recipientService;
    }
    getAll() {
        return this.recipientService.getAll();
    }
    getOne(id) {
        return this.recipientService.getOne(id);
    }
    create(createRecipientDto) {
        return this.recipientService.create(createRecipientDto);
    }
    remove(id) {
        return this.recipientService.remove(id);
    }
    update(updateRecipientDto, id) {
        return this.recipientService.update(id, updateRecipientDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipientsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipientsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipient_dto_1.CreateRecipientDto]),
    __metadata("design:returntype", Promise)
], RecipientsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipientsController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_recipient_dto_1.UpdateRecipientDto, String]),
    __metadata("design:returntype", Promise)
], RecipientsController.prototype, "update", null);
exports.RecipientsController = RecipientsController = __decorate([
    (0, common_1.Controller)('recipients'),
    __metadata("design:paramtypes", [recipients_service_1.RecipientsService])
], RecipientsController);
//# sourceMappingURL=recipients.controller.js.map