import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV();

export const STORAGE_KEYS = {
    THEME: 'reader_theme',
    FONT_SIZE: 'reader_font_size',
};
