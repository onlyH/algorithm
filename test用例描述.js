describe("数组旋转", () => {
  it("正常情况", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const k = 3;
    const res = [5, 6, 7, 1, 2, 3, 4];
    expect(rotateArray(arr, k)).toEqual(res);
  });
});
