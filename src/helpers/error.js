export class ServiceError extends Error {
  constructor(options) {
    super(options.message || 'Something went wrong!')

    this.name = 'ServiceError'
    // this.details = options.details || []
    this.details = options.errors || []
    this.rootError = options.rootError || null
  }
}
