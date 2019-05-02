import { getNotifyType } from "./notify_type";

describe("notifyType monthly", () => {
  it("4/30", async () => {
    const date = new Date(2019, 4, 30, 12, 55, 30);
    expect(await getNotifyType(date)).toBe("monthly");
  });
  it("5/31", async () => {
    const date = new Date(2019, 5, 31, 12, 55, 30);
    expect(await getNotifyType(date)).toBe("monthly");
  });
  it("not 5/30", async () => {
    const date = new Date(2019, 5, 30, 12, 55, 30);
    expect(await getNotifyType(date)).not.toBe("monthly");
  });
  it("not 6/1", async () => {
    const date = new Date(2019, 6, 1, 12, 55, 30);
    expect(await getNotifyType(date)).not.toBe("monthly");
  });
});

describe("notifyType weekly", () => {
  it("5/4", async () => {
    const date = new Date(2019, 5, 4, 0, 5, 10);
    expect(await getNotifyType(date)).toBe("weekly");
  });
  it("not 5/5", async () => {
    const date = new Date(2019, 5, 5, 0, 5, 10);
    expect(await getNotifyType(date)).not.toBe("weekly");
  });
});
