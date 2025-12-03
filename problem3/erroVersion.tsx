// lack of blockchain property to this interface
interface WalletBalance {
  currency: string;
  amount: number;
  //blockchain: string;
}

// cause this interface have similar structure to WalletBalance we can extend it
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// i am not sure about BoxProps but i think it lack of children prop
interface Props extends BoxProps {
  //children?: React.ReactNode;
}
// need to be export ?
const WalletPage: React.FC<Props> = (props: Props) => {
  // the children prop is not used
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // put this function outside or better should import it from utils cause it just helper function good for performance
  // don't use any type it should be string in this case
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return (
      balances
        // don't need add type balance: WalletBalance here cause balances is already typed in useWalletBalances hook
        .filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
          // lhsPriority is not defined we can replace it with balancePriority
          // nested condition is not needed
          if (lhsPriority > -99) {
            // should be balance.amount > 0
            if (balance.amount <= 0) {
              return true;
            }
            // should return false here?
          }
          return false;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
          // they are equal return 0
        })
    );
    // the price dependency is not used in the function body so we can remove it from dependency array
  }, [balances, prices]);

  // this map can combine with above useMemo
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // we should use formattedBalances here instead of sortedBalances
  // we should add useMemo to optimize performance
  // should not use array index as key if possible
  //  this map can combine with above useMemo
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
