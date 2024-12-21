class FileSizeError extends Error {
  constructor(message) {
    super(message);
    this.name = "FileSizeError";
  }
}

module.exports = FileSizeError;
