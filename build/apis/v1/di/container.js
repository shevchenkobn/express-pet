"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiV1Di = void 0;
const container_1 = require("../../../di/container");
const di_1 = require("../../../lib/di");
const diamonds_common_1 = require("../services/diamonds.common");
const api_v1_types_1 = require("./api-v1.types");
class ApiV1Di extends di_1.Di {
    createContainer() {
        const container = container_1.di.getContainer().createChild({
            defaultScope: container_1.defaultScope,
            autoBindInjectable: true,
        });
        container
            .bind(api_v1_types_1.ApiV1Types.DiamondsCommon)
            .to(diamonds_common_1.DiamondsCommon);
        return container;
    }
    getBaseInitPromise() {
        return container_1.di.getContainerInitPromise();
    }
}
exports.apiV1Di = new ApiV1Di();
//# sourceMappingURL=container.js.map