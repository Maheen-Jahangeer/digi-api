import { ResponseProps } from '../types/index'

export const response = ({ status, result, error }: ResponseProps) => {
    return {
        status: status ? status : 'ok',
        result: result && result,
        error: error && {
            errorCode: error.errorCode,
            message: error.message,
        },
    }
}
