/*
 * Copyright (c) 2019 OralEye Ltd.
 */

import { toast } from 'react-toastify/index'
import styles from './styles.css'

const { success, error, info } = toast

const defaultProps = {
  hideProgressBar: true,
  autoClose: 5000
}

export const successNotification = (title, params = {}) => success(title, { className: styles['success-toast'], ...defaultProps, ...params })
export const errorNotification = (title, params = {}) => error(title, { className: styles['error-toast'], ...defaultProps, ...params })
export const infoNotification = (title, params = {}) => info(title, { className: styles['info-toast'], ...defaultProps, ...params })

export default {
  successNotification,
  errorNotification,
  infoNotification
}
