/*
 * Home Messages
 *
 * This contains all the text for the Home container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Home';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'TRADE WITH ME',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'TRADE WITH ME',
  },
  selectedItems: {
    id: `${scope}.selectedItems`,
    defaultMessage: 'CHỌN VẬT PHẨM MÀ BẠN MUỐN {action} TỪ KHO BÊN DƯỚI',
  },
  someThingWrong: {
    id: `${scope}.someThingWrong`,
    defaultMessage: 'Oopps!, Lỗi Bất ngờ đã xảy ra',
  },
  notLogin: {
    id: `${scope}.header`,
    defaultMessage: 'Bạn Chưa đăng nhập',
  },
  login: {
    id: `${scope}.header`,
    defaultMessage: 'ĐĂNG NHẬP THÔNG QUA STEAM',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Giá',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Tên',
  },
  hero: {
    id: `${scope}.hero`,
    defaultMessage: 'Hero',
  },
  rarity: {
    id: `${scope}.rarity`,
    defaultMessage: 'Rarity',
  },
  toTrade: {
    id: `${scope}.toTrade`,
    defaultMessage: 'Trao Đổi',
  },
  botFilter: {
    id: `${scope}.botFilter`,
    defaultMessage: 'Bộ lọc của Bot',
  },
  all: {
    id: `${scope}.all`,
    defaultMessage: 'Tất cả',
  },
  common: {
    id: `${scope}.common`,
    defaultMessage: 'Common',
  },
  Uncommon: {
    id: `${scope}.Uncommon`,
    defaultMessage: 'uncommon',
  },
  rare: {
    id: `${scope}.rare`,
    defaultMessage: 'Rare',
  },
  immortal: {
    id: `${scope}.immortal`,
    defaultMessage: 'Immortal',
  },
  mythical: {
    id: `${scope}.mythical`,
    defaultMessage: 'Mythical',
  },
  legendary: {
    id: `${scope}.legendary`,
    defaultMessage: 'Legendary',
  },
  arcana: {
    id: `${scope}.arcana`,
    defaultMessage: 'Arcana',
  },
  youReceive: {
    id: `${scope}.youReceive`,
    defaultMessage: 'Bạn Nhận được',
  },
  youOffer: {
    id: `${scope}.youOffer`,
    defaultMessage: 'Bạn Đề nghị',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Đăng Xuất',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Gửi',
  },
  tradeUrl: {
    id: `${scope}.tradeUrl`,
    defaultMessage: 'Link Trao Đổi',
  },
  tradeUrlModalTitle: {
    id: `${scope}.tradeUrlModalTitle`,
    defaultMessage: 'GỬI LINK TRAO ĐỔI',
  },
  getTradeUrl: {
    id: `${scope}.getTradeUrl`,
    defaultMessage: 'NHẬN LINK TRAO ĐỔI CỦA TÔI',
  },
  createOfferFail: {
    id: `${scope}.createOfferFail`,
    defaultMessage: 'KHÔNG THỂ TẠO GIAO DỊCH',
  },
  createOfferSuccess: {
    id: `${scope}.createOfferSuccess`,
    defaultMessage: 'GIAO DỊCH THÀNH CÔNG',
  },
  showMyOffer: {
    id: `${scope}.showMyOffer`,
    defaultMessage: 'XEM TRONG STEAM',
  },
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Đóng',
  },
  marketRate: {
    id: `${scope}.marketRate`,
    defaultMessage: 'Market Rate',
  },
  marketRate60: {
    id: `${scope}.marketRate85`,
    defaultMessage: '60%',
  },
  marketRate70: {
    id: `${scope}.marketRate85`,
    defaultMessage: '70%',
  },
  marketRate80: {
    id: `${scope}.marketRate85`,
    defaultMessage: '80%',
  },
  marketRate85: {
    id: `${scope}.marketRate85`,
    defaultMessage: '85%',
  },
  marketRate90: {
    id: `${scope}.marketRate90`,
    defaultMessage: '90%',
  },
  marketRate95: {
    id: `${scope}.marketRate95`,
    defaultMessage: '95%',
  },
  marketRate100: {
    id: `${scope}.marketRate100`,
    defaultMessage: '100%',
  },
  marketRate105: {
    id: `${scope}.marketRate105`,
    defaultMessage: '105%',
  },
  pendingOffer: {
    id: `${scope}.pendingOffer`,
    defaultMessage: 'Bạn đang có 1 giao dịch gian dở, vui lòng đợi',
  },
  lastOfferStatus: {
    id: `${scope}.lastOfferStatus`,
    defaultMessage: 'Trạng thái giao dịch gần nhất: ',
  },
  offerProcessing: {
    id: `${scope}.offerProcessing`,
    defaultMessage: 'Đang xử lý giao dịch của bạn, vui lòng đợi!',
  },
});
