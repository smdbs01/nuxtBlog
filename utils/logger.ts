import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

/**
 * Logs an error message.
 *
 * @param {string} message - The error message to be logged
 * @return {void}
 */
export const error = (message: string): void => {
  logger.error(message);
};

/**
 * Logs the given message using the logger.info method.
 *
 * @param {string} message - The message to be logged
 * @return {void}
 */
export const info = (message: string): void => {
  logger.info(message);
};
