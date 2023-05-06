export function findTrendDirection(data: number[][]): "UP" | "DOWN" | "NONE" {
  if (data[0][4] < data[data.length - 1][4]) {
    return "UP";
  } else if (data[0][4] > data[data.length - 1][4]) {
    return "DOWN";
  } else {
    return "NONE";
  }
}

export function findPivots(data: number[][]): { 
  pivots: number[], 
} {
  let pivots: number[] = [];
  
  for (let i = 1; i < data.length - 1; i++) {
    const prev = data[i - 1][4];
    const curr = data[i][4];
    const next = data[i + 1][4];
    
    if (prev < curr && curr > next) {
      pivots.push(curr);
    } else if (prev > curr && curr < next) {
      pivots.push(curr);
    }
  }

  const sortedPivots = pivots.sort((a, b) => a - b);
  const midIndex = Math.floor(sortedPivots.length / 2);
  
  const support1 = sortedPivots[0];
  const resistance1 = sortedPivots[sortedPivots.length - 1];
  const midPivot = sortedPivots[midIndex];
  
  return {
    pivots: [support1, resistance1, midPivot]
  };
}



export function findMaxAndMinValues(data: number[][]): { 
  avg: number, 
  maxValue: number, 
  minValue: number 
} {
  let maxValue: number = Number.MIN_VALUE;
  let minValue: number = Number.MAX_VALUE;
  
  for (let i = 0; i < data.length; i++) {
    if (parseFloat(`${data[i][2]}`) > maxValue) {
      maxValue = parseFloat(`${data[i][2]}`);
    }
    if (parseFloat(`${data[i][3]}`) < minValue) {
      minValue = parseFloat(`${data[i][3]}`);
    }
  }
  
  return {
    maxValue,
    minValue,
    avg: (maxValue + minValue) / 2
  };
}

export function analyzeKlineData(data: number[][]): { 
  trendDirection: "UP" | "DOWN" | "NONE", 
  pivots: number[], 
  maxValue: number, 
  minValue: number 
} {
  const trendDirection = findTrendDirection(data);
  const {pivots} = findPivots(data);
  const {maxValue, minValue} = findMaxAndMinValues(data);
  
  return { 
    trendDirection, 
    pivots, 
    maxValue, 
    minValue 
  };
}
