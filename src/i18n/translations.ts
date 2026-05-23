export const locales = ['en', 'zh-tw', 'zh-cn'] as const;
export type Locale = (typeof locales)[number];

export const bcp47: Record<Locale, string> = {
  en: 'en',
  'zh-tw': 'zh-TW',
  'zh-cn': 'zh-CN',
};

const translations = {
  en: {
    site_title: 'PuzzleHints',
    nav_home: 'Games',
    games_heading: 'Puzzle Game Hints',
    games_subtitle: 'Step-by-step hints for every game. Reveal only what you need.',
    stages_heading: 'Stages',
    hints_heading: 'Hints',
    hint_reveal: 'Click to reveal',
    hint_intro: 'Click each hint to reveal it. Try the earlier hints before looking at later ones!',
    all_stages: 'All Stages',
    no_games: 'No games added yet.',
    no_stages: 'No stages added yet.',
    stage_label: 'Stage',
    stage_count: (n: number) => `${n} stage${n !== 1 ? 's' : ''}`,
    hint_count: (n: number) => `${n} hint${n !== 1 ? 's' : ''}`,
    meta_description: 'Puzzle game hints and walkthroughs',
    lang_label: { en: 'EN', 'zh-tw': '繁', 'zh-cn': '简' },
  },
  'zh-tw': {
    site_title: 'PuzzleHints',
    nav_home: '遊戲列表',
    games_heading: '解謎遊戲提示',
    games_subtitle: '每款遊戲的逐步提示，只看你需要的部分。',
    stages_heading: '關卡',
    hints_heading: '提示',
    hint_reveal: '點擊顯示提示',
    hint_intro: '點擊每個提示以顯示內容。建議先看前面的提示！',
    all_stages: '所有關卡',
    no_games: '尚未新增遊戲。',
    no_stages: '尚未新增關卡。',
    stage_label: '關卡',
    stage_count: (n: number) => `${n} 個關卡`,
    hint_count: (n: number) => `${n} 個提示`,
    meta_description: '解謎遊戲攻略與提示',
    lang_label: { en: 'EN', 'zh-tw': '繁', 'zh-cn': '简' },
  },
  'zh-cn': {
    site_title: 'PuzzleHints',
    nav_home: '游戏列表',
    games_heading: '解谜游戏提示',
    games_subtitle: '每款游戏的逐步提示，只看你需要的部分。',
    stages_heading: '关卡',
    hints_heading: '提示',
    hint_reveal: '点击显示提示',
    hint_intro: '点击每个提示以显示内容。建议先看前面的提示！',
    all_stages: '所有关卡',
    no_games: '尚未添加游戏。',
    no_stages: '尚未添加关卡。',
    stage_label: '关卡',
    stage_count: (n: number) => `${n} 个关卡`,
    hint_count: (n: number) => `${n} 个提示`,
    meta_description: '解谜游戏攻略与提示',
    lang_label: { en: 'EN', 'zh-tw': '繁', 'zh-cn': '简' },
  },
} as const;

export function useT(lang: Locale) {
  return translations[lang] ?? translations['en'];
}
