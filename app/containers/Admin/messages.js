/*
 * Admin Messages
 *
 * This contains all the text for the Admin container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Admin';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'TẤT CẢ VẬT PHẨM',
  },
  reload: {
    id: `${scope}.reload`,
    defaultMessage: 'tải lại',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Chỉnh sửa',
  },
  authenticatedRequired: {
    id: `${scope}.authenticatedRequired`,
    defaultMessage: 'Tài Nguyên được bảo vệ',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Mật khẩu',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Gửi',
  },
  clearSession: {
    id: `${scope}.clearSession`,
    defaultMessage: 'Đăng xuất',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Huỷ',
  },
  updateDotaItemTitle: {
    id: `${scope}.updateDotaItemTitle`,
    defaultMessage: 'Cập nhật vật Phẩm Dota',
  },
});
