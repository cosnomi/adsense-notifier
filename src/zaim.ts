import Zaim from "zaim";
type ZaimAuth = {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
};

export async function createZaimIncome(
  auth: ZaimAuth,
  amount: number,
  category_id: number,
  to_account_id: number
) {
  const zaim = new Zaim(auth);
  await zaim.createIncome({
    amount,
    category_id,
    to_account_id,
    comment: "Created by adsense-notifier"
  });
}
