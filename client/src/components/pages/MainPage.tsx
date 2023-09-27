import { Button, Card, Spin } from "antd";
import { FC, useEffect, useMemo } from "react";
import {
  useCreateCardMutation,
  useGetCardsQuery,
} from "../../redux/api/card.api";
import { useGetCurrenciesQuery } from "../../redux/api/currency.api";
import { genRandomNumber } from "../../utils/math";
import { queryWrapper } from "../../utils/queryWrapper";

export const MainPage: FC = () => {
  const {
    data: cards,
    isLoading: isLoadingCards,
    isSuccess: isSuccessCards,
    refetch,
  } = useGetCardsQuery({});

  const {
    data: currency,
    isLoading: isLoadingCurrency,
    isSuccess: isSuccessCurrency,
  } = useGetCurrenciesQuery({});

  const [
    createCard,
    { isLoading: isLoadingCreateCard, isSuccess: isSuccessCreateCard },
  ] = useCreateCardMutation();

  const isShowLoader = useMemo(
    () => isLoadingCards || isLoadingCreateCard || isLoadingCurrency,
    [isLoadingCards, isLoadingCreateCard, isLoadingCurrency]
  );

  const isSuccess = useMemo(
    () => isSuccessCurrency || isSuccessCards,
    [isSuccessCurrency, isSuccessCards]
  );

  useEffect(() => {
    if (isSuccessCreateCard) {
      refetch();
    }
  }, [isSuccessCreateCard, refetch]);

  const handleAddCard = async () => {
    const randomStoreId = genRandomNumber(3);
    const randomCurrencyIndex = genRandomNumber(currency?.data.length - 1);
    const randomCurrencyId = currency?.data[randomCurrencyIndex].id;

    await queryWrapper(
      async () => {
        return await createCard({
          storeId: randomStoreId,
          type: "qr",
          currencyId: randomCurrencyId,
        }).unwrap();
      },
      true,
      false
    );
  };

  const cardList = useMemo(() => {
    return (
      cards?.data !== 0 &&
      cards?.data.map((card) => {
        const currencyName = currency?.data.find(
          (currency) => currency.id === card.currencyId
        ).name;

        return (
          <Card key={card.id} size="small" style={{ width: 300 }}>
            <div>Your card id - {card.id}</div>
            <div>
              Amount - {card.amount} {currencyName}
            </div>
            <div>Type - {card.type} card</div>
          </Card>
        );
      })
    );
  }, [cards?.data, currency?.data]);

  if (isShowLoader) {
    return (
      <Spin
        size="large"
        spinning={true}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {isSuccess && cardList}

      <Card size="small" style={{ width: 92 }}>
        <Button
          type="primary"
          style={{ width: "100%" }}
          onClick={handleAddCard}
        >
          +
        </Button>
      </Card>
    </div>
  );
};
