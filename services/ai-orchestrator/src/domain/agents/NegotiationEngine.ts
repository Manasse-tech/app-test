export class NegotiationEngine {
  private readonly FLOOR_PRICE_RATIO = 0.7; // 70% du prix initial

  processOffer(
    initialPrice: number,
    userOffer: number,
    _currentStep?: number
  ): { accepted: boolean; counterOffer: number; message: string } {
    const floorPrice = initialPrice * this.FLOOR_PRICE_RATIO;

    if (userOffer >= initialPrice * 0.9) {
      return {
        accepted: true,
        counterOffer: userOffer,
        message: 'Offre acceptée immédiatement. Félicitations.',
      };
    }

    if (userOffer < floorPrice) {
      return {
        accepted: false,
        counterOffer: Math.max(floorPrice, initialPrice * 0.85),
        message: `Votre offre est trop basse par rapport à la qualité de nos matériaux. Notre prix plancher est de ${Math.max(floorPrice, initialPrice * 0.85)} €.`,
      };
    }

    const counter = initialPrice - (initialPrice - userOffer) / 2;
    return {
      accepted: false,
      counterOffer: counter,
      message: `Je peux faire un geste à ${counter} €.`,
    };
  }
}
