//Native
import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory-native";

//DataBase
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";

//Components
import { HistoryCard } from "../../components/HistoryCard";

//Styles
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();

  async function loadData() {
    try {
      const dataKey = "@gofinances:transactions";
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted = response ? JSON.parse(response) : [];

      const expensives = responseFormatted.filter(
        (expensive: TransactionData) => expensive.type === "negative"
      );

      const expensivesTotal = expensives.reduce(
        (acummulator: number, expensive: TransactionData) => {
          return (acummulator += Number(expensive.amount));
        },
        0
      );

      const totalCategory: CategoryData[] = [];

      categories.forEach((category) => {
        let categorySum = 0;
        expensives.forEach((expensive: TransactionData) => {
          if (expensive.category === category.key) {
            categorySum += Number(expensive.amount);
          }
        });

        if (categorySum > 0) {
          const totalFormatted = categorySum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
            0
          )}%`;

          totalCategory.push({
            key: category.key,
            name: category.name,
            color: category.color,
            total: categorySum,
            totalFormatted,
            percent,
          });
        }
      });
      setTotalByCategories(totalCategory);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map((item) => item.color)}
            labelRadius={85}
            style={{labels:{
              fontSize: RFValue(18),
              fontWeight: 'bold',
              fill: theme.colors.shape
            }}}
          />
        </ChartContainer>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
