class UrlUtils {
  sanitizeHttp(value: string): string {
    if (!(value.startsWith('http://') || value.startsWith('https://'))) {
      return 'http://' + value
    }
    return value
  }

  baseUrl(): string {
    const host = process.env.HOST || 'localhost'
    const port = process.env.PORT || '4000'
    return process.env.BASE_URL || `http://${host}:${port}`
  }
}

export default new UrlUtils()
