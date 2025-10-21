export const itemOptions = [
  { key: "highPrice", label: "최고가격" },
  { key: "lowPrice", label: "최저가격" },
  { key: "str", label: "힘" },
  { key: "dex", label: "민첩" },
  { key: "int", label: "인트" },
  { key: "luk", label: "럭" },
  { key: "upgrade", label: "작횟수" },
  { key: "pad", label: "공격력" },
  { key: "mad", label: "마력" },
  { key: "hapma", label: "합마" },
  { key: "accuracy", label: "명중" },
  { key: "speed", label: "이속" },
  { key: "jump", label: "점프" },
  { key: "pdd", label: "물방" },
  { key: "mdd", label: "마방" },
  { key: "eva", label: "회피" },
  { key: "mhp", label: "HP" },
  { key: "mmp", label: "MP" },
];

// Combined stats (합스탯) configuration
// These stats can be combined and tracked as a sum
export const combinedStatOptions = [
  { key: 'str', label: '힘' },
  { key: 'dex', label: '민첩' },
  { key: 'int', label: '인트' },
  { key: 'luk', label: '럭' },
  { key: 'acc', label: '명중' }
];

// Helper function to toggle combined stat selection
// This can be used by any component that needs combined stats functionality
export function createCombinedStatToggle(selectedStatsRef) {
  return function toggleCombinedStat(statKey) {
    const index = selectedStatsRef.value.indexOf(statKey);
    if (index > -1) {
      selectedStatsRef.value.splice(index, 1);
    } else {
      selectedStatsRef.value.push(statKey);
    }
  };
}
