import {Http} from './Api'

export const get = (extraParams = {}) => Http.get('/cpfs.json')
