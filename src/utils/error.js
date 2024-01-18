export class ServiceError extends Error {
  constructor(options) {
    super(options.message || 'Something went wrong!')

    this.name = 'ServiceError'
    // this.details = options.details || []
    this.details = options.errors || []
    this.rootError = options.rootError || null
  }
}

export class CustomError extends Error {
  constructor(options) {
    super(options)

    this.name = 'Request failed'
    this.status = options?.status
    this.data = options.data
    this.message = this.#createMessage()
    this.messages = this.#createMessages()
  }

  #createMessage() {
    if (this.data?.errors && this.data.errors.length > 0) {
      return this.data.errors.map(({ detail }) => detail).join(',\n')
    }

    return this.data?.message ?? this.name
  }

  #createMessages() {
    return this.data?.errors ?? []
  }
}

export function errorToObject(error) {
  return {
    message: error.message,
    details: error.details
  }
}
