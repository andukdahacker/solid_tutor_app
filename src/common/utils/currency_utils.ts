class CurrencyUtils {
  static fromString(money: string) {
    const moneyToNum = Number.parseInt(money);

    return moneyToNum;
  }

  static format(money: number) {
    return Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
}

export default CurrencyUtils;
