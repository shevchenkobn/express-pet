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
exports.DiamondsCommon = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../../di/types");
const assessed_diamond_1 = require("../../../models/assessed-diamond");
const diamonds_repository_1 = require("../../../repositories/diamonds.repository");
const diamond_calculator_service_1 = require("../../../services/diamond-calculator.service");
let DiamondsCommon = class DiamondsCommon {
    constructor(calculator, diamonds) {
        this.calculator = calculator;
        this.diamonds = diamonds;
    }
    assessDiamond(nonAssessedDiamond) {
        const assessedDiamond = assessed_diamond_1.cloneAssessedDiamond(nonAssessedDiamond);
        assessedDiamond.price = this.calculator.calculatePrice(nonAssessedDiamond);
        return this.diamonds.saveAssessedDiamond(assessedDiamond);
    }
};
DiamondsCommon = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.Types.DiamondCalculator)),
    __param(1, inversify_1.inject(types_1.Types.DiamondRepository)),
    __metadata("design:paramtypes", [diamond_calculator_service_1.DiamondCalculatorService,
        diamonds_repository_1.DiamondsRepository])
], DiamondsCommon);
exports.DiamondsCommon = DiamondsCommon;
//# sourceMappingURL=diamonds.common.js.map