type Currency = "BRL" | "USD";

/**
 * Função para formatar valores monetários
 * @param value
 * @param currency
 * @returns
 */
export const formatCurrency = (value: number, currency: Currency): string => {
    return new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-US", {
        style: "currency",
        currency,
    }).format(value);
};

/**
 * Função para converter valores entre moedas
 * @param value
 * @param fromCurrency
 * @param toCurrency
 * @returns
 */
export const convertCurrency = (
    value: number,
    fromCurrency: Currency,
    toCurrency: Currency
): number => {
    const conversionRate = {
        BRLtoUSD: 0.2, // 1 Real = 0.20 Dólar
        USDtoBRL: 5.0, // 1 Dólar = 5.00 Reais
    };

    if (fromCurrency === toCurrency) return value;

    if (fromCurrency === "BRL" && toCurrency === "USD") {
        return value * conversionRate.BRLtoUSD;
    } else if (fromCurrency === "USD" && toCurrency === "BRL") {
        return value * conversionRate.USDtoBRL;
    }

    return value;
};
