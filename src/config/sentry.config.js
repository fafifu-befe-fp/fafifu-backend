"use strict";
require("dotenv").config();

module.exports = {
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_TRACES_SAMPLE_RATE: process.env.SENTRY_TRACES_SAMPLE_RATE,
};
