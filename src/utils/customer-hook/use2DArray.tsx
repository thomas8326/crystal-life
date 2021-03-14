export default function use2DArray<T>(list: T[], subArrayCount: number) {
  const matrix: T[][] = [];

  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % subArrayCount === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }
  return matrix;
}
