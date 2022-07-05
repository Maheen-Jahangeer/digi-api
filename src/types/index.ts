export interface ResponseProps {
    status?: String
    result?: String | JSON
    error?: {
        errorCode?: String
        message?: String
    }
}
