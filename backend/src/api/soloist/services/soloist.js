'use strict';

/**
 * soloist service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::soloist.soloist');
