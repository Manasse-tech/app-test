export interface GatewayConfig {
  name: string;
  supportedCurrencies: string[];
  supportedCountries: string[];
  currentLatencyMs: number;
  isUp: boolean;
}
export class PaymentRouterEngine {
  public static selectBestGateway(
    currency: string,
    country: string,
    gateways: GatewayConfig[]
  ): GatewayConfig {
    const validGateways = gateways.filter(
      (g) =>
        g.isUp && g.supportedCurrencies.includes(currency) && g.supportedCountries.includes(country)
    );
    if (validGateways.length === 0)
      throw new Error(`Pas de passerelle pour ${currency} sur la zone ${country}`);
    return validGateways.reduce((prev, curr) =>
      prev.currentLatencyMs < curr.currentLatencyMs ? prev : curr
    );
  }
}
