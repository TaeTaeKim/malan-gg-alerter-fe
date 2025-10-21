/**
 * Convert item options to malan.gg query parameters
 * Based on the mapping from ItemCondition to MalanggBidRequest in the backend
 */
export function buildMalanggUrl(itemId, itemOptions = {}) {
  const baseUrl = `https://mapleland.gg/item/${itemId}`;
  const params = new URLSearchParams();

  // Price mapping
  if (itemOptions.lowPrice !== undefined && itemOptions.lowPrice !== null) {
    params.append("lowPrice", itemOptions.lowPrice.toString());
  }
  if (itemOptions.highPrice !== undefined && itemOptions.highPrice !== null) {
    params.append("highPrice", itemOptions.highPrice.toString());
  } else {
    params.append("highPrice", "9999999999");
  }

  // Stats mapping - each stat has low and high variants
  const statMappings = [
    { frontend: "int", backend: "incINT" },
    { frontend: "str", backend: "incSTR" },
    { frontend: "dex", backend: "incDEX" },
    { frontend: "luk", backend: "incLUK" },
    { frontend: "pad", backend: "incPAD" },
    { frontend: "mad", backend: "incMAD" },
    { frontend: "hapma", backend: "Hapma" },
    { frontend: "speed", backend: "incSpeed" },
    { frontend: "accuracy", backend: "incACC" },
    { frontend: "jump", backend: "incJump" },
    { frontend: "upgrade", backend: "Upgrade" },
  ];

  statMappings.forEach(({ frontend, backend }) => {
    // Low value (e.g., int -> lowincINT)
    if (itemOptions[frontend] !== undefined && itemOptions[frontend] !== null) {
      params.append(`low${backend}`, itemOptions[frontend].toString());
    }

    // High value (e.g., highINT -> highincINT)
    const highKey = `high${frontend.toUpperCase()}`;
    if (itemOptions[highKey] !== undefined && itemOptions[highKey] !== null) {
      params.append(`high${backend}`, itemOptions[highKey].toString());
    } else if (
      itemOptions[frontend] !== undefined &&
      itemOptions[frontend] !== null
    ) {
      // If no high value is set, use the same value as low (as per backend logic)
      params.append(`high${backend}`, itemOptions[frontend].toString());
    }
  });

  // Combined stats (합스탯) mapping
  if (itemOptions.hapStats && itemOptions.hapStats.length > 0) {
    // hapStatsName: join stat keys in uppercase (e.g., "STRDEXACC")
    const hapStatsName = itemOptions.hapStats
      .map(stat => stat.toUpperCase())
      .join('');
    params.append('hapStatsName', hapStatsName);

    // lowHapStatsValue
    if (itemOptions.combinedStat !== undefined && itemOptions.combinedStat !== null) {
      params.append('lowHapStatsValue', itemOptions.combinedStat.toString());
    }

    // highHapStatsValue
    if (itemOptions.highCOMBINEDSTAT !== undefined && itemOptions.highCOMBINEDSTAT !== null) {
      params.append('highHapStatsValue', itemOptions.highCOMBINEDSTAT.toString());
    } else if (itemOptions.combinedStat !== undefined && itemOptions.combinedStat !== null) {
      // If no high value is set, use the same value as low
      params.append('highHapStatsValue', itemOptions.combinedStat.toString());
    }
  }

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
